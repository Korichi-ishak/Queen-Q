# Documentation des Versions de la Page Application

Ce document détaille les deux versions de la page "Application" et comment basculer entre elles.

## 🎨 Version 1 : "Créative & Brillante"

- **Fichier** : `src/pages/ApplicationLegacy.tsx`
- **Design** : Lumineux, énergique, avec des dégradés colorés, des ornements dorés et des animations dynamiques.
- **Ambiance** : Céleste, magique, brillante.
- **Couleurs dominantes** : Royal Purple, Imperial Gold, Rose Champagne.

### Caractéristiques :
- Fond dégradé avec 50 étoiles scintillantes.
- Cartes de fonctionnalités avec fonds en dégradé.
- Animations Framer Motion avec `staggerChildren`.
- Ornements SVG dans les coins des sections.

## 🌙 Version 2 : "Mystérieuse & Immersive"

- **Fichier** : `src/pages/Application.tsx` (actuellement active)
- **Design** : Sombre, immersif, avec une ambiance de rituel secret ou de découverte nocturne.
- **Ambiance** : Mystérieuse, introspective, secrète.
- **Couleurs dominantes** : Ink Black, Royal Purple, avec des touches d'Imperial Gold pour les highlights.

### Caractéristiques :
- Fond noir avec texture subtile et dégradés sombres.
- Animation d'introduction théâtrale pour le titre.
- Cartes de fonctionnalités au design "tarot", qui se révèlent au scroll.
- Icônes plus symboliques : `KeyRound`, `Eye`, `Droplets`.
- Scroll vertical par sections pour une narration progressive.
- Call-to-action qui brille comme une invitation secrète.

---

## 🔄 Comment Basculer Entre les Versions

Pour changer la version de la page `/application` qui est affichée :

1.  **Ouvrir `src/App.tsx`**.
2.  **Modifier l'import** en haut du fichier.

### Pour afficher la version "Créative & Brillante" :
```typescript
// Décommenter cette ligne
import { ApplicationLegacy as Application } from './pages/ApplicationLegacy'; 
```
> **Note** : Il faut renommer l'import `ApplicationLegacy` en `Application` pour que le reste du code fonctionne sans modification.

### Pour afficher la version "Mystérieuse & Immersive" (actuelle) :
```typescript
// S'assurer que cette ligne est active
import { Application } from './pages/Application'; 
```

3.  **Sauvegarder le fichier**. Le serveur de développement se mettra à jour automatiquement avec la version choisie.

---

## 🎯 Statut Actuel

- ✅ **Version "Mystérieuse"** est actuellement active sur la route `/application`.
- ✅ **Version "Créative"** est archivée dans `src/pages/ApplicationLegacy.tsx` et prête à être utilisée.
- ✅ Aucune autre modification de route n'est nécessaire. 