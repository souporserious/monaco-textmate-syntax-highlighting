export default `
import React, { useState } from 'react'

type CounterProps = {
  /** Sets the initial count. */
  initialCount: number
}

export function Counter({ initialCount }: CounterProps) {
  const [count, setCount] = useState(initialCount)
  return (
    <>
      <button onClick={() => setCount(count - 1)}>-</button>
      <span>{count}</span>
      <button onClick={() => setCount(count + 1)}>+</button>
    </>
  )
}
`.trimStart()
