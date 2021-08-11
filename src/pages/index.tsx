import * as React from 'react'

export default function Index() {
  const ref = React.useRef(null)

  React.useEffect(() => {
    import('../editor').then(({ init }) => init(ref.current))
  }, [])

  return <div ref={ref} style={{ height: '100vh' }} />
}
