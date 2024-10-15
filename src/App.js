import React, { useState, useEffect } from 'react';
import Login from './components/Login.jsx'; // Importa tu componente Login
import Dashboard from './components/Dashboard'; // Componente que representa el resto de la app

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Verificar si hay CLIENT_ID y CLIENT_SECRET en el localStorage
    const clientId = localStorage.getItem('CLIENT_ID');
    const clientSecret = localStorage.getItem('CLIENT_SECRET');

    // Si ambos existen, se considera autenticado
    if (clientId && clientSecret) {
      setIsAuthenticated(true);
    }
  }, []); // Solo ejecuta esto al montar el componente (componentDidMount)

  return (
    <div className="App">
      {/* Si está autenticado, muestra el Dashboard. Si no, muestra el Login */}
      {isAuthenticated ? <Dashboard /> : <Login setIsAuthenticated={setIsAuthenticated} />}
    </div>
  );
};

export default App;
