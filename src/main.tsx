import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Counter } from './components/Counter'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Counter />
  </StrictMode>,
)
