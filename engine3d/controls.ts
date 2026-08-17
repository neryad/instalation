import { Direction } from "../engine/rooms";
import { CENTER, GRID_SIZE, RoomScene } from "./scene";

export interface Player3D {
  x: number; // columna en unidades de casilla (float)
  y: number; // fila en unidades de casilla (float)
  dir: Direction;
}

export type ForwardResult =
  | { kind: "move"; player: Player3D }
  | { kind: "door"; dir: Direction }
  | { kind: "blocked" };

export const TurnOrder: Direction[] = ["norte", "este", "sur", "oeste"];

const FACING: Record<Direction, { dx: number; dy: number }> = {
  norte: { dx: 0, dy: -1 },
  sur: { dx: 0, dy: 1 },
  este: { dx: 1, dy: 0 },
  oeste: { dx: -1, dy: 0 },
};

export function opposite(dir: Direction): Direction {
  const map: Record<Direction, Direction> = {
    norte: "sur",
    sur: "norte",
    este: "oeste",
    oeste: "este",
  };
  return map[dir];
}

export function turn(player: Player3D, left: boolean): Player3D {
  const idx = TurnOrder.indexOf(player.dir);
  const next = left ? (idx + 3) % 4 : (idx + 1) % 4;
  return { ...player, dir: TurnOrder[next] };
}

export function spawnPlayer(
  roomId: string,
  entryDir: Direction | null,
): Player3D {
  const cx = CENTER + 0.5;
  const cy = CENTER + 0.5;
  if (!entryDir) {
    return { x: cx, y: cy, dir: "norte" };
  }
  switch (entryDir) {
    case "norte":
      return { x: cx, y: 1.5, dir: "sur" };
    case "sur":
      return { x: cx, y: GRID_SIZE - 1.5, dir: "norte" };
    case "este":
      return { x: GRID_SIZE - 1.5, y: cy, dir: "oeste" };
    case "oeste":
    default:
      return { x: 1.5, y: cy, dir: "este" };
  }
}

export function forward(
  player: Player3D,
  scene: RoomScene,
): ForwardResult {
  const v = FACING[player.dir];
  const tx = player.x + v.dx;
  const ty = player.y + v.dy;
  const mx = Math.floor(tx);
  const my = Math.floor(ty);

  if (
    my < 0 ||
    my >= scene.grid.length ||
    mx < 0 ||
    mx >= scene.grid[0].length
  ) {
    return { kind: "blocked" };
  }

  const cell = scene.grid[my][mx];
  if (cell === 1) return { kind: "blocked" };
  if (cell === 2) return { kind: "door", dir: player.dir };

  return { kind: "move", player: { ...player, x: tx, y: ty } };
}