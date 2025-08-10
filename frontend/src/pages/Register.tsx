import { useState } from 'react'
import type { FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import api from '../lib/api'

export default function Register() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const { login } = useAuth()

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const response = await api.post('/api/auth/register', { name, email, password })
      login({ token: response.data.token, user: { id: 1, name, email, role: 'user' } })
      navigate('/dashboard')
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="mx-auto max-w-md p-8 rounded-lg shadow-lg bg-navy-blue-light text-text-white">
      <h2 className="text-2xl font-semibold mb-4 text-text-white">Create your account</h2>
      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-text-light-gray">Name</label>
          <input value={name} onChange={(e) => setName(e.target.value)} required className="mt-1 w-full rounded-md border-gray-700 bg-navy-blue focus:border-soft-cyan focus:ring-soft-cyan text-text-white" />
        </div>
        <div>
          <label className="block text-sm font-medium text-text-light-gray">Email</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="mt-1 w-full rounded-md border-gray-700 bg-navy-blue focus:border-soft-cyan focus:ring-soft-cyan text-text-white" />
        </div>
        <div>
          <label className="block text-sm font-medium text-text-light-gray">Password</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required className="mt-1 w-full rounded-md border-gray-700 bg-navy-blue focus:border-soft-cyan focus:ring-soft-cyan text-text-white" />
        </div>
        <button type="submit" disabled={loading} className="btn-primary w-full">
          {loading ? 'Creating account...' : 'Register'}
        </button>
      </form>
    </section>
  )
}




