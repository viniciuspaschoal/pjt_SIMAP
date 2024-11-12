import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Header from './components/Header.jsx'
import Container from './components/Container.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <Header /> */}
    <Container />
    
  </StrictMode>,
)
