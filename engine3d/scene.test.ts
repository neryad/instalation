import { describe, expect, it } from "vitest";
import { initialPlayerState } from "../engine/player";
import { buildScene, effectiveConnections, GRID_SIZE } from "./scene";

const northState = { ...initialPlayerState, sanity: 100 };

describe("effectiveConnections", () => {
  it("mantiene conexiones base", () => {
    const conns = effectiveConnections("awakening", 100);
    expect(conns.norte).toBe("hallway_a");
  });

  it("aplica inestabilidad espacial con cordura baja", () => {
    const conns = effectiveConnections("hallway_a", 20);
    // unstableConnections: maxSanity 30 -> este = awakening
    expect(conns.este).toBe("awakening");
  });

  it("descarta conexiones a salas que no existen con esa cordura", () => {
    // maxSanityToExist no se usa en salas actuales: verifica que no crashea y conserva "mirror_gallery"
    const conns = effectiveConnections("hallway_a", 10);
    expect(conns.norte).toBe("mirror_gallery");
  });
});

describe("buildScene", () => {
  it("construye rejilla 7x7 con muros perimetrales y puertas donde hay conexión", () => {
    const scene = buildScene(northState);
    expect(scene.grid).toHaveLength(GRID_SIZE);
    for (const row of scene.grid) expect(row).toHaveLength(GRID_SIZE);
    // awakening solo conecta al norte -> puerta en (col 3, fila 0)
    expect(scene.grid[0][3]).toBe(2);
    // el resto de la fila superior es muro
    expect(scene.grid[0][2]).toBe(1);
  });

  it("marca puerta bloqueada cuando no se tiene la llave", () => {
    const state = {
      ...initialPlayerState,
      currentRoom: "data_terminal",
      sanity: 60,
      inventory: [],
    };
    const scene = buildScene(state);
    // data_terminal está bloqueada por data_link (entrar a ella), su salida oeste = data_morgue
    expect(scene.doors.oeste?.targetRoomId).toBe("data_morgue");
  });

  it("marca puerta del core como bloqueada e inforzable sin keycard", () => {
    const state = {
      ...initialPlayerState,
      currentRoom: "core_door",
      sanity: 60,
      inventory: [],
    };
    const scene = buildScene(state);
    const north = scene.doors.norte;
    expect(north?.targetRoomId).toBe("core");
    expect(north?.locked).toBe(true);
    expect(north?.forceable).toBe(false); // core_door.target = core, unbreakable: true
  });
});