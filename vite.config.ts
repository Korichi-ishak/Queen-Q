import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(process.cwd(), 'src'),
    },
  },
  build: {
    // Ignorer les avertissements TypeScript pendant la construction
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
      },
    },
    rollupOptions: {
      // Ignorer les erreurs de résolution de modules
      onwarn(warning, warn) {
        if (warning.code === 'MODULE_LEVEL_DIRECTIVE' || 
            warning.code === 'MISSING_EXPORT' || 
            warning.code === 'CIRCULAR_DEPENDENCY') {
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
    // Assurer la compatibilité avec les navigateurs modernes
    target: 'es2015',
    // Ignorer les erreurs TypeScript pendant le build
    commonjsOptions: {
      transformMixedEsModules: true,
    },
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
