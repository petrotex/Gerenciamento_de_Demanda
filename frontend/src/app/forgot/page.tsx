'use client'

import { useState } from 'react'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setMessage(null)

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/users/reset_password/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })

      if (res.ok) {
        setMessage('Email para reset de senha enviado! Verifique sua caixa de entrada.')
      } else {
        const data = await res.json()
        // Pode personalizar a mensagem de erro, geralmente vem algo tipo {email: ['Não encontrado']}
        setError('Não foi possível enviar o email. Verifique o email e tente novamente.')
      }
    } catch {
      setError('Erro ao conectar com o servidor.')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <form onSubmit={handleSubmit} className="max-w-md w-full bg-white p-6 rounded shadow">
        <h2 className="text-2xl font-semibold mb-4">Esqueci minha senha</h2>

        {message && <p className="text-green-600 mb-4">{message}</p>}
        {error && <p className="text-red-600 mb-4">{error}</p>}

        <label htmlFor="email" className="block mb-2 font-medium">Email</label>
        <input
          id="email"
          type="email"
          required
          placeholder="Digite seu email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="w-full border rounded p-2 mb-4"
        />

        <button
          type="submit"
          className="w-full bg-[#963d40] hover:bg-[#ca7174] text-white py-2 rounded"
        >
          Enviar email de recuperação
        </button>
      </form>
    </div>
  )
}
