# Cursor Claude Auto-Open Extension

A VS Code/Cursor extension that automatically opens Claude Code when you start Cursor with a project.

## Features

- 🚀 **Auto-opens Claude Code** when Cursor starts with a project
- 🎯 **Uses official command** (`claude-code.runClaude.keyboard`)
- 📱 **Opens in sidebar** (not just terminal)
- ⚙️ **Configurable** via `cursorClaude.autoOpenClaudeCode` setting
- ⌨️ **Keyboard shortcut** `Cmd+B Cmd+Y` to manually focus
- 🔄 **Fallback to terminal** if official command fails
- 🔒 **Obfuscated code** for security

## Installation

### From VSIX
```bash
cursor --install-extension cursor-claude-1.0.0.vsix
```

### From Source
```bash
git clone git@github.com:sloflash/cursor-claude-private.git
cd cursor-claude-private
npm install
npm run package
cursor --install-extension cursor-claude-1.0.0.vsix
```

## Usage

1. Install the extension
2. Restart Cursor
3. Open a project folder
4. Claude Code automatically opens in the sidebar!

## Configuration

Disable auto-opening by setting:
```json
{
  "cursorClaude.autoOpenClaudeCode": false
}
```

## Build Process

The extension uses advanced build processes with:
- **TypeScript compilation**
- **Webpack bundling**
- **JavaScript obfuscation** (webpack-obfuscator)
- **Code minification** (Terser)

### Build Commands
```bash
./build.sh                    # Full build with obfuscation
npm run deploy-local          # Test deployment locally  
npm run package-private       # Package without repository warnings
```

## Development

### Requirements
- Node.js 18.0.0 or higher
- Cursor or VS Code 1.74.0 or higher
- Claude Code extension installed

### Setup
```bash
npm install
npm run compile
npm run webpack
```

## Deployment

The project uses GitHub Actions for automated deployment:
- **Builds** with obfuscation on every push to main
- **Packages** VSIX file automatically
- **Deploys** to public repository for distribution
- **Creates releases** on git tags

## License

MIT

---

Made with ❤️ for seamless Claude Code integration