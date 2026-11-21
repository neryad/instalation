import { moveEntity } from "./entity";
import { rollMentalEvent } from "./events";
import { tSync } from "./i18n";
import { PlayerState } from "./player";
import { Direction, rooms } from "./rooms";
import { distortText } from "./sanity";

export function move(state: PlayerState, dir: Direction, lang: "es" | "en" = "es"): PlayerState {
  const room = rooms[state.currentRoom];
  let connections = { ...room.connections };

  // 1. Limpieza y preparación
  let newState: PlayerState = { ...state, lastEvent: undefined };

  // 2. Inestabilidad Espacial
  if (room.unstableConnections) {
    room.unstableConnections.forEach((u) => {
      if (state.sanity <= u.maxSanity)
        connections = { ...connections, ...u.connections };
    });
  }

  const nextRoomId = connections[dir];
  if (!nextRoomId) return { ...newState, lastEvent: tSync(lang, "engine.cannot_go_there") };

  const nextRoomData = rooms[nextRoomId];

  // 3. Validación de Existencia (maxSanity — la sala solo existe con cordura ≤ umbral)
  if (
    nextRoomData.maxSanityToExist &&
    state.sanity > nextRoomData.maxSanityToExist
  ) {
    return {
      ...newState,
      lastEvent: tSync(lang, "engine.path_vanishes"),
    };
  }

  // 4. Bloqueos de Puerta
  if (nextRoomData.lockedBy) {
    if (!state.inventory.includes(nextRoomData.lockedBy)) {
      return {
        ...newState,
        lastEvent: tSync(lang, "engine.blocked_requires", { key: nextRoomData.lockedBy.toUpperCase() }),
      };
    } else {
      // Si SÍ tiene la llave, añadimos feedback de uso
      newState.lastEvent = tSync(lang, "engine.key_used", { key: nextRoomData.lockedBy.toUpperCase() });
    }
  }

  // 5. MOVIMIENTO EFECTIVO
  newState = {
    ...newState,
    currentRoom: nextRoomId,
    lastDirections: [...state.lastDirections, dir].slice(-5),
    roomHistory: [...state.roomHistory, nextRoomId].slice(-8),
    visitedRooms: state.visitedRooms.includes(nextRoomId)
      ? state.visitedRooms
      : [...state.visitedRooms, nextRoomId],
    sanity: Math.max(0, state.sanity - 2),
  };

  // 6. PROCESO DE EVENTOS (Jerarquía de importancia)

  // A. Primero la IA (Si ella decide aparecer o hablar, tiene prioridad)
  newState = moveEntity(newState, lang);

  // B. Si la IA no hizo nada (lastEvent sigue vacío), tiramos para Evento Mental
  if (!newState.lastEvent && !newState.gameOver) {
    const mentalEvent = rollMentalEvent(newState, lang);
    if (mentalEvent) {
      newState = {
        ...newState,
        sanity: Math.max(0, newState.sanity + mentalEvent.sanityChange),
        lastEvent: mentalEvent.text(newState),
      };
    }
  }

  // 7. CHEQUEO DE SALAS DE FINAL (Decisiones activas en el core)

  // norte: Shutdown Protocol (Final bueno - requiere cordura estable)
  if (newState.currentRoom === "shutdown_protocol") {
    newState.gameOver = true;
    if (newState.sanity < 55) {
      newState.endingType = "bad";
      newState.lastEvent = tSync(lang, "engine.shutdown_bad");
    } else {
      newState.endingType = "good";
      newState.lastEvent = tSync(lang, "engine.shutdown_good");
    }
    return newState;
  }

  // este: Transcendence Chamber (Final filosófico - fusión con la IA)
  if (newState.currentRoom === "transcendence_chamber") {
    newState.gameOver = true;
    newState.endingType = "transcend";
    newState.lastEvent = tSync(lang, "engine.transcend");
    return newState;
  }

  // oeste: Emergency Escape (Final neutral - huida incompleta)
  if (newState.currentRoom === "emergency_escape") {
    newState.gameOver = true;
    newState.endingType = "escape";
    newState.lastEvent = tSync(lang, "engine.escape");
    return newState;
  }

  // 8. FINAL POR CAPTURA DE LA IA (Awareness máximo)
  if (newState.entityAwareness >= 100) {
    return {
      ...newState,
      gameOver: true,
      endingType: "captured",
      lastEvent: tSync(lang, "engine.captured"),
    };
  }

  // 9. FINAL POR LOCURA TOTAL
  if (newState.sanity <= 0) {
    return {
      ...newState,
      gameOver: true,
      endingType: "insane",
      lastEvent: tSync(lang, "engine.insane_death"),
    };
  }

  return newState;
}

