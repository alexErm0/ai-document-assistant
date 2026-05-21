import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'

export default function Nav() {
  const nav = useNavigate()
  function logout() {
    localStorage.removeItem('token')
    nav('/login')
  }

  return (
    <nav className="nav">
      <div className="brand">AI Doc Assistant</div>
      <div className="links">
        <NavLink to="/">Upload</NavLink>
        <NavLink to="/analyze">Analyze</NavLink>
        <NavLink to="/history">History</NavLink>
        <button onClick={logout} className="btn-plain">Logout</button>
      </div>
    </nav>
  )
}
