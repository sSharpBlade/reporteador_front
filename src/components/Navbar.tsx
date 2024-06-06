import React from 'react';
import { AppBar, Toolbar, Typography, IconButton, Drawer, List, ListItem, ListItemText, ListItemIcon, Button } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { PeopleAlt, SettingsEthernet, Description, ExitToApp } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
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
    // Lógica para cerrar sesión
    navigate('/'); // Redirige a la página de inicio de sesión después de cerrar sesión
  };

  return (
    <div>
      <AppBar position="static" sx={{ marginBottom: '20px' }}>
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
            Navbar
          </Typography>
          <Button color="inherit" startIcon={<ExitToApp />} onClick={handleLogout}>Cerrar sesión</Button> {/* Botón de cierre de sesión */}
        </Toolbar>
      </AppBar>
      <Drawer
        anchor="left"
        open={open}
        onClose={handleDrawerClose}
      >
        <List>
          <ListItem button onClick={() => handleMenuItemClick('/usuarios')}>
            <ListItemIcon><PeopleAlt /></ListItemIcon>
            <ListItemText primary="Crud Usuarios" />
          </ListItem>
          <ListItem button onClick={() => handleMenuItemClick('/conexiones')}>
            <ListItemIcon><SettingsEthernet /></ListItemIcon>
            <ListItemText primary="Crud Conexiones" />
          </ListItem>
          <ListItem button onClick={() => handleMenuItemClick('/plantillas')}>
            <ListItemIcon><Description /></ListItemIcon>
            <ListItemText primary="Crud Plantillas" />
          </ListItem>
        </List>
      </Drawer>
    </div>
  );
};

export default Navbar;
