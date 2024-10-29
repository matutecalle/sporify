import React, { useState, useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import Login from './components/Login';
import { LayoutPage } from './pages/layout_page';

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
        {isAuthenticated ? <LayoutPage /> : <Login setIsAuthenticated={setIsAuthenticated} />}
      </BrowserRouter>
    </div>
  );
};

export default App;
