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

const TemplateTableComponent: React.FC = () => {
  const [data, setData] = useState<any[]>([]);
  const [filteredData, setFilteredData] = useState<any[]>([]);
  const [openEdit, setOpenEdit] = useState(false);
  const [editData, setEditData] = useState<{ id: number; title: string; description: string; logo: string; deletedAt: string | null }>({ id: 0, title: '', description: '', logo: '', deletedAt: null });
  const [newTemplateData, setNewTemplateData] = useState({ title: '', description: '', logo: '' });
  const [newTemplateLogoPreview, setNewTemplateLogoPreview] = useState<string | null>(null);
  const [editTemplateLogoPreview, setEditTemplateLogoPreview] = useState<string | null>(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [openAdd, setOpenAdd] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axios.get('https://reporteador-back.onrender.com/template');
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
      await axios.delete(`https://reporteador-back.onrender.com/template/${id}`);
      fetchData();
      setSnackbarOpen(true);
    } catch (error) {
      console.error('Error deleting data:', error);
    }
  };

  const handleEditOpen = (row: any) => {
    setEditData({ ...row });
    setEditTemplateLogoPreview(`data:image/png;base64,${row.logo}`);
    setOpenEdit(true);
  };

  const handleEditClose = () => {
    setOpenEdit(false);
  };

  const handleEditSave = async () => {
    try {
      const { id, deletedAt, ...dataWithoutId } = editData;
      if (dataWithoutId.logo === '') {
        dataWithoutId.logo = null as any;
      }
      await axios.patch(`https://reporteador-back.onrender.com/template/${id}`, dataWithoutId);
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
        data.filter((template) =>
          template.title.toLowerCase().includes(event.target.value.toLowerCase()) ||
          template.description.toLowerCase().includes(event.target.value.toLowerCase())
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
      const templateData = { ...newTemplateData };
      if (templateData.logo === '') {
        templateData.logo = null as any;
      }
      const response = await axios.post('https://reporteador-back.onrender.com/template', templateData);
      console.log('Template added successfully:', response.data);
      setNewTemplateData({ title: '', description: '', logo: '' });
      setNewTemplateLogoPreview(null);
      fetchData(); // Actualizar la lista de plantillas después de agregar una nueva
      setOpenAdd(false); // Cerrar el diálogo de añadir plantilla después de guardar
    } catch (error: any) {
      console.error('Error adding template:', error.response?.data);
      // Manejar el error según sea necesario
    }
  };

  const handleLogoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result?.toString().split(',')[1] || ''; // Extract base64 string
        setNewTemplateData({ ...newTemplateData, logo: base64String });
        setNewTemplateLogoPreview(reader.result as string); // Set the preview URL
      };
      reader.readAsDataURL(file);
    } else {
      setNewTemplateData({ ...newTemplateData, logo: '' });
      setNewTemplateLogoPreview(null);
    }
  };

  const handleEditLogoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result?.toString().split(',')[1] || ''; // Extract base64 string
        setEditData({ ...editData, logo: base64String });
        setEditTemplateLogoPreview(reader.result as string); // Set the preview URL
      };
      reader.readAsDataURL(file);
    } else {
      setEditData({ ...editData, logo: '' });
      setEditTemplateLogoPreview(null);
    }
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom style={{ color: '#071952' }}>
        Gestión de Plantillas
      </Typography>

      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <TextField
          label="Buscar plantilla"
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
          Añadir Plantilla
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead style={{ backgroundColor: '#088395' }}>
            <TableRow>
              <TableCell style={{ color: '#EBF4F6' }}>Título</TableCell>
              <TableCell style={{ color: '#EBF4F6' }}>Descripción</TableCell>
              <TableCell style={{ color: '#EBF4F6' }}>Logo</TableCell>
              <TableCell style={{ color: '#EBF4F6' }}>Actions</TableCell>
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
              filteredData.map((row: any) => (
                <TableRow key={row.id}>
                  <TableCell>{row.title}</TableCell>
                  <TableCell>{row.description}</TableCell>
                  <TableCell>
                    <img src={`data:image/png;base64,${row.logo}`} alt="logo" style={{ width: 50, height: 50 }} />
                  </TableCell>
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
        <DialogTitle>Editar Plantilla</DialogTitle>
        <DialogContent>
          <DialogContentText>Por favor edita los detalles de la plantilla:</DialogContentText>
          <TextField
            margin="dense"
            label="Título"
            type="text"
            fullWidth
            value={editData.title}
            onChange={(e) => setEditData({ ...editData, title: e.target.value })}
            error={!editData.title}
            helperText={!editData.title ? 'El título es requerido' : ''}
          />
          <TextField
            margin="dense"
            label="Descripción"
            type="text"
            fullWidth
            value={editData.description}
            onChange={(e) => setEditData({ ...editData, description: e.target.value })}
            error={!editData.description}
            helperText={!editData.description ? 'La descripción es requerida' : ''}
          />
          <input
            accept="image/*"
            style={{ display: 'none' }}
            id="edit-logo-upload"
            type="file"
            onChange={handleEditLogoChange}
          />
          <label htmlFor="edit-logo-upload">
            <Button variant="contained" color="primary" component="span">
              Subir Logo
            </Button>
          </label>
          {editTemplateLogoPreview && (
            <Box mt={2}>
              <img src={editTemplateLogoPreview} alt="Logo Preview" style={{ width: 100, height: 100 }} />
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditClose}>Cancelar</Button>
          <Button 
            onClick={handleEditSave} 
            disabled={!editData.title || !editData.description}
          >
            Guardar
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openAdd} onClose={handleAddClose}>
        <DialogTitle>Añadir Plantilla</DialogTitle>
        <DialogContent>
          <DialogContentText>Introduce los detalles de la nueva plantilla:</DialogContentText>
          <TextField
            margin="dense"
            label="Título"
            type="text"
            fullWidth
            value={newTemplateData.title}
            onChange={(e) => setNewTemplateData({ ...newTemplateData, title: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Descripción"
            type="text"
            fullWidth
            value={newTemplateData.description}
            onChange={(e) => setNewTemplateData({ ...newTemplateData, description: e.target.value })}
          />
          <input
            accept="image/*"
            style={{ display: 'none' }}
            id="logo-upload"
            type="file"
            onChange={handleLogoChange}
          />
          <label htmlFor="logo-upload">
            <Button variant="contained" color="primary" component="span">
              Subir Logo
            </Button>
          </label>
          {newTemplateLogoPreview && (
            <Box mt={2}>
              <img src={newTemplateLogoPreview} alt="Logo Preview" style={{ width: 100, height: 100 }} />
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAddClose}>Cancelar</Button>
          <Button 
            onClick={handleAddSave} 
            disabled={!newTemplateData.title || !newTemplateData.description}
          >
            Guardar
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        message="Plantilla eliminada exitosamente"
      />
    </div>
  );
};

export default TemplateTableComponent;
