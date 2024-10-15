import { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Route, Routes } from 'react-router-dom';
import HomePage from './home_page';
import { InputAdornment, TextField } from '@mui/material';
import { SearchOutlined } from '@mui/icons-material';
import axios from 'axios';

const drawerWidth = 240;

function LayoutDrawer() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [debounceTimer, setDebounceTimer] = useState(null);
  const token = localStorage.getItem('token')

  function handleDrawerClose(){
    setIsClosing(true);
    setMobileOpen(false);
  };

  function handleDrawerTransitionEnd(){
    setIsClosing(false);
  };

  function handleDrawerToggle(){
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

  // Función que maneja la búsqueda al presionar Enter o al esperar 1.5 segundos
  const handleSearch = (e) => {
    // Si presiona "Enter", realiza la búsqueda inmediatamente
    if (e.keyCode === 13) {
      if (debounceTimer) clearTimeout(debounceTimer); // Limpia el temporizador
      getArtists(e.target.value);
    } else {
      // Configura el debounce para llamar a la API después de 1.5 segundos
      if (debounceTimer) clearTimeout(debounceTimer); // Limpia el temporizador anterior
      setDebounceTimer(setTimeout(() => {
        getArtists(e.target.value);
      }, 1500));
    }
  };

  const getArtists = (text) => {
    const encodedQuery = encodeURIComponent(text);
    axios.get(`https://api.spotify.com/v1/search?type=artist&q=${encodedQuery}`, {
      headers: { 'Authorization': 'Bearer BQBIVpIH48d8zohsGqoCmImSFCBXqOqQAdiMNZtjKwaLYmfrllQ97JOHg8Aw0Q284lGfxTCufjwsODXwAkZm5lP0AnxvAGmzmnRlkhBfq7ft0-7oWKY' }
    })
      .then((response) => {
        console.log(response.data.artists.items);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <List>
        {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {['All mail', 'Trash', 'Spam'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
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
                    <SearchOutlined/>
                  </InputAdornment>
                ),
              }}
              sx={{borderColor: "white", color: "white"}}
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
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
      >
        <Toolbar />
        <Routes>
          <Route path='/' element={<HomePage />} />
        </Routes>
      </Box>
    </Box>
  );
}

export default LayoutDrawer;