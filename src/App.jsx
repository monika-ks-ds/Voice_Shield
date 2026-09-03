import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useState } from 'react'
import Landing from './pages/Landing'
import Login from './pages/Login'
import EnrollVoice from './pages/EnrollVoice'
import LiveCall from './pages/LiveCall'
import Dashboard from './pages/Dashboard'
import IncidentHistory from './pages/IncidentHistory'
import IncidentDetail from './pages/IncidentDetail'
import AttackLab from './pages/AttackLab'
import Settings from './pages/Settings'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState(null)

  const handleLogin = (userData) => {
    setIsAuthenticated(true)
    setUser(userData)
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    setUser(null)
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route 
          path="/login" 
          element={<Login onLogin={handleLogin} isAuthenticated={isAuthenticated} />} 
        />
        {isAuthenticated && (
          <>
            <Route path="/enroll" element={<EnrollVoice user={user} />} />
            <Route path="/call" element={<LiveCall user={user} />} />
            <Route path="/dashboard" element={<Dashboard user={user} />} />
            <Route path="/incidents" element={<IncidentHistory user={user} />} />
            <Route path="/incidents/:id" element={<IncidentDetail user={user} />} />
            <Route path="/attack-lab" element={<AttackLab user={user} />} />
            <Route path="/settings" element={<Settings user={user} onLogout={handleLogout} />} />
          </>
        )}
      </Routes>
    </Router>
  )
}

export default App
