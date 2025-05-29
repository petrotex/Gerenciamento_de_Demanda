'use client'

import { Dialog, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import { FiX } from 'react-icons/fi'

interface SimpleDialogProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  title: string
  children: React.ReactNode
}

export default function SimpleDialog({
  isOpen,
  onClose,
  onConfirm,
  title,
  children,
}: SimpleDialogProps) {
  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        {/* Fundo escuro */}
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

        {/* Conteúdo da modal */}
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Dialog.Panel className="w-full max-w-md rounded bg-white p-6 shadow-lg relative">
              {/* Botão de fechar */}
              <button
                onClick={onClose}
                className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
                aria-label="Fechar"
              >
                <FiX size={20} />
              </button>

              <Dialog.Title className="text-lg font-medium text-gray-900 mb-4">
                {title}
              </Dialog.Title>

              <div className="mb-6">{children}</div>

              <div className="flex justify-end">
                <button
                  onClick={onConfirm}
                  className="px-4 py-2 text-sm rounded bg-[#963d40] text-white hover:bg-[#ba6063]"
                >
                  Confirmar
                </button>
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  )
}
