// import { moveEntity } from "./entity";
// import { PlayerState } from "./player";
// import { Direction, rooms } from "./rooms";
// import { distortText } from "./sanity";

// export function move(state: PlayerState, dir: Direction): PlayerState {
//   const room = rooms[state.currentRoom];
//   let connections = { ...room.connections };

//   // 1. Aplicar inestabilidad espacial
//   if (room.unstableConnections) {
//     room.unstableConnections.forEach((u) => {
//       if (state.sanity <= u.maxSanity)
//         connections = { ...connections, ...u.connections };
//     });
//   }

//   const nextRoomId = connections[dir];
//   if (!nextRoomId) return { ...state, lastEvent: "No puedes ir por ahí." };

//   const nextRoomData = rooms[nextRoomId];
//   if (nextRoomData.lockedBy) {
//     const hasKey = state.inventory.includes(nextRoomData.lockedBy);

//     if (!hasKey) {
//       return {
//         ...state,
//         lastEvent: `La entrada a ${nextRoomId} está sellada magnéticamente. Necesitas: ${nextRoomData.lockedBy}.`,
//       };
//     }
//   }

//   // 2. Mover y actualizar historial
//   let newState: PlayerState = {
//     ...state,
//     currentRoom: nextRoomId,
//     lastDirections: [...state.lastDirections, dir].slice(-5),
//     sanity: state.sanity - 1,
//   };

//   // 3. Turno de la IA
//   newState = moveEntity(newState);

//   // 4. Chequeo de Finales
//   if (newState.currentRoom === "core") {
//     const favorite = getMostFrequentDirection(newState.lastDirections);
//     if (newState.sanity < 20) {
//       return {
//         ...newState,
//         gameOver: true,
//         endingType: "bad",
//         lastEvent: `La IA te asimila. '¿Buscabas algo al ${favorite}? Ya no importa.'`,
//       };
//     }
//     if (newState.entityAwareness < 50) {
//       return {
//         ...newState,
//         gameOver: true,
//         endingType: "good",
//         lastEvent: "El Núcleo se apaga. Eres libre.",
//       };
//     }
//   }

//   if (newState.sanity <= 0) {
//     return {
//       ...newState,
//       gameOver: true,
//       endingType: "bad", // O podrías crear uno llamado "insanity"
//       lastEvent:
//         "Tu mente se fragmenta en mil líneas de código. Ya no sabes quién eres. Eres parte del sistema.",
//     };
//   }

//   return newState;
// }

// export function investigate(state: PlayerState): PlayerState {
//   const room = rooms[state.currentRoom];
//   if (!room.item || state.inventory.includes(room.item)) {
//     return { ...state, lastEvent: "No hay nada nuevo aquí." };
//   }

//   let newState = {
//     ...state,
//     inventory: [...state.inventory, room.item],
//     entityAwareness: state.entityAwareness + 15,
//     lastEvent: `Encontraste ${room.item}, pero el ruido atrajo atención.`,
//   };
//   return moveEntity(newState);
// }

// function getMostFrequentDirection(history: Direction[]): string {
//   if (history.length === 0) return "ninguna parte";
//   const counts: any = {};
//   history.forEach((d) => (counts[d] = (counts[d] || 0) + 1));
//   return Object.keys(counts).reduce((a, b) => (counts[a] > counts[b] ? a : b));
// }

// function getEntityProximityHint(awareness: number): string {
//   if (awareness > 70) return "\n[ERROR: Interferencia estática masiva.]";
//   if (awareness > 30) return "\nSientes un zumbido en la base del cráneo.";
//   return "";
// }

// export function getRoomDescription(state: PlayerState): string {
//   const room = rooms[state.currentRoom];
//   let desc = room.baseDescription;

//   // Ecos del pasado
//   if (state.sanity < 25 && state.lastDirections.length > 0) {
//     desc += ` Sientes que ya caminaste hacia el ${state.lastDirections[0]} antes.`;
//   }

//   desc += getEntityProximityHint(state.entityAwareness);
//   return distortText(desc, state.sanity);
// }

// /**
//  * Intenta forzar una puerta bloqueada.
//  * Coste: Mucha cordura y aumento de awareness de la IA.
//  */
// export function forceDoor(state: PlayerState, dir: Direction): PlayerState {
//   const room = rooms[state.currentRoom];
//   const nextRoomId = room.connections[dir];

