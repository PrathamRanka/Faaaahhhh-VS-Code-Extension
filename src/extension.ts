import * as vscode from "vscode";
import * as path from "path";
import * as fs from "fs";
import { exec } from "child_process";

let lastPlayed = 0;

export function activate(context: vscode.ExtensionContext) {

    console.log("EXTENSION ACTIVATE CALLED");

    vscode.window.showInformationMessage("FAAAAH EXTENSION ACTIVE");

function playSound() {

    console.log("playSound() CALLED");

    const now = Date.now();
    if (now - lastPlayed < 2500) return;
    lastPlayed = now;

    const audioPath = path.join(
        context.extensionPath,
        "media",
        "fahhhhh.wav"
    );

    console.log("Playing audio silently:", audioPath);

    // Windows silent audio playback using PowerShell
    exec(`powershell -c (New-Object Media.SoundPlayer "${audioPath}").PlaySync();`);
}

    //  TEST TRIGGER — force sound after 3 seconds
    setTimeout(() => {
        console.log("⏱ Timeout trigger firing");
        playSound();
    }, 3000);
}

export function deactivate() {
    console.log("EXTENSION DEACTIVATED");
}