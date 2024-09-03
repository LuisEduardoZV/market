import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import { ConfigProvider } from './context/ConfigContext.jsx'
import { store } from './store/index.js'

import { MAIN_PATH } from './config.js'
import './index.css'

import { QueryClient, QueryClientProvider } from 'react-query'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClient}>
    <Provider store={store}>
      <ConfigProvider>
        <BrowserRouter basename={MAIN_PATH}>
          <App />
        </BrowserRouter>
      </ConfigProvider>
    </Provider>
  </QueryClientProvider>
)
