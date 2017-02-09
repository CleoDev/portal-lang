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
$ npm run compile -- --source=path/to/source/file.po --target=path/to/target/folder/
```

- `source`: the source file to compile (globbing is supported, e.g. `path/to/source/*.po`)
- `target`: the target folder (where to put the compiled JSON file)

Note: Use forward slashes for the paths even if you are on Windows, or you may have problems.

## Localizing Cleo Portal

The Cleo Portal language files are located in `webserver/mftportal/lang/` under the folder where Cleo Harmony or Cleo VLTrader is installed.
This is where you can find the POT file, `en-US.pot`.
This is also where the JSON files go.

To add a custom localization to Cleo Portal:

1. Open the POT file in Poedit or something similar.

2. Start a new translation, specifying the language you will be translating to.
Do not choose `English (United States)` since that is the language already built into Cleo Portal.

3. Translate some or all of the text strings. Anything you do not translate will fall back to the original American English.

4. Save the translation as a PO file.

5. Use the localization tool to compile the PO file to a JSON file.

6. Copy the JSON file to the Cleo Portal languages folder (the same place you got the POT file from).
You can also just specify that folder as the `target` for the localization tool's compile command and save a step, but be aware that doing so will overwrite any existing JSON file there with the same name.

Cleo Portal chooses the localization to use according to the user's browser settings. To test a localization, set your browser's preferred language accordingly and then open or refresh Cleo Portal.

### Date Formats

The date formats used in Cleo Portal are set in the language files and can be localized in the same way as any other text strings.

Cleo Portal uses localized date formatting not only for displaying dates but for parsing and validating dates entered in input boxes as well.
To be as flexible as possible, many different date formats are recognized, which means there are many different date formats in the language files that can be translated.

Cleo Portal uses [Moment.js](https://momentjs.com/) for date formatting, so all date formats follow its [syntax](https://momentjs.com/docs/#/displaying/format/).

It is important to translate all date formats consistently and using valid Moment.js syntax when localizing Cleo Portal, or the application may not function correctly.

For example:

One date format used in Cleo Portal is `MM/DD/YYYY`, which formats the 9th day of February of the year 2017 as 02/09/2017.
This is a standard date format for the United States.
However, the European equivalent is `DD/MM/YYYY`, which formats the same date as 09/02/2017.

To set this date format in a European localization for Cleo Portal, perhaps `English (United Kingdom)`, find the `MM/DD/YYYY` text string and enter `DD/MM/YYYY` as the translation.
Whenever Cleo Portal requests the localized date format for `MM/DD/YYYY`, it will see `DD/MM/YYYY` and use that instead.

It is especially important to translate all date formats consistently in a case like this, where the localized date format reverses the positions of the day and month.
If you translate `MM/DD/YYYY` as `DD/MM/YYYY` but do not translate `M/D/YYYY` as `D/M/YYYY` as well, then Cleo Portal will not recognize 09/02/2017 and 9/2/2017 as the same date.
