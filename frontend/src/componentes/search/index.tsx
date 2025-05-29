'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SearchBar() {
  const [search, setSearch] = useState('');
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (search.trim()) {
      router.push(`/demandas/search?tipo=${encodeURIComponent(search)}`);
    }
  };

  return (
    <form onSubmit={handleSearch} className="rounded-3xl p-2 flex border-2 border-[#963d40] overflow-hidden max-w-md mx-auto mb-6">
      <input
        type="text"
        placeholder="Buscar por tipo de demanda..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full outline-none bg-white text-gray-600 text-sm px-4 py-3"
      />
      <button
        type="submit"
        className="rounded-2xl flex items-center justify-center bg-[#963d40] px-5 text-sm text-white cursor-pointer"
      >
        Buscar
      </button>
    </form>
  );
}
