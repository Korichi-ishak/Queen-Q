# 🚀 Fix Vercel Build: React JSX Runtime CommonJS Issue

## ❌ Problème Identifié

**Erreur Vercel:** `Could not resolve "./cjs/react-jsx-runtime.production.min.js"`

Cette erreur est causée par :
- **Vite 6.x** + **React 18.x** sur Vercel
- Conflit entre modules **CommonJS** et **ESM**
- Plugin `@vitejs/plugin-react` qui peut utiliser Babel avec des dépendances CJS

## ✅ Solutions Appliquées

### 1. **Configuration Vite Optimisée** (`vite.config.ts`)

```typescript
export default defineConfig({
  plugins: [
    react({
      jsxRuntime: 'automatic',
      jsxImportSource: 'react',
      babel: {
        plugins: [
          ['@babel/plugin-transform-react-jsx', { runtime: 'automatic' }]
        ]
      }
    })
  ],
  resolve: {
    alias: {
      'react/jsx-runtime': 'react/jsx-runtime',
      'react/jsx-dev-runtime': 'react/jsx-dev-runtime',
    },
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'react/jsx-runtime', 'react/jsx-dev-runtime'],
    esbuildOptions: {
      target: 'es2020',
    }
  }
})
```

### 2. **Configuration Vercel** (`vercel.json`)

```json
{
  "buildCommand": "npm run build",
  "installCommand": "npm ci --legacy-peer-deps=false",
  "framework": "vite",
  "env": {
    "NODE_ENV": "production",
    "VITE_BUILD_TARGET": "vercel"
  }
}
```

### 3. **NPM Configuration** (`.npmrc`)

```
auto-install-peers=false
legacy-peer-deps=false
strict-peer-deps=false
```

### 4. **Dépendances Ajoutées**

- `@babel/plugin-transform-react-jsx` pour la transformation JSX
- Suppression de `@react-navigation/native` (inutilisée)

## 🔄 Solution Alternative (Si Échec)

Si le problème persiste, basculer vers **SWC** :

```bash
# Exécuter le script de basculement
chmod +x scripts/switch-to-swc.sh
./scripts/switch-to-swc.sh
```

Cela remplacera `@vitejs/plugin-react` par `@vitejs/plugin-react-swc` qui évite complètement les problèmes CommonJS.

## 🧪 Tests de Validation

```bash
# Test local
npm run build

# Doit produire :
✓ 356 modules transformed
✓ built in ~3s
```

## 📊 Comparaison des Installations

| Environnement | Packages | Status |
|---------------|----------|--------|
| **Local** | 316 packages | ✅ Fonctionne |
| **Vercel** | 47 packages | ❌ Problème CJS |
| **Vercel (Après Fix)** | ~50 packages | ✅ Devrait fonctionner |

## 🎯 Points Clés du Fix

1. **Éviter** le fichier `./cjs/react-jsx-runtime.production.min.js`
2. **Forcer** l'utilisation des exports React corrects
3. **Optimiser** les dépendances avec esbuild
4. **Configurer** Babel explicitement pour JSX
5. **Alternative SWC** disponible si nécessaire

## 🚨 Si le Problème Persiste

1. Vérifier les logs Vercel pour identifier le module exact
2. Utiliser la configuration SWC alternative
3. Considérer un downgrade temporaire vers Vite 5.x
4. Forcer React 18.3.1 dans les résolutions

Le projet devrait maintenant se déployer correctement sur Vercel ! 🎉 