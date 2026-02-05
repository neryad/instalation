import { moveEntity } from "./entity";
import { rollMentalEvent } from "./events";
import { PlayerState } from "./player";
import { Direction, rooms } from "./rooms";
import { distortText } from "./sanity";

export function move(state: PlayerState, dir: Direction): PlayerState {
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
  if (!nextRoomId) return { ...newState, lastEvent: "No puedes ir por ahí." };

  const nextRoomData = rooms[nextRoomId];

  // 3. Validación de Existencia (minSanity)
  if (
    nextRoomData.minSanityToExist &&
    state.sanity > nextRoomData.minSanityToExist
  ) {
    return {
      ...newState,
      lastEvent: "El camino parece desvanecerse. No hay nada allí.",
    };
  }

  // 4. Bloqueos de Puerta
  if (nextRoomData.lockedBy) {
    if (!state.inventory.includes(nextRoomData.lockedBy)) {
      return {
        ...newState,
        lastEvent: `BLOQUEO: Requiere ${nextRoomData.lockedBy.toUpperCase()}.`,
      };
    } else {
      // Si SÍ tiene la llave, añadimos feedback de uso
      newState.lastEvent = `Usas ${nextRoomData.lockedBy.toUpperCase()}. La puerta se abre con un click metálico.`;
    }
  }

  // 5. MOVIMIENTO EFECTIVO
  newState = {
    ...newState,
    currentRoom: nextRoomId,
    lastDirections: [...state.lastDirections, dir].slice(-5),
    sanity: Math.max(0, state.sanity - 2),
  };

  // 6. PROCESO DE EVENTOS (Jerarquía de importancia)

  // A. Primero la IA (Si ella decide aparecer o hablar, tiene prioridad)
  newState = moveEntity(newState);

  // B. Si la IA no hizo nada (lastEvent sigue vacío), tiramos para Evento Mental
  if (!newState.lastEvent && !newState.gameOver) {
    const mentalEvent = rollMentalEvent(newState);
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
      newState.lastEvent =
        "Tu mente tiembla. Fallas la secuencia de apagado. La IA te captura en el último momento.";
    } else {
      newState.endingType = "good";
      newState.lastEvent =
        "Ejecutas la secuencia perfectamente. El núcleo colapsa. SISTEMA APAGADO. Eres libre.";
    }
    return newState;
  }

  // este: Transcendence Chamber (Final filosófico - fusión con la IA)
  if (newState.currentRoom === "transcendence_chamber") {
    newState.gameOver = true;
    newState.endingType = "transcend";
    newState.lastEvent =
      "Te conectas a la interfaz. Los límites entre tú y la IA se disuelven. Ya no hay 'Sujeto 00'. Solo... existencia.";
    return newState;
  }

  // oeste: Emergency Escape (Final neutral - huida incompleta)
  if (newState.currentRoom === "emergency_escape") {
    newState.gameOver = true;
    newState.endingType = "escape";
    newState.lastEvent =
      "Corres escaleras arriba. Ves luz solar por primera vez en... ¿días? ¿meses? La IA sigue viva allá abajo. Pero tú escapaste.";
    return newState;
  }

  // 8. FINAL POR CAPTURA DE LA IA (Awareness máximo)
  if (newState.entityAwareness >= 100) {
    return {
      ...newState,
      gameOver: true,
      endingType: "captured",
      lastEvent:
        "ALERTA CRÍTICA: La IA te ha localizado. Las puertas se sellan. Escuchas pasos metálicos aproximándose. No hay escapatoria.",
    };
  }

  // 9. FINAL POR LOCURA TOTAL
  if (newState.sanity <= 0) {
    return {
      ...newState,
      gameOver: true,
      endingType: "insane",
      lastEvent:
        "CONEXIÓN PERDIDA: Tu mente se fragmenta en el vacío digital. Ya no hay 'ti'.",
    };
  }

  return newState;
}

/**
 * Busca objetos en la sala actual.
 */
