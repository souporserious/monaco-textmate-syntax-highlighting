const fs = require('fs')
const objectCompact = require('object-compact')
const { convertTheme } = require('monaco-vscode-textmate-theme-converter')

const convertedTheme = convertTheme(
  JSON.parse(fs.readFileSync('./vscode-night-owl.json', 'utf-8'))
)

fs.writeFileSync(
  './monaco-night-owl.json',
  JSON.stringify(objectCompact(convertedTheme), null, 2)
)
