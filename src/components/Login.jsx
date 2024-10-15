import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Container } from '@mui/material';
import axios from 'axios';

const Login = ({ setIsAuthenticated }) => {
  const [clientId, setClientId] = useState('');
  const [clientSecret, setClientSecret] = useState('');
  const [token, setToken] = useState(null);

  const handleLogin = async () => {
    if (clientId && clientSecret) {
      localStorage.setItem('CLIENT_ID', clientId);
      localStorage.setItem('CLIENT_SECRET', clientSecret);

      // Obtener el token de autenticación
      await getToken(clientId, clientSecret);
    } else {
      alert('Por favor ingresa CLIENT_ID y CLIENT_SECRET');
    }
  };

  const getToken = async (clientId, clientSecret) => {
    const url = 'https://accounts.spotify.com/api/token';
    const data = `grant_type=client_credentials&client_id=${clientId}&client_secret=${clientSecret}`;

    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
    };

    try {
      const response = await axios.post(url, data, { headers });

      const token = response.data.access_token;
      setToken(token);
      alert('Token obtenido correctamente');

      // Autenticación exitosa, cambia el estado para mostrar el resto de la app
      setIsAuthenticated(true);
    } catch (error) {
      console.error('Error al autenticar:', error);
      alert('Error al autenticar');
    }
  };

  return (
    <Container maxWidth="xs">
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <Typography variant="h4" gutterBottom sx={{color: "white"}}>
          Login
        </Typography>
        <TextField
          label="Client ID"
          variant="outlined"
          fullWidth
          margin="normal"
          value={clientId}
          onChange={(e) => setClientId(e.target.value)}
          sx={{borderColor: "white", color: "white"}}
        />
        <TextField
          label="Client Secret"
          variant="outlined"
          fullWidth
          margin="normal"
          type="password"
          value={clientSecret}
          onChange={(e) => setClientSecret(e.target.value)}
          sx={{borderColor: "white", color: "white"}}
        />
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleLogin}
          sx={{ marginTop: 2 }}
        >
          Login
        </Button>

        {token && (
          <Typography variant="body1" color="textSecondary" sx={{ marginTop: 2 }}>
            Token: {token}
          </Typography>
        )}
      </Box>
    </Container>
  );
};

export default Login;
