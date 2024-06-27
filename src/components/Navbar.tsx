import React from 'react';
import { AppBar, Toolbar, Typography, IconButton, Drawer, List, ListItem, ListItemText, ListItemIcon, Button } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { PeopleAlt, SettingsEthernet, Description, ExitToApp } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useAuth } from '../context/AuthContext';

const theme = createTheme({
  palette: {
    primary: {
      main: '#071952',
    },
    secondary: {
      main: '#088395',
    },
    background: {
      default: '#EBF4F6',
    },
  },
});

const Navbar = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleMenuItemClick = (path: string) => {
    navigate(path);
    handleDrawerClose(); // Cierra el Drawer después de hacer clic en un elemento del menú
  };

  const handleLogout = () => {
    logout(); // Lógica para cerrar sesión
    navigate('/'); // Redirige a la página de inicio de sesión después de cerrar sesión
  };

  return (
    <ThemeProvider theme={theme}>
      <AppBar position="static" sx={{ marginBottom: '20px', bgcolor: 'primary.main' }}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={handleDrawerOpen}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Reporteador
          </Typography>
          <Button color="inherit" startIcon={<ExitToApp />} onClick={handleLogout}>Cerrar sesión</Button>
        </Toolbar>
      </AppBar>
      <Drawer
        anchor="left"
        open={open}
        onClose={handleDrawerClose}
      >
        <List sx={{ width: 250 }}>
          <ListItem button onClick={() => handleMenuItemClick('/usuarios')}>
            <ListItemIcon sx={{ color: 'primary.main' }}><PeopleAlt /></ListItemIcon>
            <ListItemText primary="Crud Usuarios" />
          </ListItem>
          <ListItem button onClick={() => handleMenuItemClick('/conexiones')}>
            <ListItemIcon sx={{ color: 'primary.main' }}><SettingsEthernet /></ListItemIcon>
            <ListItemText primary="Crud Conexiones" />
          </ListItem>
          <ListItem button onClick={() => handleMenuItemClick('/plantillas')}>
            <ListItemIcon sx={{ color: 'primary.main' }}><Description /></ListItemIcon>
            <ListItemText primary="Crud Plantillas" />
          </ListItem>
        </List>
      </Drawer>
    </ThemeProvider>
  );
};

export default Navbar;