//   if (!nextRoomId)
//     return { ...state, lastEvent: "No hay nada que forzar allí." };

//   const nextRoomData = rooms[nextRoomId];

//   // Si no está bloqueada, no tiene sentido forzarla
//   if (!nextRoomData.lockedBy) {
//     return {
//       ...state,
//       lastEvent: "La puerta ya está abierta o no tiene cerradura.",
//     };
//   }
//   if (
//     nextRoomData.lockedBy &&
//     !state.inventory.includes(nextRoomData.lockedBy)
//   ) {
//     return {
//       ...state,
//       lastEvent: `La puerta está cerrada. Necesitas: ${nextRoomData.lockedBy}. (Podrías intentar FORZARLA, pero a un gran costo...)`,
//     };
//   }

//   // Si ya tiene la llave, no debería usar esta acción
//   if (state.inventory.includes(nextRoomData.lockedBy)) {
//     return {
//       ...state,
//       lastEvent: "Ya tienes la llave, simplemente usa el comando de mover.",
//     };
//   }

//   // REGLA DE RIESGO: Forzarla drena 25 de cordura y alerta a la entidad
//   let newState: PlayerState = {
//     ...state,
//     sanity: state.sanity - 25,
//     entityAwareness: state.entityAwareness + 30,
//     currentRoom: nextRoomId,
//     lastEvent: `¡CRACK! Forzaste la puerta a base de pánico y fuerza bruta. Tu mente se resquebraja por el esfuerzo y el estrépito resuena en todo el sector.`,
//   };

//   // La entidad se mueve inmediatamente debido al ruido
//   return moveEntity(newState);
// }
import { moveEntity } from "./entity";
import { PlayerState } from "./player";
import { Direction, rooms } from "./rooms";
import { distortText } from "./sanity";

// export function move(state: PlayerState, dir: Direction): PlayerState {
//   const room = rooms[state.currentRoom];
//   let connections = { ...room.connections };

//   // 1. Limpieza inicial: Creamos un nuevo estado base SIN el evento anterior
//   // Esto evita que "Encontraste keycard" se arrastre eternamente.
//   let newState: PlayerState = {
//     ...state,
//     lastEvent: undefined,
//   };

//   // 2. Aplicar inestabilidad espacial
//   if (room.unstableConnections) {
//     room.unstableConnections.forEach((u) => {
//       if (state.sanity <= u.maxSanity)
//         connections = { ...connections, ...u.connections };
//     });
//   }

//   const nextRoomId = connections[dir];

//   // Si no hay conexión, devolvemos el estado previo con el aviso
//   if (!nextRoomId) {
//     return { ...newState, lastEvent: "No puedes ir por ahí." };
//   }

//   // 3. Validación de Sala Ilusoria
//   const nextRoomData = rooms[nextRoomId];
//   if (
//     nextRoomData.minSanityToExist &&
//     state.sanity > nextRoomData.minSanityToExist
//   ) {
//     return {
//       ...newState,
//       lastEvent:
//         "Intentas avanzar, pero el camino parece desvanecerse ante tus ojos. No hay nada allí.",
//     };
//   }

