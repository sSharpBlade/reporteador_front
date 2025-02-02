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

const UserTableComponent: React.FC = () => {
  const [data, setData] = useState<any[]>([]);
  const [filteredData, setFilteredData] = useState<any[]>([]);
  const [openEdit, setOpenEdit] = useState(false);
  const [editData, setEditData] = useState({ idUser: 0, username: '', email: '', password: '', statusActive: true });
  const [newUserData, setNewUserData] = useState({ idUser: '', username: '', email: '', password: '', statusActive: true });
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [openAdd, setOpenAdd] = useState(false);
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axios.get('https://reporteador-back.onrender.com/users');
      setData(response.data);
      setFilteredData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (idUser: string) => {
    try {
      await axios.delete(`https://reporteador-back.onrender.com/users/${idUser}`);
      fetchData();
      setSnackbarOpen(true);
    } catch (error) {
      console.error('Error deleting data:', error);
    }
  };

  const handleEditOpen = (row: any) => {
    setEditData({ ...row, idUser: Number(row.idUser), statusActive: Boolean(row.statusActive) });
    setOpenEdit(true);
  };

  const handleEditClose = () => {
    setOpenEdit(false);
  };

  const handleEditSave = async () => {
    try {
      const { idUser, ...dataWithoutId } = editData;
      await axios.patch(`https://reporteador-back.onrender.com/users/${idUser}`, dataWithoutId);
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
        data.filter((user) =>
          user.username.toLowerCase().includes(event.target.value.toLowerCase()) ||
          user.email.toLowerCase().includes(event.target.value.toLowerCase())
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
      const idUser = Number(newUserData.idUser); // Usar el idUser ingresado manualmente
      const response = await axios.post('https://reporteador-back.onrender.com/users', {
        idUser,
        username: newUserData.username,
        email: newUserData.email,
        password: newUserData.password,
        statusActive: newUserData.statusActive,
      });
      console.log('User added successfully:', response.data);
      setNewUserData({ idUser: '', username: '', email: '', password: '', statusActive: true });
      fetchData(); // Actualizar la lista de usuarios después de agregar uno nuevo
      setOpenAdd(false); // Cerrar el diálogo de añadir usuario después de guardar
    } catch (error: any) {
      console.error('Error adding user:', error.response?.data);
      // Manejar el error según sea necesario
    }
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom style={{ color: '#071952' }}>
        Gestión de Usuarios
      </Typography>

      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <TextField
          label="Buscar usuario"
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
          Añadir Usuario
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead style={{ backgroundColor: '#088395' }}>
            <TableRow>
              <TableCell style={{ color: '#EBF4F6' }}>Cédula</TableCell>
              <TableCell style={{ color: '#EBF4F6' }}>Username</TableCell>
              <TableCell style={{ color: '#EBF4F6' }}>Email</TableCell>
              <TableCell style={{ color: '#EBF4F6' }}>Password</TableCell>
              <TableCell style={{ color: '#EBF4F6' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  <CircularProgress />
                </TableCell>
              </TableRow>
            ) : (
              filteredData.map((row: any) => (
                <TableRow key={row.idUser}>
                  <TableCell>{row.idUser}</TableCell>
                  <TableCell>{row.username}</TableCell>
                  <TableCell>{row.email}</TableCell>
                  <TableCell>{row.password}</TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleEditOpen(row)}>
                      <Edit />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(row.idUser)}>
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
        <DialogTitle>Edit User</DialogTitle>
        <DialogContent>
          <DialogContentText>Please edit the user details below:</DialogContentText>
          <TextField
            margin="dense"
            label="Cédula"
            type="text"
            fullWidth
            value={editData.idUser}
            InputProps={{
              readOnly: true,
            }}
          />
          <TextField
            autoFocus
            margin="dense"
            label="Username"
            type="text"
            fullWidth
            value={editData.username}
            onChange={(e) => setEditData({ ...editData, username: e.target.value })}
          />
          <TextField
  margin="dense"
  label="Email"
  type="email"
  fullWidth
  value={editData.email}
  onChange={(e) => setEditData({ ...editData, email: e.target.value })}
  error={!emailRegex.test(editData.email)}
  helperText={!emailRegex.test(editData.email) ? 'Debe ser un email válido' : ''}
/>
         <TextField
  margin="dense"
  label="Password"
  type="password"
  fullWidth
  value={editData.password}
  onChange={(e) => setEditData({ ...editData, password: e.target.value })}
  error={editData.password.length > 0 && editData.password.length < 6}
  helperText={editData.password.length > 0 && editData.password.length < 6 ? 'La contraseña debe tener al menos 6 caracteres' : ''}
/>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditClose}>Cancel</Button>
          <Button 
    onClick={handleEditSave} 
    disabled={
      !editData.username || 
      editData.username.length < 6 || 
      !editData.email || 
      !emailRegex.test(editData.email) || 
      !editData.password || 
      editData.password.length < 6
    }
  >
    Save
  </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openAdd} onClose={handleAddClose}>
        <DialogTitle>Añadir Usuario</DialogTitle>
        <DialogContent>
          <DialogContentText>Introduce los detalles del nuevo usuario:</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="Cédula"
            type="number"
            fullWidth
            value={newUserData.idUser}
            onChange={(e) => setNewUserData({ ...newUserData, idUser: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Username"
            type="text"
            fullWidth
            value={newUserData.username}
            onChange={(e) => setNewUserData({ ...newUserData, username: e.target.value })}
          />
          <TextField
  margin="dense"
  label="Email"
  type="email"
  fullWidth
  value={newUserData.email}
  onChange={(e) => setNewUserData({ ...newUserData, email: e.target.value })}
  error={!emailRegex.test(newUserData.email)}
  helperText={!emailRegex.test(newUserData.email) ? 'Debe ser un email válido' : ''}
/>
          <TextField
  margin="dense"
  label="Password"
  type="password"
  fullWidth
  value={newUserData.password}
  onChange={(e) => setNewUserData({ ...newUserData, password: e.target.value })}
  error={newUserData.password.length > 0 && newUserData.password.length < 6}
  helperText={newUserData.password.length > 0 && newUserData.password.length < 6 ? 'La contraseña debe tener al menos 6 caracteres' : ''}
/>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAddClose}>Cancel</Button>
          <Button 
    onClick={handleAddSave} 
    disabled={
      !newUserData.idUser || 
      !newUserData.username || 
      !newUserData.username || 
      !newUserData.email || 
      !emailRegex.test(newUserData.email) || 
      !newUserData.password || 
      newUserData.password.length < 6
    }
  >
    Save
  </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        message="User deleted successfully"
      />
    </div>
  );
};

export default UserTableComponent;
