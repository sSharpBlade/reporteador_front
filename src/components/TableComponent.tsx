import React, { useEffect, useState } from 'react';
import axios from 'axios';
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
  CircularProgress, // Agregar importación para CircularProgress
} from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import Add from './Add';
import Search from './Search';

const TableComponent: React.FC = () => {
  const [data, setData] = useState<any[]>([]);
  const [openEdit, setOpenEdit] = useState(false);
  const [editData, setEditData] = useState({ idServer: '', name: '', url: '', users: '', password: '', type: '' });
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [loading, setLoading] = useState(false); // Estado para indicar si se está cargando

  const fetchData = async () => {
    try {
      setLoading(true); // Indicar que se está cargando
      const response = await axios.get('http://localhost:3000/servers');
      setData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false); // Indicar que se ha terminado la carga
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (idServer: string) => {
    try {
      await axios.delete(`http://localhost:3000/servers/${idServer}`);
      fetchData();
      setSnackbarOpen(true);
    } catch (error) {
      console.error('Error deleting data:', error);
    }
  };

  const handleEditOpen = (row: any) => {
    setEditData(row);
    setOpenEdit(true);
  };

  const handleEditClose = () => {
    setOpenEdit(false);
  };

  const handleEditSave = async () => {
    try {
      const { idServer, ...dataWithoutId } = editData; // Eliminar idServer del objeto editData
      await axios.put(`http://localhost:3000/servers/${editData.idServer}`, dataWithoutId); // Enviar el objeto editData sin idServer
      fetchData();
      setOpenEdit(false);
    } catch (error) {
      console.error('Error editing data:', error);
    }
  };
  

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  
  return (
    <div>
      
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>URL</TableCell>
              <TableCell>Users</TableCell>
              <TableCell>Password</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? ( // Mostrar indicador de carga si se está cargando
              <TableRow>
                <TableCell colSpan={7} align="center">
                  <CircularProgress />
                </TableCell>
              </TableRow>
            ) : (
              data.map((row: any) => (
                <TableRow key={row.idServer}>
                  <TableCell>{row.idServer}</TableCell>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.url}</TableCell>
                  <TableCell>{row.users}</TableCell>
                  <TableCell>{row.password}</TableCell>
                  <TableCell>{row.type}</TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleEditOpen(row)}>
                      <Edit />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(row.idServer)}>
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
        <DialogTitle>Edit Server</DialogTitle>
        <DialogContent>
          <DialogContentText>Please edit the server details below:</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="Name"
            type="text"
            fullWidth
            value={editData.name}
            onChange={(e) => setEditData({ ...editData, name: e.target.value })}
          />
          <TextField
            margin="dense"
            label="URL"
            type="text"
            fullWidth
            value={editData.url}
            onChange={(e) => setEditData({ ...editData, url: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Users"
            type="text"
            fullWidth
            value={editData.users}
            onChange={(e) => setEditData({ ...editData, users: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Password"
            type="password"
            fullWidth
            value={editData.password}
            onChange={(e) => setEditData({ ...editData, password: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Type"
            type="text"
            fullWidth
            value={editData.type}
            onChange={(e) => setEditData({ ...editData, type: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditClose}>Cancel</Button>
          <Button onClick={handleEditSave}>Save</Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        message="Server deleted successfully"
      />
      
    </div>
  );
};

export default TableComponent;
