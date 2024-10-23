import { useState, useEffect } from 'react';
import Link from 'next/link';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import { Metadata } from 'next';
import CandidatoForm from '@/app/componentes/CandidatoForm/Candidato';
import { Suspense } from 'react';

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

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const vaga = await getVaga(id);
  return {
    title: vaga ? `Vaga: ${vaga.titulo}` : 'Vaga não encontrada',
  };
}

export default async function Candidato({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const vaga = await getVaga(id);

  if (!vaga) {
    return <div className="container mx-auto px-4 py-8">Vaga não encontrada</div>;
  }


  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">{vaga?.titulo}</h1>
        </div>

        <Suspense fallback={<div>Carregando...</div>}>
          <CandidatoForm vaga={vaga} />
        </Suspense>

        {/* Tips Section */}
        <div className="mt-8 bg-blue-50 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-3">Dicas para uma Candidatura de Sucesso</h3>
          <ul className="space-y-2 text-blue-800">
            <li className="flex items-start gap-2">
              <i className="fas fa-check-circle mt-1"></i>
              <span>Revise seu currículo e certifique-se que está atualizado</span>
            </li>
            <li className="flex items-start gap-2">
              <i className="fas fa-check-circle mt-1"></i>
              <span>Destaque projetos relevantes para a vaga</span>
            </li>
            <li className="flex items-start gap-2">
              <i className="fas fa-check-circle mt-1"></i>
              <span>Seja específico sobre suas experiências e conquistas</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}