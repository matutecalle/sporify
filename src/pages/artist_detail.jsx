import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import { Box, Typography, Grid, Card, CardActionArea, CardMedia } from '@mui/material';

function ArtistDetail() {
  let { artistId } = useParams();
  const [artist, setArtist] = useState(null);
  const [albums, setAlbums] = useState([]);

  // Obtiene el token desde localStorage
  const token = localStorage.getItem('TOKEN');

  artistId = "6XyY86QOPPrYVGvF9ch6wz"; // Temporalmente hardcodeado
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
    <Box sx={{ padding: 2 }}>
      {/* Estructura en dos columnas para la imagen y la información */}
      <Grid container spacing={4}>
        {/* Imagen del artista a la izquierda */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardMedia
              component="img"
              image={artist.images[0].url} // Imagen del artista
              alt={artist.name}
              sx={{ maxHeight: 300, objectFit: 'cover' }}
            />
          </Card>
        </Grid>

        {/* Información del artista a la derecha */}
        <Grid item xs={12} md={8}>
          <Typography variant="h4" gutterBottom>{artist.name}</Typography>
          <Typography variant="body1">Followers: {artist.followers.total.toLocaleString()}</Typography>
          <Typography variant="body1">Genres: {artist.genres.join(', ')}</Typography>
        </Grid>
      </Grid>

      {/* Cuadrícula de álbumes */}
      <Box sx={{ marginTop: 4 }}>
        <Typography variant="h5" gutterBottom>Albums</Typography>
        <Grid container spacing={2}>
          {albums.map((album) => (
            <Grid item xs={12} sm={6} md={3} key={album.id}>
              <Card>
                <CardActionArea component={Link} to={`/album/${album.id}`}>
                  <CardMedia
                    component="img"
                    image={album.images[0].url} // Imagen del álbum
                    alt={album.name}
                    sx={{ height: 200, objectFit: 'cover' }} // Ajuste de la imagen de álbum
                  />
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}

export default ArtistDetail;
