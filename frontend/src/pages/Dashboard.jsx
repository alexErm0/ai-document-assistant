import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Nav from '../components/Nav'
import Upload from './Upload'
import Analyze from './Analyze'
import History from './History'

export default function Dashboard() {
  return (
    <div>
      <Nav />
      <main className="container">
        <Routes>
          <Route path="/" element={<Upload />} />
          <Route path="analyze" element={<Analyze />} />
          <Route path="history" element={<History />} />
        </Routes>
      </main>
    </div>
  )
}
