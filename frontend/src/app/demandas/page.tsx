'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import CustomLoader from '@/componentes/loading/CustomLoad'
import Image from 'next/image'
import Logo from '@/../../public/logo_app.png'
import Link from 'next/link'

import DemandaCard from '@/componentes/demandacard'
import { DemandaProps, ApiResponse } from '@/types/demandas';

export default function DemandasPage() {
  const [demandas, setDemandas] = useState<DemandaProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      router.push('/login');
      return;
    }

    const fetchDemandas = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/demandas/`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (res.status === 401) {
          localStorage.removeItem('token');
          router.push('/login');
          return;
        }

        const data: ApiResponse = await res.json();
        setDemandas(data.results);
      } catch (err: any) {
        setError('Erro ao buscar dados');
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 1500);
      }
    };

    fetchDemandas();
  }, [router]);

  if (loading) return <CustomLoader />;
  if (error) return <p>Erro: {error}</p>;

  return (
    <div className="p-4">
      <div className='mt-4 mb-4 flex gap-0 justify-center'>
        <h1 className="items-center text-3xl italic font-stretch-50% text-[#963d40]">BUSCANDO</h1>
        <div className="w-24 h-24 flex items-center"> 
          <Image 
            src={Logo}
            alt="Imagem da Logo"
            width={100}
            height={100}
            className='object-contain'
          />
          <h1 className="text-3xl items-end mt-12 italic font-stretch-50% text-[#963d40]">DEMANDAS</h1>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
        {demandas.map((demanda) => (
          <DemandaCard key={demanda.id} demanda={demanda} />
        ))}
      </div>
    </div>
  );
}