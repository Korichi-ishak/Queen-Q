#!/bin/bash

# Script pour construire et tester le site Queen de Q

echo "🔨 Construction du site..."
npm run build

if [ $? -ne 0 ]; then
  echo "❌ La construction a échoué!"
  exit 1
fi

echo "✅ Construction réussie!"

echo "🚀 Démarrage du serveur local..."
npx serve dist &
SERVER_PID=$!

# Attendre que le serveur soit prêt
sleep 2

echo "🧪 Exécution des tests d'accessibilité avec axe..."
npx axe http://localhost:3000 --exit

if [ $? -ne 0 ]; then
  echo "⚠️ Des problèmes d'accessibilité ont été détectés."
  kill $SERVER_PID
  exit 1
fi

echo "✅ Tests d'accessibilité réussis!"

echo "📊 Exécution de Lighthouse..."
npx lighthouse http://localhost:3000 --output=json --output=html --output-path=./lighthouse-report

echo "🛑 Arrêt du serveur..."
kill $SERVER_PID

echo "📝 Rapport généré dans le dossier lighthouse-report"
echo "✨ Terminé!" 