#!/bin/bash

# Local deployment script for testing
# This simulates what GitHub Actions will do

echo "🧪 Testing local deployment simulation..."

# Clean and build
echo "🧹 Cleaning..."
rm -rf deploy/
rm -f *.vsix

echo "📦 Building..."
npm run compile
npm run webpack

echo "📦 Packaging..."
npx vsce package --allow-star-activation --allow-missing-repository

echo "📁 Preparing deployment files..."
mkdir -p deploy
cp *.vsix deploy/
cp README.md deploy/ 2>/dev/null || echo "README.md not found"

echo "✅ Deployment simulation complete!"
echo "📁 Files prepared in ./deploy/ directory:"
ls -la deploy/

echo ""
echo "🚀 These files would be deployed to the public repository:"
echo "   - $(ls deploy/*.vsix)"
[ -f deploy/README.md ] && echo "   - README.md"
echo ""
echo "To test the extension locally:"
echo "   cursor --install-extension deploy/cursor-claude-1.0.0.vsix"