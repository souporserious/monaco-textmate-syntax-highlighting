import * as React from 'react'

import { useMonaco } from './use-monaco'
import type { InitMonacoOptions } from './init-monaco'

export default function Monaco({
  defaultValue,
  id,
  onChange,
}: Omit<InitMonacoOptions, 'container'>) {
  const ref = React.useRef()

  useMonaco({
    containerRef: ref,
    defaultValue,
    id,
    onChange,
  })

  return <div ref={ref} style={{ height: '100vh' }} />
}
