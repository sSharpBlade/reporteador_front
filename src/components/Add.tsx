import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';

interface AddProps {
  open: boolean;
  onClose: () => void;
  onSave: (newItem: any) => void;
}

const Add: React.FC<AddProps> = ({ open, onClose, onSave }) => {
  const [newItem, setNewItem] = useState({ idServer: '', name: '', url: '', users: '', password: '', type: '' });

  const handleFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewItem({ ...newItem, [name]: value });
  };

  const handleSave = () => {
    onSave(newItem);
    setNewItem({ idServer: '', name: '', url: '', users: '', password: '', type: '' }); // Limpiar los campos después de guardar
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Agregar Nuevo Elemento</DialogTitle>
      <DialogContent>
        <DialogContentText>Ingrese los detalles del nuevo elemento:</DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          label="Name"
          type="text"
          fullWidth
          name="name"
          value={newItem.name}
          onChange={handleFieldChange}
        />
        {/* Agregar más campos de entrada según sea necesario */}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button onClick={handleSave}>Guardar</Button>
      </DialogActions>
    </Dialog>
  );
};

export default Add;
