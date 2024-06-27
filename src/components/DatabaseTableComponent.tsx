import React, { useEffect, useState } from 'react';
import axios from '../config/axiosConfig';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Button,
  Snackbar,
  CircularProgress,
  Box,
  InputAdornment,
  Typography
} from '@mui/material';
import { Edit, Delete, Search } from '@mui/icons-material';
import { Checkbox, FormControlLabel } from '@mui/material';


const DatabaseTableComponent: React.FC = () => {
  const [data, setData] = useState<any[]>([]);
  const [filteredData, setFilteredData] = useState<any[]>([]);
  const [openEdit, setOpenEdit] = useState(false);
  const [editData, setEditData] = useState<{ id: number; type: string; host: string; port: number; username: string; password: string; database: string; ssl: boolean; deletedAt: string | null }>({ id: 0, type: '', host: '', port: 0, username: '', password: '', database: '', ssl: true, deletedAt: null });
  const [newDatabaseData, setNewDatabaseData] = useState({ type: '', host: '', port: 0, username: '', password: '', database: '', ssl: true });
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [openAdd, setOpenAdd] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axios.get('https://reporteador-back.onrender.com/database');
      setData(response.data.filter((item: any) => item.deletedAt === null));
      setFilteredData(response.data.filter((item: any) => item.deletedAt === null));
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`https://reporteador-back.onrender.com/database/${id}`);
      fetchData();
      setSnackbarOpen(true);
    } catch (error) {
      console.error('Error deleting data:', error);
    }
  };

  const handleEditOpen = (row: any) => {
    setEditData({ ...row });
    setOpenEdit(true);
  };

  const handleEditClose = () => {
    setOpenEdit(false);
  };

  const handleEditSave = async () => {
    try {
      const { id, deletedAt, ...dataWithoutId } = editData; // Eliminar deletedAt de los datos
      await axios.patch(`https://reporteador-back.onrender.com/database/${id}`, dataWithoutId);
      fetchData();
      setOpenEdit(false);
    } catch (error) {
      console.error('Error editing data:', error);
    }
  };
  

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    if (event.target.value === '') {
      setFilteredData(data);
    } else {
      setFilteredData(
        data.filter((database) =>
          database.type.toLowerCase().includes(event.target.value.toLowerCase()) ||
          database.host.toLowerCase().includes(event.target.value.toLowerCase())
        )
      );
    }
  };

  const handleAddOpen = () => {
    setOpenAdd(true);
  };

  const handleAddClose = () => {
    setOpenAdd(false);
  };

  const handleAddSave = async () => {
    try {
      const response = await axios.post('https://reporteador-back.onrender.com/database', newDatabaseData);
      console.log('Database added successfully:', response.data);
      setNewDatabaseData({ type: '', host: '', port: 0, username: '', password: '', database: '', ssl: true });
      fetchData(); // Actualizar la lista de bases de datos después de agregar una nueva
      setOpenAdd(false); // Cerrar el diálogo de añadir base de datos después de guardar
    } catch (error: any) {
      console.error('Error adding database:', error.response?.data);
      // Manejar el error según sea necesario
    }
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom style={{ color: '#071952' }}>
        Gestión de Conexiones a Bases de Datos
      </Typography>

      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <TextField
          label="Buscar base de datos"
          variant="outlined"
          value={searchTerm}
          onChange={handleSearch}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
          }}
        />
        <Button variant="contained" color="primary" onClick={handleAddOpen}>
          Añadir Base de Datos
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead style={{ backgroundColor: '#088395' }}>
            <TableRow>
              <TableCell style={{ color: '#EBF4F6' }}>Tipo</TableCell>
              <TableCell style={{ color: '#EBF4F6' }}>Host</TableCell>
              <TableCell style={{ color: '#EBF4F6' }}>Puerto</TableCell>
              <TableCell style={{ color: '#EBF4F6' }}>Usuario</TableCell>
              <TableCell style={{ color: '#EBF4F6' }}>Base de Datos</TableCell>
              <TableCell style={{ color: '#EBF4F6' }}>SSL</TableCell>
              <TableCell style={{ color: '#EBF4F6' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={7} align="center">
                  <CircularProgress />
                </TableCell>
              </TableRow>
            ) : (
              filteredData.map((row: any) => (
                <TableRow key={row.id}>
                  <TableCell>{row.type}</TableCell>
                  <TableCell>{row.host}</TableCell>
                  <TableCell>{row.port}</TableCell>
                  <TableCell>{row.username}</TableCell>
                  <TableCell>{row.database}</TableCell>
                  <TableCell>{row.ssl ? 'Sí' : 'No'}</TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleEditOpen(row)}>
                      <Edit />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(row.id)}>
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={openEdit} onClose={handleEditClose}>
        <DialogTitle>Editar Conexión</DialogTitle>
        <DialogContent>
          <DialogContentText>Por favor edita los detalles de la conexión a la base de datos:</DialogContentText>
          <TextField
            margin="dense"
            label="Tipo"
            type="text"
            fullWidth
            value={editData.type}
            onChange={(e) => setEditData({ ...editData, type: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Host"
            type="text"
            fullWidth
            value={editData.host}
            onChange={(e) => setEditData({ ...editData, host: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Puerto"
            type="number"
            fullWidth
            value={editData.port}
            onChange={(e) => setEditData({ ...editData, port: Number(e.target.value) })}
          />
          <TextField
            margin="dense"
            label="Usuario"
            type="text"
            fullWidth
            value={editData.username}
            onChange={(e) => setEditData({ ...editData, username: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Contraseña"
            type="password"
            fullWidth
            value={editData.password}
            onChange={(e) => setEditData({ ...editData, password: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Base de Datos"
            type="text"
            fullWidth
            value={editData.database}
            onChange={(e) => setEditData({ ...editData, database: e.target.value })}
          />
         <FormControlLabel
  control={
    <Checkbox
      checked={editData.ssl} // Usar editData en lugar de newDatabaseData
      onChange={(e) => setEditData({ ...editData, ssl: e.target.checked })} // Actualizar editData en lugar de newDatabaseData
    />
  }
  label="SSL"
/>

        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditClose}>Cancelar</Button>
          <Button onClick={handleEditSave}>Guardar</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openAdd} onClose={handleAddClose}>
        <DialogTitle>Añadir Conexión</DialogTitle>
        <DialogContent>
          <DialogContentText>Introduce los detalles de la nueva conexión a la base de datos:</DialogContentText>
          <TextField
            margin="dense"
            label="Tipo"
            type="text"
            fullWidth
            value={newDatabaseData.type}
            onChange={(e) => setNewDatabaseData({ ...newDatabaseData, type: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Host"
            type="text"
            fullWidth
            value={newDatabaseData.host}
            onChange={(e) => setNewDatabaseData({ ...newDatabaseData, host: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Puerto"
            type="number"
            fullWidth
            value={newDatabaseData.port}
            onChange={(e) => setNewDatabaseData({ ...newDatabaseData, port: Number(e.target.value) })}
          />
          <TextField
            margin="dense"
            label="Usuario"
            type="text"
            fullWidth
            value={newDatabaseData.username}
            onChange={(e) => setNewDatabaseData({ ...newDatabaseData, username: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Contraseña"
            type="password"
            fullWidth
            value={newDatabaseData.password}
            onChange={(e) => setNewDatabaseData({ ...newDatabaseData, password: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Base de Datos"
            type="text"
            fullWidth
            value={newDatabaseData.database}
            onChange={(e) => setNewDatabaseData({ ...newDatabaseData, database: e.target.value })}
          />
         <FormControlLabel
  control={
    <Checkbox
      checked={newDatabaseData.ssl}
      onChange={(e) => setNewDatabaseData({ ...newDatabaseData, ssl: e.target.checked })}
    />
  }
  label="SSL"
/>

        </DialogContent>
        <DialogActions>
          <Button onClick={handleAddClose}>Cancelar</Button>
          <Button onClick={handleAddSave}>Guardar</Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        message="Conexión eliminada exitosamente"
      />
    </div>
  );
};

export default DatabaseTableComponent;
