import { describe, expect, it } from "vitest";

describe("smoke", () => {
  it("el entorno de test funciona", () => {
    expect(1 + 1).toBe(2);
  });
});