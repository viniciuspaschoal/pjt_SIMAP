import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import NavegationsComands from './components/NavegationsComands.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <NavegationsComands/>
  </StrictMode>,
)
