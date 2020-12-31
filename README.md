# vscode-ami-sdl-release-note-generator

This extension will read the System Description Language file, that brought out by AMI, and generate release note, which is based on the content of SDL file, automatically.

## Features

This extension will add a command: `Import System Description Language file` to your vscode.
By executing the command, you can select a system desciption file and the extension will generate
a release note with following template for you:

```
;-----------------------------------------------------------------------;
Project Name    : Experimental Project
Project Build   : 003
BIOS Version    : L0.03
BIOS Revision   : A
BIOS Changes    :

Engineer Name   : Ron Luo
Release Date    : Thu 12-31-2020 17:46:35
;-----------------------------------------------------------------------;
```

where,

- Project Name: **PROJECT_NAME** field in imported SDL
- Project Build: `PROJECT_MAJOR_VERSION + PROJECT_MINOR_VERSION`
- BIOS Version: `PHASE_CODE + PROJECT_MAJOR_VERSION + '.' + PROJECT_MINOR_VERSION`
- BIOS Revision: **PROJECT_REVISION** field in imported SDL
- Engineer Name: engineer signature, which can be set in extension settings
- Release Date: the moment when you execute this extension, you can change the format in extension settings

example:
![](https://imgur.com/IZScshw.gif)

## Extension Settings

This extension contributes the following settings:

- `AMISysDescLangReleaseNoteGenerator.divider`:
  - **type**: `string`
  - **default**: `;-----------------------------------------------------------------------;`
- `AMISysDescLangReleaseNoteGenerator.engineerName`:
  - **type**: `string`
  - **default**: `""`
- `AMISysDescLangReleaseNoteGenerator.releaseDateFormat`:
  - **type**: `string`
  - **default**: `ddd MM-DD-YYYY HH:mm:ss`

## Release Notes

### 1.0.0

first release

## Download

https://marketplace.visualstudio.com/items?itemName=SDxBacon.ami-sdl-release-note-generator
