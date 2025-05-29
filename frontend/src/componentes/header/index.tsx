'use client'

import Image from 'next/image'
import Link from 'next/link'
import { FiUser, FiUserPlus, FiLogOut, FiX } from 'react-icons/fi'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Dialog } from '@headlessui/react'

export function Header() {
  const router = useRouter()
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false)
  const [hasSenhaGov, setHasSenhaGov] = useState(false)

  useEffect(() => {
    const userData = localStorage.getItem('user')
    if (userData) {
      try {
        const user = JSON.parse(userData)
        setHasSenhaGov(!!user.has_senha_gov)
      } catch (error) {
        console.error('Erro ao ler os dados do usuário:', error)
      }
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user') // Remova também os dados do usuário
    router.push('/login')
    router.refresh()
  }

  return (
    <>
      <header className="w-full flex items-center px-2 py-4 bg-[#edecf4] h-20 shadow-md">
        <div className='w-full flex items-center justify-between max-w-7xl mx-auto'>
          <Link href='/demandas' className='flex items-center gap-2 transition-transform duration-300 ease-in-out hover:scale-110'>
            <Image 
              src="/logo_app.png" 
              alt="Logo EscutamAqui" 
              width={50} 
              height={50} 
            />
            <h1 className='text-2xl pl-1 hover:tracking-widest duration-300'>
              Escutam<span className='text-[#8a4d53] font-bold'>AQUI</span>
            </h1>
          </Link>

          <Link href={'/demandas/nova'}         
          className="px-5 py-2.5 rounded-lg text-white text-md cursor-pointer tracking-wider font-medium border border-current outline-none bg-gradient-to-t hover:bg-gradient-to-bl from-[#963d40] to-[#da7c7f]">
            Criar Nova Demanda
          </Link>

          <div className='flex items-baseline gap-4'>
            <Link href={'/perfil'}>
              {hasSenhaGov ? (
                <FiUserPlus 
                  size={26} 
                  color='#b42f2f' 
                  className='transition-transform duration-200 ease-in-out hover:scale-120 cursor-pointer'
                />
              ) : (
                <FiUser 
                  size={26} 
                  color='#4b5563' 
                  className='transition-transform duration-200 ease-in-out hover:scale-120 cursor-pointer'
                />
              )}
            </Link>

            <button 
              onClick={() => setIsLogoutModalOpen(true)}
              className='cursor-pointer hover:opacity-80 transition-opacity'
            >
              <FiLogOut 
                size={26} 
                color='#4b5563' 
                className='transition-transform duration-200 ease-in-out hover:scale-120 cursor-pointer'
              />
            </button>
          </div>
        </div>
      </header>

      {/* Modal de Confirmação */}
      <Dialog
        open={isLogoutModalOpen}
        onClose={() => setIsLogoutModalOpen(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="w-full max-w-sm rounded bg-white p-6 shadow-lg relative">
            <button
              onClick={() => setIsLogoutModalOpen(false)}
              className="absolute top-4 right-4 p-1 rounded-full hover:bg-gray-100 transition-colors cursor-pointer"
              aria-label="Fechar"
            >
              <FiX size={20} className="text-gray-500 hover:text-gray-700" />
            </button>

            <Dialog.Title className="text-lg font-bold text-[#8a4d53] pr-6">
              Confirmar Saída
            </Dialog.Title>
            
            <Dialog.Description className="mt-2 text-gray-600">
              Tem certeza que deseja sair da sua conta?
            </Dialog.Description>

            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => setIsLogoutModalOpen(false)}
                className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded transition-colors cursor-pointer hover:shadow-sm"
              >
                Cancelar
              </button>
              
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-[#8a4d53] text-white rounded hover:bg-[#6d3a40] transition-colors cursor-pointer hover:shadow-md"
              >
                Sair
              </button>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </>
  )
}
