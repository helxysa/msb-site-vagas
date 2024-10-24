'use client'
import { useEffect, useState } from 'react';
import {
  collection,
  getDocs,
} from "firebase/firestore";
import db from "@/lib/firestore";
import Link from 'next/link';
import Loading from '@/app/componentes/Loading/Loading';

interface Vaga {
  id: string;
  titulo: string;
  localizacao: string;
  descricao: string;
  responsabilidades: string;
  requisitos: string;
  beneficios: string;
  remuneracao: string;
  area: string;

}

interface Candidato {
  id: string;
  nome: string;
  email: string;
  telefone: string;
  vagaId: string;
}

function TotalVagasCard({ vagas }: { vagas: Vaga[] }) {
  return (
    <Link href="/admin/candidatos" className="block">
      <div className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow duration-300">
        <div className="flex justify-between items-center mb-2">
            <h2 className="text-xl font-semibold text-gray-700">Total de Vagas</h2>
            <div className="bg-green-200 rounded-full p-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          </div>
        </div>
        <p className="text-4xl font-bold text-gray-900">{vagas.length}</p>
      </div>
    </Link>
  );
}

function TotalCandidatosCard({ candidatos }: { candidatos: Candidato[] }) {
  return (
    <Link href="/admin/todos-candidatos" className="block">
      <div className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow duration-300">
        <div className="flex justify-between items-center mb-2">
            <h2 className="text-xl font-semibold text-gray-700">Total de Candidatos</h2>
            <div className="bg-green-200 rounded-full p-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
        </div>
        <p className="text-4xl font-bold text-gray-900">{candidatos.length}</p>
      </div>
    </Link>
  );
}

function UltimasVagas({ vagas }: { vagas: Vaga[] }) {
  return (
    <div className="bg-white rounded-lg shadow-lg p-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-semibold text-gray-800">Últimas Vagas</h2>
        <div className="bg-blue-200 rounded-full p-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        </div>
      </div>
      <ul className="space-y-3">
        {vagas.slice(0, 5).map((vaga, index) => (
          <li key={`vaga-${vaga.id || index}`} className="flex items-center">
            <div className="w-3 h-3 bg-blue-600 rounded-full mr-3"></div>
            <span className="text-base text-gray-700">{vaga.titulo}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function UltimosCandidatos({ candidatos }: { candidatos: Candidato[] }) {
  return (
    <div className="bg-white rounded-lg shadow-lg p-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-semibold text-gray-800">Últimos Candidatos</h2>
        <div className="bg-green-200 rounded-full p-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
        </div>
      </div>
      <ul className="space-y-3">
        {candidatos.slice(0, 5).map((candidato, index) => (
          <li key={`candidato-${candidato.id || index}`} className="flex items-center">
            <div className="w-3 h-3 bg-green-600 rounded-full mr-3"></div>
            <span className="text-base text-gray-700">{candidato.nome}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}



export default function Dashboard() {
  const [vagas, setVagas] = useState<Vaga[]>([]);
  const [candidatos, setCandidatos] = useState<Candidato[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [vagasComCandidatos, setVagasComCandidatos] = useState<Vaga[]>([]);

  useEffect(() => {
    const fetchVagas = async () => {
      setIsLoading(true);
      try {
        const vagasCollection = collection(db, "vagas");
        const vagasSnapshot = await getDocs(vagasCollection);
        const vagasData = vagasSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        } as Vaga));
        setVagas(vagasData);
        setIsLoading(false);
      } catch (error) {
        console.error("Erro ao buscar vagas:", error);
      }
    };

    const fetchCandidatos = async () => {
      setIsLoading(true);
      try {
        const candidatosCollection = collection(db, "candidatos");
        const candidatosSnapshot = await getDocs(candidatosCollection);
        const candidatosData = candidatosSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        } as Candidato));
        setCandidatos(candidatosData);
        setIsLoading(false);
      } catch (error) {
        console.error("Erro ao buscar candidatos:", error);
      }
    };

    fetchVagas();
    fetchCandidatos();
  }, []);

  useEffect(() => {
    setIsLoading(true);
    const calculateVagasComCandidatos = () => {
      console.log("Calculating candidaturas for each vaga...");
      const updatedVagasComCandidatos = vagas.map(vaga => {
        const candidaturasCount = candidatos.filter(candidato => candidato.vagaId === vaga.id).length;
        console.log(`Vaga ID: ${vaga.id}, Candidaturas: ${candidaturasCount}`);
        return {
          ...vaga,
          candidaturas: candidaturasCount
        };
      });
      setVagasComCandidatos(updatedVagasComCandidatos);
      setIsLoading(false);
    };

    if (vagas.length && candidatos.length) {
      calculateVagasComCandidatos();
    }
  }, [vagas, candidatos]);

  if (isLoading) {  
    return <Loading />;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-gray-800">Dashboard Administrativo</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <TotalVagasCard vagas={vagas} />
        <TotalCandidatosCard candidatos={candidatos} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <UltimasVagas vagas={vagas} />
        <UltimosCandidatos candidatos={candidatos} />
      </div>
      <CandidaturasPorVaga />
         </div>
  );
}

function CandidaturasPorVaga() {
  const [vagasComCandidatos, setVagasComCandidatos] = useState<{ id: string, titulo: string, candidaturas: number }[]>([]);

  useEffect(() => {
    const fetchVagasAndCandidatos = async () => {
      try {
        const vagasCollection = collection(db, "vagas");
        const vagasSnapshot = await getDocs(vagasCollection);
        const vagasData = vagasSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        } as Vaga));

        const candidatosCollection = collection(db, "candidatos");
        const candidatosSnapshot = await getDocs(candidatosCollection);
        const candidatosData = candidatosSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        } as Candidato));

        const updatedVagasComCandidatos = vagasData.map(vaga => {
          const candidaturasCount = candidatosData.filter(candidato => candidato.vagaId === vaga.id).length;
          return {
            id: vaga.id,
            titulo: vaga.titulo,
            candidaturas: candidaturasCount
          };
        });

        setVagasComCandidatos(updatedVagasComCandidatos);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      }
    };

    fetchVagasAndCandidatos();
  }, []);

  return (
    <div className="bg-white rounded-lg shadow-lg p-8">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Candidaturas por Vaga</h2>
      <div className="flex items-end justify-around h-64 space-x-4">
        {vagasComCandidatos.slice(0, 5).map((vaga, index) => {
          const candidaturas = vaga.candidaturas;
          const maxCandidaturas = Math.max(...vagasComCandidatos.map(v => v.candidaturas));
          const altura = candidaturas && maxCandidaturas > 0 
            ? (candidaturas / maxCandidaturas) * 100 
            : 0;
          
          return (
            <div key={`grafico-vaga-${vaga.id || index}`} className="flex flex-col items-center w-1/6">
              <div className="relative w-full mb-2">
                {candidaturas > 0 && (
                  <div 
                    className="bg-blue-600 text-gray-900 rounded-t-lg w-full transition-all duration-500"
                    style={{ 
                      height: `${altura}%`,
                      minHeight: candidaturas > 0 ? '50px' : ''
                    }}
                  >
                    <span className="absolute -top-6 text-gray-900 left-1/2 transform -translate-x-1/2 text-sm font-semibold">
                      {candidaturas}
                    </span>
                  </div>
                )}
              </div>
              <span className="text-sm text-gray-700 text-center font-medium w-full truncate px-2" title={vaga.titulo}>
                {vaga.titulo}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}