import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './index.css'
import('preline')
import { AuthContextProvider } from './context/AuthContext'
import { ApiContextProvider } from './context/ApiContext'

ReactDOM.createRoot(document.getElementById('root')).render(
  //<React.StrictMode>
    <BrowserRouter>
    <AuthContextProvider>
      <ApiContextProvider>
         <App />
      </ApiContextProvider>
      </AuthContextProvider>
    </BrowserRouter>
  //</React.StrictMode>,
)
