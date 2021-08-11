import { loadWASM } from 'onigasm'
import { Registry } from 'monaco-textmate'
import { wireTmGrammars } from 'monaco-editor-textmate'

import codeString from './code'
import defineTheme from './define-theme'
import theme from './vscode-night-owl.json'

export async function init(container) {
  const monaco = await import('monaco-editor')
  const onigasm = await import('onigasm/lib/onigasm.wasm')

  await loadWASM(onigasm.default)

  const registry = new Registry({
    getGrammarDefinition: async (scopeName) => {
      switch (scopeName) {
        case 'source.js':
          return {
            format: 'json',
            content: await (await fetch('./JavaScript.tmLanguage.json')).text(),
          }
        case 'source.ts':
          return {
            format: 'json',
            content: await (await fetch('./TypeScript.tmLanguage.json')).text(),
          }
        default:
          return null
      }
    },
  })

  const grammars = new Map()
  grammars.set('javascript', 'source.js')
  grammars.set('typescript', 'source.ts')

  const editor = monaco.editor.create(container, {
    value: codeString,
    language: 'typescript',
  })

  defineTheme(monaco, theme)

  await wireTmGrammars(monaco, registry, grammars, editor)
}
