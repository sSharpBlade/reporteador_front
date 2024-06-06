import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, IconButton, Dialog, DialogActions, DialogContent, DialogContentText,
  DialogTitle, TextField, Button, Snackbar
} from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';

const TableComponent: React.FC = () => {
  const [data, setData] = useState([]);
  const [openEdit, setOpenEdit] = useState(false);
  const [editData, setEditData] = useState({ id: '', name: '', ip: '' });
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:3000/servers');
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`http://localhost:3000/servers/${id}`);
      fetchData();
      setSnackbarOpen(true);
    } catch (error) {
      console.error("Error deleting data:", error);
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
      await axios.put(`http://localhost:3000/servers/${editData.id}`, editData);
      fetchData();
      setOpenEdit(false);
    } catch (error) {
      console.error("Error editing data:", error);
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
              <TableCell>IP</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row: any) => (
              <TableRow key={row.id}>
                <TableCell>{row.id}</TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.ip}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleEditOpen(row)}><Edit /></IconButton>
                  <IconButton onClick={() => handleDelete(row.id)}><Delete /></IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={openEdit} onClose={handleEditClose}>
        <DialogTitle>Edit Server</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please edit the server details below:
          </DialogContentText>
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
            label="IP"
            type="text"
            fullWidth
            value={editData.ip}
            onChange={(e) => setEditData({ ...editData, ip: e.target.value })}
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
