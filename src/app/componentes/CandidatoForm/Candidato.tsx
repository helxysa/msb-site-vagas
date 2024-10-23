'use client'
import { useState, FormEvent } from 'react';

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

interface CandidatoFormProps {
  vaga: Vaga | null;
}

export default function CandidatoForm({ vaga }: CandidatoFormProps) {
  console.log(vaga)
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [informacoesAdicionais, setInformacoesAdicionais] = useState('');
  const [linkCurriculo, setLinkCurriculo] = useState('');
  const [aceitouTermos, setAceitouTermos] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Aqui você pode adicionar a lógica para enviar os dados do formulário
    console.log('Dados do formulário:', { nome, email, telefone, informacoesAdicionais, linkCurriculo, aceitouTermos });
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 md:p-8">
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Personal Information */}
        <div className="space-y-6">
          <h2 className="text-xl font-semibold text-gray-900">Informações Pessoais</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="nome" className="block text-sm font-medium text-gray-700 mb-2">Nome Completo *</label>
              <input
                type="text"
                id="nome"
                required
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition duration-200"
                placeholder="Digite seu nome completo"
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">E-mail *</label>
              <input
                type="email"
                id="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition duration-200"
                placeholder="seu@email.com"
              />
            </div>

            <div>
              <label htmlFor="telefone" className="block text-sm font-medium text-gray-700 mb-2">Telefone *</label>
              <input
                type="tel"
                id="telefone"
                required
                value={telefone}
                onChange={(e) => setTelefone(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition duration-200"
                placeholder="(11) 99999-9999"
              />
            </div>

            <div>
              <label htmlFor="linkCurriculo" className="block text-sm font-medium text-gray-700 mb-2">Link para Currículo</label>
              <input
                type="url"
                id="linkCurriculo"
                value={linkCurriculo}
                onChange={(e) => setLinkCurriculo(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition duration-200"
                placeholder="https://exemplo.com/seu-curriculo"
              />
            </div>
          </div>
        </div>

        {/* Additional Information */}
        <div className="space-y-6">
          <h2 className="text-xl font-semibold text-gray-900">Informações Adicionais</h2>

          <div>
            <label htmlFor="informacoesAdicionais" className="block text-sm font-medium text-gray-700 mb-2">Informações Adicionais *</label>
            <textarea
              id="informacoesAdicionais"
              required
              rows={4}
              value={informacoesAdicionais}
              onChange={(e) => setInformacoesAdicionais(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition duration-200"
              placeholder="Conte-nos mais sobre você..."
            ></textarea>
          </div>
        </div>

        <div className="space-y-4">
          <label className="flex items-start space-x-3">
            <input
              type="checkbox"
              required
              checked={aceitouTermos}
              onChange={(e) => setAceitouTermos(e.target.checked)}
              className="form-checkbox h-5 w-5 text-blue-600 mt-1"
            />
            <span className="text-sm text-gray-700">
              Concordo em compartilhar meus dados pessoais para fins de recrutamento e declaro que li e aceito os 
              <a href="/terms" className="text-blue-600 hover:underline"> Termos de Uso</a> e 
              <a href="/privacy" className="text-blue-600 hover:underline"> Política de Privacidade</a>.
            </span>
          </label>

          <div className="flex flex-col-reverse sm:flex-row gap-4 justify-end">
            <button type="submit" 
              className="px-6 py-3 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition duration-200">
              Enviar Candidatura
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}