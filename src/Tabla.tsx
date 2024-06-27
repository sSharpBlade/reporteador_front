import React from 'react';

interface TablaProps {
  tabla: { combo1: string; combo2: string; texto: string }[];
}

const Tabla: React.FC<TablaProps> = ({ tabla }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Base de datos:</th>
          <th>Combo Box 2</th>
          <th>Texto</th>
        </tr>
      </thead>
      <tbody>
        {tabla.map((fila, index) => (
          <tr key={index}>
            <td>{fila.combo1}</td>
            <td>{fila.combo2}</td>
            <td>{fila.texto}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Tabla;
