"use client";
import React, { useState, useEffect } from 'react';

interface Vaga {
  id: string;
  titulo: string;
  area: string;
  descricao: string;
}

interface SearchBarProps {
  vagas: Vaga[];
  onSearchResults: (results: Vaga[]) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ vagas, onSearchResults }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedArea, setSelectedArea] = useState('');

  useEffect(() => {
    const filteredVagas = vagas.filter((vaga) => 
      vaga.titulo.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedArea === '' || vaga.area === selectedArea)
    );
    onSearchResults(filteredVagas);
  }, [searchTerm, selectedArea, vagas, onSearchResults]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleAreaChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedArea(e.target.value);
  };

  // Get unique areas from vagas
  const areas = Array.from(new Set(vagas.map(vaga => vaga.area)));

  return (
    <div className="search-bar flex space-x-2">
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearch}
        placeholder="Buscar vagas..."
        className="w-2/3 px-4 py-2 text-gray-900 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <select
        value={selectedArea}
        onChange={handleAreaChange}
        className="w-1/3 px-4 py-2 text-gray-900 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="">Todas as áreas</option>
        {areas.map(area => (
          <option key={area} value={area}>{area}</option>
        ))}
      </select>
    </div>
  );
};

export default SearchBar;