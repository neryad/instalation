import { describe, expect, it } from "vitest";
import { initialPlayerState } from "../engine/player";
import { entitySpriteParams, projectSprite } from "./sprite";

const height = 300;
const cols = 120;

describe("entitySpriteParams", () => {
  it("sprite visible cuando la IA está en la misma sala", () => {
    const p = entitySpriteParams({
      ...initialPlayerState,
      entityRoom: "awakening",
    });
    expect(p.visible).toBe(true);
    expect(p.distance).toBeLessThan(3);
  });

  it("sprite visible a distancia cuando awareness > 70", () => {
    const p = entitySpriteParams({
      ...initialPlayerState,
      entityAwareness: 80,
    });
    expect(p.visible).toBe(true);
    expect(p.distance).toBeGreaterThan(3);
  });

  it("invisible con awareness baja", () => {
    const p = entitySpriteParams({
      ...initialPlayerState,
      entityAwareness: 10,
    });
    expect(p.visible).toBe(false);
  });

  it("invisible en game over", () => {
    const p = entitySpriteParams({
      ...initialPlayerState,
      gameOver: true,
      endingType: "good",
    });
    expect(p.visible).toBe(false);
  });
});

describe("projectSprite", () => {
  it("proyecta más grande cuanto más cerca", () => {
    const near = projectSprite(
      entitySpriteParams({ ...initialPlayerState, entityRoom: "awakening" }),
      cols,
      height,
    );
    const far = projectSprite(
      entitySpriteParams({ ...initialPlayerState, entityAwareness: 80 }),
      cols,
      height,
    );
    if (!near.visible || !far.visible) throw new Error("deberían ser visibles");
    const nearH = near.y2 - near.y1;
    const farH = far.y2 - far.y1;
    expect(nearH).toBeGreaterThan(farH);
  });

  it("está centrado horizontalmente", () => {
    const s = projectSprite(
      entitySpriteParams({ ...initialPlayerState, entityRoom: "awakening" }),
      cols,
      height,
    );
    expect(s.xCenter).toBe(cols / 2);
  });

  it("la altura en px coincide con la escala de un muro", () => {
    const s = projectSprite(
      { visible: true, distance: 4 },
      cols,
      height,
      66,
    );
    const wallFactor = height / 2 / Math.tan(((66 / 2) * Math.PI) / 180);
    const expectedH = (1.7 / 4) * wallFactor;
    expect(s.y2 - s.y1).toBeCloseTo(expectedH, 5);
    expect(s.visible).toBe(true);
  });

  it("invisible devuelve rectángulo nulo", () => {
    const s = projectSprite({ visible: false, distance: 0 }, cols, height);
    expect(s.visible).toBe(false);
    expect(s.y1).toBe(0);
    expect(s.y2).toBe(0);
    expect(s.halfWidth).toBe(0);
    expect(s.xCenter).toBe(0);
  });
});