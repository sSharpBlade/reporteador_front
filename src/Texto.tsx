import React from 'react';

interface TextoProps {
  id: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Texto: React.FC<TextoProps> = ({ id, label, value, onChange }) => {
  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <input id={id} type="text" value={value} onChange={onChange} />
    </div>
  );
};

export default Texto;
