# Queen de Q - Landing Page

Une landing page luxueuse pour Queen de Q, avec un système de deck de cartes interactif et une expérience utilisateur immersive.

## 🚀 Technologies

- React 19 avec TypeScript
- Tailwind CSS pour le styling
- GSAP pour les animations avancées
- Framer Motion pour les animations d'interface
- Keen-slider pour le carrousel de témoignages
- Canvas-confetti pour les effets de célébration

## 📋 Fonctionnalités

- Deck de cartes interactif avec 54 archétypes
- Formulaire d'inscription à la liste d'attente "Royal Launch"
- Section "Comment ça marche" avec animation par étapes
- Témoignages en carrousel
- FAQ accordéon
- Overlay de succès avec effets de confettis
- Support complet pour l'accessibilité (WCAG 2.2 AA)
- Optimisations pour les moteurs de recherche

## 🛠️ Installation

```bash
# Cloner le dépôt
git clone https://github.com/votre-utilisateur/queen-q.git
cd queen-q

# Installer les dépendances
npm install

# Lancer le serveur de développement
npm run dev
```

## 🏗️ Build

```bash
# Créer une build de production
npm run build

# Prévisualiser la build localement
npm run preview
```

## 🧪 Tests et qualité

```bash
# Lancer les tests d'accessibilité
npm run build && npx serve dist
npx axe http://localhost:5000
```

## 📊 Analytics

Le site utilise Plausible Analytics pour le suivi des visiteurs. Les événements suivants sont tracés :
- `card_pick` : Lorsqu'un utilisateur tire une carte (avec la propriété `card` contenant le nom de l'archétype)

## 🔄 API Statique

Le compteur de places restantes est géré via un fichier JSON statique :
- `/api/spots.json` : Contient le nombre de places restantes pour le Royal Launch

## 📝 Notes de développement

### Optimisations futures

- Intégration avec Firestore pour un compteur de places restantes en temps réel
- Optimisation des images et assets pour améliorer les performances
- Tests cross-browser supplémentaires

### Problèmes connus

- Le SVG de l'image og-image.svg doit être converti en PNG pour une meilleure compatibilité
- Les animations peuvent être saccadées sur des appareils de faible puissance

## 📄 Licence

Tous droits réservés © Queen de Q