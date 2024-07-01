import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import { ConfigProvider } from './context/ConfigContext.jsx'

import { MAIN_PATH } from './config.js'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <ConfigProvider>
    <BrowserRouter basename={MAIN_PATH}>
      <App />
    </BrowserRouter>
  </ConfigProvider>
)
