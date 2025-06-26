import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
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
    },
  },
})
