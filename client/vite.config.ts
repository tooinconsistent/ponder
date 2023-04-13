import { defineConfig } from "vite";
import solidPlugin from "vite-plugin-solid";
import path from "path";

export default defineConfig({
  // TODO: remove this any when vite-plugin-solid is updated
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  plugins: [solidPlugin() as any],
  resolve: {
    alias: {
      "@ponder/client": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    port: 3001,
  },
  build: {
    target: "esnext",
  },
});
