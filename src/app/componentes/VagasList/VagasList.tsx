import React from 'react';
import Link from 'next/link';

interface Vaga {
  id: string;
  titulo: string;
  area: string;
  descricao: string;
}

interface VagasListProps {
  vagas: Vaga[];
}

const VagasList: React.FC<VagasListProps> = ({ vagas }) => {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {vagas.map((vaga) => (
          <Link href={`/vagas/${vaga.id}`} key={vaga.id} className="block h-full">
            <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition duration-200 h-full flex flex-col">
              <div className="p-6 flex-grow flex flex-col">
                <div className="flex items-center justify-between mb-4">
                  <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                    </svg>
                  </div>
                </div>
                
                <h2 className="text-xl font-semibold text-gray-800 mb-2">{vaga.titulo}</h2>
                <h3 className="text-sm text-gray-500 mb-4 flex-grow">{vaga.descricao}</h3>
                <div className="mt-auto">
                  <span className="inline-block bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium mb-4">
                    {vaga.area}
                  </span>
                  <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-medium transition duration-200">
                    Ver Detalhes
                  </button>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    );
  };
  
export default VagasList;