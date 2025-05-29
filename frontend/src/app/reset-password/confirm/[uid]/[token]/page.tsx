'use client'

import { useState } from 'react'
import { useRouter, useParams } from 'next/navigation'

export default function ResetPasswordConfirmPage() {
  const router = useRouter()
  const params = useParams()
  const { uid, token } = params // pegar da URL

  const [newPassword, setNewPassword] = useState('')
  const [newPassword2, setNewPassword2] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (newPassword !== newPassword2) {
      setError('As senhas não coincidem.')
      return
    }

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/users/reset_password_confirm/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          uid,
          token,
          new_password: newPassword,
        }),
      })

      if (res.ok) {
        setSuccess(true)
        setTimeout(() => {
          router.push('/login')
        }, 3000)
      } else {
        const data = await res.json()
        // pegar o primeiro erro que vier do backend
        const firstError = Object.values(data)[0]
        setError(Array.isArray(firstError) ? firstError[0] : firstError)
      }
    } catch {
      setError('Erro ao conectar com o servidor.')
    }
  }

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white p-6 rounded shadow text-center">
          <h2 className="text-2xl font-semibold mb-4">Senha resetada com sucesso!</h2>
          <p>Você será redirecionado para o login em instantes.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <form onSubmit={handleSubmit} className="max-w-md w-full bg-white p-6 rounded shadow">
        <h2 className="text-2xl font-semibold mb-4">Digite sua nova senha</h2>

        {error && <p className="text-red-600 mb-4">{error}</p>}

        <label htmlFor="newPassword" className="block mb-2 font-medium">Nova senha</label>
        <input
          id="newPassword"
          type="password"
          required
          value={newPassword}
          onChange={e => setNewPassword(e.target.value)}
          className="w-full border rounded p-2 mb-4"
        />

        <label htmlFor="newPassword2" className="block mb-2 font-medium">Confirme a nova senha</label>
        <input
          id="newPassword2"
          type="password"
          required
          value={newPassword2}
          onChange={e => setNewPassword2(e.target.value)}
          className="w-full border rounded p-2 mb-4"
        />

        <button
          type="submit"
          className="w-full bg-[#963d40] hover:bg-[#ca7174] text-white py-2 rounded"
        >
          Resetar senha
        </button>
      </form>
    </div>
  )
}
