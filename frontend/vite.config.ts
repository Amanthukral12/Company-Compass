import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import svgr from "vite-plugin-svgr";

import { VitePWA, VitePWAOptions } from "vite-plugin-pwa";

const manifestForPlugin: Partial<VitePWAOptions> = {
  registerType: "autoUpdate",
  manifest: {
    name: "Company Compass",
    short_name: "Company Compass",
    description: "An App to Manage Employee Attendance and Salary",
    theme_color: "#000",
    background_color: "#000",
    display: "standalone",
    scope: "/",
    start_url: ".",
    orientation: "portrait",
    icons: [
      {
        src: "./assets/Attendance.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "./assets/Attendance.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
    ],
  },
};
// https://vite.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/auth": {
        target: "http://localhost:8000",
        changeOrigin: true,
        secure: false,
      },
      "/employee": {
        target: "http://localhost:8000",
        changeOrigin: true,
        secure: false,
      },
      "/attendance": {
        target: "http://localhost:8000",
        changeOrigin: true,
        secure: false,
      },
    },
  },
  base: "./",
  plugins: [react(), VitePWA(manifestForPlugin), tailwindcss(), svgr()],
});
