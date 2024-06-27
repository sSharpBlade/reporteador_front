// src/pages/NotFound.tsx
import { Typography, Box } from '@mui/material';

const NotFound = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        flexDirection: 'column',
      }}
    >
      <Typography variant="h1" component="h1">
        404
      </Typography>
      <Typography variant="h6" component="h2">
        Página no encontrada
      </Typography>
    </Box>
  );
};

export default NotFound;
