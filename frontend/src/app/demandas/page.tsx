'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import CustomLoader from '@/componentes/loading/CustomLoad'
import Image from 'next/image'
import Logo from '@/../../public/logo_app.png'
import DemandaCard from '@/componentes/demandacard'
import { DemandaProps, ApiResponse } from '@/types/demandas';

export default function DemandasPage() {
  const [demandas, setDemandas] = useState<DemandaProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1); // página atual da visualização
  const itemsPerPage = 3; // apenas 3 por vez no frontend

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

  // Lógica de paginação no frontend
  const totalPages = Math.ceil(demandas.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentDemandas = demandas.slice(startIndex, startIndex + itemsPerPage);

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
        {currentDemandas.map((demanda) => (
          <DemandaCard key={demanda.id} demanda={demanda} />
        ))}
      </div>

      {/* Paginação */}
      <div className="flex justify-center mt-6 gap-4">
        {/* Botão Anterior */}
      <button
      onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
      disabled={currentPage === 1}
      className={`px-4 py-2 rounded transition text-white 
        ${currentPage === 1 
          ? 'bg-[#ccc] opacity-50 cursor-not-allowed' 
          : 'bg-[#963d40] hover:bg-[#ba6063] cursor-pointer'}`}
          >
            Anterior
      </button>
      <span className="text-[#963d40] font-medium text-lg">
        Página {currentPage} de {totalPages}
        </span>
      {/* Botão Próxima */}
      <button
      onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
      disabled={currentPage === totalPages}
      className={`px-4 py-2 rounded transition text-white 
      ${currentPage === totalPages 
        ? 'bg-[#ccc] opacity-50 cursor-not-allowed' 
        : 'bg-[#963d40] hover:bg-[#ba6063] cursor-pointer'}`}
        >
          Próxima
      </button>
      </div>
    </div>
  );
}
