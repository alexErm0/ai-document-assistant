import React, { useState } from 'react'
import api from '../api'

export default function Upload() {
  const [file, setFile] = useState(null)
  const [message, setMessage] = useState('')

  async function submit(e) {
    e.preventDefault()
    if (!file) return setMessage('Select a file')
    const fd = new FormData()
    fd.append('file', file)
    try {
      const res = await api.post('/upload', fd, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      setMessage('Uploaded: ' + (res.data.filename || 'ok'))
    } catch (err) {
      setMessage('Upload failed: ' + (err.response?.data || err.message))
    }
  }

  return (
    <div>
      <h3>Upload Document</h3>
      <form onSubmit={submit}>
        <input type="file" onChange={(e) => setFile(e.target.files[0])} />
        <button type="submit">Upload</button>
      </form>
      {message && <div className="info">{message}</div>}
    </div>
  )
}
