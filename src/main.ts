import * as vscode from "vscode";
import sdlParser from "node-sdl-parser";
import { createHistoryText } from "./utils/createHistoryText";
import showHistoryInUntitled from "./utils/showHistoryInUntitled";

const readHistoryPropertyFromSDL = async function (fsPath: string) {
  try {
    const sdlData = await sdlParser.parse(fsPath);
    if (!sdlData) {
      throw new Error("System Description Language file parsing fail.");
    }

    const phaseCode = sdlData.get("PHASE_CODE");
    const projectName = sdlData.get("PROJECT_NAME");
    const majorVersion = sdlData.get("PROJECT_MAJOR_VERSION");
    const minorVersion = sdlData.get("PROJECT_MINOR_VERSION");
    const biosRevision = sdlData.get("PROJECT_REVISION");

    return {
      projectName: projectName,
      projectBuild: `${majorVersion}${minorVersion}`,
      biosVersion: `${phaseCode}${majorVersion}.${minorVersion}`,
      biosRevision: biosRevision,
    };
  } catch (error) {
    throw error;
  }
};

/**
 * entry function when command: ami-sdl-release-note-generator.importSDL is fired
 */
const onCommand = () => {
  vscode.window.showOpenDialog().then(async (uri) => {
    const fsPath = uri?.[0]?.fsPath;
    if (!fsPath) {
      return;
    }

    try {
      // read SDL file and get history property
      const historyProp = await readHistoryPropertyFromSDL(fsPath);

      // generate history text
      const history = createHistoryText(historyProp);

      // open a untitled tab in vscode and show history text in it
      await showHistoryInUntitled(history);
    } catch (error) {
      vscode.window.showInformationMessage(error);
    }
  });
};

/**
 * register command: ami-sdl-release-note-generator.importSDL with handler: `onCommand`
 * return disposable object
 *
 * @returns {vscode.Disposable}
 */
const registerCommand = () => {
  return vscode.commands.registerCommand(
    "ami-sdl-release-note-generator.importSDL",
    onCommand
  );
};

export default registerCommand;
