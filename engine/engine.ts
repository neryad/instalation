import { moveEntity } from "./entity";
import { rollMentalEvent } from "./events";
import { PlayerState } from "./player";
import { Direction, rooms } from "./rooms";
import { distortText } from "./sanity";

export function move(state: PlayerState, dir: Direction): PlayerState {
  const room = rooms[state.currentRoom];
  let connections = { ...room.connections };

  // 1. Distorsiones por cordura en conexiones
  if (room.unstableConnections) {
    for (const variant of room.unstableConnections) {
      if (state.sanity <= variant.maxSanity) {
        connections = { ...connections, ...variant.connections };
      }
    }
  }

  // 2. Validación de Sala Ilusoria (Solo al entrar)
  const next = connections[dir];
  if (next) {
    const nextRoom = rooms[next];
    if (nextRoom.minSanityToExist && state.sanity > nextRoom.minSanityToExist) {
      return {
        ...state,
        lastEvent:
          "Intentas avanzar, pero el camino parece desvanecerse ante tus ojos. No hay nada allí.",
      };
    }
  }

  // 3. Bloqueos por la Entidad
  const blockedByEntity: Direction[] = [];
  if (state.entityRoom && state.sanity < 35) {
    if (state.entityRoom === state.currentRoom) {
      const dirs = Object.keys(connections) as Direction[];
      if (dirs.length > 0) {
        const random = dirs[Math.floor(Math.random() * dirs.length)];
        blockedByEntity.push(random);
      }
    }
  }

  if (blockedByEntity.includes(dir)) {
    return { ...state, lastEvent: "Una presencia oscura bloquea esa salida." };
  }

  if (!next) return { ...state, lastEvent: "No hay nada en esa dirección." };

  // 4. Actualización de Estado Base
  let newState = {
    ...state,
    currentRoom: next,
    lastDirections: [...state.lastDirections, dir].slice(-5),
  };

  // 5. Feedback de Predicción (Regla Clara)
  if (newState.lastDirections.length >= 3) {
    const history = newState.lastDirections;
    if (history[history.length - 1] === history[history.length - 3]) {
      newState.lastEvent =
        "La IA ha detectado un patrón en tus pasos. Eres predecible.";
    }
  }

  // 6. Procesar Ítems y Eventos
  const nextRoomData = rooms[next];
  if (nextRoomData.item && !newState.inventory.includes(nextRoomData.item)) {
    newState.inventory.push(nextRoomData.item);
    newState.lastEvent = `Has encontrado: ${nextRoomData.item}`;
  }

  const event = rollMentalEvent(newState);
  if (event) {
    newState.sanity = Math.max(
      0,
      Math.min(100, newState.sanity + event.sanityChange),
    );
    newState.lastEvent = event.text(newState);
  }

  // 7. Movimiento de la Entidad
  newState = moveEntity(newState);

  // 8. Finales Refactorizados
  if (newState.currentRoom === "core") {
    if (newState.sanity <= 20) {
      const lastAction =
        newState.lastDirections[newState.lastDirections.length - 1];
      return {
        ...newState,
        gameOver: true,
        endingType: "bad",
        lastEvent: `La IA procesa tu intento de ${lastAction}. 'Gracias por la actualización, ${newState.inventory.length > 0 ? newState.inventory[0] : "Sujeto 00"}'.`,
      };
    }
    if (newState.sanity > 20 && newState.entityAwareness < 50) {
      return {
        ...newState,
        gameOver: true,
        endingType: "good",
        lastEvent:
          "El Núcleo se apaga. Caminas hacia la luz. Eres libre, o al menos, has elegido creerlo.",
      };
    }
  }

  return newState;
}

export function getRoomDescription(state: PlayerState): string {
  const room = rooms[state.currentRoom];
  let description = room.baseDescription;

  // Variantes de cordura
  if (room.sanityVariants) {
    for (const variant of room.sanityVariants) {
      if (state.sanity <= variant.minSanity) description = variant.description;
    }
  }

  // Feedback de proximidad de la IA
  if (state.entityAwareness > 70) {
    description += " El aire vibra con estática. Está casi sobre ti.";
  } else if (state.entityAwareness > 40) {
    description += " Sientes que los sensores te siguen con retraso.";
  }

  return distortText(description, state.sanity);
}
