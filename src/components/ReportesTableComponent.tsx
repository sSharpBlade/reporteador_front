import React, { useEffect, useState } from 'react';
import axios from '../config/axiosConfig';
import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Snackbar,
} from '@mui/material';

const ReportesTableComponent: React.FC = () => {
  const [databases, setDatabases] = useState<any[]>([]);
  const [templates, setTemplates] = useState<any[]>([]);
  const [selectedDatabase, setSelectedDatabase] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState('');
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<{ columns: string[], rows: any[] } | null>(null);
  const [loading, setLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  useEffect(() => {
    fetchDatabases();
    fetchTemplates();
  }, []);

  const fetchDatabases = async () => {
    try {
      const response = await axios.get('https://reporteador-back.onrender.com/database');
      setDatabases(response.data.filter((item: any) => item.deletedAt === null));
    } catch (error) {
      console.error('Error fetching databases:', error);
    }
  };

  const fetchTemplates = async () => {
    try {
      const response = await axios.get('https://reporteador-back.onrender.com/template');
      setTemplates(response.data.filter((item: any) => item.deletedAt === null));
    } catch (error) {
      console.error('Error fetching templates:', error);
    }
  };

  const handleExecuteQuery = async () => {
    if (!selectedDatabase || !query) {
      setSnackbarOpen(true);
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post('https://reporteador-back.onrender.com/sql/execute', {
        connectionId: selectedDatabase,
        query: query,
      });
      setResults(response.data);
    } catch (error) {
      console.error('Error executing query:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async (format: string) => {
    if (!selectedDatabase || !query || !selectedTemplate) {
      setSnackbarOpen(true);
      return;
    }

    try {
      const response = await axios.post(`https://reporteador-back.onrender.com/file/${format}`, {
        connectionId: selectedDatabase,
        query: query,
        templateId: selectedTemplate,
      }, { responseType: 'blob' });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `report.${format}`);
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.error(`Error downloading ${format}:`, error);
    }
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom style={{ color: '#071952' }}>
        Generador de Reportes
      </Typography>

      <Box display="flex" flexDirection="column" mb={2}>
        <InputLabel id="database-label">Base de Datos</InputLabel>
        <Select
          labelId="database-label"
          value={selectedDatabase}
          onChange={(event: SelectChangeEvent) => setSelectedDatabase(event.target.value)}
        >
          {databases.map((db) => (
            <MenuItem key={db.id} value={db.id}>
              {db.type} - {db.host}
            </MenuItem>
          ))}
        </Select>
      </Box>

      <Box display="flex" flexDirection="column" mb={2}>
        <InputLabel id="template-label">Plantilla</InputLabel>
        <Select
          labelId="template-label"
          value={selectedTemplate}
          onChange={(event: SelectChangeEvent) => setSelectedTemplate(event.target.value)}
        >
          {templates.map((template) => (
            <MenuItem key={template.id} value={template.id}>
              {template.title}
            </MenuItem>
          ))}
        </Select>
      </Box>

      <TextField
        label="Sentencia SQL"
        multiline
        rows={4}
        variant="outlined"
        fullWidth
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={{ marginBottom: '16px' }}
      />

      <Button
        variant="contained"
        color="primary"
        onClick={handleExecuteQuery}
        disabled={loading}
      >
        Ejecutar Consulta
      </Button>

      {loading && <CircularProgress style={{ marginTop: '16px' }} />}

      {results && (
        <TableContainer component={Paper} style={{ marginTop: '16px' }}>
          <Table>
            <TableHead>
              <TableRow>
                {results.columns.map((column) => (
                  <TableCell key={column}>{column}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {results.rows.map((row, index) => (
                <TableRow key={index}>
                  {results.columns.map((column) => (
                    <TableCell key={column}>{row[column]}</TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {results && (
        <Box display="flex" justifyContent="space-between" marginTop={2}>
          <Button variant="contained" color="primary" onClick={() => handleDownload('pdf')}>
            Descargar PDF
          </Button>
          <Button variant="contained" color="primary" onClick={() => handleDownload('excel')}>
            Descargar Excel
          </Button>
          <Button variant="contained" color="primary" onClick={() => handleDownload('word')}>
            Descargar Word
          </Button>
        </Box>
      )}

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
        message="Por favor, selecciona una base de datos y escribe una consulta SQL."
      />
    </div>
  );
};

export default ReportesTableComponent;
