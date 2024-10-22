'use client'
import React, { useState, useEffect } from 'react'
import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore'
import db from '@/lib/firestore'

interface Vaga {
  id: string
  titulo: string
  localizacao: string
  descricao: string
  responsabilidades: string
  requisitos: string
  beneficios: string
  remuneracao: string
  area: string
}

 export default function AdminPage() {
  const [vagas, setVagas] = useState<Vaga[]>([])
  const [novaVaga, setNovaVaga] = useState<Omit<Vaga, 'id'>>({
    titulo: '',
    localizacao: '',
    descricao: '',
    responsabilidades: '',
    requisitos: '',
    beneficios: '',
    remuneracao: '',
    area: ''
  })
  const [editandoVaga, setEditandoVaga] = useState<Vaga | null>(null)

  useEffect(() => {
    fetchVagas()
  }, [])

  async function fetchVagas() {
    const vagasCollection = collection(db, 'vagas')
    const vagasSnapshot = await getDocs(vagasCollection)
    const vagasList = vagasSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Vaga))
    setVagas(vagasList)
  }

  async function handleAddVaga(e: React.FormEvent) {
    e.preventDefault()
    await addDoc(collection(db, 'vagas'), novaVaga)
    setNovaVaga({
      titulo: '',
      localizacao: '',
      descricao: '',
      responsabilidades: '',
      requisitos: '',
      beneficios: '',
      remuneracao: '',
      area: ''
    })
    fetchVagas()
  }

  async function handleUpdateVaga(e: React.FormEvent) {
    e.preventDefault()
    if (editandoVaga) {
      const vagaRef = doc(db, 'vagas', editandoVaga.id)
      await updateDoc(vagaRef, editandoVaga as any)
      setEditandoVaga(null)
      fetchVagas()
    }
  }

  async function handleDeleteVaga(id: string) {
    await deleteDoc(doc(db, 'vagas', id))
    fetchVagas()
  }

  return (
    <div className="container mx-auto p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Administração de Vagas</h1>

      {/* Formulário para adicionar/editar vaga */}
      <form onSubmit={editandoVaga ? handleUpdateVaga : handleAddVaga} className="mb-8 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4 text-gray-700">
          {editandoVaga ? 'Editar Vaga' : 'Adicionar Nova Vaga'}
        </h2>
        {Object.keys(novaVaga).map((campo) => (
          <input
            key={campo}
            type="text"
            placeholder={campo.charAt(0).toUpperCase() + campo.slice(1)}
            value={(editandoVaga || novaVaga)[campo as keyof Omit<Vaga, 'id'>]}
            onChange={(e) => editandoVaga 
              ? setEditandoVaga({ ...editandoVaga, [campo]: e.target.value })
              : setNovaVaga({ ...novaVaga, [campo]: e.target.value })
            }
            className="w-full p-3 mb-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        ))}
        {editandoVaga ? (
          <div>
            <button type="submit" className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-md mr-2 transition duration-300">
              Salvar Alterações
            </button>
            <button
              type="button"
              onClick={() => setEditandoVaga(null)}
              className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-md transition duration-300"
            >
              Cancelar
            </button>
          </div>
        ) : (
          <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md transition duration-300">
            Adicionar Vaga
          </button>
        )}
      </form>

      {/* Lista de vagas */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4 text-gray-700">Vagas Existentes</h2>
        {vagas.map((vaga) => (
          <div key={vaga.id} className="border-b border-gray-200 py-4 last:border-b-0">
            <h3 className="font-bold text-lg text-gray-800">{vaga.titulo}</h3>
            <p className="text-gray-600">Localização: {vaga.localizacao}</p>
            <p className="text-gray-600 mb-2">Área: {vaga.area}</p>
            <button
              onClick={() => setEditandoVaga(vaga)}
              className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-1 px-3 rounded-md mr-2 transition duration-300"
            >
              Editar
            </button>
            <button
              onClick={() => handleDeleteVaga(vaga.id)}
              className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-3 rounded-md transition duration-300"
            >
              Excluir
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}