/**
 * Busca objetos en la sala actual.
 */
export function investigate(state: PlayerState, lang: "es" | "en" = "es"): PlayerState {
  const room = rooms[state.currentRoom];

  // Construir mensaje de lore si existe
  let loreText = "";
  if (room.loreFragment && !state.loreDiscovered.includes(room.loreFragment)) {
    const lore = tSync(lang, room.loreFragment);
    if (lore && lore !== room.loreFragment) {
      loreText = `\n${lore}`;
    }
  }

  // Si no hay nada o ya lo tenemos, la IA se acerca por el ruido
  if (!room.item || state.inventory.includes(room.item)) {
    const newState: PlayerState = {
      ...state,
      entityAwareness: state.entityAwareness + 5,
      loreDiscovered: room.loreFragment && !state.loreDiscovered.includes(room.loreFragment)
        ? [...state.loreDiscovered, room.loreFragment]
        : state.loreDiscovered,
      lastEvent: tSync(lang, "engine.investigate_nothing") + loreText,
    };
    return moveEntity(newState, lang);
  }

  const foundItem = room.item;
  const itemName = tSync(lang, `engine.item_name_${foundItem}`);
  const hintKey = `engine.item_hint_${foundItem}`;
  const hint = tSync(lang, hintKey);
  let newState: PlayerState = {
    ...state,
    inventory: [...state.inventory, foundItem],
    collectedItems: [...state.collectedItems, foundItem],
    entityAwareness: state.entityAwareness + 10,
    loreDiscovered: room.loreFragment && !state.loreDiscovered.includes(room.loreFragment)
      ? [...state.loreDiscovered, room.loreFragment]
      : state.loreDiscovered,
    lastEvent: tSync(lang, "engine.item_found", { item: itemName }) + (hint && hint !== hintKey ? `\n${hint}` : "") + loreText,
  };

  return moveEntity(newState, lang);
}

/**
 * Forza una puerta bloqueada (Alto coste).
 */
export function forceDoor(state: PlayerState, dir: Direction, lang: "es" | "en" = "es"): PlayerState {
  const room = rooms[state.currentRoom];
  const nextRoomId = room.connections[dir];

  if (!nextRoomId)
    return { ...state, lastEvent: tSync(lang, "engine.force_nothing") };

  const nextRoomData = rooms[nextRoomId];

  // Verificar si la puerta está bloqueada
  if (!nextRoomData.lockedBy)
    return { ...state, lastEvent: tSync(lang, "engine.force_not_locked") };

  // Verificar si la puerta es inforzable (nueva validación)
  if (nextRoomData.unbreakable) {
    return {
      ...state,
      lastEvent: tSync(lang, "engine.force_unbreakable"),
    };
  }

  const forceMsg = tSync(lang, "engine.force_success");
  let newState: PlayerState = {
    ...state,
    sanity: Math.max(0, state.sanity - 25),
    entityAwareness: state.entityAwareness + 30,
    currentRoom: nextRoomId,
    roomHistory: [...state.roomHistory, nextRoomId].slice(-8),
    visitedRooms: state.visitedRooms.includes(nextRoomId)
      ? state.visitedRooms
      : [...state.visitedRooms, nextRoomId],
    lastEvent: forceMsg,
  };

  const entityResult = moveEntity(newState, lang);
  if (entityResult.lastEvent !== forceMsg) {
    entityResult.lastEvent = `${forceMsg}\n${entityResult.lastEvent}`;
  }
  return entityResult;
}

