import { Route, Routes } from 'react-router-dom'
import JobsList from './pages/JobsList.jsx'
import JobDetail from './pages/JobDetail.jsx'
import PostJob from './pages/PostJob.jsx'
import MyJobs from './pages/MyJobs.jsx'
import MyWork from './pages/MyWork.jsx'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import { useAuth } from './state/AuthContext.jsx'
import Layout from './components/Layout.jsx'

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<JobsList />} />
        <Route path="/jobs/:id" element={<JobDetail />} />
        <Route path="/post" element={<RequireRole role="client"><PostJob /></RequireRole>} />
        <Route path="/my" element={<RequireAuth><MySwitcher /></RequireAuth>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<div className="text-sm text-gray-600">Page not found.</div>} />
      </Routes>
    </Layout>
  )
}

function RequireAuth({ children }) {
  const { user } = useAuth()
  if (!user) return <div className="rounded-lg border bg-white p-4">Please login.</div>
  return children
}

function RequireRole({ role, children }) {
  const { user } = useAuth()
  if (!user) return <div className="rounded-lg border bg-white p-4">Please login.</div>
  if (user.role !== role) return <div className="rounded-lg border bg-white p-4">Forbidden.</div>
  return children
}

function MySwitcher() {
  const { user } = useAuth()
  if (user.role === 'client') return <MyJobs />
  return <MyWork />
}
