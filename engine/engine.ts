import { moveEntity } from "./entity";
import { PlayerState } from "./player";
import { Direction, rooms } from "./rooms";
import { distortText } from "./sanity";

// export function move(state: PlayerState, dir: Direction): PlayerState {
//   const room = rooms[state.currentRoom];
//   let connections = { ...room.connections };

//   // 1. Distorsiones por cordura en conexiones
//   if (room.unstableConnections) {
//     for (const variant of room.unstableConnections) {
//       if (state.sanity <= variant.maxSanity) {
//         connections = { ...connections, ...variant.connections };
//       }
//     }
//   }

//   // 2. Validación de Sala Ilusoria (Solo al entrar)
//   const next = connections[dir];
//   if (next) {
//     const nextRoom = rooms[next];
//     if (nextRoom.minSanityToExist && state.sanity > nextRoom.minSanityToExist) {
//       return {
//         ...state,
//         lastEvent:
//           "Intentas avanzar, pero el camino parece desvanecerse ante tus ojos. No hay nada allí.",
//       };
//     }
//   }

//   // 3. Bloqueos por la Entidad
//   const blockedByEntity: Direction[] = [];

//   if (state.entityRoom && state.sanity < 35) {
//     if (state.entityRoom === state.currentRoom) {
//       const dirs = Object.keys(connections) as Direction[];
//       if (dirs.length > 0) {
//         const random = dirs[Math.floor(Math.random() * dirs.length)];
//         blockedByEntity.push(random);
//       }
//     }
//   }

//   if (blockedByEntity.includes(dir)) {
//     return { ...state, lastEvent: "Una presencia oscura bloquea esa salida." };
//   }

//   if (!next) return { ...state, lastEvent: "No hay nada en esa dirección." };

//   // 4. Actualización de Estado Base
//   let newState = {
//     ...state,
//     currentRoom: next,
//     lastDirections: [...state.lastDirections, dir].slice(-5),
//   };

//   // En la lógica de movimiento de engine.ts
//   if (room.unstableConnections && state.sanity < 30) {
//     newState.lastEvent =
//       "Parpadeas y el pasillo parece haberse torcido. Algo no encaja.";
//   }
//   // En engine.ts -> función move()
//   if (state.entityRoom === state.currentRoom) {
//     newState.sanity -= 2; // El estrés de estar cerca de ella te agota
//     newState.lastEvent =
//       "Su presencia drena tu voluntad. Tienes que salir de aquí.";
//   }
//   // 5. Feedback de Predicción (Regla Clara)
//   if (newState.lastDirections.length >= 3) {
//     const history = newState.lastDirections;
//     if (history[history.length - 1] === history[history.length - 3]) {
//       newState.lastEvent =
//         "La IA ha detectado un patrón en tus pasos. Eres predecible.";
//     }
//   }

//   // 6. Procesar Ítems y Eventos
//   const nextRoomData = rooms[next];
//   if (nextRoomData.item && !newState.inventory.includes(nextRoomData.item)) {
//     newState.inventory.push(nextRoomData.item);
//     newState.lastEvent = `Has encontrado: ${nextRoomData.item}`;
//   }

//   const event = rollMentalEvent(newState);
//   if (event) {
//     newState.sanity = Math.max(
//       0,
//       Math.min(100, newState.sanity + event.sanityChange),
//     );
//     newState.lastEvent = event.text(newState);
//   }

//   // 7. Movimiento de la Entidad
//   newState = moveEntity(newState);

//   // 8. Finales Refactorizados
//   if (newState.currentRoom === "core") {
//     if (newState.sanity <= 20) {
//       const favoriteDir = getMostFrequentDirection(newState.lastDirections);
//       return {
//         ...newState,
//         gameOver: true,
//         endingType: "bad",
//         lastEvent: `La IA te envuelve. '¿Buscabas algo al ${favoriteDir}? Ya no importa. Ahora eres parte de la arquitectura.' Gracias por los datos, Sujeto 00.`,
//       };
//     }
//     if (newState.sanity > 20 && newState.entityAwareness < 50) {
//       const isMaster = newState.lastDirections.length > 4; // ¿Sobrevivió mucho tiempo?
//       return {
//         ...newState,
//         gameOver: true,
//         endingType: "good",
//         lastEvent: isMaster
//           ? "El Núcleo se apaga. Has burlado cada algoritmo. Las puertas se abren hacia un horizonte que, por primera vez, se siente real. Eres libre."
//           : "El Núcleo se apaga. Caminas hacia la luz. Eres libre... o al menos, has elegido creerlo.",
//       };
//     }
//   }

//   return newState;
// }

// export function getRoomDescription(state: PlayerState): string {
//   const room = rooms[state.currentRoom];
//   let description = room.baseDescription;

//   // 1. Aplicamos variantes de cordura (las que ya tienes en rooms.ts)
//   if (room.sanityVariants) {
//     for (const variant of room.sanityVariants) {
//       if (state.sanity <= variant.minSanity) description = variant.description;
//     }
//   }

//   // 2. AGREGAMOS LA PISTA DE PROXIMIDAD (Aquí es donde se usa)
//   // Esto añade la sensación de peligro a la descripción base
//   description += getEntityProximityHint(state.entityAwareness);

//   // 3. Finalmente, distorsionamos todo el bloque de texto
//   return distortText(description, state.sanity);
// }
// // En engine.ts

