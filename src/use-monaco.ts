import * as React from 'react'

import type { InitMonacoOptions } from './init-monaco'

export function useMonaco({
  containerRef,
  defaultValue,
  id,
  onChange,
}: {
  containerRef: React.RefObject<HTMLElement>
} & Omit<InitMonacoOptions, 'container'>) {
  React.useEffect(() => {
    import('./init-monaco').then(({ initMonaco }) =>
      initMonaco({
        container: containerRef.current,
        defaultValue,
        id,
        onChange,
      })
    )
  }, [])
}
