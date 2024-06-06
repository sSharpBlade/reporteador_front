// En la página Conexiones
import AddComponent from '../components/AddComponent';
import TableComponent from '../components/TableComponent';

const Conexiones = () => {
  const handleAdd = (data: any) => {
    // Lógica para agregar la nueva conexión
    console.log('Agregando nueva conexión:', data);
  };

  return (
    <div>
        <h1>Conexiones</h1>
      {/* Agregar lista de conexiones aquí */}
      <AddComponent onAdd={handleAdd} />
      <div>
      <TableComponent />
    </div>
    </div>
  );
};

export default Conexiones;
