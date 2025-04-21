import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import { AuthProvider } from './components/Authentication/Authprovider/Authprovide';
import "flowbite/dist/flowbite.css";
import "react-toastify/dist/ReactToastify.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);
