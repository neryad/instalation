import { defineConfig } from "vitest/config";

export default defineConfig({
  resolve: {
    alias: [
      { find: /^react-native$/, replacement: "components/game3d/react-native.stub.ts" },
    ],
  },
  test: {
    environment: "node",
    include: ["engine3d/**/*.test.ts", "components/game3d/**/*.test.ts"],
  },
});