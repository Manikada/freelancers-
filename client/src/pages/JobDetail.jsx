import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import api from '../utils/api.js'
import { useAuth } from '../state/AuthContext.jsx'
import Card from '../components/ui/Card.jsx'
import Badge from '../components/ui/Badge.jsx'
import Button from '../components/ui/Button.jsx'
import { useToast } from '../components/toast/ToastContext.jsx'

export default function JobDetail(){
  const { id } = useParams()
  const [data, setData] = useState(null)
  const [amount, setAmount] = useState('')
  const [message, setMessage] = useState('')
  const { user } = useAuth()
  const { show } = useToast()
  const [loading, setLoading] = useState(false)

  useEffect(()=>{ load() }, [id])

  async function load(){
    try {
      const { data } = await api.get(`/jobs/${id}`)
      setData(data)
    } catch {
      show('Failed to load job', 'error')
    }
  }

  async function bid(){
    try {
      setLoading(true)
      await api.post(`/jobs/${id}/bids`, { amount: Number(amount), message })
      setAmount(''); setMessage('');
      show('Bid submitted', 'success')
      load()
    } catch {
      show('Failed to submit bid', 'error')
    } finally { setLoading(false) }
  }
  async function claim(){
    try {
      setLoading(true)
      await api.post(`/jobs/${id}/claim`)
      show('Job claimed', 'success')
      load()
    } catch {
      show('Failed to claim job', 'error')
    } finally { setLoading(false) }
  }
  async function complete(){
    try {
      setLoading(true)
      await api.post(`/jobs/${id}/complete`)
      show('Marked as completed', 'success')
      load()
    } catch {
      show('Failed to mark complete', 'error')
    } finally { setLoading(false) }
  }
  async function rate(stars){
    try {
      setLoading(true)
      await api.post(`/jobs/${id}/rating`, { stars })
      show('Thanks for rating', 'success')
      load()
    } catch {
      show('Failed to rate', 'error')
    } finally { setLoading(false) }
  }

  if (!data) return <Card>Loading...</Card>
  const { job, bids, rating } = data

  return (
    <div className="space-y-6">
      <Card>
        <div className="flex items-start justify-between gap-6">
          <div className="flex-1">
            <h1 className="text-xl font-semibold">{job.title}</h1>
            <div className="mt-1 flex items-center gap-2">
              <Badge color="purple">{job.category}</Badge>
              <Badge color={job.status==='Open'?'green': job.status==='InProgress'?'yellow':'gray'}>{job.status}</Badge>
              {job.client && <span className="text-xs text-gray-500">by {job.client.name}</span>}
            </div>
            <p className="mt-3 whitespace-pre-wrap leading-relaxed">{job.description}</p>
          </div>
          <div className="text-right min-w-[140px]">
            {job.budget != null && <div className="text-sm">Budget<br/><span className="text-lg font-semibold">{job.budget}</span></div>}
            {job.claimedBy && <div className="mt-2 text-sm text-gray-600">Claimed by: <span className="font-medium">{job.claimedBy.name}</span></div>}
          </div>
        </div>
      </Card>

      {user?.role==='freelancer' && job.status==='Open' && (
        <Card>
          <h2 className="font-semibold mb-3">Quick actions</h2>
          <div className="flex flex-col gap-2 sm:flex-row">
            <input className="input w-40" placeholder="Bid amount" value={amount} onChange={e=>setAmount(e.target.value)} />
            <input className="input flex-1" placeholder="Message (optional)" value={message} onChange={e=>setMessage(e.target.value)} />
            <Button onClick={bid} disabled={!amount || loading}>Submit Bid</Button>
            <Button onClick={claim} variant="secondary" disabled={loading}>Claim Now</Button>
          </div>
        </Card>
      )}

      {user?.role==='client' && user?.id===job.client?._id && job.status==='InProgress' && (
        <Card>
          <Button onClick={complete} disabled={loading}>Mark Completed</Button>
        </Card>
      )}

      {job.status==='Completed' && user?.role==='client' && user?.id===job.client?._id && !rating && (
        <Card>
          <div className="flex items-center gap-2">
            <span>Rate:</span>
            {[1,2,3,4,5].map(s=> <Button key={s} onClick={()=>rate(s)} disabled={loading}>{s}</Button>)}
          </div>
        </Card>
      )}

      <Card>
        <h2 className="font-semibold mb-2">Bids</h2>
        <div className="space-y-2">
          {bids.map(b=> (
            <div key={b._id} className="flex items-center justify-between">
              <div>
                <div className="font-medium">{b.freelancer?.name || 'Unknown'}</div>
                <div className="text-sm text-gray-600">{b.message}</div>
              </div>
              <div className="font-medium">{b.amount}</div>
            </div>
          ))}
          {bids.length===0 && <div className="text-sm text-gray-600">No bids yet.</div>}
        </div>
      </Card>

      {rating && (
        <Card>
          <div className="font-medium">Rating: {rating.stars}/5</div>
          <div className="text-sm text-gray-600">{rating.feedback}</div>
        </Card>
      )}
    </div>
  )
}
