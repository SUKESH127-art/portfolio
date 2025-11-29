import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    // Enable tree shaking
    minify: "esbuild",
    // Manual chunk splitting for better code splitting
    rollupOptions: {
      output: {
        manualChunks(id) {
          // React and React DOM
          if (id.includes("node_modules/react/") || id.includes("node_modules/react-dom/")) {
            return "react-vendor";
          }
          // Motion library (Framer Motion)
          if (id.includes("node_modules/motion/")) {
            return "motion-vendor";
          }
          // Three.js libraries (only if actually used)
          if (
            id.includes("node_modules/three/") ||
            id.includes("node_modules/@react-three/")
          ) {
            return "three-vendor";
          }
          // GSAP (only if actually used)
          if (id.includes("node_modules/gsap/") || id.includes("node_modules/@gsap/")) {
            return "gsap-vendor";
          }
          // UI libraries
          if (
            id.includes("node_modules/react-icons/") ||
            id.includes("node_modules/react-responsive/")
          ) {
            return "ui-vendor";
          }
          // Other node_modules go into vendor chunk
          if (id.includes("node_modules/")) {
            return "vendor";
          }
        },
      },
    },
    // Increase chunk size warning limit (since we're splitting properly)
    chunkSizeWarningLimit: 1000,
  },
  // Optimize dependencies
  optimizeDeps: {
    include: ["react", "react-dom", "motion"],
    exclude: ["three", "@react-three/fiber", "@react-three/drei"], // Exclude if not used
  },
});
