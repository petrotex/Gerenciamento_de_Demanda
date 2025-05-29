'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Logo from '@../../../public/mul.avif'
import { Dialog } from '@headlessui/react'
import { FiX } from 'react-icons/fi'

export default function RegisterPage() {
  const [form, setForm] = useState({
    username: '',
    email: '',
    cpf: '',
    password: '',
    password2: '',
    senha_gov: '',
  })
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [showPassword, setShowPassword] = useState({
    password: false,
    password2: false,
    senha_gov: false
  })
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false)
  const router = useRouter()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    if (name === 'cpf') {
      const digits = value.replace(/\D/g, '')
      let masked = digits
      if (digits.length > 3) masked = digits.slice(0, 3) + '.' + digits.slice(3)
      if (digits.length > 6) masked = masked.slice(0, 7) + '.' + digits.slice(6)
      if (digits.length > 9) masked = masked.slice(0, 11) + '-' + digits.slice(9, 11)
      setForm({ ...form, cpf: masked })
    } else {
      setForm({ ...form, [name]: value })
    }
  }

  const toggleShowPassword = (field: keyof typeof showPassword) => {
    setShowPassword(prev => ({
      ...prev,
      [field]: !prev[field]
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setSuccess(false)

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/register/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })

      if (!res.ok) {
        const data = await res.json()
        const firstError = Object.values(data)[0]
        setError(Array.isArray(firstError) ? firstError[0] : firstError)
        return
      }

      const loginRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/login/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: form.email, password: form.password }),
      })

      if (!loginRes.ok) {
        setError('Registro realizado, mas o login automático falhou. Por favor, faça login manualmente.')
        return
      }

      const loginData = await loginRes.json()
      localStorage.setItem('token', loginData.access)

      const userRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/me/`, {
        headers: {
          'Authorization': `Bearer ${loginData.access}`
        }
      })

      if (userRes.ok) {
        const userData = await userRes.json()
        localStorage.setItem('user', JSON.stringify(userData))
      }

      
      setSuccess(true)
      setIsLogoutModalOpen(true)

    } catch {
      setError('Erro ao conectar com o servidor')
    }
  }

  return (
    <>
      <div className="min-h-screen flex flex-col items-center justify-center">
        <div className="py-6 px-4">
          <div className="grid md:grid-cols-2 items-center gap-6 max-w-6xl w-full">
            <div className="border border-slate-300 rounded-3xl p-6 max-w-md shadow-[0_2px_22px_-4px_rgba(93,96,127,0.2)] max-md:mx-auto">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="mb-8">
                  <h3 className="text-[#963d40] text-3xl font-semibold">Registrar-se</h3>
                  <p className="text-slate-500 text-sm mt-6 leading-relaxed">
                    Preencha os dados para criar sua conta.
                  </p>
                  {error && <p className="text-red-500 mt-4">{error}</p>}
                </div>

                {[
                  { name: 'username', label: 'Usuário', type: 'text' },
                  { name: 'email', label: 'Email', type: 'email' },
                  { name: 'cpf', label: 'CPF', type: 'text', placeholder: 'XXX.XXX.XXX-XX' },
                ].map(({ name, label, type, placeholder }) => (
                  <div key={name}>
                    <label htmlFor={name} className="text-slate-800 text-sm font-medium mb-2 block">
                      {label}
                    </label>
                    <input
                      id={name}
                      name={name}
                      type={type}
                      placeholder={placeholder}
                      required={name !== 'senha_gov'}
                      value={form[name as keyof typeof form]}
                      onChange={handleChange}
                      className="w-full text-sm text-slate-800 border border-slate-300 pl-4 pr-4 py-3 rounded-lg outline-blue-600"
                    />
                  </div>
                ))}

                {[
                  { name: 'password', label: 'Senha' },
                  { name: 'password2', label: 'Confirmar Senha' },
                  { name: 'senha_gov', label: 'Senha GOV (opcional)', required: false }
                ].map(({ name, label, required = true }) => (
                  <div key={name}>
                    <label htmlFor={name} className="text-slate-800 text-sm font-medium mb-2 block">
                      {label}
                    </label>
                    <div className="relative flex items-center">
                      <input
                        id={name}
                        name={name}
                        type={showPassword[name as keyof typeof showPassword] ? 'text' : 'password'}
                        placeholder={name === 'senha_gov' ? 'Opcional' : ''}
                        required={required}
                        value={form[name as keyof typeof form]}
                        onChange={handleChange}
                        className="w-full text-sm text-slate-800 border border-slate-300 pl-4 pr-10 py-3 rounded-lg outline-blue-600"
                      />
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="#bbb"
                        stroke="#bbb"
                        className="w-[18px] h-[18px] absolute right-4 cursor-pointer"
                        viewBox="0 0 128 128"
                        onClick={() => toggleShowPassword(name as keyof typeof showPassword)}
                      >
                        <path d="M64 104C22.127 104 1.367 67.496.504 65.943a4 4 0 0 1 0-3.887C1.367 60.504 22.127 24 64 24s62.633 36.504 63.496 38.057a4 4 0 0 1 0 3.887C126.633 67.496 105.873 104 64 104zM8.707 63.994C13.465 71.205 32.146 96 64 96c31.955 0 50.553-24.775 55.293-31.994C114.535 56.795 95.854 32 64 32 32.045 32 13.447 56.775 8.707 63.994zM64 88c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm0-40c-8.822 0-16 7.178-16 16s7.178 16 16 16 16-7.178 16-16-7.178-16-16-16z"></path>
                      </svg>
                    </div>
                  </div>
                ))}

                <div className="!mt-10">
                  <button
                    type="submit"
                    className="w-full shadow-xl py-2.5 px-4 text-[15px] font-medium tracking-wide rounded-lg text-white bg-[#963d40] hover:bg-[#ca7174] focus:outline-none cursor-pointer"
                  >
                    Criar Conta
                  </button>
                  <p className="text-sm !mt-6 text-center text-slate-500">
                    Já possui uma conta?{' '}
                    <a href="/login" className="text-[#963d40] font-medium hover:underline ml-1 whitespace-nowrap">
                      Fazer Login
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
              Confirmação de Registro
            </Dialog.Title>
            <Dialog.Description className="mt-2 text-gray-600">
              Sua conta foi registrada com sucesso no nosso sistema.
            </Dialog.Description>

            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => {
                  setIsLogoutModalOpen(false)
                  router.push('/demandas')
                }}
                className="px-4 py-2 bg-[#2ca5bb] text-white rounded hover:bg-[#4a767e] transition-colors cursor-pointer hover:shadow-md"
              >
                Continuar
              </button>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </>
  )
}
