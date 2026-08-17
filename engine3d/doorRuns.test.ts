import { describe, expect, it } from "vitest";
import { initialPlayerState } from "../engine/player";
import { castRays, facingAngle } from "./raycaster";
import { buildScene } from "./scene";
import { groupDoorRuns } from "./doorRuns";

const grid = buildScene({ ...initialPlayerState, sanity: 100 }).grid;

describe("groupDoorRuns", () => {
  it("agrupa las columnas contiguas de la puerta norte en un solo run", () => {
    const cols = castRays(grid, 3.5, 3.5, facingAngle("norte"), {
      numColumns: 120,
      fovDeg: 66,
    });
    const runs = groupDoorRuns(cols);
    expect(runs).toHaveLength(1);
    const [run] = runs;
    expect(run.doorDir).toBe("norte");
    expect(run.start).toBeLessThan(60);
    expect(run.end).toBeGreaterThan(60);
    for (let i = run.start; i <= run.end; i++) {
      expect(cols[i].type).toBe(2);
    }
  });

  it("no genera runs para una pared sin puerta", () => {
    const cols = castRays(grid, 3.5, 3.5, facingAngle("este"), {
      numColumns: 120,
      fovDeg: 66,
    });
    expect(groupDoorRuns(cols)).toHaveLength(0);
  });
});