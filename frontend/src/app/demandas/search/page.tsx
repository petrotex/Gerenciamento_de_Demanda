'use client';

import SearchBar from '@/componentes/search';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import CustomLoader from '@/componentes/loading/CustomLoad';
import DemandaCard from '@/componentes/demandacard';
import { DemandaProps } from '@/types/demandas';

export default function SearchPage() {
  const searchParams = useSearchParams();
  const tipo = searchParams.get('tipo');
  const [resultados, setResultados] = useState<DemandaProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!tipo || !token) return;

    const fetchSearchResults = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/demandas/?tipo=${tipo}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();
        setResultados(data.results || []);
      } catch (err) {
        console.error('Erro ao buscar demandas:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchSearchResults();
  }, [tipo]);

  if (loading) return <CustomLoader />;

  const totalPages = Math.ceil(resultados.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentResultados = resultados.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="p-4">
      <h1 className="text-2xl mb-4 text-[#963d40] font-light text-center">
        Resultados da busca por: <span className="font-bold italic">{tipo}</span>
      </h1>

      <SearchBar />
      {currentResultados.length === 0 ? (
        <p className="text-center text-gray-600">Nenhuma demanda encontrada.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentResultados.map((demanda) => (
            <DemandaCard key={demanda.id} demanda={demanda} />
          ))}
        </div>
      )}

      {/* Paginação */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-6 gap-4">
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
      )}
    </div>
  );
}
