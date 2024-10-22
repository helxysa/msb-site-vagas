'use client'
import React, { useState, useEffect } from 'react'
import { collection, getDocs } from 'firebase/firestore'
import db from '@/lib/firestore'
import Link from 'next/link'
import { useAuth } from '@/app/componentes/AuthContext/AuthContext';

interface Vaga {
  id: string
  titulo: string
  localizacao: string
  area: string
  remuneracao: string
}

export default function VagasPage() {
  const [vagas, setVagas] = useState<Vaga[]>([])
  const { userId, setSelectedVagaId } = useAuth();
  useEffect(() => {
    fetchVagas()
  }, [])

  async function fetchVagas() {
    const vagasCollection = collection(db, 'vagas')
    const vagasSnapshot = await getDocs(vagasCollection)
    const vagasList = vagasSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Vaga))
    
    setVagas(vagasList)
  }

  return (
    <div className="container mx-auto px-4 py-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-800 text-center">Lista de Vagas</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {vagas.map((vaga) => (
          <div key={vaga.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
            <div className="p-6">
              {/* ... other vaga details ... */}
              <Link 
                href={`/vagas/${vaga.id}`} 
                className="inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors duration-300"
                onClick={() => setSelectedVagaId(vaga.id)}
              >
                Ver mais detalhes
              </Link>   
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}