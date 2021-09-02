import * as React from 'react'
import dynamic from 'next/dynamic'

import codeString from '../code-string'

const Monaco = dynamic(() => import('../Monaco'), { ssr: false })

export default function Index() {
  return <Monaco defaultValue={codeString} />
}
