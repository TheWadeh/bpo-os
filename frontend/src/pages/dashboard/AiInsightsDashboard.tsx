import React, { useState } from 'react'
import api from '../../lib/api'

const AiInsightsDashboard: React.FC = () => {
  const [clientName, setClientName] = useState('')
  const [leadStage, setLeadStage] = useState('Prospect')
  const [value, setValue] = useState('')
  const [loading, setLoading] = useState(false)
  const [insights, setInsights] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const onSubmit: React.FormEventHandler = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setInsights(null)
    try {
      const res = await api.post('/api/ai/insights', { clientName, leadStage, value })
      setInsights(res.data.insights)
    } catch (err) {
      setError('Failed to get AI insights')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="text-text-white">
      <h2 className="text-xl font-semibold mb-4">AI Insights</h2>

      <form onSubmit={onSubmit} className="grid gap-4 md:grid-cols-3">
        <div>
          <label className="block text-sm font-medium text-text-light-gray">Client Name</label>
          <input value={clientName} onChange={(e) => setClientName(e.target.value)} className="mt-1 w-full rounded-md border-gray-700 bg-navy-blue focus:border-soft-cyan focus:ring-soft-cyan text-text-white" />
        </div>
        <div>
          <label className="block text-sm font-medium text-text-light-gray">Lead Stage</label>
          <select value={leadStage} onChange={(e) => setLeadStage(e.target.value)} className="mt-1 w-full rounded-md border-gray-700 bg-navy-blue focus:border-soft-cyan focus:ring-soft-cyan text-text-white">
            {['Prospect','Qualified','Negotiation','Closed'].map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-text-light-gray">Value (USD)</label>
          <input type="number" value={value} onChange={(e) => setValue(e.target.value)} className="mt-1 w-full rounded-md border-gray-700 bg-navy-blue focus:border-soft-cyan focus:ring-soft-cyan text-text-white" />
        </div>
        <div className="md:col-span-3">
          <button type="submit" disabled={loading} className="btn-primary">{loading ? 'Analyzing...' : 'Get Insights'}</button>
        </div>
      </form>

      {error && <p className="mt-4 text-red-400">{error}</p>}
      {insights && (
        <div className="mt-6 card-base whitespace-pre-wrap">
          {insights}
        </div>
      )}
    </div>
  )
}

export default AiInsightsDashboard
