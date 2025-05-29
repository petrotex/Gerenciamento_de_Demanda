'use client'

import StatusCG from './components/statusCg';
import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { DemandaProps } from "@/types/demandas";
import Image from 'next/image';

export default function DemandaPage() {
  const [data, setData] = useState<DemandaProps | null>(null);
  const router = useRouter();
  const params = useParams();

  const handleStatusUpdate = (newStatus: string) => {
    if (!data) return;
    setData({ ...data, status: newStatus });
  };

  useEffect(() => {
    if (!params?.id) return;

    const token = localStorage.getItem('token');
    
    if (!token) {
      router.push('/login');
      return;
    }

    const fetchData = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/demandas/${params.id}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        if (res.status === 401) {
          localStorage.removeItem('token');
          router.push('/login');
          return;
        }

        const result = await res.json();
        setData(result);
      } catch (err) {
        console.error(err);
        router.push('/demandas');
      }
    };

    fetchData();
  }, [params?.id, router]);

  if (!data) return <div>Carregando...</div>;

  const formattedDate = new Date(data.created_at).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  }).replace(/\//g, '-');

return (
  <div className="max-w-3xl mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
    <div className="mb-6 rounded-lg overflow-hidden h-64 relative">
      <Image
        src={data.image}
        alt={data.tipo}
        fill
        className="object-cover"
        priority={true}
        quality={100}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 44vw"
      />
    </div>

    <div className="mb-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-2">{data.tipo}</h1>
      <div className="flex items-center gap-4">
        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
          data.prior === 'Alta' ? 'bg-red-100 text-red-800' :
          data.prior === 'Média' ? 'bg-yellow-100 text-yellow-800' :
          'bg-green-100 text-green-800'
        }`}>
          Prioridade {data.prior}
        </span>
        <span className="text-gray-600 text-sm">Demanda feita em {formattedDate}</span>
      </div>
    </div>

    <div className="mb-8 border-l-2 border-gray-200 pl-6 relative">
      <div className={`mb-6 relative transition-all ${data.status !== 'planejando' ? 'opacity-50' : ''}`}>
        <div className={`absolute -left-8 top-0 w-6 h-6 rounded-full flex items-center justify-center text-white text-sm font-bold ${
          data.status === 'planejando' ? 'bg-[#383434]' : 'bg-[#6e6a6a]'
        }`}>
          1
        </div>
        <div className="ml-4">
          <h3 className={`font-semibold ${
            data.status === 'planejando' ? 'text-gray-800' : 'text-gray-500'
          }`}>Planejando</h3>
          <p className={`${
            data.status === 'planejando' ? 'text-gray-600' : 'text-gray-400'
          }`}>Status Inicial da Demanda</p>
        </div>
      </div>

      <div className={`mb-6 relative transition-all ${data.status !== 'organizando' ? 'opacity-50' : ''}`}>
        <div className={`absolute -left-8 top-0 w-6 h-6 rounded-full flex items-center justify-center text-white text-sm font-bold ${
          data.status === 'organizando' ? 'bg-[#963d40]' : 'bg-[#b15f61]'
        }`}>
          2
        </div>
        <div className="ml-4">
          <h3 className={`font-semibold ${
            data.status === 'organizando' ? 'text-gray-800' : 'text-gray-500'
          }`}>Organizando</h3>
          <p className={`${
            data.status === 'organizando' ? 'text-gray-600' : 'text-gray-400'
          }`}>Equipe sendo Mobilizada para Preparar Solução</p>
        </div>
      </div>

      <div className={`relative transition-all ${data.status !== 'solucionando' ? 'opacity-50' : ''}`}>
        <div className={`absolute -left-8 top-0 w-6 h-6 rounded-full flex items-center justify-center text-white text-sm font-bold ${
          data.status === 'solucionando' ? 'bg-green-500' : 'bg-green-300'
        }`}>
          3
        </div>
        <div className="ml-4">
          <h3 className={`font-semibold ${
            data.status === 'solucionando' ? 'text-gray-800' : 'text-gray-500'
          }`}>Solucionando</h3>
          <p className={`${
            data.status === 'solucionando' ? 'text-gray-600' : 'text-gray-400'
          }`}>Trabalho para Solucionar a Demanda em Andamento</p>
        </div>
      </div>
    </div>

      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-2">Endereço</h2>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="text-gray-800">{data.endereco}</p>
          <p className="text-gray-600 mt-1">{data.ponto_referencia}</p>
        </div>
      </div>

      {/* Controle de status */}
      <div className="mt-6">
        <StatusCG 
          demandaId={params.id as string} 
          initialStatus={data.status} 
          onStatusUpdated={handleStatusUpdate}
        />
      </div>
    </div>
  );
}