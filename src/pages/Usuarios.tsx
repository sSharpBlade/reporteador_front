
import TableComponent from '../components/UserTableComponent';
import { Box } from '@mui/material'; // Importa Box de MUI

const Usuarios = () => {
  


  return (
    <div>
      <h1>Usuarios</h1>
      <Box m={3}> {/* Aquí agregas el margen */}
        <TableComponent />
      </Box>
    </div>
  );
};

export default Usuarios;
