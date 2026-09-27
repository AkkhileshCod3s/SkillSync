import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AppProvider } from './AppContext'
import Navbar from './components/Navbar'
import GraphBackground from './components/GraphBackground'
import Landing from './pages/Landing'
import Signup from './pages/Signup'
import Login from './pages/Login'
import ProfileSetup from './pages/ProfileSetup'
import Explore from './pages/Explore'
import Connections from './pages/Connections'
import Sessions from './pages/Sessions'
import Dashboard from './pages/Dashboard'
import LearningPlan from './pages/LearningPlan'
import Profile from './pages/Profile'

export default function App() {
  return (
    <AppProvider>
      <GraphBackground />
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile-setup" element={<ProfileSetup />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/connections" element={<Connections />} />
          <Route path="/sessions" element={<Sessions />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/learning-plan" element={<LearningPlan />} />
          <Route path="/profile/:id" element={<Profile />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AppProvider>
  )
}
