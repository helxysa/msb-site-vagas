import Link from 'next/link';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebaseConfig';

interface VagaPreview {
  id: string;
  titulo: string;
  area: string;
}

async function getVagas(): Promise<VagaPreview[]> {
  const vagasRef = collection(db, 'vagas');
  const vagasSnapshot = await getDocs(vagasRef);
  return vagasSnapshot.docs.map(doc => ({
    id: doc.id,
    titulo: doc.data().titulo,
    area: doc.data().area,
  }));
}

export default async function ListaVagas() {
  const vagas = await getVagas();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Vagas Disponíveis</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {vagas.map((vaga) => (
          <Link href={`/vagas/${vaga.id}`} key={vaga.id} className="block p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <h2 className="text-xl font-semibold mb-2">{vaga.titulo}</h2>
            <p className="text-gray-600">{vaga.area}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}