export function getRoomDescription(state: PlayerState, lang: "es" | "en" = "es"): string {
  const room = rooms[state.currentRoom];
  let desc = room.baseDescription;

  // Variantes de cordura (elige la variante más severa que aplique)
  if (room.sanityVariants) {
    let best: (typeof room.sanityVariants)[number] | null = null;
    for (const v of room.sanityVariants) {
      if (state.sanity <= v.minSanity && (!best || v.minSanity < best.minSanity)) {
        best = v;
      }
    }
    if (best) desc = best.description;
  }

  // Pistas de la IA
  if (state.entityAwareness > 70) desc += `\n${tSync(lang, "engine.alert_near")}`;
  else if (state.entityAwareness > 40)
    desc += `\n${tSync(lang, "engine.alert_heavy_gaze")}`;

  return distortText(desc, state.sanity);
}

/**
 * Devuelve las direcciones donde hay puertas forzables (bloqueadas y sin llave).
 */
export function getForceableDirections(state: PlayerState): Direction[] {
  const room = rooms[state.currentRoom];
  const directions: Direction[] = [];

  for (const [key, nextRoomId] of Object.entries(room.connections)) {
    if (!nextRoomId) continue;
    const nextRoom = rooms[nextRoomId];

    // Es forzable si está bloqueada, NO tenemos la llave, y NO es inforzable
    if (
      nextRoom.lockedBy &&
      !state.inventory.includes(nextRoom.lockedBy) &&
      !nextRoom.unbreakable
    ) {
      directions.push(key as Direction);
    }
  }
  return directions;
}
// ... (previous code)

/**
 * Usa un objeto del inventario.
 */
export function useItem(state: PlayerState, item: string, lang: "es" | "en" = "es"): PlayerState {
  if (!state.inventory.includes(item)) {
    return { ...state, lastEvent: tSync(lang, "engine.use_no_item", { item }) };
  }

  // Lógica de SEDANTE
  if (item === "sedative") {
    // Al usarlo, se consume
    const newInventory = state.inventory.filter((i) => i !== "sedative");
    return {
      ...state,
      inventory: newInventory,
      sanity: Math.min(100, state.sanity + 40),
      entityAwareness: Math.max(0, state.entityAwareness - 40),
      lastEvent: tSync(lang, "engine.use_sedative"),
    };
  }

  // Lógica del THERMAL FUSE: Abre la caja de seguridad en el incinerador
  if (item === "thermal_fuse") {
    // El fusible se consume al usarlo
    const newInventory = state.inventory.filter((i) => i !== "thermal_fuse");
    return {
      ...state,
      inventory: newInventory,
      lastEvent: tSync(lang, "engine.use_thermal_fuse"),
      sanity: Math.max(0, state.sanity - 5),
    };
  }

  // Lógica del DATA LINK: Revela información en la terminal
  if (item === "data_link") {
    return {
      ...state,
      lastEvent: tSync(lang, "engine.use_data_link"),
      sanity: Math.max(0, state.sanity - 3),
    };
  }

  // Lógica del EASTER EGG: DEV_LOG.aes
  if (item === "DEV_LOG.aes") {
    // No se consume, es un archivo
    // Simulamos un delay narrativo en el texto
    return {
      ...state,
      lastEvent: tSync(lang, "engine.use_devlog"),
      sanity: Math.max(0, state.sanity - 15), // Asusta al jugador
      entityAwareness: state.entityAwareness + 20, // La IA se da cuenta
    };
  }

  return { ...state, lastEvent: tSync(lang, "engine.use_cannot", { item }) };
}
