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
          // React and React DOM - must be first and together
          if (id.includes("node_modules/react/") || id.includes("node_modules/react-dom/")) {
            return "react-vendor";
          }
          // All React-dependent libraries - bundle with React to ensure proper load order
          // This prevents "Cannot read properties of undefined" errors
          if (
            id.includes("node_modules/react-icons/") ||
            id.includes("node_modules/react-responsive/") ||
            id.includes("node_modules/prop-types/") ||
            id.includes("node_modules/@vercel/") ||
            id.includes("node_modules/@use-gesture/") ||
            id.includes("node_modules/@gsap/react/") ||
            id.includes("node_modules/@react-three/")
          ) {
            return "react-vendor";
          }
          // Motion library (Framer Motion) - depends on React but large enough to separate
          // Motion has its own React dependency handling
          if (id.includes("node_modules/motion/")) {
            return "motion-vendor";
          }
          // Three.js core (only if actually used, separate from React Three)
          if (id.includes("node_modules/three/")) {
            return "three-vendor";
          }
          // GSAP core (only if actually used, separate from React GSAP)
          if (id.includes("node_modules/gsap/") && !id.includes("@gsap/react")) {
            return "gsap-vendor";
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
