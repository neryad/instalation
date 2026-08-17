import { Direction } from "../engine/rooms";
import { RayColumn } from "./raycaster";

export interface DoorRun {
  start: number; // índice de columna inicial
  end: number; // índice de columna final (inclusivo)
  doorDir: Direction | undefined;
}

// Agrupa columnas consecutivas que impactan la misma puerta, para poder
// dibujar la imagen de la puerta como un solo sprite en lugar de por columna.
export function groupDoorRuns(columns: RayColumn[]): DoorRun[] {
  const runs: DoorRun[] = [];
  let i = 0;
  while (i < columns.length) {
    if (columns[i].type !== 2) {
      i++;
      continue;
    }
    const start = i;
    const doorDir = columns[i].doorDir;
    while (
      i < columns.length &&
      columns[i].type === 2 &&
      columns[i].doorDir === doorDir
    ) {
      i++;
    }
    runs.push({ start, end: i - 1, doorDir });
  }
  return runs;
}