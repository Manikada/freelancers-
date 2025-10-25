import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import api from '../utils/api.js'
import Card from '../components/ui/Card.jsx'
import Button from '../components/ui/Button.jsx'
import Badge from '../components/ui/Badge.jsx'

const categories = ['All','Design','Writing','Development','Data','Other']
const statuses = ['All','Open','InProgress','Completed']

export default function JobsList(){
  const [items, setItems] = useState([])
  const [category, setCategory] = useState('All')
  const [status, setStatus] = useState('Open')
  const [search, setSearch] = useState('')

  useEffect(()=>{ load() }, [category, status])

  async function load(){
    const params = {}
    if (category !== 'All') params.category = category
    if (status !== 'All') params.status = status
    if (search) params.search = search
    const { data } = await api.get('/jobs', { params })
    setItems(data)
  }

  return (
    <div className="space-y-6">
      <div className="rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6">
        <h1 className="text-2xl font-semibold">Find quick freelance gigs</h1>
        <p className="text-sm text-blue-100 mt-1">Browse jobs by category and status. Click a job to bid or claim quickly.</p>
      </div>

      <Card>
        <div className="flex flex-wrap gap-3 items-center">
          <select className="input w-auto" value={category} onChange={e=>setCategory(e.target.value)}>
            {categories.map(c=> <option key={c} value={c}>{c}</option>)}
          </select>
          <select className="input w-auto" value={status} onChange={e=>setStatus(e.target.value)}>
            {statuses.map(s=> <option key={s} value={s}>{s}</option>)}
          </select>
          <input className="input flex-1 min-w-[200px]" placeholder="Search by title..." value={search} onChange={e=>setSearch(e.target.value)} />
          <Button onClick={load}>Search</Button>
        </div>
      </Card>

      <div className="grid gap-4">
        {items.map(j=> (
          <Link to={`/jobs/${j._id}`} key={j._id}>
            <Card className="hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="font-semibold">{j.title}</h2>
                  <div className="mt-1 flex items-center gap-2">
                    <Badge color="purple">{j.category}</Badge>
                    <Badge color={j.status==='Open'?'green': j.status==='InProgress'?'yellow':'gray'}>{j.status}</Badge>
                  </div>
                </div>
                <div className="text-right">
                  {j.budget != null && <div className="text-sm">Budget<br/><span className="font-medium">{j.budget}</span></div>}
                </div>
              </div>
            </Card>
          </Link>
        ))}
        {items.length===0 && (
          <Card>
            <div className="text-sm text-gray-600">No jobs found. Try changing filters or search.</div>
          </Card>
        )}
      </div>
    </div>
  )
}
