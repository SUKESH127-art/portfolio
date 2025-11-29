import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    // Enable tree shaking
    minify: "esbuild",
    // Let Vite handle chunk splitting automatically - it's smarter about dependencies
    // This prevents "createContext" errors from improper load order
    rollupOptions: {
      output: {
        // Only split out the largest library (motion) for better caching
        manualChunks(id) {
          // Motion library is large and can be cached separately
          if (id.includes("node_modules/motion/")) {
            return "motion-vendor";
          }
          // Let Vite automatically handle all other chunking
          // It will properly handle React dependencies
        },
      },
    },
    // Increase chunk size warning limit
    chunkSizeWarningLimit: 1000,
  },
  // Optimize dependencies
  optimizeDeps: {
    include: ["react", "react-dom", "motion"],
    exclude: ["three", "@react-three/fiber", "@react-three/drei"], // Exclude if not used
  },
});
