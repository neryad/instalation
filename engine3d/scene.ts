import { PlayerState } from "../engine/player";
import { Direction, rooms } from "../engine/rooms";

export type Cell = 0 | 1 | 2; // 0 = suelo, 1 = muro, 2 = puerta
export type Grid = Cell[][];

export const GRID_SIZE = 7;
export const CENTER = (GRID_SIZE - 1) / 2; // 3

export interface DoorCell {
  direction: Direction;
  targetRoomId: string;
  locked: boolean; // requiere llave que el jugador no tiene
  forceable: boolean; // bloqueada y no inforzable
}

export interface RoomScene {
  roomId: string;
  grid: Grid;
  doors: Partial<Record<Direction, DoorCell>>;
}

const DIRS: Direction[] = ["norte", "sur", "este", "oeste"];
const EDGE = GRID_SIZE - 1;

// [col, fila] de la puerta en el centro de cada muro perimetral
const DOOR_COORDS: Record<Direction, [number, number]> = {
  norte: [CENTER, 0],
  sur: [CENTER, EDGE],
  este: [EDGE, CENTER],
  oeste: [0, CENTER],
};

export function effectiveConnections(
  roomId: string,
  sanity: number,
): Partial<Record<Direction, string>> {
  const room = rooms[roomId];
  let conns: Partial<Record<Direction, string>> = { ...room.connections };

  if (room.unstableConnections) {
    for (const u of room.unstableConnections) {
      if (sanity <= u.maxSanity) {
        conns = { ...conns, ...u.connections };
      }
    }
  }

  for (const d of DIRS) {
    const target = conns[d];
    if (!target) continue;
    const targetRoom = rooms[target];
    if (
      targetRoom.maxSanityToExist !== undefined &&
      sanity > targetRoom.maxSanityToExist
    ) {
      delete conns[d];
    }
  }

  return conns;
}

export function buildScene(state: PlayerState): RoomScene {
  const roomId = state.currentRoom;
  const conns = effectiveConnections(roomId, state.sanity);

  const grid: Grid = Array.from({ length: GRID_SIZE }, () =>
    Array(GRID_SIZE).fill(0) as Cell[],
  );

  for (let y = 0; y < GRID_SIZE; y++) {
    for (let x = 0; x < GRID_SIZE; x++) {
      const isEdge = y === 0 || y === GRID_SIZE - 1 || x === 0 || x === GRID_SIZE - 1;
      grid[y][x] = isEdge ? 1 : 0;
    }
  }

  const doors: RoomScene["doors"] = {};
  for (const d of DIRS) {
    const target = conns[d];
    if (!target) continue;
    const [x, y] = DOOR_COORDS[d];
    grid[y][x] = 2;
    const targetRoom = rooms[target];
    const hasKey = !!targetRoom.lockedBy && state.inventory.includes(targetRoom.lockedBy);
    doors[d] = {
      direction: d,
      targetRoomId: target,
      locked: !!targetRoom.lockedBy && !hasKey,
      forceable:
        !!targetRoom.lockedBy && !hasKey && !targetRoom.unbreakable,
    };
  }

  return { roomId, grid, doors };
}