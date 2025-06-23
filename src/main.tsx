import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'; // Importar BrowserRouter
import './index.css';
import App from './App'; // Cambiar Login por App

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <App /> 
    </BrowserRouter>
  </StrictMode>,
);