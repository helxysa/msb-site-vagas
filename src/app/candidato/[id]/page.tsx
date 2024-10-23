'use client';

import { useState, useEffect } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebaseConfig';
import { use } from 'react';
import Loading from '@/app/componentes/Loading/Loading';
import Link from 'next/link';

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

interface Candidato {
  id: string;
  nome: string;
  email: string;
  curriculo: File | null;
}

async function getVaga(id: string): Promise<Vaga | null> {
  const docRef = doc(db, 'vagas', id);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) {
    return null;
  }

  return { id: docSnap.id, ...docSnap.data() } as Vaga;
}

interface PageProps {
  params: Promise<{ id: string }>;
  searchParams: { [key: string]: string | string[] | undefined };
}



export default function VagaDetalhes({ params, searchParams }: PageProps) {
  const { id } = use(params);
  //teste
  const [vaga, setVaga] = useState<Vaga | null>(null);
  const [loading, setLoading] = useState(true);

  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [curriculo, setCurriculo] = useState<File | null>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Aqui você pode adicionar a lógica para enviar o formulário
    console.log('Formulário enviado', { nome, email, curriculo });
  };

  useEffect(() => {
    async function fetchVaga() {
      if (id) {
        try {
          const vagaData = await getVaga(id);
          setVaga(vagaData);
        } catch (error) {
          console.error("Erro ao buscar vaga:", error);
        } finally {
          setLoading(false);
        }
      }
    }

    fetchVaga();
  }, [id]);

  if (loading) {
    return <Loading />;
  }

  if (!vaga) {
    return <div className="container mx-auto px-4 py-8">Vaga não encontrada</div>;
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Breadcrumb */}
      <nav className="bg-white border-b">
        <div className="container mx-auto px-4 py-3">
          <ol className="list-none p-0 inline-flex">
            <li className="flex items-center">
              <Link href="/todas-vagas/" className="text-blue-600 hover:text-blue-800">
                Vagas
              </Link>
              <svg className="fill-current w-3 h-3 mx-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
                <path d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z" />
              </svg>
            </li>
            <li className="flex items-center">
              <Link href={`/vagas/${vaga.id}`} className="text-blue-600 hover:text-blue-800">
                Candidatura
              </Link>
              <svg className="fill-current w-3 h-3 mx-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
                <path d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z" />
              </svg>
            </li>
            <li>
              <span className="text-gray-500">{vaga.titulo}</span>
            </li>
          </ol>
        </div>
      </nav>

      {/* Job Header */}
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-sm p-6 sm:p-8 w-full max-w-md mx-auto">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">Candidatura para Vaga</h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="nome" className="block text-sm font-medium text-gray-700 mb-1">
                Nome
              </label>
              <input
                type="text"
                id="nome"
                name="nome"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label htmlFor="curriculo" className="block text-sm font-medium text-gray-700 mb-1">
                Currículo (PDF ou DOC)
              </label>
              <input
                type="file"
                id="curriculo"
                name="curriculo"
                accept=".pdf,.doc,.docx"
                onChange={(e) => setCurriculo(e.target.files ? e.target.files[0] : null)}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 rounded-lg font-semibold transition duration-200 text-sm sm:text-base"
            >
              Enviar Candidatura
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}