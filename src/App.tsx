// App.tsx

import React, { useState } from 'react';
import ComboBox from './ComboBox';
import Texto from './Texto';
import Tabla from './Tabla';
import './App.css';

const App: React.FC = () => {
  const [combo1, setCombo1] = useState<string>('');
  const [combo2, setCombo2] = useState<string>('');
  const [texto, setTexto] = useState<string>('');
  const [tabla, setTabla] = useState<{ combo1: string; combo2: string; texto: string }[]>([]);

  const handleCombo1Change = (e: React.ChangeEvent<HTMLSelectElement>) => setCombo1(e.target.value);
  const handleCombo2Change = (e: React.ChangeEvent<HTMLSelectElement>) => setCombo2(e.target.value);
  const handleTextoChange = (e: React.ChangeEvent<HTMLInputElement>) => setTexto(e.target.value);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setTabla([...tabla, { combo1, combo2, texto }]);
  };

  return (
    <div className="container">
      <h2>SQL Form</h2>
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <ComboBox
              id="combo1"
              label="Base de datos:"
              value={combo1}
              onChange={handleCombo1Change}
              options={[
                { value: '', label: 'Selecciona una opción' },
                { value: 'opcion1', label: 'MySQL' },
                { value: 'opcion2', label: 'PostgreSql' },
                { value: 'Oracle', label: 'Oracle' }
              ]}
            />
            
            <ComboBox
              id="combo2"
              label="Sentencias almacenadas:"
              value={combo2}
              onChange={handleCombo2Change}
              options={[
                { value: '', label: 'Selecciona una opción' },
                { value: 'opcion1', label: 'Opción 1' },
                { value: 'opcion2', label: 'Opción 2' }
              ]}
            />
          </div>
          
          <Texto
            id="texto"
            label="Ingrese una sentencia:"
            value={texto}
            onChange={handleTextoChange}
          />
          
          <button type="submit">Enviar</button>
        </form>
      </div>
      <div className="table-container">
        <Tabla tabla={tabla} />
      </div>
    </div>
  );
};

export default App;
