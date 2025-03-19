import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      // Activez Fast Refresh
      fastRefresh: true,
    }),
  ],
  // Pour améliorer le temps de démarrage en développement
  server: {
    hmr: true, // Hot Module Replacement
    watch: {
      usePolling: false,
    },
  },
  resolve: {
    dedupe: ["react", "react-dom", "framer-motion"],
  },
  optimizeDeps: {
    // Inclure les dépendances problématiques pour la pré-bundling
    include: ["framer-motion", "react-icons"],
  },
  // Améliorer le build pour la production
  build: {
    target: "es2015", // Cible de compatibilité pour les navigateurs
    cssCodeSplit: true, // Diviser le CSS pour chaque chunk
    sourcemap: false, // Désactiver les sourcemaps en production
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["react", "react-dom"],
          "framer-motion": ["framer-motion"],
          "react-icons": ["react-icons"],
        },
      },
    },
  },
});
