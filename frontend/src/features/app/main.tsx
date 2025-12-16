import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import { bgcolor } from '@mui/system'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
