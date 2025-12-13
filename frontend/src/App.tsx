import { useState } from 'react'
import PzCanvas from './components/core/PzCanvas/PzCanvas'
import { AccountProvider } from './context/useAccountContext'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <AccountProvider>
        <PzCanvas />
      </AccountProvider>
    </>
  )
}

export default App
