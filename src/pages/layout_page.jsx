import { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import { Route, Routes, useNavigate } from 'react-router-dom';
import HomePage from './home_page';
import { ImageListItem, InputAdornment, TextField, Typography } from '@mui/material';
import { SearchOutlined } from '@mui/icons-material';
import SearchPage from './search_page';

const drawerWidth = 240;

function LayoutPage() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [debounceTimer, setDebounceTimer] = useState(null);
  const [favoriteArtists, setFavoriteArtists] = useState([])
  const [favoriteSongs, setFavoriteSongs] = useState([])
  const navigate = useNavigate();

  function handleDrawerClose() {
    setIsClosing(true);
    setMobileOpen(false);
  };

  function handleDrawerTransitionEnd() {
    setIsClosing(false);
  };

  function handleDrawerToggle() {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

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

  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <List>
        {favoriteArtists.length === 0 ? (
          <Typography variant="body1" align="center">
            Aquí aparecerán tus artistas favoritos
          </Typography>
        ) : (
          favoriteArtists.map((artist, index) => (
            <ListItem key={artist.id} disablePadding>
              <ListItemButton>
                <ImageListItem key={artist.id} sx={{ width: '40px', height: '40px' }}>
                  <img
                    srcSet={`${artist.images[0]?.url}?w=50&h=50&fit=crop&auto=format&dpr=2 2x`}
                    src={`${artist.images[0]?.url}?w=50&h=50&fit=crop&auto=format`}
                    alt={artist.name}
                    loading="lazy"
                  />
                </ImageListItem>
                <ListItemText primary={artist.name} />
              </ListItemButton>
            </ListItem>
          ))
        )}
        <Divider />
      </List>
      <List>
        {favoriteSongs.length === 0 ? (
          <Typography variant="body1" align="center">
            Aquí aparecerán tus canciones favoritas
          </Typography>
        ) : (
          favoriteSongs.map((artist, index) => (
            <ListItem key={artist.id} disablePadding>
              <ListItemButton>
                <ImageListItem key={artist.id} sx={{ width: '40px', height: '40px' }}>
                  <img
                    srcSet={`${artist.images[0]?.url}?w=50&h=50&fit=crop&auto=format&dpr=2 2x`}
                    src={`${artist.images[0]?.url}?w=50&h=50&fit=crop&auto=format`}
                    alt={artist.name}
                    loading="lazy"
                  />
                </ImageListItem>
                <ListItemText primary={artist.name} />
              </ListItemButton>
            </ListItem>
          ))
        )}
      </List>
    </div>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>

          <Box>
            <TextField
              placeholder='Artista'
              variant="outlined"
              fullWidth
              margin="normal"
              value={searchText}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchOutlined />
                  </InputAdornment>
                ),
              }}
              sx={{ borderColor: "white", color: "white" }}
              onChange={(e) => setSearchText(e.target.value)}
              onKeyUp={(e) => handleSearch(e)}
            />
          </Box>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onTransitionEnd={handleDrawerTransitionEnd}
          onClose={handleDrawerClose}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      return (
      <div>
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/artists/search" element={<SearchPage />} />
          </Routes>
        </Box>
      </div>
      );
    </Box>
  );
}

export default LayoutPage;