// /**
//  * Nueva acción: investigar la habitación actual.
//  * Añade riesgo al obligar al jugador a "detenerse" mientras la IA acecha.
//  */
// export function investigate(state: PlayerState): PlayerState {
//   const room = rooms[state.currentRoom];

//   // 1. Verificar si hay algo que investigar
//   if (!room.item) {
//     return {
//       ...state,
//       lastEvent:
//         "Buscas entre los escombros, pero solo encuentras vacío y el eco de tu respiración.",
//     };
//   }

//   // 2. Verificar si ya se tiene el ítem
//   if (state.inventory.includes(room.item)) {
//     return {
//       ...state,
//       lastEvent:
//         "Ya has extraído todo lo útil de este lugar. No pierdas más tiempo.",
//     };
//   }

//   // 3. REGLA DE RIESGO/RECOMPENSA
//   // Al investigar, el jugador obtiene el objeto pero "hace ruido"
//   let newState: PlayerState = {
//     ...state,
//     inventory: [...state.inventory, room.item],
//     entityAwareness: state.entityAwareness + 15, // Penalización: la IA te localiza
//     lastEvent: `Has encontrado: ${room.item}. El esfuerzo por registrar la zona te ha dejado expuesto.`,
//   };

//   // 4. Turno de la Entidad
//   // Mientras investigas, la entidad se mueve de nuevo.
//   newState = moveEntity(newState);

//   return newState;
// }

// // Función de apoyo para generar "ecos"
// function getEcho(state: PlayerState): string {
//   if (state.lastDirections.length < 2) return "";
//   const ancientDir = state.lastDirections[0]; // Recupera el primer movimiento del historial
//   return ` Sientes que ya caminaste hacia el ${ancientDir} en otra vida.`;
// }

// function getEntityProximityHint(awareness: number): string {
//   if (awareness > 80)
//     return "\n[ALERTA: Interferencia estática masiva en el canal visual.]";
//   if (awareness > 50)
//     return "\nSientes un zumbido constante en la base del cráneo.";
//   if (awareness > 25)
//     return "\nEl aire se siente inusualmente frío en esta sala.";
//   return "";
// }
// /**
//  * Analiza el historial de direcciones para encontrar la más frecuente.
//  * Esto sirve para que la IA personalice su burla final.
//  */
// function getMostFrequentDirection(history: Direction[]): string {
//   if (history.length === 0) return "ninguna parte";

//   const counts: Record<string, number> = {};

//   history.forEach((dir) => {
//     counts[dir] = (counts[dir] || 0) + 1;
//   });

//   // Encontrar la dirección con el valor más alto
//   return Object.keys(counts).reduce((a, b) => (counts[a] > counts[b] ? a : b));
// }

export function move(state: PlayerState, dir: Direction): PlayerState {
  const room = rooms[state.currentRoom];
  let connections = { ...room.connections };

  // 1. Aplicar inestabilidad espacial
  if (room.unstableConnections) {
    room.unstableConnections.forEach((u) => {
      if (state.sanity <= u.maxSanity)
        connections = { ...connections, ...u.connections };
    });
  }

  const nextRoomId = connections[dir];
  if (!nextRoomId) return { ...state, lastEvent: "No puedes ir por ahí." };

  // 2. Mover y actualizar historial
  let newState: PlayerState = {
    ...state,
    currentRoom: nextRoomId,
    lastDirections: [...state.lastDirections, dir].slice(-5),
    sanity: state.sanity - 1,
  };

  // 3. Turno de la IA
  newState = moveEntity(newState);

  // 4. Chequeo de Finales
  if (newState.currentRoom === "core") {
    const favorite = getMostFrequentDirection(newState.lastDirections);
    if (newState.sanity < 20) {
      return {
        ...newState,
        gameOver: true,
        endingType: "bad",
        lastEvent: `La IA te asimila. '¿Buscabas algo al ${favorite}? Ya no importa.'`,
      };
    }
    if (newState.entityAwareness < 50) {
      return {
        ...newState,
        gameOver: true,
        endingType: "good",
        lastEvent: "El Núcleo se apaga. Eres libre.",
      };
    }
  }

  if (newState.sanity <= 0) {
    return {
      ...newState,
      gameOver: true,
      endingType: "bad", // O podrías crear uno llamado "insanity"
      lastEvent:
        "Tu mente se fragmenta en mil líneas de código. Ya no sabes quién eres. Eres parte del sistema.",
    };
  }

  return newState;
}

export function investigate(state: PlayerState): PlayerState {
  const room = rooms[state.currentRoom];
  if (!room.item || state.inventory.includes(room.item)) {
    return { ...state, lastEvent: "No hay nada nuevo aquí." };
  }

  let newState = {
    ...state,
    inventory: [...state.inventory, room.item],
    entityAwareness: state.entityAwareness + 15,
    lastEvent: `Encontraste ${room.item}, pero el ruido atrajo atención.`,
  };
  return moveEntity(newState);
}

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

export function getRoomDescription(state: PlayerState): string {
  const room = rooms[state.currentRoom];
  let desc = room.baseDescription;

  // Ecos del pasado
  if (state.sanity < 25 && state.lastDirections.length > 0) {
    desc += ` Sientes que ya caminaste hacia el ${state.lastDirections[0]} antes.`;
  }

  desc += getEntityProximityHint(state.entityAwareness);
  return distortText(desc, state.sanity);
}
