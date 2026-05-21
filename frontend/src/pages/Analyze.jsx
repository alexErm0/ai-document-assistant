import React, { useState } from 'react'
import api from '../api'

export default function Analyze() {
  const [docId, setDocId] = useState('')
  const [prompt, setPrompt] = useState('Summarize this document')
  const [result, setResult] = useState(null)

  async function submit(e) {
    e.preventDefault()
    try {
      const res = await api.post('/analyze', { document_id: docId, prompt })
      setResult(res.data)
    } catch (err) {
      setResult({ error: err.response?.data || err.message })
    }
  }

  return (
    <div>
      <h3>Analyze Document</h3>
      <form onSubmit={submit}>
        <input value={docId} onChange={(e) => setDocId(e.target.value)} placeholder="Document ID" />
        <textarea value={prompt} onChange={(e) => setPrompt(e.target.value)} rows={4} />
        <button type="submit">Analyze</button>
      </form>
      {result && <pre className="result">{JSON.stringify(result, null, 2)}</pre>}
    </div>
  )
}
