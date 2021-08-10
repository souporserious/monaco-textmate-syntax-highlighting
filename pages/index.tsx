import * as React from 'react'

export default function Index() {
  const ref = React.useRef(null)

  React.useEffect(() => {
    import('../editor').then(({ init }) => {
      init(ref.current)
    })

    // import('monaco-editor').then((monaco) => {
    //   monaco.editor.create(ref.current, {
    //     value: `const foo = () => 0;`,
    //     language: 'javascript',
    //     theme: 'vs-dark',
    //   })
    // })
  }, [])

  return <div ref={ref} style={{ height: '100vh' }} />
}
