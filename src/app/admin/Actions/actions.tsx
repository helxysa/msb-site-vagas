import {
    collection,
    addDoc,
    getDocs,
    doc,
    updateDoc,
    deleteDoc,
    query,
    where,
    
  } from "firebase/firestore";
  import db from "@/lib/firestore";
  import { getDoc } from "firebase/firestore";

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

  interface Candidatura {
    id: string;
    aceitouTermos: boolean;
    dataCandidatura: Date;
    email: string;
    informacoesAdicionais: string;
    linkCurriculo: string;
    nome: string;
    telefone: string;
    vagaId: string;
  }

  async function getVagas(): Promise<Vaga[]> {
    try {
      const vagasCollection = collection(db, "vagas");
      const vagasSnapshot = await getDocs(vagasCollection);
      return vagasSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as Vaga));
    } catch (error) {
      console.error("Erro ao buscar vagas:", error);
      throw error;
    }
  }
  
  async function getCandidatos(vagaId?: string): Promise<Candidato[]> {
    try {
      const candidatosCollection = collection(db, "candidatos");
      let candidatosQuery;
  
      if (vagaId) {
        candidatosQuery = query(candidatosCollection, where("vagaId", "==", vagaId));
      } else {
        candidatosQuery = candidatosCollection;
      }
  
      const candidatosSnapshot = await getDocs(candidatosQuery);
      return candidatosSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as Candidato));
    } catch (error) {
      console.error("Erro ao buscar candidatos:", error);
      throw error;
    }
  }


  async function editVaga(vagaId: string, updatedData: Partial<Vaga>): Promise<void> {
    try {
      const vagaRef = doc(db, "vagas", vagaId);
      await updateDoc(vagaRef, updatedData);
      console.log("Vaga atualizada com sucesso!");
    } catch (error) {
      console.error("Erro ao editar vaga:", error);
      throw error;
    }
  }
  
  async function deleteVaga(vagaId: string): Promise<void> {
    try {
      const vagaRef = doc(db, "vagas", vagaId);
      await deleteDoc(vagaRef);
      console.log("Vaga deletada com sucesso!");
    } catch (error) {
      console.error("Erro ao deletar vaga:", error);
      throw error;
    }
  }

  async function addVaga(vaga: Omit<Vaga, 'id'>): Promise<string> {
    try {
      const vagasCollection = collection(db, "vagas");
      const docRef = await addDoc(vagasCollection, vaga);
      console.log("Vaga adicionada com sucesso! ID:", docRef.id);
      return docRef.id;
    } catch (error) {
      console.error("Erro ao adicionar vaga:", error);
      throw error;
    }
  }
  

  
  async function getVaga(vagaId: string, titulo: string) {
    try {
      const vagaRef = doc(db, 'vagas', vagaId);
      const vagaSnap = await getDoc(vagaRef);
      
      if (vagaSnap.exists()) {
        return {
          id: vagaSnap.id,
          titulo: vagaSnap.data().titulo
        };
      }
      return null;
    } catch (error) {
      console.error('Erro ao buscar vaga:', error);
      return null;
    }
  }
  
  export { 
    getVagas, 
    getCandidatos,
    editVaga,
    deleteVaga,
    addVaga,
    getVaga,
  };