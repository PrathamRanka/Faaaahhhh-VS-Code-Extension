import * as vscode from "vscode";
import * as path from "path";
import * as os from "os";
import { exec } from "child_process";

let lastPlayed = 0;

export function activate(context: vscode.ExtensionContext) {
    function playSound() {

        const now = Date.now();
        if (now - lastPlayed < 2500) return; 
        lastPlayed = now;

        const audioPath = path.join(
            context.extensionPath,
            "media",
            "fahhhhh.wav" 
        );
        if (os.platform() === "win32") {
    exec(`powershell -c (New-Object Media.SoundPlayer "${audioPath}").PlaySync();`);
        }
        else if (os.platform() === "darwin") {
            exec(`afplay "${audioPath}"`);
        } 
        else {
            exec(`aplay "${audioPath}"`);
        }
    }
    const testCommand = vscode.commands.registerCommand(
        "faaaah.testSound",
        () => {
            playSound();
        }
    );

    context.subscriptions.push(testCommand);
    vscode.window.onDidEndTerminalShellExecution((e: any) => {

        // exitCode !== 0 means failure
        if (typeof e.exitCode === "number" && e.exitCode !== 0) {
            playSound();
        }
    });
}

export function deactivate() {}