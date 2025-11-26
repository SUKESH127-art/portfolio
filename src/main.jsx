import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { setSiteMetadata } from './utils/setSiteMetadata.js'

// Set site metadata from JSON configuration
setSiteMetadata()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
