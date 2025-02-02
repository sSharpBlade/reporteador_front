import React, { useEffect, useState } from 'react';
import axios from '../config/axiosConfig';
import {
  Box,
  Button,
  CircularProgress,
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
    setResults(null); // Limpia los resultados anteriores
  
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
    
    if (!results || results.columns.length === 0 || results.rows.length === 0) {
      setSnackbarOpen(true);
      return;
    }
    
    try {
      const response = await axios.post(`https://reporteador-back.onrender.com/file/${format}`, {
        connectionId: selectedDatabase,
        query: query,
        templateId: selectedTemplate,
      }, { responseType: 'blob' });

      const blob = response.data;
      const url = window.URL.createObjectURL(new Blob([blob]));
      const link = document.createElement('a');
      link.href = url;
      const extension = format === 'word' ? 'docx' : format === 'excel' ? 'xlsx' : format;
      link.setAttribute('download', `report.${extension}`);
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
        <InputLabel id="database-label" style={{ color: '#071952' }}>Base de Datos</InputLabel>
        <Select
          labelId="database-label"
          value={selectedDatabase}
          onChange={(event: SelectChangeEvent) => setSelectedDatabase(event.target.value)}
          style={{ marginBottom: '16px' }}
        >
          {databases.map((db) => (
            <MenuItem key={db.id} value={db.id}>
              {db.type} - {db.host}
            </MenuItem>
          ))}
        </Select>
      </Box>

      <Box display="flex" flexDirection="column" mb={2}>
        <InputLabel id="template-label" style={{ color: '#071952' }}>Plantilla</InputLabel>
        <Select
          labelId="template-label"
          value={selectedTemplate}
          onChange={(event: SelectChangeEvent) => setSelectedTemplate(event.target.value)}
          style={{ marginBottom: '16px' }}
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
        style={{ marginBottom: '16px', borderColor: '#088395' }}
        InputLabelProps={{ style: { color: '#071952' } }}
      />

      <Button
        variant="contained"
        style={{  color: '#EBF4F6', marginBottom: '16px' }}
        onClick={handleExecuteQuery}
        disabled={loading}
      >
        Ejecutar Consulta
      </Button>

      {loading && <CircularProgress style={{ marginTop: '16px' }} />}

      {results && (
        <TableContainer component={Paper} style={{ marginTop: '16px', backgroundColor: '#EBF4F6' }}>
          <Table>
            <TableHead style={{ backgroundColor: '#088395' }}>
              <TableRow>
                {results.columns.map((column) => (
                  <TableCell key={column} style={{ color: '#EBF4F6' }}>{column}</TableCell>
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
          <Button variant="contained" style={{ backgroundColor: '#071952', color: '#EBF4F6' }} onClick={() => handleDownload('pdf')}>
            Descargar PDF
          </Button>
          <Button variant="contained" style={{ backgroundColor: '#071952', color: '#EBF4F6' }} onClick={() => handleDownload('excel')}>
            Descargar Excel
          </Button>
          <Button variant="contained" style={{ backgroundColor: '#071952', color: '#EBF4F6' }} onClick={() => handleDownload('word')}>
            Descargar Word
          </Button>
        </Box>
      )}

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
        message="Por favor, selecciona una base de datos, escribe una consulta SQL válida y asegúrate de que la consulta genere resultados."
      />
    </div>
  );
};

export default ReportesTableComponent;
