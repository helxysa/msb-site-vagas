"use client"
import React, { useState, useCallback } from 'react';
import SearchBar from '../SearchBar/SearchBar';
import VagasList from '../VagasList/VagasList';

interface Vaga {
  id: string;
  titulo: string;
  area: string;
  descricao: string;
}

interface VagasManagerProps {
  initialVagas: Vaga[];
}

const VagasManager: React.FC<VagasManagerProps> = ({ initialVagas }) => {
  const [vagas, setVagas] = useState<Vaga[]>(initialVagas);

  const handleSearchResults = useCallback((results: Vaga[]) => {
    console.log('Search results:', results);
    setVagas(results);
  }, []);

  return (
    <>
      <div className="max-w-4xl mx-auto mb-8">
        <SearchBar vagas={initialVagas} onSearchResults={handleSearchResults} />
      </div>
      <VagasList vagas={vagas} />
    </>
  );
};

export default VagasManager;