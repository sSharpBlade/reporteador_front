// En la página Plantillas
import AddComponent from '../components/AddComponent';

const Plantillas = () => {
  const handleAdd = (data: any) => {
    // Lógica para agregar la nueva plantilla
    console.log('Agregando nueva plantilla:', data);
  };

  return (
    <div>
        <h1>Plantillas</h1>
      {/* Agregar lista de plantillas aquí */}
      <AddComponent onAdd={handleAdd} />
    </div>
  );
};

export default Plantillas;
