'use client'

import Link from 'next/link';
import Image from 'next/image';
import { DemandaCardProps } from '@/types/demandas';

export default function DemandaCard({ demanda }: DemandaCardProps) {
  return (
    <div className="bg-white shadow-sm border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
      <div className="aspect-[5/2]">
        <img 
          src={demanda.image} 
          alt={demanda.tipo} 
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="p-4">
        <h3 className="text-xl font-bold text-gray-800">{demanda.tipo}</h3>
        
        <div className="mt-3 space-y-2 text-sm text-gray-600">
          <p className="flex items-start">
            <span className="font-medium mr-2">Endereço:</span>
            {demanda.endereco}
          </p>
          
          <p className="flex items-start">
            <span className="font-medium mr-2">Referência:</span>
            {demanda.ponto_referencia}
          </p>
          
          <div className="flex justify-between mt-4">
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
              demanda.prior === 'alta' ? 'bg-red-100 text-red-800' :
              demanda.prior === 'media' ? 'bg-yellow-100 text-yellow-800' :
              'bg-green-100 text-green-800'
            }`}>
              {demanda.prior}
            </span>
            
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
              demanda.status === 'Pendente' ? 'bg-blue-100 text-blue-800' :
              demanda.status === 'Em andamento' ? 'bg-purple-100 text-purple-800' :
              'bg-gray-100 text-gray-800'
            }`}>
              {demanda.status}
            </span>
          </div>
        </div>
        
        <Link
          href={`/demandas/${demanda.id}`}
          className="mt-6 px-4 py-2.5 w-full rounded-lg text-white text-sm font-medium border-none outline-none bg-[#963d40] hover:bg-[#5f3838] transition-colors text-center block"
        >
          Ver Detalhes
        </Link>
      </div>
    </div>
  );
}