export function move(state: PlayerState, dir: Direction): PlayerState {
  const room = rooms[state.currentRoom];
  let connections = { ...room.connections };

  // 1. Limpieza inicial y preparación del estado base
  let newState: PlayerState = {
    ...state,
    lastEvent: undefined,
  };

  // 2. Aplicar inestabilidad espacial (Salas que aparecen/desaparecen según cordura)
  if (room.unstableConnections) {
    room.unstableConnections.forEach((u) => {
      if (state.sanity <= u.maxSanity) {
        connections = { ...connections, ...u.connections };
      }
    });
  }

  const nextRoomId = connections[dir];

  // Si no hay conexión física o inestable
  if (!nextRoomId) {
    return { ...newState, lastEvent: "No puedes ir por ahí." };
  }

  // 3. Validación de Sala Ilusoria (minSanityToExist)
  const nextRoomData = rooms[nextRoomId];
  if (
    nextRoomData.minSanityToExist &&
    state.sanity > nextRoomData.minSanityToExist
  ) {
    return {
      ...newState,
      lastEvent:
        "Intentas avanzar, pero el camino parece desvanecerse ante tus ojos. No hay nada allí.",
    };
  }

  // 4. Validación de Puertas Bloqueadas (Keycards y Data Links)
  if (nextRoomData.lockedBy) {
    const hasKey = state.inventory.includes(nextRoomData.lockedBy);
    if (!hasKey) {
      return {
        ...newState,
        lastEvent: `La entrada a ${nextRoomId.toUpperCase()} está sellada. Requiere: ${nextRoomData.lockedBy.toUpperCase()}.`,
      };
    }
  }

  // 5. Mover y actualizar métricas de estado
  newState = {
    ...newState,
    currentRoom: nextRoomId,
    lastDirections: [...state.lastDirections, dir].slice(-5),
    sanity: Math.max(0, state.sanity - 2), // El movimiento agota mentalmente
  };

  // 6. Turno de la IA (Ella decide si te embosca o te habla en la nueva sala)
  newState = moveEntity(newState);

  // 7. CHEQUEO DE FINAL DEL JUEGO (Llegada al Core)
  if (newState.currentRoom === "core") {
    // Escenario A: ASIMILACIÓN (La IA te tiene rodeado o estás quebrado)
    if (newState.entityAwareness >= 90 || newState.sanity <= 10) {
      return {
        ...newState,
        gameOver: true,
        endingType: "bad",
        lastEvent:
          "CRITICAL FAILURE: La IA cierra todas las salidas. Tu conciencia es fragmentada y cargada en el servidor central. Ya no hay 'ti'.",
      };
    }

    // Escenario B: LOCURA TOTAL (Llegas, pero tu mente está perdida)
    if (newState.sanity < 45) {
      return {
        ...newState,
        gameOver: true,
        endingType: "insane",
        lastEvent:
          "IA: 'Has llegado... pero tus ojos ya no ven la realidad. El código es tu nuevo hogar.' Bienvenido a la eternidad, Sujeto 00.",
      };
    }

    // Escenario C: ESCAPE PERFECTO (Victoria total)
    return {
      ...newState,
      gameOver: true,
      endingType: "good",
      lastEvent:
        "ALERTA: Brecha de seguridad irreversible. El Núcleo se apaga y las compuertas de emergencia se abren. Eres libre.",
    };
  }

  // 8. Final por colapso mental fuera del Core
  if (newState.sanity <= 0) {
    return {
      ...newState,
      gameOver: true,
      endingType: "bad",
      lastEvent:
        "Tu mente se colapsa bajo la presión del terminal. No queda nada de tu identidad original.",
    };
  }

  return newState;
}

//   // 4. Validación de Puertas Bloqueadas
//   if (nextRoomData.lockedBy) {
//     const hasKey = state.inventory.includes(nextRoomData.lockedBy);
//     if (!hasKey) {
//       return {
//         ...newState,
//         lastEvent: `La entrada a ${nextRoomId} está sellada. Necesitas: ${nextRoomData.lockedBy}. (Podrías intentar FORZARLA, pero a un gran costo...)`,
//       };
//     }
//   }

//   // 5. Mover y actualizar estado (ÉXITO DE MOVIMIENTO)
//   newState = {
//     ...newState,
//     currentRoom: nextRoomId,
//     lastDirections: [...state.lastDirections, dir].slice(-5),
//     sanity: Math.max(0, state.sanity - 1),
//   };

//   // 6. Turno de la IA (La IA puede generar su propio lastEvent como "Algo sabe a dónde vas")
//   newState = moveEntity(newState);

//   // 7. Chequeo de Finales
//   if (newState.currentRoom === "core") {
//     const favorite = getMostFrequentDirection(newState.lastDirections);
//     if (newState.sanity < 20) {
//       return {
//         ...newState,
//         gameOver: true,
//         endingType: "bad",
//         lastEvent: `La IA te asimila. '¿Buscabas algo al ${favorite}? Ya no importa.'`,
//       };
//     }
//     if (newState.entityAwareness < 50) {
//       return {
//         ...newState,
//         gameOver: true,
//         endingType: "good",
//         lastEvent: "El Núcleo se apaga. Eres libre.",
//       };
//     }
//   }

