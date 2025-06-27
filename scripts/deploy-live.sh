#!/bin/bash

# 🚀 Live Deployment Script for Queen de Q
# This script builds and deploys the site with live tunneling

echo "🏗️  Building production version..."
npm run build

echo "🚀 Starting production server..."
serve -s dist -p 3000 &
SERVER_PID=$!

echo "⏳ Waiting for server to start..."
sleep 3

echo "🌐 Creating secure tunnel with ngrok..."
ngrok http 3000 --log=stdout &
NGROK_PID=$!

echo "📋 Server Info:"
echo "   Local:  http://localhost:3000"
echo "   Tunnel: Check ngrok output above for public URL"
echo ""
echo "🛑 To stop all services, press Ctrl+C"

# Function to cleanup on exit
cleanup() {
    echo ""
    echo "🛑 Stopping services..."
    kill $SERVER_PID 2>/dev/null
    kill $NGROK_PID 2>/dev/null
    echo "✅ Cleanup complete"
    exit 0
}

# Trap Ctrl+C
trap cleanup SIGINT

# Keep script running
wait 