// solar-load-calculator/frontend/src/main.jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'

import App from './App.jsx'
import './index.css'

// Dark mode: persisted in localStorage
const applyTheme = () => {
  const saved = localStorage.getItem('theme')
  const theme = saved === 'dark' ? 'dark' : 'light'
  document.documentElement.classList.toggle('dark', theme === 'dark')
}

applyTheme()

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Toaster position="top-right" />
      <App />
    </BrowserRouter>
  </React.StrictMode>,
)

