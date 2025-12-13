import { useState } from 'react'
import { AccountProvider } from './stores/useAccountContext'
import PizzaCanvas from './pages/PizzaCanvas'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <AccountProvider>
        <PizzaCanvas />
      </AccountProvider>
    </>
  )
}

export default App
