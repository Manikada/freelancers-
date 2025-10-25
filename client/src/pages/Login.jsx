import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../state/AuthContext.jsx'

export default function Login(){
  const { login } = useAuth()
  const [email, setEmail] = useState('alice@example.com')
  const [password, setPassword] = useState('password123')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  async function onSubmit(e){
    e.preventDefault()
    try {
      await login(email, password)
      navigate('/')
    } catch (e){ setError('Login failed') }
  }

  return (
    <div className="max-w-md mx-auto card">
      <h1 className="text-lg font-semibold mb-4">Login</h1>
      {error && <div className="text-red-600 mb-2 text-sm">{error}</div>}
      <form onSubmit={onSubmit} className="space-y-3">
        <div>
          <label className="label">Email</label>
          <input className="input" value={email} onChange={e=>setEmail(e.target.value)} />
        </div>
        <div>
          <label className="label">Password</label>
          <input className="input" type="password" value={password} onChange={e=>setPassword(e.target.value)} />
        </div>
        <button className="btn" type="submit">Login</button>
      </form>
    </div>
  )
}
