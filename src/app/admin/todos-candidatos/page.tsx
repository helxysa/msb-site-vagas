import { getCandidatos } from '../Actions/actions';



async function Candidatos() {
  try {
    const candidatos = await getCandidatos();

    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Lista de Candidatos</h1>
        {candidatos.length === 0 ? (
          <p className="text-center text-gray-600">Nenhum candidato encontrado.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {candidatos.map((candidato) => (
              <div key={candidato.id} className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold mb-2">{candidato.nome}</h2>
                <p className="text-gray-600 mb-2">Email: {candidato.email}</p>
                <p className="text-gray-600 mb-2">Telefone: {candidato.telefone}</p>
                <p className="text-gray-600 mb-2">Vaga: {candidato.vagaId}</p>
                <div className="mt-4">
                  {/* Espaço para adicionar botões ou outras ações */}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  } catch (error) {
    return <div className="text-center py-8 text-red-600">Erro ao carregar candidatos:</div>;
  }
}

export default Candidatos;