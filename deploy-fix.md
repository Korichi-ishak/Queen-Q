# Corrections pour le déploiement sur Vercel

Ce document explique les modifications apportées pour résoudre les problèmes de déploiement sur Vercel.

## Problème principal

L'erreur principale était un conflit de dépendances entre React 19 et Framer Motion qui nécessite React 18.

```
npm error While resolving: framer-motion@10.18.0
npm error Found: react@19.1.0
...
npm error Could not resolve dependency:
npm error peerOptional react@"^18.0.0" from framer-motion@10.18.0
```

## Solutions appliquées

### 1. Modification du package.json

- Rétrogradation de React 19 à React 18 pour compatibilité avec Framer Motion
- Ajout du flag `--legacy-peer-deps` dans la commande `vercel-build`
- Ajout d'une section `resolutions` pour forcer l'utilisation de React 18

```json
{
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    // autres dépendances...
  },
  "devDependencies": {
    "@types/react": "^18.2.66",
    "@types/react-dom": "^18.2.22",
    // autres dépendances...
  },
  "resolutions": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  }
}
```

### 2. Création d'un fichier .npmrc

Ajout d'un fichier `.npmrc` pour configurer npm et résoudre les problèmes de dépendances :

```
legacy-peer-deps=true
engine-strict=false
strict-peer-dependencies=false
auto-install-peers=true
```

### 3. Optimisation du fichier vercel.json

Création d'un fichier `vercel.json` optimisé pour le déploiement :

```json
{
  "framework": "vite",
  "buildCommand": "npm run vercel-build",
  "installCommand": "npm install --legacy-peer-deps",
  "outputDirectory": "dist",
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ],
  "headers": [
    {
      "source": "/assets/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    }
  ],
  "github": {
    "silent": true
  }
}
```

### 4. Amélioration de la configuration Vite

Modification du fichier `vite.config.ts` pour optimiser le build et résoudre les problèmes de dépendances :

```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  build: {
    minify: 'terser',
    // Autres optimisations...
    rollupOptions: {
      onwarn(warning, warn) {
        // Ignorer certaines erreurs...
      },
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          animations: ['framer-motion', 'gsap'],
        },
      },
    },
  },
  // Autres configurations...
})
```

### 5. Modification de la configuration TypeScript

Ajustement du fichier `tsconfig.app.json` pour éviter les erreurs lors du build :

- `"noEmit": false` pour permettre la génération de fichiers JS
- `"noUnusedLocals": false` et `"noUnusedParameters": false` pour éviter les erreurs sur les variables non utilisées
- Ajout de paramètres pour améliorer la compatibilité

## Comment déployer

1. Assurez-vous que toutes les modifications ci-dessus sont appliquées
2. Exécutez `npm install --legacy-peer-deps` pour installer les dépendances
3. Testez localement avec `npm run build:prod` pour vérifier que tout fonctionne
4. Déployez sur Vercel avec `vercel --prod` ou via l'intégration GitHub

## Remarques supplémentaires

- Si vous souhaitez revenir à React 19 à l'avenir, vous devrez mettre à jour Framer Motion vers une version compatible
- Ces modifications sont spécifiques à ce projet et peuvent nécessiter des ajustements pour d'autres projets 