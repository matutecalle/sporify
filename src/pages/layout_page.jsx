import { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import HomePage from './home_page';
import { InputAdornment, TextField } from '@mui/material';
import { ArrowBack, SearchOutlined } from '@mui/icons-material';
import SearchPage from './search_page';
import AlbumDetail from './album_detail';
import ArtistDetail from './artist_detail';

export function LayoutPage() {
  const [searchText, setSearchText] = useState('');
  const [debounceTimer, setDebounceTimer] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  const handleSearch = (e) => {
    if (e.keyCode === 13) {
      if (debounceTimer) clearTimeout(debounceTimer);
      navigate(`/artists/search?q=${encodeURIComponent(e.target.value)}`);
    } else {
      if (debounceTimer) clearTimeout(debounceTimer);
      setDebounceTimer(setTimeout(() => {
        navigate(`/artists/search?q=${encodeURIComponent(e.target.value)}`);
      }, 1500));
    }
  };

  return (
    <Box>
      <CssBaseline />
      <AppBar
        position="fixed">
        <Toolbar className='appbar'>
          {location.pathname !== '/' && (
            <IconButton
              color="inherit"
              aria-label="go back"
              edge="start"
              onClick={() => navigate(-1)} 
              sx={{ position: 'absolute', left: 25 }}
            >
              <ArrowBack />
            </IconButton>
          )}

            <TextField
              placeholder="Artista"
              variant="outlined"
              fullWidth
              margin="normal"
              className='text-input'
              value={searchText}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchOutlined color='white'/>
                  </InputAdornment>
                ),
              }}
              onChange={(e) => setSearchText(e.target.value)}
              onKeyUp={(e) => handleSearch(e)}
              sx={{ width: '70%', maxWidth: '500px'}}
            />
        </Toolbar>
      </AppBar>
      <div>
        <Box component="main" sx={{ flexGrow: 1 }}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/artists/search" element={<SearchPage />} />
            <Route path='/artists/:artistId' element={<ArtistDetail />} />
            <Route path='/albums/:albumId' element={<AlbumDetail />} />
          </Routes>
        </Box>
      </div>
    </Box>
  );
}

