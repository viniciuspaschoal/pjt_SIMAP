import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Container from './Container.jsx'
import Login from './Login.jsx'
import Router from './routes/Router.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router  />
  </StrictMode>,
)
