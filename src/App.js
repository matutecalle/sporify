import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes } from 'react-router-dom';
import './App.css';
import LayoutDrawer from './pages/layout_page';
import Login from './components/Login';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Verificar si hay CLIENT_ID y CLIENT_SECRET en el localStorage
    const clientId = localStorage.getItem('CLIENT_ID');
    const clientSecret = localStorage.getItem('CLIENT_SECRET');
    if (clientId && clientSecret) {
      setIsAuthenticated(true);
    }
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        {/* Si está autenticado, muestra el Dashboard. Si no, muestra el Login */}
        {isAuthenticated ? <LayoutDrawer /> : <Login setIsAuthenticated={setIsAuthenticated} />}
      </BrowserRouter>
    </div>
  );
};

export default App;
