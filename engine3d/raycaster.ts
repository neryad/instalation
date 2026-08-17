import { Cell, Grid } from "./scene";

export interface RayColumn {
  perpDist: number;
  side: "N" | "S" | "E" | "W";
  type: Cell;
}

export interface RaycasterOptions {
  fovDeg?: number;
  numColumns?: number;
}

export const MAX_DIST = 100;

export function facingAngle(dir: "norte" | "sur" | "este" | "oeste"): number {
  switch (dir) {
    case "este":
      return 0;
    case "sur":
      return Math.PI / 2;
    case "oeste":
      return Math.PI;
    case "norte":
    default:
      return -Math.PI / 2;
  }
}

export function castRays(
  grid: Grid,
  px: number,
  py: number,
  angle: number,
  opts: RaycasterOptions = {},
): RayColumn[] {
  const numColumns = opts.numColumns ?? 120;
  const fov = ((opts.fovDeg ?? 66) * Math.PI) / 180;
  const halfTan = Math.tan(fov / 2);

  const dirX = Math.cos(angle);
  const dirY = Math.sin(angle);
  const planeX = -Math.sin(angle) * halfTan;
  const planeY = Math.cos(angle) * halfTan;

  const columns: RayColumn[] = [];

  for (let i = 0; i < numColumns; i++) {
    const cameraX = (2 * i) / numColumns - 1;
    const rayDirX = dirX + planeX * cameraX;
    const rayDirY = dirY + planeY * cameraX;

    let mapX = Math.floor(px);
    let mapY = Math.floor(py);
    const deltaX = rayDirX === 0 ? Infinity : Math.abs(1 / rayDirX);
    const deltaY = rayDirY === 0 ? Infinity : Math.abs(1 / rayDirY);

    let stepX: number;
    let sideDistX: number;
    if (rayDirX < 0) {
      stepX = -1;
      sideDistX = (px - mapX) * deltaX;
    } else {
      stepX = 1;
      sideDistX = (mapX + 1 - px) * deltaX;
    }

    let stepY: number;
    let sideDistY: number;
    if (rayDirY < 0) {
      stepY = -1;
      sideDistY = (py - mapY) * deltaY;
    } else {
      stepY = 1;
      sideDistY = (mapY + 1 - py) * deltaY;
    }

    let side: "N" | "S" | "E" | "W" = "N";
    let type: Cell = 1;
    let dist = MAX_DIST;
    const maxSteps = 64; // rejilla 7x7: cota superior holgada

    for (let step = 0; step < maxSteps; step++) {
      let steppingX: boolean;
      if (sideDistX < sideDistY) {
        sideDistX += deltaX;
        mapX += stepX;
        steppingX = true;
      } else {
        sideDistY += deltaY;
        mapY += stepY;
        steppingX = false;
      }

      if (mapY < 0 || mapY >= grid.length || mapX < 0 || mapX >= grid[0].length) {
        dist = MAX_DIST;
        side = steppingX ? (rayDirX > 0 ? "W" : "E") : rayDirY > 0 ? "N" : "S";
        break;
      }

      const cell = grid[mapY][mapX];
      if (cell !== 0) {
        dist = steppingX ? sideDistX - deltaX : sideDistY - deltaY;
        type = cell;
        // cara visible desde el jugador (la que mira hacia él),
        // consistente con la branch de fuera de rejilla
        side = steppingX ? (rayDirX > 0 ? "W" : "E") : rayDirY > 0 ? "N" : "S";
        break;
      }
    }

    columns.push({ perpDist: dist, side, type });
  }

  return columns;
}