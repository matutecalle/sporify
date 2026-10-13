import { Box, CircularProgress, Typography } from '@mui/material';

// Indicador de carga que se muestra mientras se espera la respuesta de la API.
// El marginTop deja libre la barra superior, que es fija.
const Loading = ({ mensaje = 'Cargando...' }) => (
  <Box
    display="flex"
    flexDirection="column"
    alignItems="center"
    justifyContent="center"
    gap={2}
    sx={{ marginTop: '80px', py: 10 }}
  >
    <CircularProgress sx={{ color: '#5411f7' }} />
    <Typography className="t3" variant="h6">{mensaje}</Typography>
  </Box>
);

export default Loading;
