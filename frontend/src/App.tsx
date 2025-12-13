import { useState } from 'react'
import { AccountProvider } from './store/useAccountContext'
import PzCanvas from './pages/PzCanvas'

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
