import { useState } from 'react'
import api from '../utils/api.js'
import { useNavigate } from 'react-router-dom'
import Card from '../components/ui/Card.jsx'
import Button from '../components/ui/Button.jsx'
import { useToast } from '../components/toast/ToastContext.jsx'

const categories = ['Design','Writing','Development','Data','Other']

export default function PostJob(){
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState('Design')
  const [budget, setBudget] = useState('')
  const navigate = useNavigate()
  const { show } = useToast()
  const [loading, setLoading] = useState(false)

  async function submit(e){
    e.preventDefault()
    try{
      setLoading(true)
      const { data } = await api.post('/jobs', { title, description, category, budget: budget? Number(budget): undefined })
      show('Job created', 'success')
      navigate(`/jobs/${data._id}`)
    } catch {
      show('Failed to create job', 'error')
    } finally { setLoading(false) }
  }

  return (
    <div className="max-w-xl mx-auto">
      <Card>
        <h1 className="text-lg font-semibold mb-4">Post a Job</h1>
        <form onSubmit={submit} className="space-y-3">
          <div>
            <label className="label">Title</label>
            <input className="input" value={title} onChange={e=>setTitle(e.target.value)} />
          </div>
          <div>
            <label className="label">Description</label>
            <textarea className="input" rows={5} value={description} onChange={e=>setDescription(e.target.value)} />
          </div>
          <div>
            <label className="label">Category</label>
            <select className="input" value={category} onChange={e=>setCategory(e.target.value)}>
              {categories.map(c=> <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label className="label">Budget (optional)</label>
            <input className="input" value={budget} onChange={e=>setBudget(e.target.value)} />
          </div>
          <Button type="submit" disabled={loading}>Create Job</Button>
        </form>
      </Card>
    </div>
  )
}
