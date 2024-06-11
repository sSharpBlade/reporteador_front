import * as React from 'react';
import { Button, Modal, Box, Typography, TextField, Grid } from '@mui/material';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

interface AddComponentProps {
  onAdd: () => void; // Propiedad de función para llamar después de agregar una nueva conexión
}

const AddComponent: React.FC<AddComponentProps> = ({ onAdd }) => {
  const [open, setOpen] = React.useState(false);
  const [formData, setFormData] = React.useState<any>({});
  const navigate = useNavigate();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAdd = async () => {
    try {
      await axios.post('http://localhost:3000/servers', formData);
      onAdd(); // Llamar a la función onAdd para actualizar la lista de conexiones después de agregar una nueva
      handleClose();
      navigate('/conexiones'); // Redirigir a la página de conexiones
    } catch (error) {
      console.error('Error adding data:', error);
    }
  };

  return (
    <div>
      <Button variant="contained" onClick={handleOpen}>Agregar Conexión</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', boxShadow: 24, p: 4 }}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Agregar Nueva Conexión
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Nombre"
                name="name"
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="URL"
                name="url"
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Usuarios"
                name="users"
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Contraseña"
                name="password"
                type="password"
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Tipo"
                name="type"
                onChange={handleInputChange}
              />
            </Grid>
          </Grid>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
            <Button variant="contained" onClick={handleAdd} sx={{ ml: 2 }}>Agregar</Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

export default AddComponent;
