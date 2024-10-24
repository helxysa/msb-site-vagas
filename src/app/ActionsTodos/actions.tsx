

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
  

  export default getVagas;