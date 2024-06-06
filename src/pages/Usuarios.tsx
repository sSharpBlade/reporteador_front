// En la página Usuarios
import AddComponent from '../components/AddComponent';

const Usuarios = () => {
  const handleAdd = (data: any) => {
    // Lógica para agregar el nuevo usuario
    console.log('Agregando nuevo usuario:', data);
  };

  return (
    <div>
        <h1>Usuarios</h1>
      {/* Agregar lista de usuarios aquí */}
      <AddComponent onAdd={handleAdd} />
    </div>
  );
};

export default Usuarios;
