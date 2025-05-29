'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Logo from '@../../../public/mul.avif'

export default function LoginPage() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/login/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      })

      const data = await res.json()

      if (!res.ok) {
        setError('Usuário ou senha inválidos')
        return
      }

      localStorage.setItem('token', data.access)
      router.push('/demandas')
    } catch {
      setError('Erro ao conectar com o servidor')
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <div className="py-6 px-4">
        <div className="grid md:grid-cols-2 items-center gap-6 max-w-6xl w-full">
          <div className="border border-slate-300 rounded-3xl p-6 max-w-md shadow-[0_2px_22px_-4px_rgba(93,96,127,0.2)] max-md:mx-auto">
            <form onSubmit={handleLogin} className="space-y-6">
              <div className="mb-12">
                <h3 className="text-[#963d40] text-3xl font-semibold">Fazer Login</h3>
                <p className="text-slate-500 text-sm mt-6 leading-relaxed">
                  Faça login no nosso site para acessar as funcionalidade.
                </p>
                {error && <p className="text-red-500 mt-4">{error}</p>}
              </div>

              <div>
                <label htmlFor="username" className="text-slate-800 text-sm font-medium mb-2 block">
                  Usuário
                </label>
                <div className="relative flex items-center">
                  <input
                    id="username"
                    name="username"
                    type="text"
                    required
                    placeholder="Insira seu usuário aqui"
                    className="w-full text-sm text-slate-800 border border-slate-300 pl-4 pr-10 py-3 rounded-lg outline-blue-600"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                  />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="#bbb"
                    stroke="#bbb"
                    className="w-[18px] h-[18px] absolute right-4"
                    viewBox="0 0 24 24"
                  >
                    <circle cx="10" cy="7" r="6"></circle>
                    <path d="M14 15H6a5 5 0 0 0-5 5 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 5 5 0 0 0-5-5zm8-4h-2.59l.3-.29a1 1 0 0 0-1.42-1.42l-2 2a1 1 0 0 0 0 1.42l2 2a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42l-.3-.29H22a1 1 0 0 0 0-2z"></path>
                  </svg>
                </div>
              </div>

              <div>
                <label htmlFor="password" className="text-slate-800 text-sm font-medium mb-2 block">
                  Senha
                </label>
                <div className="relative flex items-center">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    placeholder="Insira sua senha aqui"
                    className="w-full text-sm text-slate-800 border border-slate-300 pl-4 pr-10 py-3 rounded-lg outline-blue-600"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                  />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="#bbb"
                    stroke="#bbb"
                    className="w-[18px] h-[18px] absolute right-4 cursor-pointer"
                    viewBox="0 0 128 128"
                  >
                    <path d="M64 104C22.127 104 1.367 67.496.504 65.943a4 4 0 0 1 0-3.887C1.367 60.504 22.127 24 64 24s62.633 36.504 63.496 38.057a4 4 0 0 1 0 3.887C126.633 67.496 105.873 104 64 104zM8.707 63.994C13.465 71.205 32.146 96 64 96c31.955 0 50.553-24.775 55.293-31.994C114.535 56.795 95.854 32 64 32 32.045 32 13.447 56.775 8.707 63.994zM64 88c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm0-40c-8.822 0-16 7.178-16 16s7.178 16 16 16 16-7.178 16-16-7.178-16-16-16z"></path>
                  </svg>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-4">

                <div className="text-sm">
                  <a href="javascript:void(0);" className="text-[#963d40] hover:underline font-medium">
                    Esqueceu a Senha?
                  </a>
                </div>
              </div>

              <div className="!mt-12">
                <button
                  type="submit"
                  className="w-full shadow-xl py-2.5 px-4 text-[15px] font-medium tracking-wide rounded-lg text-white bg-[#963d40] hover:bg-[#ca7174] focus:outline-none cursor-pointer"
                >
                  Entrar
                </button>
                <p className="text-sm !mt-6 text-center text-slate-500">
                  Não têm uma conta?{' '}
                  <a href="javascript:void(0);" className="text-[#963d40] font-medium hover:underline ml-1 whitespace-nowrap">
                    Registre-se Aqui
                  </a>
                </p>
              </div>
            </form>
          </div>

          <div className="max-md:mt-8">
            <Image 
            src={Logo}
            alt="Imagem da Logo"
            width={300}
            quality={100}
            className='w-full mx-auto block object-cover'
            />
          </div>
        </div>
      </div>
    </div>
  )
}
