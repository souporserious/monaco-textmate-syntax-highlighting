import { loadWASM } from 'onigasm'
import { Registry } from 'monaco-textmate'
import { wireTmGrammars } from 'monaco-editor-textmate'
import theme from './monaco-night-owl.json'
import codeString from './code'

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

  monaco.editor.defineTheme('night-owl', theme)

  const editor = monaco.editor.create(container, {
    value: codeString,
    language: 'typescript',
    theme: 'night-owl',
  })

  await wireTmGrammars(monaco, registry, grammars, editor)
}
