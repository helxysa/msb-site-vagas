'use client'

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebaseConfig';
import Loading from '../componentes/Loading/Loading';

interface VagaPreview {
  id: string;
  titulo: string;
  area: string;
}

async function getVagas(): Promise<VagaPreview[]> {
  const vagasRef = collection(db, 'vagas');
  const vagasSnapshot = await getDocs(vagasRef);
  return vagasSnapshot.docs.map(doc => ({
    id: doc.id,
    titulo: doc.data().titulo,
    area: doc.data().area,
  }));
}

function ListaVagasContent({ initialVagas }: { initialVagas: VagaPreview[] }) {
  const [vagas, setVagas] = useState<VagaPreview[]>(initialVagas);
  const [areas, setAreas] = useState<string[]>([]);
  const [filtroArea, setFiltroArea] = useState<string>('');
  const [pesquisa, setPesquisa] = useState<string>('');

  useEffect(() => {
    const areasUnicas = Array.from(new Set(initialVagas.map(vaga => vaga.area)));
    setAreas(areasUnicas);
  }, [initialVagas]);

  const vagasFiltradas = vagas.filter(vaga => 
    (filtroArea === '' || vaga.area === filtroArea) &&
    (pesquisa === '' || vaga.titulo.toLowerCase().includes(pesquisa.toLowerCase()) || vaga.area.toLowerCase().includes(pesquisa.toLowerCase()))
  );

  return (
    <>
      <div className="mb-8 flex flex-col sm:flex-row gap-4">
        <select
          className="p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 flex-grow sm:flex-grow-0"
          value={filtroArea}
          onChange={(e) => setFiltroArea(e.target.value)}
        >
          <option value="">Todas as áreas</option>
          {areas.map(area => (
            <option key={area} value={area}>{area}</option>
          ))}
        </select>
        
        <input
          type="text"
          placeholder="Pesquisar vagas..."
          className="p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 flex-grow"
          value={pesquisa}
          onChange={(e) => setPesquisa(e.target.value)}
        />
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {vagasFiltradas.map((vaga) => (
          <Link href={`/vagas/${vaga.id}`} key={vaga.id} className="block p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-200 hover:border-green-500">
            <h2 className="text-xl font-semibold mb-2 text-gray-800">{vaga.titulo}</h2>
            <p className="text-gray-600 bg-gray-100 inline-block px-2 py-1 rounded-full text-sm">{vaga.area}</p>
            <p className="text-gray-600 text-sm mt-2  underline">Ver mais detalhes</p>
          </Link>
        ))}
      </div>
    </>
  );
}

export default function ListaVagas() {
  const [vagas, setVagas] = useState<VagaPreview[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchVagas() {
      try {
        const vagasData = await getVagas();
        setVagas(vagasData);
      } catch (error) {
        console.error("Erro ao buscar vagas:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchVagas();
  }, []);

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-8 text-gray-800 text-center sm:text-left">Vagas Disponíveis</h1>
      {loading ? (
        <Loading />
      ) : (
        <ListaVagasContent initialVagas={vagas} />
      )}
    </div>
  );
}