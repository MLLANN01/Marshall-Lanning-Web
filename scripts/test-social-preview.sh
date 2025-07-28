#!/bin/bash

echo "🚀 Starting Social Media Preview Test..."
echo ""

# Check if ngrok is installed
if ! command -v ngrok &> /dev/null; then
    echo "❌ ngrok is not installed. Installing..."
    npm install -g ngrok
fi

# Build the project
echo "📦 Building project with static pages..."
npm run build

# Start preview server in background
echo "🖥️  Starting preview server..."
npm run preview &
SERVER_PID=$!

# Wait for server to start
sleep 3

# Start ngrok
echo "🌐 Starting ngrok tunnel..."
ngrok http 4173 &
NGROK_PID=$!

echo ""
echo "✅ Setup complete!"
echo ""
echo "📋 Next steps:"
echo "1. Look for the ngrok URL above (https://xxxxx.ngrok.io)"
echo "2. Test your URL on:"
echo "   - LinkedIn: https://www.linkedin.com/post-inspector/"
echo "   - Facebook: https://developers.facebook.com/tools/debug/"
echo "   - Twitter: https://cards-dev.twitter.com/validator"
echo ""
echo "Press Ctrl+C to stop all services"

# Wait for user to press Ctrl+C
trap "kill $SERVER_PID $NGROK_PID; exit" INT
wait