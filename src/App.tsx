import { BrowserRouter as Router, Routes, Route, Outlet, useLocation } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Navbar from './components/Navbar';
import SignIn from './pages/SignIn';
import Usuarios from './pages/Usuarios';
import Conexiones from './pages/Conexiones';
import Plantillas from './pages/Plantillas';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

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
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/" element={<SignIn />} />
            <Route element={<Layout />}>
              <Route element={<ProtectedRoute />}>
                <Route path="/usuarios" element={<Usuarios />} />
                <Route path="/conexiones" element={<Conexiones />} />
                <Route path="/plantillas" element={<Plantillas />} />
              </Route>
            </Route>
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
