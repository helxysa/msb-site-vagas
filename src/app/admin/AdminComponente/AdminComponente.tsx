"use client";
import React, { useState, useEffect } from "react";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import Loading from "../../componentes/Loading/Loading";
import dynamic from "next/dynamic";
import db from "@/lib/firestore";
const ExportPDF = dynamic(() => import('../../componentes/ExportPDF/ExportPDF'), { ssr: false })

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

export default function AdminPage() {
  const [vagas, setVagas] = useState<Vaga[]>([]);
  const [novaVaga, setNovaVaga] = useState<Omit<Vaga, "id">>({
    titulo: "",
    localizacao: "",
    descricao: "",
    responsabilidades: "",
    requisitos: "",
    beneficios: "",
    remuneracao: "",
    area: "",
  });
  const [editandoVaga, setEditandoVaga] = useState<Vaga | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchVagas();
  }, []);

  async function fetchVagas() {
    setIsLoading(true);
    try {
      const vagasCollection = collection(db, "vagas");
      const vagasSnapshot = await getDocs(vagasCollection);
      const vagasList = vagasSnapshot.docs.map(
        (doc) => ({ id: doc.id, ...doc.data() } as Vaga)
      );
      setVagas(vagasList);
    } catch (error) {
      console.error("Erro ao buscar vagas:", error);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleAddVaga(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);
    try {
      await addDoc(collection(db, "vagas"), novaVaga);
      setNovaVaga({
        titulo: "",
        localizacao: "",
        descricao: "",
        responsabilidades: "",
        requisitos: "",
        beneficios: "",
        remuneracao: "",
        area: "",
      });
      await fetchVagas();
    } catch (error) {
      console.error("Erro ao adicionar vaga:", error);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleUpdateVaga(e: React.FormEvent) {
    e.preventDefault();
    if (editandoVaga) {
      setIsLoading(true);
      try {
        const vagaRef = doc(db, "vagas", editandoVaga.id);
        await updateDoc(vagaRef, editandoVaga as any);
        setEditandoVaga(null);
        await fetchVagas();
      } catch (error) {
        console.error("Erro ao atualizar vaga:", error);
      } finally {
        setIsLoading(false);
      }
    }
  }

  async function handleDeleteVaga(id: string) {
    setIsLoading(true);
    try {
      await deleteDoc(doc(db, "vagas", id));
      await fetchVagas();
    } catch (error) {
      console.error("Erro ao excluir vaga:", error);
    } finally {
      setIsLoading(false);
    }
  }

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen p-6 bg-gray-200 flex items-center justify-center">
      <div className="container max-w-screen-lg mx-auto">
        <div>
          <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
            <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
              <div className="text-gray-800">
                <p className="font-medium text-lg">Gerenciamento de Vagas</p>
                <p className="text-sm text-gray-700">
                  Por favor, preencha todos os campos necessários para criar uma
                  nova vaga.
                </p>
              </div>

              <div className="lg:col-span-2">
                <form
                  onSubmit={editandoVaga ? handleUpdateVaga : handleAddVaga}
                  className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5"
                >
                  <div className="md:col-span-5">
                    <label htmlFor="titulo" className="text-gray-700 font-semibold">
                      Título da Vaga
                    </label>
                    <input
                      type="text"
                      id="titulo"
                      value={(editandoVaga || novaVaga).titulo}
                      onChange={(e) =>
                        editandoVaga
                          ? setEditandoVaga({
                              ...editandoVaga,
                              titulo: e.target.value,
                            })
                          : setNovaVaga({ ...novaVaga, titulo: e.target.value })
                      }
                      className="h-10 border mt-1 rounded px-4 w-full bg-gray-50 shadow-sm text-gray-900"
                      placeholder="Ex: Desenvolvedor Full Stack"
                    />
                  </div>

                  <div className="md:col-span-3">
                    <label htmlFor="area" className="text-gray-700 font-semibold">
                      Área
                    </label>
                    <input
                      type="text"
                      id="area"
                      value={(editandoVaga || novaVaga).area}
                      onChange={(e) =>
                        editandoVaga
                          ? setEditandoVaga({
                              ...editandoVaga,
                              area: e.target.value,
                            })
                          : setNovaVaga({ ...novaVaga, area: e.target.value })
                      }
                      className="h-10 border mt-1 rounded px-4 w-full bg-gray-50 shadow-sm text-gray-900"
                      placeholder="Ex: Tecnologia"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label htmlFor="localizacao" className="text-gray-700 font-semibold">
                      Localização
                    </label>
                    <input
                      type="text"
                      id="localizacao"
                      value={(editandoVaga || novaVaga).localizacao}
                      onChange={(e) =>
                        editandoVaga
                          ? setEditandoVaga({
                              ...editandoVaga,
                              localizacao: e.target.value,
                            })
                          : setNovaVaga({
                              ...novaVaga,
                              localizacao: e.target.value,
                            })
                      }
                      className="h-10 border mt-1 rounded px-4 w-full bg-gray-50 shadow-sm text-gray-900"
                      placeholder="Ex: São Paulo"
                    />
                  </div>

                  <div className="md:col-span-5">
                    <label htmlFor="descricao" className="text-gray-700 font-semibold">
                      Descrição da Vaga
                    </label>
                    <textarea
                      id="descricao"
                      value={(editandoVaga || novaVaga).descricao}
                      onChange={(e) =>
                        editandoVaga
                          ? setEditandoVaga({
                              ...editandoVaga,
                              descricao: e.target.value,
                            })
                          : setNovaVaga({
                              ...novaVaga,
                              descricao: e.target.value,
                            })
                      }
                      className="h-32 border mt-1 rounded px-4 w-full bg-gray-50 shadow-sm py-2 text-gray-900"
                      placeholder="Descreva os requisitos e responsabilidades da vaga..."
                    ></textarea>
                  </div>

                  <div className="md:col-span-5">
                    <label htmlFor="responsabilidades" className="text-gray-700 font-semibold">
                      Responsabilidades
                    </label>
                    <textarea
                      id="responsabilidades"
                      value={(editandoVaga || novaVaga).responsabilidades}
                      onChange={(e) =>
                        editandoVaga
                          ? setEditandoVaga({
                              ...editandoVaga,
                              responsabilidades: e.target.value,
                            })
                          : setNovaVaga({
                              ...novaVaga,
                              responsabilidades: e.target.value,
                            })
                      }
                      className="h-32 border mt-1 rounded px-4 w-full bg-gray-50 shadow-sm py-2 text-gray-900"
                      placeholder="Liste as principais responsabilidades do cargo..."
                    ></textarea>
                  </div>

                  <div className="md:col-span-5">
                    <label htmlFor="requisitos" className="text-gray-700 font-semibold">
                      Requisitos
                    </label>
                    <textarea
                      id="requisitos"
                      value={(editandoVaga || novaVaga).requisitos}
                      onChange={(e) =>
                        editandoVaga
                          ? setEditandoVaga({
                              ...editandoVaga,
                              requisitos: e.target.value,
                            })
                          : setNovaVaga({
                              ...novaVaga,
                              requisitos: e.target.value,
                            })
                      }
                      className="h-32 border mt-1 rounded px-4 w-full bg-gray-50 shadow-sm py-2 text-gray-900"
                      placeholder="Liste os requisitos necessários para a vaga..."
                    ></textarea>
                  </div>

                  <div className="md:col-span-5">
                    <label htmlFor="beneficios" className="text-gray-700 font-semibold">
                      Benefícios
                    </label>
                    <textarea
                      id="beneficios"
                      value={(editandoVaga || novaVaga).beneficios}
                      onChange={(e) =>
                        editandoVaga
                          ? setEditandoVaga({
                              ...editandoVaga,
                              beneficios: e.target.value,
                            })
                          : setNovaVaga({
                              ...novaVaga,
                              beneficios: e.target.value,
                            })
                      }
                      className="h-32 border mt-1 rounded px-4 w-full bg-gray-50 shadow-sm py-2 text-gray-900"
                      placeholder="Liste os benefícios oferecidos..."
                    ></textarea>
                  </div>

                  <div className="md:col-span-3">
                    <label htmlFor="remuneracao" className="text-gray-700 font-semibold">
                      Remuneração
                    </label>
                    <input
                      type="text"
                      id="remuneracao"
                      value={(editandoVaga || novaVaga).remuneracao}
                      onChange={(e) =>
                        editandoVaga
                          ? setEditandoVaga({
                              ...editandoVaga,
                              remuneracao: e.target.value,
                            })
                          : setNovaVaga({
                              ...novaVaga,
                              remuneracao: e.target.value,
                            })
                      }
                      className="h-10 border mt-1 rounded px-4 w-full bg-gray-50 shadow-sm text-gray-900"
                      placeholder="Ex: R$ 5.000 - R$ 7.000"
                    />
                  </div>

                  <div className="md:col-span-5 text-right mt-4">
                    <div className="inline-flex items-center">
                      {editandoVaga ? (
                        <>
                          <button
                            type="submit"
                            className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2 shadow"
                          >
                            <i className="fas fa-save mr-2"></i>Salvar
                            Alterações
                          </button>
                          <button
                            type="button"
                            onClick={() => setEditandoVaga(null)}
                            className="bg-gray-400 hover:bg-gray-500 text-gray-800 font-bold py-2 px-4 rounded shadow"
                          >
                            <i className="fas fa-times mr-2"></i>Cancelar
                          </button>
                        </>
                      ) : (
                        <button
                          type="submit"
                          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded shadow"
                        >
                          <i className="fas fa-save mr-2"></i>Adicionar Vaga
                        </button>
                      )}
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>

          {/* Lista de vagas */}
          <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8">
            <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
              <h2 className="font-medium text-xl text-gray-800 mb-4 sm:mb-0">
                Vagas Cadastradas
              </h2>
              <div className="w-full sm:w-auto">
                <ExportPDF />
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border border-gray-300 shadow-sm">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-6 py-3 border-b border-gray-300 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Título
                    </th>
                    <th className="px-6 py-3 border-b border-gray-300 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Área
                    </th>
                    <th className="px-6 py-3 border-b border-gray-300 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Localização
                    </th>
                    <th className="px-6 py-3 border-b border-gray-300 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Ações
                    </th>
                  </tr>
                </thead>
                <tbody className="text-gray-700 text-sm">
                  {vagas.map((vaga) => (
                    <tr key={vaga.id}>
                      <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200">
                        {vaga.titulo}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200">
                        {vaga.area}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200">
                        {vaga.localizacao}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200">
                        <button
                          onClick={() => setEditandoVaga(vaga)}
                          className="text-blue-600 hover:text-blue-800 mr-2"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            className="w-5 h-5"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                            />
                          </svg>
                        </button>
                        <button
                          onClick={() => handleDeleteVaga(vaga.id)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            className="w-5 h-5"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            />
                          </svg>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}