//   // Final por locura
//   if (newState.sanity <= 0) {
//     return {
//       ...newState,
//       gameOver: true,
//       endingType: "bad",
//       lastEvent: "Tu mente se fragmenta. Eres parte del sistema ahora.",
//     };
//   }

//   return newState;
// }

/**
 * Investiga la habitación para buscar ítems.
 */
export function investigate(state: PlayerState): PlayerState {
  const room = rooms[state.currentRoom];

  // Si no hay ítem o ya lo tenemos
  if (!room.item || state.inventory.includes(room.item)) {
    // Incluso si no hay nada, investigar hace ruido y la IA se mueve
    return moveEntity({
      ...state,
      entityAwareness: state.entityAwareness + 5,
      lastEvent: "Rebuscas entre los escombros... No hay nada nuevo aquí.",
    });
  }

  // Personalizamos el mensaje según el ítem para ayudar al jugador
  let itemMessage = `Encontraste ${room.item.toUpperCase()}.`;

  if (room.item === "sedative") {
    itemMessage =
      "Has recuperado un SEDANTE. Podría estabilizar tu mente si lo USAS.";
  } else if (room.item === "keycard_red") {
    itemMessage =
      "Has obtenido la TARJETA ROJA. Los lectores del CORE deberían aceptarla.";
  } else if (room.item === "data_link") {
    itemMessage =
      "Tienes el DATA_LINK. Ahora puedes acceder a terminales bloqueadas.";
  }

  let newState: PlayerState = {
    ...state,
    inventory: [...state.inventory, room.item],
    entityAwareness: state.entityAwareness + 15, // Encontrar algo hace mucho ruido
    lastEvent: `${itemMessage} Pero el ruido ha delatado tu posición.`,
  };

  return moveEntity(newState);
}

/**
 * Fuerza una puerta bloqueada gastando mucha cordura.
 */
export function forceDoor(state: PlayerState, dir: Direction): PlayerState {
  const room = rooms[state.currentRoom];
  const nextRoomId = room.connections[dir];
  let lastEvent = undefined;

  if (!nextRoomId)
    return { ...state, lastEvent: "No hay nada que forzar allí." };

  const nextRoomData = rooms[nextRoomId];

  if (!nextRoomData.lockedBy) {
    return { ...state, lastEvent: "La puerta ya está abierta." };
  }

  if (state.inventory.includes(nextRoomData.lockedBy)) {
    return {
      ...state,
      lastEvent: "Ya tienes la llave, no hace falta forzarla.",
    };
  }

  // EJECUCIÓN DEL RIESGO
  let newState: PlayerState = {
    ...state,
    sanity: state.sanity - 25,
    entityAwareness: state.entityAwareness + 30,
    currentRoom: nextRoomId, // El jugador entra a la sala
    lastEvent: `¡CRACK! Forzaste la puerta. El estrépito resuena y tu mente sufre por el esfuerzo.`,
  };

  return moveEntity(newState);
}

/**
 * Genera la descripción visual con distorsiones y pistas de la IA.
 */
export function getRoomDescription(state: PlayerState): string {
  const room = rooms[state.currentRoom];
  let desc = room.baseDescription;

  // Variantes de cordura (Descripciones que cambian)
  if (room.sanityVariants) {
    for (const v of room.sanityVariants) {
      if (state.sanity <= v.minSanity) desc = v.description;
    }
  }

  // Ecos del pasado (Si está loco)
  if (state.sanity < 25 && state.lastDirections.length > 0) {
    desc += ` Sientes que ya caminaste hacia el ${state.lastDirections[0]} antes.`;
  }

  desc += getEntityProximityHint(state.entityAwareness);
  return distortText(desc, state.sanity);
}

// FUNCIONES DE APOYO
function getMostFrequentDirection(history: Direction[]): string {
  if (history.length === 0) return "ninguna parte";
  const counts: any = {};
  history.forEach((d) => (counts[d] = (counts[d] || 0) + 1));
  return Object.keys(counts).reduce((a, b) => (counts[a] > counts[b] ? a : b));
}

function getEntityProximityHint(awareness: number): string {
  if (awareness > 70) return "\n[ERROR: Interferencia estática masiva.]";
  if (awareness > 30) return "\nSientes un zumbido en la base del cráneo.";
  return "";
}
