# Cleo Portal Localization Tool

Cleo Portal is localized for the United States out of the box, but other custom localizations can be created and added to the application after it is installed.

Cleo Portal uses [gettext](https://en.wikipedia.org/wiki/Gettext) for localization.

The application ships with a POT file (gettext template) containing text strings in American English.
The POT file can be translated using a gettext translation editor to produce PO files (gettext translations) for other languages.

However, Cleo Portal cannot read PO files, so they must be compiled to JSON files to be used in the application.

This localization tool compiles PO files to JSON files.

## Prerequisites

- You must have [Git](https://git-scm.com/) installed
- You must have [Node.js](https://nodejs.org/) installed, preferably the latest LTS version
- You will need a gettext translation editor, such as the free [Poedit](https://poedit.net/)

It is assumed that you have at least a basic understanding of how to use Git and npm (Node.js package manager) from the command line.

It is also assumed that you know how to use Poedit or something similar. However, Poedit is easy to figure out even if you have never used it before.

## Setup

Clone the Git repo:

```shell
$ git clone https://github.com/CleoDev/portal-localization
```

Install the localization tool's dependencies (run from within the `portal-localization` folder):

```shell
$ npm install
```

## Usage

To compile a PO file to a JSON file (run from within the `portal-localization` folder):

```shell
$ npm run compile -- --file=path/to/file.po --target=path/to/target/folder/
```

- `file`: a PO file (globbing is supported, e.g. `path/to/*.po`)
- `target`: where to put the JSON file

Note: Use forward slashes for the paths even if you are on Windows, or you may have problems.

## Localizing Cleo Portal

The Cleo Portal language files are located in `webserver/mftportal/lang/` under the folder where Cleo Harmony or Cleo VLTrader is installed.
This is where you can find the POT file, `en-US.pot`.
This is also where the JSON files go.

To add a custom localization to Cleo Portal:

1. Open the POT file in Poedit or something similar.

2. Start a new translation, specifying the language you will be translating to.
Do not choose `English (United States)` since that is the language already built into Portal.

3. Translate some or all of the text strings. Anything you do not translate will fall back to the original American English.

4. Save the translation as a PO file.

5. Use the localization tool to compile the PO file to a JSON file.

6. Copy the JSON file to the Cleo Portal languages folder (the same place you got the POT file from).
You can also just specify that folder as the `target` for the localization tool's compile command and save a step, but be aware that doing so will overwrite any existing JSON file there with the same name.

Cleo Portal chooses the localization to use according to the user's browser settings. To test a localization, set your browser's preferred language accordingly and then open or refresh Cleo Portal.
