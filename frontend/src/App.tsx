import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import JobsList from './pages/JobsList'
import JobDetail from './pages/JobDetail'
import BpoSchool from './pages/BpoSchool'
import About from './pages/About'
import Login from './pages/Login'
import Register from './pages/Register'
import ProtectedRoute from './components/ProtectedRoute'
import CrmDashboard from './pages/dashboard/CrmDashboard'
import ProjectsDashboard from './pages/dashboard/ProjectsDashboard'
import AiInsightsDashboard from './pages/dashboard/AiInsightsDashboard'
import JobPostingPortal from './pages/dashboard/JobPostingPortal'
import DashboardOverview from './pages/dashboard/DashboardOverview'
import Footer from './components/Footer'

function App() {
  return (
    <div className="min-h-full bg-navy-blue text-text-white">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/jobs" element={<JobsList />} />
        <Route path="/jobs/:id" element={<JobDetail />} />
        <Route path="/bposchool" element={<BpoSchool />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<ProtectedRoute><DashboardOverview /></ProtectedRoute>} />
        <Route path="/dashboard/crm" element={<ProtectedRoute><CrmDashboard /></ProtectedRoute>} />
        <Route path="/dashboard/projects" element={<ProtectedRoute><ProjectsDashboard /></ProtectedRoute>} />
        <Route path="/dashboard/ai-insights" element={<ProtectedRoute><AiInsightsDashboard /></ProtectedRoute>} />
        <Route path="/dashboard/job-posting" element={<ProtectedRoute><JobPostingPortal /></ProtectedRoute>} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App
