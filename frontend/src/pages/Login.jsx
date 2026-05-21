import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import api from '../api'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const nav = useNavigate()

  async function submit(e) {
    e.preventDefault()
    try {
      const res = await api.post('/auth/login', { email, password })
      localStorage.setItem('token', res.data.access_token || res.data.token)
      nav('/')
    } catch (err) {
      setError(err.response?.data?.detail || err.message)
    }
  }

  return (
    <div className="auth">
      <h2>Login</h2>
      <form onSubmit={submit}>
        <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
        <input value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" type="password" />
        <button type="submit">Login</button>
      </form>
      {error && <div className="error">{error}</div>}
      <div>
        Need an account? <Link to="/register">Register</Link>
      </div>
    </div>
  )
}
