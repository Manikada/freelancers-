import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../state/AuthContext.jsx'

export default function Register(){
  const { register } = useAuth()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('client')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  async function onSubmit(e){
    e.preventDefault()
    try {
      await register({ name, email, password, role })
      navigate('/')
    } catch (e){ setError('Registration failed') }
  }

  return (
    <div className="max-w-md mx-auto card">
      <h1 className="text-lg font-semibold mb-4">Register</h1>
      {error && <div className="text-red-600 mb-2 text-sm">{error}</div>}
      <form onSubmit={onSubmit} className="space-y-3">
        <div>
          <label className="label">Name</label>
          <input className="input" value={name} onChange={e=>setName(e.target.value)} />
        </div>
        <div>
          <label className="label">Email</label>
          <input className="input" value={email} onChange={e=>setEmail(e.target.value)} />
        </div>
        <div>
          <label className="label">Password</label>
          <input className="input" type="password" value={password} onChange={e=>setPassword(e.target.value)} />
        </div>
        <div>
          <label className="label">Role</label>
          <select className="input" value={role} onChange={e=>setRole(e.target.value)}>
            <option value="client">Client</option>
            <option value="freelancer">Freelancer</option>
          </select>
        </div>
        <button className="btn" type="submit">Create account</button>
      </form>
    </div>
  )
}
