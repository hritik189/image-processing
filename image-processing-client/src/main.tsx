import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { ImageProvider } from './context/ImageContext';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ImageProvider>
      <App />
    </ImageProvider>

  </StrictMode>,
)
