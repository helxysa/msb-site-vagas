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

  
  
  export { 
    getVagas, 
    getCandidatos 
  };