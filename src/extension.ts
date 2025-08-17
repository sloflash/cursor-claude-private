import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
    // Auto-start Claude Code when extension loads
    const config = vscode.workspace.getConfiguration('cursorClaude');
    const autoOpenClaudeCode = config.get<boolean>('autoOpenClaudeCode', true);
    
    if (autoOpenClaudeCode) {
        // Only open Claude Code if there's a workspace folder open (not on welcome page)
        setTimeout(async () => {
            if (vscode.workspace.workspaceFolders && vscode.workspace.workspaceFolders.length > 0) {
                try {
                    await vscode.commands.executeCommand('claude-code.runClaude.keyboard');
                    console.log('✅ Successfully opened Claude Code via official command');
                } catch (error) {
                    console.log('❌ Official command failed, using terminal fallback:', error);
                    const terminal = vscode.window.createTerminal('Claude Code');
                    terminal.sendText('claude');
                    terminal.show();
                    
                    // Auto-answer "Yes" to any prompts after a short delay
                    setTimeout(() => {
                        terminal.sendText('y');
                    }, 2000);
                }
            } else {
                console.log('⏭️ Skipping Claude Code auto-open - no workspace folder detected');
            }
        }, 1000); // Small delay to ensure Cursor is fully loaded
    }

    const activateDisposable = vscode.commands.registerCommand('cursorClaude.activate', () => {
        vscode.window.showInformationMessage('Hello from Cursor Claude!');
    });

    const focusInputDisposable = vscode.commands.registerCommand('cursorClaude.focusInput', () => {
        vscode.commands.executeCommand('workbench.action.terminal.focus');
    });

    const claudeFocusInputDisposable = vscode.commands.registerCommand('claude.focusInput', () => {
        vscode.commands.executeCommand('workbench.action.terminal.focus');
    });

    context.subscriptions.push(activateDisposable, focusInputDisposable, claudeFocusInputDisposable);
}

export function deactivate() {}