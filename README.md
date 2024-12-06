# Xplode 'n' Copy

Xplode 'n' Copy: Seamless File Management for Exploded Artifacts

## Features

* Dynamic Context Menu Integration
  The context menu dynamically adapts to show options only for files in pre-configured paths.

* Custom Path Mapping
  Replace specific path prefixes (e.g., build → custom) and copy files to the new structure while preserving the directory hierarchy.

* Flexible Configuration
  Configure source and target paths easily through extension settings.

* Workspace Awareness
  Automatically adjusts file operations based on the active workspace context.

## Requirements

You will need a current version of VS Code 1.95.x or newer.

## Extension Settings

You can customize the behavior of **Xplode 'n' Copy** through the following settings in your `settings.json` file:


| **Setting**                        | **Type**   | **Default** | **Description**                                    |
|------------------------------------|------------|-------------|----------------------------------------------------|
| `xplodencopy.source.pathPrefix`    | `string`   | `"build"`   | Root path from which this extension will copy files. |
| `xplodencopy.target.path`          | `string`   | `"custom"`  | Path to be used as the target folder.               |


## Known Issues

This is an early alpha version... There will be issues.

## Release Notes

### 0.0.1

First relase ;)

**Enjoy!**