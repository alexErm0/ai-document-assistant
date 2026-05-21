import React, { useEffect, useState } from 'react'
import api from '../api'

export default function History() {
  const [items, setItems] = useState([])

  useEffect(() => {
    api.get('/history')
      .then((r) => setItems(r.data || []))
      .catch(() => setItems([]))
  }, [])

  return (
    <div>
      <h3>History</h3>
      <ul>
        {items.map((it, i) => (
          <li key={i}>{it.title || it.filename || JSON.stringify(it)}</li>
        ))}
      </ul>
    </div>
  )
}
