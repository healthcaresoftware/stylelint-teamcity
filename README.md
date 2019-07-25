# stylelint-teamcity
[![npm version](https://badge.fury.io/js/%40hcsinc%2Fstylelint-teamcity.svg)](https://badge.fury.io/js/%40hcsinc%2Fstylelint-teamcity)

Formats [stylelint](http://stylelint.io/) output as [inspections](https://www.jetbrains.com/help/teamcity/build-script-interaction-with-teamcity.html#BuildScriptInteractionwithTeamCity-ReportingInspections) for TeamCity.

## Example
Opening the Code Inspection tab for a specific build will display violations based on a pre-defined set of rules.
![TeamCity Inspections Example](https://user-images.githubusercontent.com/29924878/61878880-e24a0880-aebf-11e9-8b7a-a914a8556515.png)

## Installation
```sh
npm install @hcsinc/stylelint-teamcity --save-dev
```

## Usage
```sh
stylelint <options> --custom-formatter ./node_modules/@hcsinc/stylelint-teamcity/index.js
```

## Acknowledgments
stylelint-teamcity is based upon [stylelint-teamcity-formatter](https://github.com/tihonove/stylelint-teamcity-formatter) and [eslint-teamcity](https://github.com/andreogle/eslint-teamcity/).
