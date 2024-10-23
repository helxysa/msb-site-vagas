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
      <div className="max-w-4xl mx-auto">
        <div className="bg-white p-4 rounded-lg shadow-lg flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <input
                type="text"
                placeholder="Pesquisar vagas..."
                className="w-full pl-10 pr-4 py-3 rounded-lg border focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition duration-200"
                value={pesquisa}
                onChange={(e) => setPesquisa(e.target.value)}
              />
              <i className="fas fa-search absolute left-3 top-3.5 text-gray-400"></i>
            </div>
          </div>
          <div className="flex-1">
            <div className="relative">
              <select
                className="w-full pl-10 pr-4 py-3 rounded-lg border focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition duration-200"
                value={filtroArea}
                onChange={(e) => setFiltroArea(e.target.value)}
              >
                <option value="">Todas as áreas</option>
                {areas.map(area => (
                  <option key={area} value={area}>{area}</option>
                ))}
              </select>
              <i className="fas fa-map-marker-alt absolute left-3 top-3.5 text-gray-400"></i>
            </div>
          </div>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition duration-200">
            Buscar
          </button>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {vagasFiltradas.map((vaga) => (
            <Link href={`/vagas/${vaga.id}`} key={vaga.id} className="block">
              <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition duration-200">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                      </svg>
                    </div>
                  </div>
                  
                  <h2 className="text-xl font-semibold text-gray-800 mb-2">{vaga.titulo}</h2>
                  <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                      {vaga.area}
                    </span>
                  <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-medium transition duration-200 mt-4">
                    Ver Detalhes
                  </button>
                </div>
              </div>
            </Link>
          ))}
        </div>
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