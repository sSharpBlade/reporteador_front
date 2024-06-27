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
} from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';

const UserTableComponent: React.FC = () => {
  const [data, setData] = useState<any[]>([]);
  const [openEdit, setOpenEdit] = useState(false);
  const [editData, setEditData] = useState({ idUser: '', username: '', email: '', password: '' });
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axios.get('https://reporteador-back.onrender.com/users');
      setData(response.data);
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
    setEditData(row);
    setOpenEdit(true);
  };

  const handleEditClose = () => {
    setOpenEdit(false);
  };

  const handleEditSave = async () => {
    try {
      const { idUser, ...dataWithoutId } = editData;
      await axios.patch(`https://reporteador-back.onrender.com/users/${editData.idUser}`, dataWithoutId);
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
              <TableCell>Username</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Password</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={4} align="center">
                  <CircularProgress />
                </TableCell>
              </TableRow>
            ) : (
              data.map((row: any) => (
                <TableRow key={row.idUser}>
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
          />
          <TextField
            margin="dense"
            label="Password"
            type="password"
            fullWidth
            value={editData.password}
            onChange={(e) => setEditData({ ...editData, password: e.target.value })}
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
        message="User deleted successfully"
      />
    </div>
  );
};

export default UserTableComponent;
