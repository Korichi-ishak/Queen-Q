#!/bin/bash

# Script pour basculer vers la configuration SWC si problème CommonJS

echo "🔄 Switching to SWC configuration..."

# Installer @vitejs/plugin-react-swc
npm install @vitejs/plugin-react-swc --save-dev

# Remplacer la configuration
mv vite.config.ts vite.config.babel.ts
mv vite.config.alternative.ts vite.config.ts

echo "✅ Switched to SWC configuration"
echo "📦 Please commit and redeploy to Vercel" 