import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5000,
    open: true,
  },
  optimizeDeps: {
    // Skip pre-bundling Three.js — let it be imported directly as ESM
    exclude: ['three'],
  },
  build: {
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-react':  ['react', 'react-dom', 'react-router-dom'],
          'vendor-three':  ['three'],
          'vendor-gsap':   ['gsap'],
          'vendor-styled': ['styled-components'],
        },
      },
    },
  },
});
