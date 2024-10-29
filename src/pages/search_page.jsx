import { Link, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Box, ImageList, ImageListItem, ImageListItemBar, Typography } from '@mui/material';
import axios from 'axios';
import getToken from '../utils/auth_service';

function SearchPage(){
    const token = localStorage.getItem('TOKEN')
    const [artists, setArtists] = useState([]);
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const query = queryParams.get('q');

    useEffect(() => {
        if (query) {
            const encodedQuery = encodeURIComponent(query);
            const url = `https://api.spotify.com/v1/search?type=artist&q=${encodedQuery}`
            const headers = { 'Authorization': `Bearer ${token}` }
            axios.get(url, { headers })
                .then((response) => {
                    setArtists(response.data.artists.items);
                })
                .catch((error) => {
                  console.log(error);
                  if(error.status === 401){
                    getToken()
                  }
                });
            
        }
      }, [query, token]);


      return (
        <Box component="main" sx={{ flexGrow: 1, p: 3, marginTop: '60px' }}>
          <Typography py={'20px'} variant='h3' className='t3'>Búsqueda para "{query}"</Typography>
          <ImageList sx={{ width: '100%', height: 'auto' }} cols={4} gap={16}>
            {artists.map((artist) => (
              <ImageListItem key={artist.id}>
                <Link
                  to={`/artists/${artist.id}`}
                  style={{ textDecoration: 'none' }}
                >
                  <img
                    src={artist.images[0]?.url ?? 'via.placeholder.com/160' }
                    alt={artist.name}
                    style={{ width: '240px', height: '240px', borderRadius: '8px' }}
                  />
                  <ImageListItemBar
                    title={artist.images[0]?.url && <Typography sx={{ textAlign: 'center', textWrap: 'balance' }}>{artist.name}</Typography>}
                    position="below"
                    className='item-title'
                  />
                </Link>
              </ImageListItem>
            ))}
          </ImageList>
        </Box>
      );
};

export default SearchPage;