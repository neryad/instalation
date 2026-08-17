import { describe, expect, it } from "vitest";
import { initialPlayerState } from "../engine/player";
import { buildScene } from "./scene";
import { castRays, facingAngle, MAX_DIST } from "./raycaster";

const scene = buildScene({ ...initialPlayerState, sanity: 100 });
const grid = scene.grid;

describe("facingAngle", () => {
  it("mapea direcciones a ángulos consistentes", () => {
    expect(facingAngle("este")).toBeCloseTo(0);
    expect(facingAngle("norte")).toBeCloseTo(-Math.PI / 2);
    expect(facingAngle("sur")).toBeCloseTo(Math.PI / 2);
    expect(facingAngle("oeste")).toBeCloseTo(Math.PI);
  });

  it("facingVector de norte apunta al fila negativa", () => {
    // jugador en (3.5, 3.5) mirando al norte: la cara sur del muro norte
    // (fila 0, ocupa y∈[0,1]) está en y=1 -> perpDist = 3.5 - 1 = 2.5
    const cols = castRays(grid, 3.5, 3.5, facingAngle("norte"), {
      numColumns: 120,
      fovDeg: 66,
    });
    const center = cols[Math.floor(cols.length / 2)];
    expect(center.perpDist).toBeCloseTo(2.5, 1);
    expect(center.type).toBe(2); // la columna central impacta la puerta norte (3,0)
  });

  it("la puerta norte de awakening es sólida (no atraviesa)", () => {
    // awakening norte -> hallway_a, hay puerta en (3,0); se ve como muro
    const cols = castRays(grid, 3.5, 2.5, facingAngle("norte"), {
      numColumns: 120,
      fovDeg: 66,
    });
    const center = cols[Math.floor(cols.length / 2)];
    expect(center.type).toBe(2);
    expect(center.perpDist).toBeLessThanOrEqual(2.6);
  });

  it("fuera de la rejilla devuelve distancia máxima", () => {
    const cols = castRays(grid, 100, 100, 0, { numColumns: 10, fovDeg: 66 });
    expect(cols.every((c) => c.perpDist === MAX_DIST || c.type !== 0)).toBe(true);
  });
});