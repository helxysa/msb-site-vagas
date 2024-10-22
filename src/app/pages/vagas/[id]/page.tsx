import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebaseConfig';
import ClientComponent from './ClienteComponente'; // Vamos criar este componente

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

export default async function VagaDetalhes({ params }: { params: { id: string } }) {
  const vaga = await getVaga(params.id);

  if (!vaga) {
    return <div className="container mx-auto px-4 py-8">Vaga não encontrada</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">{vaga.titulo}</h1>
      <div className="bg-white rounded-lg shadow-md p-6">
        {/* Resto do JSX para exibir os detalhes da vaga */}
      </div>
      <ClientComponent vagaId={vaga.id} />
    </div>
  );
}