import * as vscode from "vscode";

export async function showHistoryInUntitled(
  content: string,
  language?: string
) {
  const document = await vscode.workspace.openTextDocument({
    language,
    content,
  });
  vscode.window.showTextDocument(document);
  return;
}

export default showHistoryInUntitled;
