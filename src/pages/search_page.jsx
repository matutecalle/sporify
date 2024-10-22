import { Link, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Box, ImageList, ImageListItem, ImageListItemBar } from '@mui/material';
import axios from 'axios';
import Artist from '../models/artist'

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
                    setArtists(response.data.artists.items.map((a) => new Artist(a)));
                })
                .catch((error) => {
                    console.log(error);
                });
            
        }
      }, [query, token]);


      return (
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <ImageList sx={{ width: '100%', height: 'auto' }} cols={4} gap={16}>
            {artists.map((artist) => (
              <ImageListItem key={artist.id}>
                <Link
                  to={`/artists/${artist.id}`}
                  style={{ textDecoration: 'none' }}
                >
                  <img
                    src={artist.images[0]?.url}
                    alt={artist.name}
                    style={{ width: '100%', height: 'auto', borderRadius: '8px' }}
                  />
                  <ImageListItemBar
                    title={artist.name}
                    position="below"
                    sx={{ textAlign: 'center' }}
                  />
                </Link>
              </ImageListItem>
            ))}
          </ImageList>
        </Box>
      );
};

export default SearchPage;