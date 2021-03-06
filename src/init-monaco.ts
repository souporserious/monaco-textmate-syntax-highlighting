import { wireTmGrammars } from 'monaco-editor-textmate'
import { Registry } from 'monaco-textmate'
import { loadWASM } from 'onigasm'

import theme from './theme.json'
import defineTheme from './define-theme'

export type InitMonacoOptions = {
  container: HTMLElement
  defaultValue?: string
  id?: number
  onChange?: (value: string) => void
}

export async function initMonaco({
  container,
  defaultValue = '',
  id = 0,
  onChange = () => null,
}: InitMonacoOptions) {
  // @ts-ignore
  const onigasm = await import('onigasm/lib/onigasm.wasm')
  const monaco = await import('monaco-editor')

  try {
    await loadWASM(onigasm.default)
  } catch {
    // try/catch prevents onigasm from erroring on fast refreshes
  }

  const registry = new Registry({
    getGrammarDefinition: async (scopeName) => {
      switch (scopeName) {
        case 'source.js':
          return {
            format: 'json',
            content: await (await fetch('/JavaScript.tmLanguage.json')).text(),
          }
        case 'source.ts':
          return {
            format: 'json',
            content: await (await fetch('/TypeScript.tmLanguage.json')).text(),
          }
        case 'source.tsx':
          return {
            format: 'json',
            content: await (
              await fetch('/TypeScriptReact.tmLanguage.json')
            ).text(),
          }
        default:
          return null
      }
    },
  })

  const grammars = new Map()

  grammars.set('javascript', 'source.js')
  grammars.set('typescript', 'source.ts')
  grammars.set('typescript', 'source.tsx')

  const model = monaco.editor.createModel(
    defaultValue,
    'typescript',
    monaco.Uri.parse(`file:///index-${id}.tsx`)
  )

  const editor = monaco.editor.create(container, {
    model,
    language: 'typescript',
    contextmenu: false,
    lineNumbers: 'off',
    theme: 'vs-dark',
    fontSize: 18,
    minimap: { enabled: false },
  })

  defineTheme(monaco, theme)

  await wireTmGrammars(monaco, registry, grammars, editor)

  monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
    target: monaco.languages.typescript.ScriptTarget.Latest,
    allowNonTsExtensions: true,
    moduleResolution: monaco.languages.typescript.ModuleResolutionKind.NodeJs,
    module: monaco.languages.typescript.ModuleKind.CommonJS,
    noEmit: true,
    esModuleInterop: true,
    jsx: monaco.languages.typescript.JsxEmit.React,
    reactNamespace: 'React',
    allowJs: true,
    typeRoots: ['node_modules/@types'],
  })

  monaco.languages.typescript.typescriptDefaults.setDiagnosticsOptions({
    noSemanticValidation: false,
    noSyntaxValidation: false,
  })

  editor.onDidChangeModelContent(() => {
    onChange(editor.getValue())
  })

  editor.focus()

  /**
   * Load React types
   * alternatively, you can use: https://github.com/lukasbach/monaco-editor-auto-typings
   */
  fetch('https://unpkg.com/@types/react@17.0.19/index.d.ts')
    .then((response) => response.text())
    .then((types) => {
      monaco.languages.typescript.typescriptDefaults.addExtraLib(
        types,
        'file:///node_modules/react/index.d.ts'
      )
    })

  return { editor, monaco }
}
