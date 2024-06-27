import React from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet, useLocation } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Navbar from './components/Navbar';
import SignIn from './pages/SignIn'; // Importa tu componente SignIn
import Usuarios from './pages/Usuarios'; // Importa tu componente Usuarios
import Conexiones from './pages/Conexiones'; // Importa tu componente Conexiones
import Plantillas from './pages/Plantillas'; // Importa tu componente Plantillas

const theme = createTheme({
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
  },
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

const Layout = () => {
  const location = useLocation();
  const isSignIn = location.pathname === '/';

  return (
    <div>
      {!isSignIn && <Navbar />}
      <Outlet />
    </div>
  );
};

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route element={<Layout />}>
            <Route path="/usuarios" element={<Usuarios />} />
            <Route path="/conexiones" element={<Conexiones />} />
            <Route path="/plantillas" element={<Plantillas />} />
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;
