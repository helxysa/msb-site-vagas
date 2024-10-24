import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebaseConfig';
import VagasManager from '../componentes/VagasManager/VagasManager';

interface VagaPreview {
  id: string;
  titulo: string;
  area: string;
  descricao: string;
}

async function getVagas(): Promise<VagaPreview[]> {
  const vagasRef = collection(db, 'vagas');
  const vagasSnapshot = await getDocs(vagasRef);
  return vagasSnapshot.docs.map(doc => ({
    id: doc.id,
    titulo: doc.data().titulo,
    area: doc.data().area,
    descricao: doc.data().descricao,
  }));
}

export default async function ListaVagas() {
  const vagas = await getVagas();

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-8 text-gray-800 text-center sm:text-left">Vagas Disponíveis</h1>
      <VagasManager initialVagas={vagas} />
    </div>
  );
}