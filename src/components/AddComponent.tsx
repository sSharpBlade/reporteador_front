import * as React from 'react';
import { Button, Modal, Box, Typography, TextField, Grid, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

interface AddComponentProps {
  onAdd: (data: any) => void;
}

const AddComponent: React.FC<AddComponentProps> = ({ onAdd }) => {
  const [open, setOpen] = React.useState(false);
  const [formData, setFormData] = React.useState<any>({});
  const [searchQuery, setSearchQuery] = React.useState('');

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

  const handleAdd = () => {
    onAdd(formData);
    handleClose();
  };

  return (
    <div>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}> {/* Agregar estilos para alinear verticalmente con el botón y agregar margen inferior */}
        <TextField
          fullWidth
          label="Buscar"
          name="search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          InputProps={{
            endAdornment: (
              <IconButton onClick={() => { /* Lógica de búsqueda */ }}>
                <SearchIcon />
              </IconButton>
            ),
          }}
        />
        <Button variant="contained" onClick={handleOpen}>Agregar</Button>
      </Box>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', boxShadow: 24, p: 4 }}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Agregar Nuevo Registro
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
            {/* Agrega más campos según tus necesidades */}
          </Grid>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}> {/* Estilos para alinear el botón a la derecha y agregar margen superior */}
            <Button variant="contained" onClick={handleAdd} sx={{ ml: 2 }}>Agregar</Button> {/* Agregamos ml: 2 para agregar un margen izquierdo al botón */}
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

export default AddComponent;
