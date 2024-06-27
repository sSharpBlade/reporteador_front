
import TableComponent from '../components/UserTableComponent';
import { Box } from '@mui/material'; // Importa Box de MUI

const Usuarios = () => {
  


  return (
    <div>
      <Box m={3}> {/* Aquí agregas el margen */}
        <TableComponent />
      </Box>
    </div>
  );
};

export default Usuarios;
