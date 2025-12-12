import { useState } from 'react'
import GameCanvas from '../features/canvas/GameCanvas'
import TGameCanvas from '../features/canvas/TGameCanvas'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <TGameCanvas />
    </>
  )
}

export default App
