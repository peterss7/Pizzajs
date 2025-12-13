import { useState } from 'react'
import PzCanvas from './components/core/PzCanvas/PzCanvas'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <PzCanvas />
    </>
  )
}

export default App
