import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import api from '../api'

export default function Register() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const nav = useNavigate()

  async function submit(e) {
    e.preventDefault()
    try {
      await api.post('/auth/register', { email, password })
      nav('/login')
    } catch (err) {
      setError(err.response?.data || err.message)
    }
  }

  return (
    <div className="auth">
      <h2>Register</h2>
      <form onSubmit={submit}>
        <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
        <input value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" type="password" />
        <button type="submit">Register</button>
      </form>
      {error && <div className="error">{JSON.stringify(error)}</div>}
      <div>
        Have an account? <Link to="/login">Login</Link>
      </div>
    </div>
  )
}
