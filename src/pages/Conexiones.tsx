// En la página Conexiones

import { useState } from 'react';
import AddComponent from '../components/AddComponent';
import TableComponent from '../components/TableComponent';
import axios from 'axios';

const Conexiones = () => {
  const [connections, setConnections] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:3000/servers');
      setConnections(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleAdd = async (data: void) => {
    try {
      await axios.post('http://localhost:3000/servers', data);
      fetchData(); // Actualizar la lista de conexiones después de agregar una nueva
    } catch (error) {
      console.error('Error adding data:', error);
    }
  };

  return (
    <div>
      <h1>Conexiones</h1>
      {/* Agregar lista de conexiones aquí */}
      <AddComponent onAdd={handleAdd} />
      <TableComponent />
    </div>
  );
};

export default Conexiones;
