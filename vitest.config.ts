import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "node",
    include: ["engine3d/**/*.test.ts"],
  },
});