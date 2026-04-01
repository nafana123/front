import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { TelegramAuth } from "./components/TelegramAuth";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <TelegramAuth />
  </StrictMode>,
)
