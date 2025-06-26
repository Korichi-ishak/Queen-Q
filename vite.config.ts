import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({
      // Forcer l'utilisation du JSX automatique pour éviter les problèmes de résolution
      jsxRuntime: 'automatic',
      jsxImportSource: 'react',
    })
  ],
  resolve: {
    alias: {
      '@': path.resolve(process.cwd(), 'src'),
      // Forcer la résolution de react/jsx-runtime pour Vercel
      'react/jsx-runtime': 'react/jsx-runtime.js',
      'react/jsx-dev-runtime': 'react/jsx-dev-runtime.js',
    },
  },
  build: {
    // Utiliser esbuild au lieu de terser pour de meilleures performances
    minify: 'esbuild',
    // Assurer la compatibilité avec les navigateurs modernes
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
      // Résoudre les modules externes de façon explicite
      external: (id) => {
        // Ne pas externaliser react/jsx-runtime
        if (id.includes('react/jsx-runtime')) {
          return false;
        }
        return false;
      },
    },
    // Configuration CommonJS pour une meilleure compatibilité
    commonjsOptions: {
      include: [/node_modules/],
      transformMixedEsModules: true,
    },
    // Assurer que les dépendances sont correctement incluses
    ssr: false,
  },
  // Optimisation pour Vercel
  define: {
    // Définir l'environnement pour éviter les problèmes de résolution
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'production'),
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
