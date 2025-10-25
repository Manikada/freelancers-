import { createContext, useContext, useEffect, useState } from 'react'
import api from '../utils/api.js'

const AuthCtx = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(()=>{ (async()=>{
    try {
      const { data } = await api.get('/auth/me')
      setUser(data)
    } catch {}
    setLoading(false)
  })() }, [])

  async function login(email, password){
    const { data } = await api.post('/auth/login', { email, password })
    setUser(data)
  }
  async function register(payload){
    const { data } = await api.post('/auth/register', payload)
    setUser(data)
  }
  async function logout(){
    await api.post('/auth/logout')
    setUser(null)
  }

  return <AuthCtx.Provider value={{ user, loading, login, register, logout }}>{children}</AuthCtx.Provider>
}

export function useAuth(){ return useContext(AuthCtx) }
