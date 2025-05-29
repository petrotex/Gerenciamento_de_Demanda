'use client'

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { DemandaProps } from "@/types/demandas";
import { redirect } from "next/navigation";
import Image from 'next/image';
import { Container } from '@/componentes/container';
import { Label } from './components/label'
import DemandaCard from '@/componentes/demandacard'
import { Metadata } from "next";


interface PropsParams{
    params:{
        id: string;
    }
}

export default function DemandaPage() {
  const [data, setData] = useState<DemandaProps | null>(null);
  const router = useRouter();
  const params = useParams(); // Obtenha os parâmetros desta forma

  useEffect(() => {
    // Verifique se params está disponível
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
  }, [params?.id, router]); // Use params?.id como dependência

  if (!data) return <div>Carregando...</div>;

  return (
    <div className="w-5/12 h-52 mx-auto mt-10 lg:flex border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      {/* Parte da imagem (lado esquerdo) */}
      <div className="h-80 lg:h-auto lg:w-80  flex-none bg-cover relative">
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

  {/* Parte do conteúdo (lado direito) */}
  <div className="border-r border-b border-l border-gray-200 lg:border-l-0 lg:border-t lg:border-gray-200 bg-white p-4 flex flex-col justify-between leading-normal w-full">
    <div className="mb-4">
      {/* Status e Prioridade como badges */}
      <div className="flex gap-2 mb-3">
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          data.prior === 'Alta' ? 'bg-red-100 text-red-800' :
          data.prior === 'Média' ? 'bg-yellow-100 text-yellow-800' :
          'bg-green-100 text-green-800'
        }`}>
          {data.prior}
        </span>
        
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          data.status === 'Pendente' ? 'bg-blue-100 text-blue-800' :
          data.status === 'Em andamento' ? 'bg-purple-100 text-purple-800' :
          'bg-gray-100 text-gray-800'
        }`}>
          {data.status}
        </span>
      </div>

      {/* Informações principais */}
      <h1 className="text-gray-900 font-bold text-xl mb-2">{data.tipo}</h1>
      
      <div className="space-y-1 text-gray-700 text-base">
        <p><strong>Endereço:</strong> {data.endereco}</p>
        <p><strong>Ponto de Referência:</strong> {data.ponto_referencia}</p>
      </div>
    </div>

    {/* Data de criação */}
    <div className="text-sm text-gray-600">
      <p><strong>Criado em:</strong> {new Date(data.created_at).toLocaleDateString()}</p>
    </div>
  </div>
</div>
  )
}