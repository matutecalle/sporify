// src/pages/HomePage.js
import React from 'react';
import { Container, Box, Typography} from '@mui/material';

const HomePage = () => {
  
  return (
    <Container maxWidth="sm">
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        height="100vh"
        textAlign="center"
      >
        {/* Título de bienvenida */}
        <Typography variant="h2" gutterBottom>
           SPORIFAI
        </Typography>

        {/* Mensaje de descripción */}
        <Typography variant="h6" color="textSecondary" gutterBottom>
          Encuentra tu música favorita en segundos.
        </Typography>
      </Box>
    </Container>
  );
};

export default HomePage;
