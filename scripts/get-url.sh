#!/bin/bash

# 🌍 Get Public URL for Client Sharing

echo "🔍 Recherche des URLs publiques actives..."
echo ""

# Check cloudflared
if ps aux | grep -v grep | grep "cloudflared" > /dev/null; then
    echo "✅ Cloudflare Tunnel actif"
    # Cloudflare logs the URL, let's try to capture it
    echo "🌍 URL Cloudflare: Regardez les logs du terminal cloudflared"
    echo "   Ou visitez: https://trycloudflare.com (connexion temporaire)"
fi

# Check localtunnel
if ps aux | grep -v grep | grep "lt.*3000\|lt.*queendeq" > /dev/null; then
    echo "✅ LocalTunnel actif"
    echo "🌍 URL LocalTunnel: https://queendeq-demo.loca.lt"
    echo "   Note: Peut demander un mot de passe la première fois"
fi

# Check ngrok
if ps aux | grep -v grep | grep "ngrok" > /dev/null; then
    echo "✅ ngrok actif"
    NGROK_URL=$(curl -s http://localhost:4040/api/tunnels 2>/dev/null | python3 -c "
import json
import sys
try:
    data = json.load(sys.stdin)
    if 'tunnels' in data and len(data['tunnels']) > 0:
        print(data['tunnels'][0]['public_url'])
    else:
        print('Loading...')
except:
    print('API not ready')
" 2>/dev/null || echo "API not available")
    echo "🌍 URL ngrok: $NGROK_URL"
fi

# Check local server
if curl -s http://localhost:3000 > /dev/null 2>&1; then
    echo "✅ Serveur local: http://localhost:3000"
elif curl -s http://localhost:65262 > /dev/null 2>&1; then
    echo "✅ Serveur local: http://localhost:65262"
fi

echo ""
echo "📱 Pour ton client:"
echo "   1. Utilise l'URL ci-dessus"
echo "   2. Partage le lien direct"
echo "   3. Le site fonctionne sur mobile/desktop"
echo "" 