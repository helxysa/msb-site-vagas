'use client';

import { useState, useEffect } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebaseConfig';
import { useParams } from 'next/navigation';
import Loading from '@/app/componentes/Loading/Loading';

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
    <div className="container mx-auto px-4 py-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">{vaga.titulo}</h1>
      <div className="bg-white rounded-lg shadow-md p-6">
        <p className="text-gray-600 mb-2"><span className="font-medium">Localização:</span> {vaga.localizacao}</p>
        <p className="text-gray-600 mb-2"><span className="font-medium">Área:</span> {vaga.area}</p>
        <p className="text-gray-600 mb-4"><span className="font-medium">Remuneração:</span> {vaga.remuneracao}</p>
        <h2 className="text-xl font-semibold mb-2 text-gray-800">Descrição</h2>
        <p className="text-gray-600 mb-4">{vaga.descricao}</p>
        <h2 className="text-xl font-semibold mb-2 text-gray-800">Responsabilidades</h2>
        <p className="text-gray-600 mb-4">{vaga.responsabilidades}</p>
        <h2 className="text-xl font-semibold mb-2 text-gray-800">Requisitos</h2>
        <p className="text-gray-600 mb-4">{vaga.requisitos}</p>
        <h2 className="text-xl font-semibold mb-2 text-gray-800">Benefícios</h2>
        <p className="text-gray-600 mb-4">{vaga.beneficios}</p>
      </div>
    </div>
  );
}