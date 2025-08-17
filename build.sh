#!/bin/bash

echo "🚀 Building Cursor Claude Extension..."

# Clean previous builds
echo "🧹 Cleaning previous builds..."
rm -rf dist/
rm -rf out/
rm -f *.vsix

# Compile TypeScript
echo "📦 Compiling TypeScript..."
npm run compile

# Create dist directory
mkdir -p dist/

# Bundle, minify and obfuscate with webpack
echo "🔧 Bundling, minifying and obfuscating..."
npm run webpack

# Copy additional assets
echo "📁 Copying assets..."
npm run copy-assets

# Create .vsix package
echo "📦 Creating .vsix package..."
npx vsce package --allow-star-activation --allow-missing-repository

echo "✅ Build complete!"
echo "📦 Package created: cursor-claude-1.0.0.vsix"
echo ""
echo "To install the extension:"
echo "  cursor --install-extension cursor-claude-1.0.0.vsix"
echo ""
echo "Or run: npm run install-extension"