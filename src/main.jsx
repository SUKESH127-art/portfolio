import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { setSiteMetadata } from './utils/setSiteMetadata.js'
import { inject } from '@vercel/analytics'

// Set site metadata from JSON configuration
setSiteMetadata()

// Initialize Vercel Web Analytics
inject()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
