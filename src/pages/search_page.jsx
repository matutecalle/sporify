import { Link, useLocation } from 'react-router-dom';
import { useCallback, useEffect, useState } from 'react';
import { Box, ImageList, ImageListItem, ImageListItemBar, Typography } from '@mui/material';
import axios from 'axios';
import getToken from '../utils/auth_service';
import Loading from '../components/Loading';

const IMAGEN_POR_DEFECTO = 'https://placehold.co/240x240/121212/5411f7?text=Sin+imagen';

function SearchPage(){
    const [artists, setArtists] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const query = queryParams.get('q');

    const buscar = useCallback(async (reintentar = true) => {
        const token = localStorage.getItem('TOKEN');
        const encodedQuery = encodeURIComponent(query);
        const url = `https://api.spotify.com/v1/search?type=artist&q=${encodedQuery}`;

        setLoading(true);
        setError(null);
        try {
            const response = await axios.get(url, { headers: { 'Authorization': `Bearer ${token}` } });
            setArtists(response.data.artists.items);
        } catch (err) {
            const status = err.response?.status ?? err.status;
            // El token dura una hora: si venció, se renueva y se repite la búsqueda una sola vez.
            if (status === 401 && reintentar) {
                await getToken();
                return buscar(false);
            }
            console.log(err);
            setArtists([]);
            setError('No pudimos completar la búsqueda. Probá de nuevo en unos segundos.');
        } finally {
            setLoading(false);
        }
    }, [query]);

    useEffect(() => {
        if (query) {
            buscar();
        }
      }, [query, buscar]);

      return (
        <Box component="main" sx={{ flexGrow: 1, p: 3, marginTop: '60px' }}>
          <Typography py={'20px'} variant='h3' className='t3'>Búsqueda para "{query}"</Typography>

          {loading && <Loading mensaje="Buscando artistas..." />}

          {!loading && error && (
            <Typography variant='h6' className='t3'>{error}</Typography>
          )}

          {!loading && !error && artists.length === 0 && (
            <Typography variant='h6' className='t3'>No encontramos artistas para "{query}".</Typography>
          )}

          {!loading && !error && artists.length > 0 && (
            <ImageList sx={{ width: '100%', height: 'auto' }} cols={4} gap={16}>
              {artists.map((artist) => (
                <ImageListItem key={artist.id}>
                  <Link
                    to={`/artists/${artist.id}`}
                    style={{ textDecoration: 'none' }}
                  >
                    <img
                      src={artist.images[0]?.url ?? IMAGEN_POR_DEFECTO }
                      alt={artist.name}
                      style={{ width: '240px', height: '240px', borderRadius: '8px' }}
                    />
                    <ImageListItemBar
                      title={<Typography sx={{ textAlign: 'center', textWrap: 'balance' }}>{artist.name}</Typography>}
                      position="below"
                      className='item-title'
                    />
                  </Link>
                </ImageListItem>
              ))}
            </ImageList>
          )}
        </Box>
      );
};

export default SearchPage;
