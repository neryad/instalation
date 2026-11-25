import { describe, expect, it } from "vitest";
import {
  getGameActionsLayout,
  getMenuLayoutForWidth,
} from "./web-layout.js";

describe("responsive web menu layout", () => {
  it("uses the horizontal layout at laptop widths", () => {
    expect(getMenuLayoutForWidth(1024)).toBe("horizontal");
  });

  it("uses the compact layout below the laptop breakpoint", () => {
    expect(getMenuLayoutForWidth(640)).toBe("compact");
  });

  it("uses compact actions on web without changing native controls", () => {
    expect(getGameActionsLayout("web")).toBe("compact");
    expect(getGameActionsLayout("ios")).toBe("directional");
  });
});