import { getVagas, getCandidatos } from '../Actions/actions';
import Link from 'next/link';

export default async function Dashboard() {
  const [vagas, candidatos] = await Promise.all([getVagas(), getCandidatos()]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-gray-900">Dashboard Administrativo</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-2 text-gray-900">Vagas</h2>
          <p className="text-3xl font-bold text-gray-900">{vagas.length}</p>
        </div>
        <Link href="/admin/todos-candidatos">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-2 text-gray-900">Candidatos</h2>
          <p className="text-3xl font-bold text-gray-900">{candidatos.length}</p>
        </div>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-900">Últimas Vagas</h2>
          <ul className="space-y-2">
            {vagas.slice(0, 5).map((vaga) => (
              <li key={vaga.id} className="text-sm text-gray-900">{vaga.titulo}</li>
            ))}
          </ul>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-900">Últimos Candidatos</h2>
          <ul className="space-y-2">
            {candidatos.slice(0, 5).map((candidato) => (
              <li key={candidato.id} className="text-sm text-gray-900">{candidato.nome}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}