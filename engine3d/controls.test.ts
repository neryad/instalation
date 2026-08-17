import { describe, expect, it } from "vitest";
import { initialPlayerState } from "../engine/player";
import { buildScene } from "./scene";
import {
  forward,
  opposite,
  Player3D,
  spawnPlayer,
  turn,
  TurnOrder,
} from "./controls";

const scene = buildScene({ ...initialPlayerState, sanity: 100 });

describe("turn", () => {
  it("gira 90° a la derecha e izquierda", () => {
    const p: Player3D = { x: 3.5, y: 3.5, dir: "norte" };
    expect(turn(p, false).dir).toBe("este");
    expect(turn(p, true).dir).toBe("oeste");
  });

  it("el orden de giro es cíclico", () => {
    const idx = TurnOrder.indexOf("oeste");
    expect(TurnOrder[(idx + 1) % 4]).toBe("norte");
  });
});

describe("opposite", () => {
  it("devuelve la dirección contraria", () => {
    expect(opposite("norte")).toBe("sur");
    expect(opposite("oeste")).toBe("este");
  });
});

describe("spawnPlayer", () => {
  it("spawn inicial en el centro mirando al norte", () => {
    const p = spawnPlayer("awakening", null);
    expect(p.x).toBeCloseTo(3.5);
    expect(p.y).toBeCloseTo(3.5);
    expect(p.dir).toBe("norte");
  });

  it("entrar por el norte coloca justo bajo la puerta sur mirando al sur", () => {
    const p = spawnPlayer("hallway_a", "norte");
    expect(p.y).toBeCloseTo(1.5);
    expect(p.dir).toBe("sur");
  });
});

describe("forward", () => {
  it("avanza si la casilla delante es suelo", () => {
    const p: Player3D = { x: 3.5, y: 3.5, dir: "norte" };
    const res = forward(p, scene);
    expect(res.kind).toBe("move");
    if (res.kind === "move") {
      expect(res.player.y).toBeCloseTo(2.5);
    }
  });

  it("detecta puerta frontal", () => {
    const p: Player3D = { x: 3.5, y: 1.5, dir: "norte" };
    const res = forward(p, scene);
    expect(res.kind).toBe("door");
    if (res.kind === "door") expect(res.dir).toBe("norte");
  });

  it("bloquea contra muro", () => {
    const p: Player3D = { x: 3.5, y: 0.5, dir: "oeste" };
    const res = forward(p, scene);
    expect(res.kind).toBe("blocked");
  });

  it("bloquea fuera de los límites", () => {
    const p: Player3D = { x: 0.5, y: 0.5, dir: "oeste" };
    expect(forward(p, scene).kind).toBe("blocked");
  });
});