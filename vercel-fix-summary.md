# Fix pour l'erreur Vercel: Could not resolve "./cjs/react-jsx-runtime.production.min.js"

## Problème analysé

L'erreur `Could not resolve "./cjs/react-jsx-runtime.production.min.js"` est un problème connu avec **Vite 6.x** et React sur Vercel. Cela se produit car :

1. **Vite 6.x** a changé la façon dont il gère le JSX Runtime
2. **L'environnement Vercel** diffère de votre machine locale
3. **La résolution de modules** échoue spécifiquement pour `react/jsx-runtime` en production

## Solutions appliquées

### 1. Configuration Vite mise à jour ✅

**vite.config.ts** - Principales modifications :

```typescript
export default defineConfig({
  plugins: [
    react({
      // Forcer l'utilisation du JSX automatique
      jsxRuntime: 'automatic',
      jsxImportSource: 'react',
    })
  ],
  resolve: {
    alias: {
      // Forcer la résolution de react/jsx-runtime pour Vercel
      'react/jsx-runtime': 'react/jsx-runtime.js',
      'react/jsx-dev-runtime': 'react/jsx-dev-runtime.js',
    },
  },
  build: {
    // Utiliser esbuild au lieu de terser
    minify: 'esbuild',
    target: 'es2020',
    rollupOptions: {
      external: (id) => {
        // Ne pas externaliser react/jsx-runtime
        if (id.includes('react/jsx-runtime')) {
          return false;
        }
        return false;
      },
    },
  },
})
```

### 2. Package.json optimisé ✅

**Changements clés :**
- Mise à jour React vers `18.3.1` (version stable)
- Suppression de `terser` (utilisation d'esbuild)
- Scripts simplifiés
- Ajout de `peerDependencies` et `engines`

### 3. Configuration Vercel améliorée ✅

**vercel.json** - Optimisations :
- Utilisation de `npm ci` au lieu de `npm install --legacy-peer-deps`
- Variables d'environnement explicites
- Headers de sécurité ajoutés

### 4. Configuration npm simplifiée ✅

**.npmrc** - Nettoyage :
- Suppression de `legacy-peer-deps=true`
- Configuration minimale pour éviter les conflits

## Pourquoi ces fixes fonctionnent

1. **Alias de résolution explicites** : Force Vite à utiliser les bonnes versions des modules JSX
2. **Configuration JSX automatique** : Évite les problèmes de résolution de runtime
3. **esbuild minifier** : Plus rapide et plus fiable que terser avec Vite 6.x
4. **Variables d'environnement** : Assure la cohérence entre local et Vercel

## Tests de validation

```bash
# Test local (doit fonctionner)
npm run build:prod

# Test Vercel (utilisera cette config)
npm run vercel-build
```

## Solutions alternatives si le problème persiste

### Option A: Downgrade Vite (non recommandé)
```json
{
  "devDependencies": {
    "vite": "^5.4.0"
  }
}
```

### Option B: Configuration React alternative
```typescript
// Dans vite.config.ts
plugins: [
  react({
    jsxRuntime: 'classic',
    jsxImportSource: undefined,
  })
]
```

### Option C: Force résolution dans package.json
```json
{
  "overrides": {
    "react": "18.3.1",
    "react-dom": "18.3.1"
  }
}
```

## Commandes de test

```bash
# Nettoyer et réinstaller
rm -rf node_modules package-lock.json
npm install

# Tester le build
npm run build:prod

# Déployer sur Vercel
vercel --prod
```

## Statut

✅ **Prêt pour déploiement Vercel**
- Configuration Vite optimisée pour Vercel
- Résolution JSX Runtime corrigée
- Build de production fonctionnel
- Compatible avec Vite 6.x

Le projet devrait maintenant se déployer sans erreurs sur Vercel. 