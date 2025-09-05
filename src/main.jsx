import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AppProvider } from './context/AppContext';
import App from './App.jsx';
import './index.css';

createRoot(document.getElementById('root')).render(
  // Temporarily removed StrictMode to check for double rendering
  // <StrictMode> 
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <AppProvider>
        <App />
        <Toaster position="bottom-right" />
      </AppProvider>
    </BrowserRouter>
  // </StrictMode>
);