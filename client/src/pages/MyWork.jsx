import { useEffect, useState } from 'react'
import api from '../utils/api.js'
import { Link } from 'react-router-dom'

export default function MyWork(){
  const [claimed, setClaimed] = useState([])
  const [bids, setBids] = useState([])
  useEffect(()=>{ (async()=>{ const { data } = await api.get('/me/work'); setClaimed(data.claimed); setBids(data.bids) })() }, [])
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-lg font-semibold mb-2">Claimed Jobs</h1>
        <div className="grid gap-3">
          {claimed.map(j=> <Link to={`/jobs/${j._id}`} key={j._id} className="card block">{j.title}</Link>)}
          {claimed.length===0 && <div className="text-sm text-gray-600">No claimed jobs.</div>}
        </div>
      </div>
      <div>
        <h2 className="text-lg font-semibold mb-2">My Bids</h2>
        <div className="grid gap-3">
          {bids.map(b=> <div key={b._id} className="card flex justify-between"><span>{b.message || 'No message'}</span><span>{b.amount}</span></div>)}
          {bids.length===0 && <div className="text-sm text-gray-600">No bids.</div>}
        </div>
      </div>
    </div>
  )
}
