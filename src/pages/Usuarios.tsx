import React, { useEffect, useState } from 'react';
import AddComponent from '../components/AddComponent';
import TableComponent from '../components/UserTableComponent';
import axios from '../config/axiosConfig';
import { Box } from '@mui/material'; // Importa Box de MUI

const Usuarios = () => {
  const [users, setUsers] = useState<any[]>([]);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://reporteador-back.onrender.com/users');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleAdd = async (data: any) => {
    try {
      await axios.post('http://reporteador-back.onrender.com/users', data);
      fetchData(); // Actualizar la lista de usuarios después de agregar uno nuevo
    } catch (error) {
      console.error('Error adding data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <h1>Usuarios</h1>
      <Box m={3}> {/* Aquí agregas el margen */}
        <TableComponent />
      </Box>
    </div>
  );
};

export default Usuarios;
