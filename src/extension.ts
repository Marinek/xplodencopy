// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as fs from 'fs/promises';
import * as path from 'path';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "xplodencopy" is now active!');

	const configuredSourcePath = vscode.workspace.getConfiguration().get<string>('source.pathPrefix') ?? "build";
	const configuredTargetPath = vscode.workspace.getConfiguration().get<string>('target.path') ?? "custom";

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	const disposable = vscode.commands.registerCommand('xplodencopy.doCopy', async (uri: vscode.Uri) => {
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user
		if (uri) {

			const relativePathAsString = vscode.workspace.asRelativePath(uri);
			
			if(!relativePathAsString.startsWith(configuredSourcePath)) {
				vscode.window.showErrorMessage(`This file can't be copied, because it is not from the '${configuredSourcePath}' folder`);
				return;
			}
			
			const targetRelativePath = relativePathAsString.replace(configuredSourcePath, configuredTargetPath);
			
			const relativePath = vscode.Uri.file(targetRelativePath);
			const fileName = relativePath.path.split('/').pop();
			
			
			await copyFileInWorkspace(uri, targetRelativePath);
			
			vscode.window.showInformationMessage(`File Name: ${fileName}, Target Path: ${targetRelativePath}`);
		  } else {
			vscode.window.showErrorMessage('No file selected.');
		  }
	});

	

	context.subscriptions.push(disposable);
}

export async function copyFileInWorkspace(sourceUri: vscode.Uri, targetRelativePath: string): Promise<void> {
	try {
	  const workspaceRoot = vscode.workspace.workspaceFolders?.[0]?.uri.fsPath;
	  if (!workspaceRoot) {
		vscode.window.showErrorMessage('No workspace folder found.');
		return;
	  }
  
	  // Zielpfad berechnen
	  const targetPath = path.join(workspaceRoot, targetRelativePath);
  
	  // Zielverzeichnis erstellen, falls es nicht existiert
	  const targetDir = path.dirname(targetPath);
	  await fs.mkdir(targetDir, { recursive: true });
  
	  // Datei kopieren
	  await fs.copyFile(sourceUri.fsPath, targetPath);
  
	  vscode.window.showInformationMessage(`File copied to: ${targetPath}`);
	} catch (error) {
	  vscode.window.showErrorMessage(`Failed to copy file: `);
	}
  }


// This method is called when your extension is deactivated
export function deactivate() {}
