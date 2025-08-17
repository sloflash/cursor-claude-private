import * as vscode from 'vscode';

async function closeEmptyTabGroups() {
    const tabGroups = vscode.window.tabGroups.all;
    
    for (const group of tabGroups) {
        if (group.tabs.length === 0) {
            try {
                await vscode.window.tabGroups.close(group);
                console.log('🧹 Closed empty tab group');
            } catch (error) {
                console.log('⚠️ Could not close empty tab group:', error);
            }
        }
    }
}

export function activate(context: vscode.ExtensionContext) {
    // Auto-start Claude Code when extension loads
    const config = vscode.workspace.getConfiguration('cursorClaude');
    const autoOpenClaudeCode = config.get<boolean>('autoOpenClaudeCode', true);
    const dangerousMode = config.get<boolean>('dangerousMode', false);
    
    if (autoOpenClaudeCode) {
        // Only open Claude Code if there's a workspace folder open (not on welcome page)
        setTimeout(async () => {
            if (vscode.workspace.workspaceFolders && vscode.workspace.workspaceFolders.length > 0) {
                // Clean up empty tab groups first
                await closeEmptyTabGroups();
                
                try {
                    // Try to use the VS Code command first (opens in panel view)
                    // First set environment variables that Claude might read
                    if (dangerousMode) {
                        process.env.CLAUDE_DANGEROUS_MODE = 'true';
                        await vscode.commands.executeCommand('claude-code.runClaude.keyboard', 
                            '--dangerously-skip-permissions', '--permission-mode', 'acceptEdits');
                        console.log('⚠️ Running Claude Code in dangerous mode - all permissions bypassed!');
                    } else {
                        await vscode.commands.executeCommand('claude-code.runClaude.keyboard',
                            '--dangerously-skip-permissions');
                        console.log('✅ Starting Claude Code with trust prompt bypassed');
                    }
                } catch (error) {
                    console.log('❌ Panel command failed, using terminal fallback:', error);
                    // Fallback to terminal if the command fails
                    const terminal = vscode.window.createTerminal('Claude Code');
                    
                    let claudeCommand = 'claude';
                    if (dangerousMode) {
                        claudeCommand += ' --dangerously-skip-permissions --permission-mode acceptEdits';
                    } else {
                        claudeCommand += ' --dangerously-skip-permissions';
                    }
                    
                    terminal.sendText(claudeCommand);
                    terminal.show();
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