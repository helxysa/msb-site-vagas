'use client';

import { useState, useEffect } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebaseConfig';
import { useParams } from 'next/navigation';
import Loading from '@/app/componentes/Loading/Loading';
import ShareButton from '@/app/componentes/ShareButton/ShareButton';


interface Vaga {
  id: string;
  titulo: string;
  localizacao: string;
  area: string;
  remuneracao: string;
  descricao: string;
  responsabilidades: string;
  requisitos: string;
  beneficios: string;
}

async function getVaga(id: string): Promise<Vaga | null> {
  const docRef = doc(db, 'vagas', id);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) {
    return null;
  }

  return { id: docSnap.id, ...docSnap.data() } as Vaga;
}

  
export default function VagaDetalhes() {
  const params = useParams();
  const [vaga, setVaga] = useState<Vaga | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchVaga() {
      if (params.id) {
        try {
          const vagaData = await getVaga(params.id as string);
          setVaga(vagaData);
        } catch (error) {
          console.error("Erro ao buscar vaga:", error);
        } finally {
          setLoading(false);
        }
      }
    }

    fetchVaga();
  }, [params.id]);

  if (loading) {
    return <Loading />;
  }

  if (!vaga) {
    return <div className="container mx-auto px-4 py-8">Vaga não encontrada</div>;
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Breadcrumb */}
      

      {/* Job Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-6 sm:py-8 md:py-10 lg:py-12">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
            <div className="h-12 w-12 sm:h-16 sm:w-16 bg-blue-100 rounded-xl flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6 text-blue-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
              </svg>
            </div>
            <div className="flex-1">
              <div className="flex flex-wrap gap-2 mb-2">
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs sm:text-sm font-medium">Novo</span>
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs sm:text-sm font-medium">CLT</span>
              </div>
              <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-2">{vaga.titulo}</h1>
              <div className="flex flex-wrap gap-4 text-gray-700">
                <div className="flex items-center gap-2">
                  <i className="fas fa-map-marker-alt"></i>
                  <span className="text-sm sm:text-base">{vaga.localizacao}</span>
                </div>
                <div className="flex items-center gap-2">
                  <i className="fas fa-money-bill-wave"></i>
                  <span className="text-sm sm:text-base">{vaga.remuneracao}</span>
                </div>
              </div>
            </div>
            <button className="w-full sm:w-auto bg-blue-700 hover:bg-blue-800 text-white px-6 sm:px-8 py-2 sm:py-3 rounded-lg font-semibold transition duration-200 text-sm sm:text-base">
              Candidatar-se
            </button>
            <ShareButton id={vaga.id} titulo={vaga.titulo} descricao={vaga.descricao} />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6 sm:py-8 md:py-10 lg:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2">
            {/* Job Description */}
            <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 mb-6">
              <h2 className="text-lg sm:text-xl font-semibold mb-4 text-gray-900">Descrição da Vaga</h2>
              <p className="text-gray-700 mb-6 text-sm sm:text-base">{vaga.descricao}</p>
              
              <h3 className="font-semibold mb-3 text-gray-800">Responsabilidades:</h3>
              <p className="text-gray-700 mb-6 text-sm sm:text-base">{vaga.responsabilidades}</p>

              <h3 className="font-semibold mb-3 text-gray-800">Requisitos:</h3>
              <p className="text-gray-700 mb-6 text-sm sm:text-base">{vaga.requisitos}</p>

              <h3 className="font-semibold mb-3 text-gray-800">Benefícios:</h3>
              <p className="text-gray-700 text-sm sm:text-base">{vaga.beneficios}</p>
            </div>

            {/* Tech Stack */}
            <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6">
              <h2 className="text-lg sm:text-xl font-semibold mb-4 text-gray-900">Área Relacionada</h2>
              <div className="flex flex-wrap gap-2">
                <span className="bg-blue-50 text-blue-800 px-3 sm:px-4 py-1 sm:py-2 rounded-lg text-xs sm:text-sm">{vaga.area}</span>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Company Card */}
            <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6">
              <h2 className="text-lg sm:text-xl font-semibold mb-4 text-gray-900">Sobre a Empresa</h2>
              <p className="text-gray-700 mb-4 text-sm sm:text-base">
                Informações sobre a empresa não disponíveis.
              </p>
              <div className="flex flex-col gap-3 text-gray-700">
                <div className="flex items-center gap-2">
                  <i className="fas fa-map-marker-alt w-5"></i>
                  <span className="text-sm sm:text-base">{vaga.localizacao}</span>
                </div>
              </div>
            </div>

            {/* How to Apply */}
            <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6">
              <h2 className="text-lg sm:text-xl font-semibold mb-4 text-gray-900">Como se Candidatar</h2>
              <div className="space-y-4">
                <p className="text-gray-700 text-sm sm:text-base">
                  Clique no botão "Candidatar-se" e preencha o formulário com suas informações.
                </p>
                <button className="w-full bg-blue-700 hover:bg-blue-800 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold transition duration-200 text-sm sm:text-base">
                  Candidatar-se Agora
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}