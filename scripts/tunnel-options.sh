#!/bin/bash

# 🌐 Tunneling Options for Queen de Q
# Multiple ways to expose your local server to the internet

echo "🚀 Queen de Q - Live Deployment Options"
echo "========================================"
echo ""
echo "Choose your tunneling method:"
echo "1) ngrok (Recommended - Secure HTTPS)"
echo "2) localtunnel (Simple, no account needed)"
echo "3) cloudflared (Cloudflare Tunnel)"
echo "4) serveo (SSH-based, simple)"
echo ""
read -p "Enter your choice (1-4): " choice

case $choice in
    1)
        echo "🔧 Using ngrok..."
        if ! command -v ngrok &> /dev/null; then
            echo "📦 Installing ngrok..."
            brew install ngrok
        fi
        echo "🌐 Starting tunnel..."
        ngrok http 3000
        ;;
    2)
        echo "🔧 Using localtunnel..."
        if ! command -v lt &> /dev/null; then
            echo "📦 Installing localtunnel..."
            npm install -g localtunnel
        fi
        echo "🌐 Starting tunnel..."
        lt --port 3000 --subdomain queendeq-$(date +%s)
        ;;
    3)
        echo "🔧 Using cloudflared..."
        if ! command -v cloudflared &> /dev/null; then
            echo "📦 Installing cloudflared..."
            brew install cloudflared
        fi
        echo "🌐 Starting tunnel..."
        cloudflared tunnel --url http://localhost:3000
        ;;
    4)
        echo "🔧 Using serveo (SSH tunnel)..."
        echo "🌐 Starting tunnel..."
        ssh -R 80:localhost:3000 serveo.net
        ;;
    *)
        echo "❌ Invalid choice. Using ngrok as default..."
        ngrok http 3000
        ;;
esac 