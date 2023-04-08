import { defineConfig } from "vite";
import solidPlugin from "vite-plugin-solid";
import path from "path";

export default defineConfig({
  plugins: [solidPlugin()],
  resolve: {
    alias: {
      "@ponder/client": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    port: 3001,
    host: true
  },
  build: {
    target: "esnext",
  },
});
