import React, { useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import axios from 'axios'
import authStore from './stores/authStore'
import RequireAuth from './components/RequireAuth'

axios.defaults.withCredentials = true

function App() {
  const s = authStore()

  useEffect(() => {
    s.init()
  }, [])

  if (!s.ready) return <div>Loading...</div>

  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<RequireAuth element={<Home />} />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  )
}

const rootNode = document.getElementById('app')

if (rootNode) {
  const root = ReactDOM.createRoot(rootNode)
  root.render(<App />)
}
