import React, { useEffect, useState } from 'react';
import AddComponent from '../components/AddComponent';
import TableComponent from '../components/UserTableComponent';
import axios from '../config/axiosConfig';

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
      
      <TableComponent   />
    </div>
  );
};

export default Usuarios;
