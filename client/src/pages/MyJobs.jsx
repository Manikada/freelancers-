import { useEffect, useState } from 'react'
import api from '../utils/api.js'
import { Link } from 'react-router-dom'

export default function MyJobs(){
  const [items, setItems] = useState([])
  useEffect(()=>{ (async()=>{ const { data } = await api.get('/me/jobs'); setItems(data) })() }, [])
  return (
    <div className="space-y-3">
      <h1 className="text-lg font-semibold">My Jobs</h1>
      <div className="grid gap-3">
        {items.map(j=> (
          <Link to={`/jobs/${j._id}`} key={j._id} className="card block">
            <div className="flex justify-between"><span>{j.title}</span><span className="text-sm">{j.status}</span></div>
          </Link>
        ))}
        {items.length===0 && <div className="text-sm text-gray-600">No jobs yet.</div>}
      </div>
    </div>
  )
}
