'use client'

import { useEffect, useState, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { FiTool } from "react-icons/fi";

interface StatusCGProps {
  demandaId: string;
  initialStatus: string;
  onStatusUpdated: (newStatus: string) => void; // callback para atualizar pai
}

export default function StatusCG({ demandaId, initialStatus, onStatusUpdated }: StatusCGProps) {
  const [hasSenhaGov, setHasSenhaGov] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [newStatus, setNewStatus] = useState(initialStatus);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('token');
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/users/me/`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        const user = await res.json();
        setHasSenhaGov(user.has_senha_gov);
      }
    };
    fetchUser();
  }, []);

  useEffect(() => {
    setNewStatus(initialStatus); // sempre sincroniza se inicial mudar
  }, [initialStatus]);

  const handleUpdate = async () => {
    const token = localStorage.getItem('token');
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/demandas/${demandaId}/`, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status: newStatus }),
    });

    if (res.ok) {
      onStatusUpdated(newStatus); // atualiza o estado no componente pai
      setIsOpen(false);
    } else {
      alert('Erro ao atualizar o status.');
    }
  };

  if (!hasSenhaGov) return null;

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="text-gray-600 hover:text-gray-800 transition cursor-pointer"
        title="Editar status"
      >
        <FiTool size={24} />
      </button>

      <Transition show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={() => setIsOpen(false)}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/30" />
          </Transition.Child>

          <div className="fixed inset-0 flex items-center justify-center p-4">
            <Dialog.Panel className="w-full max-w-md rounded bg-white p-6 shadow-lg">
              <Dialog.Title className="text-lg font-medium text-gray-900 mb-4">
                Alterar Status da Demanda
              </Dialog.Title>

              <div className="mb-4">
                <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
                  Novo status:
                </label>
                <select
                  id="status"
                  value={newStatus}
                  onChange={(e) => setNewStatus(e.target.value)}
                  className="w-full border rounded px-3 py-2"
                >
                  <option value="planejando">Planejando</option>
                  <option value="organizando">Organizando</option>
                  <option value="solucionando">Solucionando</option>
                </select>
              </div>

              <div className="flex justify-end gap-2">
                <button
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-2 text-sm rounded bg-gray-200 hover:bg-gray-300"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleUpdate}
                  className="px-4 py-2 text-sm rounded bg-[#963d40] text-white hover:bg-[#ba6063]"
                >
                  Salvar
                </button>
              </div>
            </Dialog.Panel>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
