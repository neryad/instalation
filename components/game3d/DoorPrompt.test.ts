import { describe, expect, it } from "vitest";
import { classifyDoors, DoorPromptOption } from "./DoorPrompt";

describe("classifyDoors", () => {
  it("separa puertas abiertas, bloqueadas y forzables", () => {
    const doors: DoorPromptOption[] = [
      { key: "norte", direction: "norte", targetRoomId: "core", locked: true, forceable: false },
      { key: "este", direction: "este", targetRoomId: "data_morgue", locked: false, forceable: false },
      { key: "sur", direction: "sur", targetRoomId: "armory", locked: true, forceable: true },
    ];
    const res = classifyDoors(doors);
    expect(res.open.map((d) => d.key)).toEqual(["este"]);
    expect(res.locked.map((d) => d.key).sort()).toEqual(["norte", "sur"].sort());
    expect(res.forceable.map((d) => d.key)).toEqual(["sur"]);
  });
});