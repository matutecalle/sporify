import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import { Box, Typography, Grid2, Card, CardActionArea, CardMedia } from '@mui/material';

function ArtistDetail() {
  const { artistId } = useParams();
  const [artist, setArtist] = useState(null);
  const [albums, setAlbums] = useState([]);

  // Obtiene el token desde localStorage
  const token = localStorage.getItem('TOKEN');

  useEffect(() => {
    if (token) {
      axios.get(`https://api.spotify.com/v1/artists/${artistId}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      })
        .then(response => {
          console.log(response.data);
          setArtist(response.data);
        })
        .catch(error => {
          console.log(error);
        });

      axios.get(`https://api.spotify.com/v1/artists/${artistId}/albums`, {
        headers: { 'Authorization': `Bearer ${token}` }
      })
        .then(response => {
          setAlbums(response.data.items);
        })
        .catch(error => {
          console.log(error);
        });
    }
  }, [artistId, token]);

  if (!artist) {
    return <div>Loading...</div>;
  }

  return (
    <Box sx={{ px: 30, py: 2, marginTop: '80px' }}>
      {/* Estructura en dos columnas para la imagen y la información */}
      <Grid2 container spacing={4}>
        {/* Imagen del artista a la izquierda */}
        <Grid2 item xs={12} md={4}>
          <Card>
            <CardMedia
              component="img"
              image={artist.images[0].url} // Imagen del artista
              alt={artist.name}
              sx={{ maxHeight: 300, objectFit: 'cover' }}
            />
          </Card>
        </Grid2>

        {/* Información del artista a la derecha */}
        <Grid2 item xs={12} md={8}>
          <Typography className="item-title" variant="h3" gutterBottom>{artist.name}</Typography>
          <Typography className="item-title" variant="h5">Followers: {artist.followers.total.toLocaleString()}</Typography>
          <Typography className="item-title" variant="h5">Genres: {artist.genres.join(', ')}</Typography>
        </Grid2>
      </Grid2>

      {/* Cuadrícula de álbumes */}
      <Box sx={{ marginTop: 4 }}>
        <Typography className='t3' variant="h4" gutterBottom>Albums</Typography>
        <Grid2 container spacing={2} justifyContent={'space-evenly'}>
          {albums.map((album) => (
            <Grid2 item xs={12} sm={6} md={3} key={album.id}>
              <Card>
                <CardActionArea component={Link} to={`/albums/${album.id}`}>
                  <CardMedia
                    component="img"
                    image={album.images[0] && album.images[0]?.url ? album.images[0]?.url : 'https://via.placeholder.com/160' } // Imagen del álbum
                    alt={album.name}
                    sx={{ height: 200, objectFit: 'cover' }} // Ajuste de la imagen de álbum
                  />
                </CardActionArea>
              </Card>
            </Grid2>
          ))}
        </Grid2>
      </Box>
    </Box>
  );
}

export default ArtistDetail;
