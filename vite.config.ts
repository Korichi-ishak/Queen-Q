import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({
      // Configuration JSX pour éviter les problèmes de résolution
      jsxRuntime: 'automatic',
    })
  ],
  resolve: {
    alias: {
      '@': path.resolve(process.cwd(), 'src'),
    },
  },
  build: {
    // Utiliser esbuild pour de meilleures performances
    minify: 'esbuild',
    // Cibler ES2020 pour une meilleure compatibilité
    target: 'es2020',
    rollupOptions: {
      // Gérer les avertissements spécifiques
      onwarn(warning, warn) {
        // Ignorer les avertissements spécifiques qui ne sont pas critiques
        if (
          warning.code === 'MODULE_LEVEL_DIRECTIVE' || 
          warning.code === 'MISSING_EXPORT' || 
          warning.code === 'CIRCULAR_DEPENDENCY' ||
          warning.code === 'UNRESOLVED_IMPORT'
        ) {
          return;
        }
        warn(warning);
      },
      // Optimiser les chunks
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          animations: ['framer-motion', 'gsap'],
        },
      },
    },
    // Configuration CommonJS pour une meilleure compatibilité
    commonjsOptions: {
      include: [/node_modules/],
      transformMixedEsModules: true,
    },
  },
  // Optimisation pour Vercel
  define: {
    // Définir l'environnement pour éviter les problèmes de résolution
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'production'),
  },
  // Configuration pour éviter les problèmes de dépendances
  optimizeDeps: {
    include: ['react', 'react-dom', 'react/jsx-runtime'],
    force: true,
  },
  // Optimiser le serveur de développement
  server: {
    port: 5173,
    strictPort: false,
    open: true,
  },
  // Optimiser la prévisualisation
  preview: {
    port: 4173,
    strictPort: false,
  },
})
