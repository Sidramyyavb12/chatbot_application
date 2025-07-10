import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Usercontext from './context/Usercontext.jsx'
import SplashCursor from '../Components/SplashCurser.jsx'
import Particles from '../Components/Particles.jsx'



createRoot(document.getElementById('root')).render(
 <Usercontext> 


{/* <SplashCursor/> */}
 
    <App />
   
    </Usercontext>
)
