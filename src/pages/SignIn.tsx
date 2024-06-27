import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useAuth } from '../context/AuthContext';

const theme = createTheme({
  palette: {
    primary: {
      main: '#088395',
    },
    secondary: {
      main: '#37B7C3',
    },
    background: {
      default: '#EBF4F6',
    },
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          marginBottom: '1rem',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          marginTop: '1.5rem',
          marginBottom: '1rem',
          backgroundColor: '#071952',
          '&:hover': {
            backgroundColor: '#088395',
          },
        },
      },
    },
  },
});

function SignIn() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [error, setError] = React.useState('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get('email') as string;
    const password = data.get('password') as string;

    try {
      const response = await fetch('https://reporteador-back.onrender.com/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const responseData = await response.json();
        const token = responseData.token;
        
        login(token);
        
        navigate('/usuarios');
      } else {
        setError('Credenciales inválidas');
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setError('Error al iniciar sesión');
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', bgcolor: 'background.default' }}>
        <CssBaseline />
        <Box
          sx={{
            padding: 3,
            backgroundColor: 'white',
            borderRadius: 2,
            boxShadow: 3,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            border: '1px solid #ccc',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5" color="primary">
            Ingresa a tu cuenta
          </Typography>
          {error && (
            <Typography component="p" variant="body2" color="error">
              {error}
            </Typography>
          )}
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              required
              fullWidth
              id="email"
              label="Tu usuario"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              required
              fullWidth
              name="password"
              label="Contraseña"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
            >
              Iniciar sesión
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default SignIn;
