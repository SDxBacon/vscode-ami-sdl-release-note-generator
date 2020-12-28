import * as dayjs from "dayjs";
import * as vscode from "vscode";
import { DIVIDER, RELEASE_DATE_FORMAT } from "../config";

export interface HistoryTemplateProps {
  projectName?: string;
  projectBuild?: string;
  biosVersion?: string;
  biosRevision?: string;
}

const getValueInConfig = (
  config: vscode.WorkspaceConfiguration,
  property: string,
  defaultValue: string
): string => {
  const value = config.get<string>(property);

  if (!value) {
    return defaultValue;
  }
  return value;
};

export const createHistoryText = (props: HistoryTemplateProps) => {
  /** read engineer name from workspace configuration */
  const config = vscode.workspace.getConfiguration(
    "AMISysDescLangReleaseNoteGenerator"
  );
  const divider = getValueInConfig(config, "divider", DIVIDER);
  const engineerName = getValueInConfig(config, "engineerName", "");
  const releaseDateFormat = getValueInConfig(
    config,
    "releaseDateFormat",
    RELEASE_DATE_FORMAT
  );

  /** assemble history text and return */
  return `${divider}
Project Name    : ${props.projectName ?? ""}
Project Build   : ${props.projectBuild ?? ""}
BIOS Version    : ${props.biosVersion ?? ""}
BIOS Revision   : ${props.biosRevision ?? ""}
BIOS Changes    : 

Engineer Name   : ${engineerName}
Release Date    : ${dayjs().format(releaseDateFormat)}
${divider}\n`;
};

export default createHistoryText;
