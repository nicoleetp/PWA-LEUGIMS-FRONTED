import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "src": path.resolve(__dirname, "src"),
      "assets": path.resolve(__dirname, "src/assets"),
      "components": path.resolve(__dirname, "src/components"),
      "context": path.resolve(__dirname, "src/context"),
      "hooks": path.resolve(__dirname, "src/hooks"),
      "api": path.resolve(__dirname, "src/api"),
      "helpers": path.resolve(__dirname, "src/helpers"),
      "layouts": path.resolve(__dirname, "src/layouts"),
      "pages": path.resolve(__dirname, "src/pages"),
      "views": path.resolve(__dirname, "src/views"),
      "routes": path.resolve(__dirname, "src/routes"),
      "styles": path.resolve(__dirname, "src/styles"),
    },
  },
});