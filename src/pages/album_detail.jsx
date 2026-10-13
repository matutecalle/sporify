import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Box, Typography, Card, CardMedia, List, ListItem, ListItemText, Divider } from '@mui/material';
import Loading from '../components/Loading';

const IMAGEN_POR_DEFECTO = 'https://placehold.co/300x300/121212/5411f7?text=Sin+imagen';

function AlbumDetail() {
  const { albumId } = useParams();
  const [album, setAlbum] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Obtiene el token desde localStorage
  const token = localStorage.getItem('TOKEN');

  useEffect(() => {
    if (token) {
      setLoading(true);
      setError(null);
      axios.get(`https://api.spotify.com/v1/albums/${albumId}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      })
      .then(response => {
        setAlbum(response.data);
      })
      .catch(error => {
        console.log(error);
        setError('No pudimos cargar este álbum. Volvé a intentarlo.');
      })
      .finally(() => setLoading(false));
    }
  }, [albumId, token]);

  if (loading) {
    return <Loading mensaje="Cargando álbum..." />;
  }

  if (error || !album) {
    return (
      <Box sx={{ marginTop: '100px', textAlign: 'center' }}>
        <Typography className='t3' variant="h6">{error ?? 'No encontramos este álbum.'}</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ px: { xs: 2, md: 10, lg: 20 }, py: 2, marginTop: '80px' }}>
      {/* Detalles del álbum */}
      <Card sx={{ display: 'flex', mb: 3, wordBreak: 'break-word' }} className='App'>
        <CardMedia
          component="img"
          image={album.images?.[0]?.url ?? IMAGEN_POR_DEFECTO}
          alt={album.name}
          sx={{ width: 300, objectFit: 'cover', borderRadius: '8px' }}
        />
        <Box sx={{ display: 'flex', flexDirection: 'column', padding: 2 }}>
          <Typography className="item-title" variant="h3" gutterBottom>{album.name}</Typography>
          <Typography className="item-title" variant="h5">Release Date: {album.release_date}</Typography>
          <Typography className="item-title" variant="h5">Total Tracks: {album.total_tracks}</Typography>
        </Box>
      </Card>

      {/* Lista de Tracks */}
      <Typography className='item-title' variant="h4" gutterBottom>Tracks</Typography>
      <List>
        {album.tracks.items.map((track, index) => (
          <React.Fragment key={track.id}>
            <ListItem>
              <ListItemText
              className='item-title'
                primary={`${index + 1}. ${track.name}`}
                secondary={`Duration: ${Math.floor(track.duration_ms / 60000)}:${String(
                  Math.floor((track.duration_ms % 60000) / 1000)
                ).padStart(2, '0')}`}
              />
            </ListItem>
            {index < album.tracks.items.length - 1 && <Divider />} {/* Línea divisoria entre tracks */}
          </React.Fragment>
        ))}
      </List>
    </Box>
  );
}

export default AlbumDetail;
