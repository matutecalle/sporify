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
        <Typography className='t3' variant="h2" gutterBottom>
           SPORIFAI
        </Typography>

        {/* Mensaje de descripción */}
        <Typography className='t3' variant="h4" gutterBottom>
          Encuentra tu música favorita en segundos.
        </Typography>
      </Box>
    </Container>
  );
};

export default HomePage;
