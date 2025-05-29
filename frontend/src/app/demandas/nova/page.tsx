'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import StepProgress from '@/componentes/stepper';

export default function NovaDemandaPage() {
  const router = useRouter();

  const [tipo, setTipo] = useState('');
  const [endereco, setEndereco] = useState('');
  const [pontoReferencia, setPontoReferencia] = useState('');
  const [prior, setPrior] = useState('baixa');
  const [image, setImage] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [step, setStep] = useState(1);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
      return;
    }

    const formData = new FormData();
    formData.append('tipo', tipo);
    formData.append('endereco', endereco);
    formData.append('ponto_referencia', pontoReferencia);
    formData.append('prior', prior);
    if (image) formData.append('image', image);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/demandas/`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.detail || 'Erro ao criar demanda. Verifique se todos os campos foram preenchidos');
      }

      setSuccess(true);
      setTimeout(() => {
        router.push('/demandas');
      }, 2000);
    } catch (err: any) {
      setError(err.message || 'Erro inesperado');
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white shadow-md rounded">
      <div className="flex justify-center mb-8">
        <StepProgress currentStep={step} />
      </div>

      <h1 className="text-2xl font-bold text-[#963d40] mb-6">Nova Demanda</h1>
      {error && <p className="text-red-600 mb-4">{error}</p>}
      {success && <p className="text-green-600 mb-4">Demanda criada com sucesso!</p>}

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      {step === 1 && (
        <>
            <input
            type="text"
            placeholder="Tipo"
            value={tipo}
            onChange={(e) => setTipo(e.target.value)}
            required
            className="border p-2 rounded"
            />
            <input
            type="text"
            placeholder="Endereço"
            value={endereco}
            onChange={(e) => setEndereco(e.target.value)}
            required
            className="border p-2 rounded"
            />
            <input
            type="text"
            placeholder="Ponto de Referência"
            value={pontoReferencia}
            onChange={(e) => setPontoReferencia(e.target.value)}
            required
            className="border p-2 rounded"
            />

            <button
            type="button"
            onClick={() => setStep(2)}
            disabled={!tipo || !endereco || !pontoReferencia}
            className={`px-4 py-2 rounded transition text-white ${
                !tipo || !endereco || !pontoReferencia
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-[#963d40] hover:bg-[#ba6063]'
            }`}
            >
            Próximo
            </button>
        </>
        )}


        {step === 2 && (
  <>
    {/* Se imagem ainda não foi enviada, mostra o painel de upload */}
    {!image ? (
      <label
        htmlFor="uploadFile1"
        className="bg-white text-slate-500 font-semibold text-base rounded max-w-md h-52 flex flex-col items-center justify-center cursor-pointer border-2 border-gray-300 border-dashed mx-auto"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="w-11 mb-3 fill-gray-500" viewBox="0 0 32 32">
          <path
            d="M23.75 11.044a7.99 7.99 0 0 0-15.5-.009A8 8 0 0 0 9 27h3a1 1 0 0 0 0-2H9a6 6 0 0 1-.035-12 1.038 1.038 0 0 0 1.1-.854 5.991 5.991 0 0 1 11.862 0A1.08 1.08 0 0 0 23 13a6 6 0 0 1 0 12h-3a1 1 0 0 0 0 2h3a8 8 0 0 0 .75-15.956z"
          />
          <path
            d="M20.293 19.707a1 1 0 0 0 1.414-1.414l-5-5a1 1 0 0 0-1.414 0l-5 5a1 1 0 0 0 1.414 1.414L15 16.414V29a1 1 0 0 0 2 0V16.414z"
          />
        </svg>
        Upload file

        <input
          type="file"
          id="uploadFile1"
          accept="image/*"
          onChange={(e) => setImage(e.target.files?.[0] || null)}
          required
          className="hidden"
        />
        <p className="text-xs font-medium text-slate-400 mt-2">PNG, JPG, WEBP são permitidos.</p>
      </label>
    ) : (
      // Mostra pré-visualização da imagem e botão de remover
      <div className="flex flex-col items-center gap-2">
        <img
          src={URL.createObjectURL(image)}
          alt="Pré-visualização"
          className="max-h-52 rounded shadow"
        />
        <button
          type="button"
          onClick={() => setImage(null)}
          className="text-sm text-red-600 hover:underline"
        >
          Remover imagem
        </button>
      </div>
    )}

    <div className="flex justify-between mt-6">
      <button
        type="button"
        onClick={() => setStep(1)}
        className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
      >
        Anterior
      </button>
      <button
        type="button"
        onClick={() => setStep(3)}
        className="bg-[#963d40] text-white px-4 py-2 rounded hover:bg-[#ba6063]"
        disabled={!image}
      >
        Próximo
      </button>
    </div>
  </>
)}


        {step === 3 && (
          <>
            <select
              value={prior}
              onChange={(e) => setPrior(e.target.value)}
              className="border p-2 rounded"
            >
              <option value="baixa">Baixa</option>
              <option value="media">Média</option>
              <option value="alta">Alta</option>
            </select>
            <div className="flex justify-between">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
              >
                Anterior
              </button>
              <button
                type="submit"
                className="bg-[#963d40] text-white px-4 py-2 rounded hover:bg-[#ba6063]"
              >
                Criar Demanda
              </button>
            </div>
          </>
        )}
      </form>
    </div>
  );
}