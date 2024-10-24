import { getCandidatos, getVaga } from '../Actions/actions';
import Loading from '@/app/componentes/Loading/Loading';

async function Candidatos() {
  try {
    const candidatos = await getCandidatos();

    const candidatosComVagas = await Promise.all(
      candidatos.map(async (candidato) => {
        const vaga = await getVaga(candidato.vagaId, candidato.nome);
        return {
          ...candidato,
          vaga: vaga
        };
      })
    );

    if (!candidatosComVagas) {
      return <Loading />;
    }

    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Lista de Candidatos</h1>
        {candidatosComVagas.length === 0 ? (
          <p className="text-center text-gray-600">Nenhum candidato encontrado.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {candidatosComVagas.map((candidato) => (
              <div key={candidato.id} className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold mb-2">{candidato.nome}</h2>
                <p className="text-gray-600 mb-2">Email: {candidato.email}</p>
                <p className="text-gray-600 mb-2">Telefone: {candidato.telefone}</p>
                {candidato.linkCurriculo && (
                  <p className="text-gray-600 mb-2">Link do Currículo: {candidato.linkCurriculo}</p>
                )}
                {candidato.informacoesAdicionais && (
                  <p className="text-gray-600 mb-2">Informações Adicionais: {candidato.informacoesAdicionais}</p>
                )}

                {candidato.vaga ? (
                  <div className="text-gray-600 mb-2">
                    <p className="font-semibold">Vaga: {candidato.vaga?.titulo}</p>
                    <p className="text-sm">ID da Vaga: {candidato.vagaId}</p>
                  </div>
                ) : (
                  <div className="text-amber-600 mb-2">
                    <p className="font-semibold">⚠️ Vaga Excluída</p>
                    <p className="text-sm">Esta vaga foi removida do sistema</p>
                    <p className="text-xs text-gray-500">ID: {candidato.vagaId}</p>
                  </div>
                )}
                <div className="mt-4">
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  } catch (error) {
    console.error('Erro:', error);
    return <div className="text-center py-8 text-red-600">Erro ao carregar candidatos</div>;
  }
}

export default Candidatos;