import { NavLink, Link } from 'react-router-dom'
import { useAuth } from '../state/AuthContext.jsx'
import Button from './ui/Button.jsx'

export default function Layout({ children }){
  const { user, logout } = useAuth()
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white/80 backdrop-blur border-b sticky top-0 z-30">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link to="/" className="font-semibold tracking-tight">Simple Job Board</Link>
          <nav className="flex items-center gap-4 text-sm">
            <NavLink to="/" className={({isActive})=>isActive? 'text-blue-700':'text-gray-700'}>Jobs</NavLink>
            {user?.role==='client' && <NavLink to="/post" className={({isActive})=>isActive? 'text-blue-700':'text-gray-700'}>Post Job</NavLink>}
            {user && <NavLink to="/my" className={({isActive})=>isActive? 'text-blue-700':'text-gray-700'}>My Area</NavLink>}
            {!user && <NavLink to="/login" className={({isActive})=>isActive? 'text-blue-700':'text-gray-700'}>Login</NavLink>}
            {!user && <NavLink to="/register" className={({isActive})=>isActive? 'text-blue-700':'text-gray-700'}>Register</NavLink>}
            {user && <Button onClick={logout} className="ml-2">Logout</Button>}
          </nav>
        </div>
      </header>
      <main className="max-w-6xl mx-auto px-4 py-6">
        {children}
      </main>
      <footer className="py-8 text-center text-xs text-gray-500">© {new Date().getFullYear()} Simple Job Board</footer>
    </div>
  )
}