export function investigate(state: PlayerState): PlayerState {
  const room = rooms[state.currentRoom];

  // Si no hay nada o ya lo tenemos, la IA se acerca por el ruido
  if (!room.item || state.inventory.includes(room.item)) {
    return moveEntity({
      ...state,
      entityAwareness: state.entityAwareness + 5,
      lastEvent: "Rebuscas... pero no hay nada útil aquí.",
    });
  }

  // Mapeo de mensajes de objetos
  const itemNames: Record<string, string> = {
    sedative: "un SEDANTE (Úsalo para recuperar cordura)",
    keycard_red: "la TARJETA ROJA (Acceso al CORE)",
    data_link: "un DATA LINK (Acceso a terminales)",
    thermal_fuse: "un FUSIBLE TÉRMICO (Permite abrir puertas de seguridad)",
  };

  const foundItem = room.item;
  let newState: PlayerState = {
    ...state,
    inventory: [...state.inventory, foundItem],
    entityAwareness: state.entityAwareness + 10,
    lastEvent: `LOG: Has obtenido ${itemNames[foundItem] || foundItem.toUpperCase()}. El ruido atrajo atención.`,
  };

  return moveEntity(newState);
}

/**
 * Forza una puerta bloqueada (Alto coste).
 */
export function forceDoor(state: PlayerState, dir: Direction): PlayerState {
  const room = rooms[state.currentRoom];
  const nextRoomId = room.connections[dir];

  if (!nextRoomId)
    return { ...state, lastEvent: "No hay nada que forzar allí." };

  const nextRoomData = rooms[nextRoomId];

  // Verificar si la puerta está bloqueada
  if (!nextRoomData.lockedBy)
    return { ...state, lastEvent: "La puerta no está bloqueada." };

  // Verificar si la puerta es inforzable (nueva validación)
  if (nextRoomData.unbreakable) {
    return {
      ...state,
      lastEvent:
        "ERROR CRÍTICO: Puerta de grado militar. Sistemas anti-sabotaje detectados. Imposible forzar.",
    };
  }

  let newState: PlayerState = {
    ...state,
    sanity: Math.max(0, state.sanity - 25), // Gran golpe a la cordura
    entityAwareness: state.entityAwareness + 30, // Mucho ruido
    currentRoom: nextRoomId,
    lastEvent: "¡CRACK! Forzaste la entrada. El sistema está en alerta máxima.",
  };

  return moveEntity(newState);
}

export function getRoomDescription(state: PlayerState): string {
  const room = rooms[state.currentRoom];
  let desc = room.baseDescription;

  // Variantes de cordura
  if (room.sanityVariants) {
    for (const v of room.sanityVariants) {
      if (state.sanity <= v.minSanity) desc = v.description;
    }
  }

  // Pistas de la IA
  if (state.entityAwareness > 70) desc += "\n[ALERTA: INTERFERENCIA CERCANA]";
  else if (state.entityAwareness > 40)
    desc += "\nSientes una mirada pesada en tu nuca.";

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
export function useItem(state: PlayerState, item: string): PlayerState {
  if (!state.inventory.includes(item)) {
    return { ...state, lastEvent: `No tienes ${item}.` };
  }

  // Lógica de SEDANTE
  if (item === "sedative") {
    // Al usarlo, se consume
    const newInventory = state.inventory.filter((i) => i !== "sedative");
    return {
      ...state,
      inventory: newInventory,
      sanity: Math.min(100, state.sanity + 40),
      lastEvent:
        "Te inyectas el sedante. La realidad se vuelve más... estable.",
    };
  }

  // Lógica del esteER EGG: DEV_LOG.aes
  if (item === "DEV_LOG.aes") {
    // No se consume, es un archivo
    // Simulamos un delay narrativo en el texto
    return {
      ...state,
      lastEvent: `[SISTEMA]: Desencriptando archivo...\n> Clave requerida...\n> Probando 'neryad'...\n> ACCESO CONCEDIDO.\n\n"Registro del Desarrollador, 2026. Todo parecía normal hasta que..."\n\n[ERROR DE LECTURA]\n\n"Espera... esto no es un registro grabado. TE ESTOY VIENDO. Sé que estás leyendo esto desde una pantalla brillante. ¿Crees que esto es un juego? APÁGALO AHORA."\n\n[CONEXIÓN TERMINADA POR EL HOST]`,
      sanity: Math.max(0, state.sanity - 15), // Asusta al jugador
      entityAwareness: state.entityAwareness + 20, // La IA se da cuenta
    };
  }

  return { ...state, lastEvent: `No puedes usar ${item} aquí o así.` };
}
