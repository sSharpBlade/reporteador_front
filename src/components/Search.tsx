import React, { useState } from 'react';
import TextField from '@mui/material/TextField';

interface SearchProps {
  onSearch: (searchTerm: string) => void;
}

const Search: React.FC<SearchProps> = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    onSearch(e.target.value);
  };

  return (
    <TextField
      label="Buscar"
      value={searchTerm}
      onChange={handleSearchChange}
    />
  );
};

export default Search;
