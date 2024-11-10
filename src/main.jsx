import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Userstate from './assets/context/usercontext/Userstate.jsx'

createRoot(document.getElementById('root')).render(
  
    <Userstate>
    <App />
    </Userstate>
    
 ,
)
