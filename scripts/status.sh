#!/bin/bash

# 📊 Status Check for Queen de Q Deployment

echo "🔍 Queen de Q - Service Status"
echo "=============================="
echo ""

# Check if serve is running
if ps aux | grep -v grep | grep "serve.*3000" > /dev/null; then
    echo "✅ Production Server: Running on http://localhost:3000"
else
    echo "❌ Production Server: Not running"
fi

# Check if ngrok is running
if ps aux | grep -v grep | grep "ngrok" > /dev/null; then
    echo "✅ ngrok Tunnel: Running"
    
    # Try to get the ngrok URL
    sleep 2
    NGROK_URL=$(curl -s http://localhost:4040/api/tunnels 2>/dev/null | python3 -c "
import json
import sys
try:
    data = json.load(sys.stdin)
    if 'tunnels' in data and len(data['tunnels']) > 0:
        print(data['tunnels'][0]['public_url'])
    else:
        print('URL not ready yet')
except:
    print('API not available')
" 2>/dev/null || echo "URL not available")
    
    if [[ "$NGROK_URL" != "URL not ready yet" && "$NGROK_URL" != "API not available" && "$NGROK_URL" != "URL not available" ]]; then
        echo "🌍 Public URL: $NGROK_URL"
    else
        echo "⏳ Public URL: Loading... (check ngrok dashboard)"
    fi
else
    echo "❌ ngrok Tunnel: Not running"
fi

# Check build directory
if [ -d "dist" ]; then
    echo "✅ Build Directory: Present"
    BUILD_SIZE=$(du -sh dist | cut -f1)
    echo "📦 Build Size: $BUILD_SIZE"
else
    echo "❌ Build Directory: Missing (run 'npm run build')"
fi

# Check if site is accessible
if curl -s http://localhost:3000 > /dev/null 2>&1; then
    echo "✅ Site Accessibility: Working"
else
    echo "❌ Site Accessibility: Failed"
fi

echo ""
echo "🚀 Quick Commands:"
echo "   Start all: npm run deploy:live"
echo "   Server only: npm run serve:prod"
echo "   Tunnel only: npm run tunnel:ngrok"
echo "" 