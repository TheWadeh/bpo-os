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
import Dashboard from './pages/dashboard/Dashboard'
import Footer from './components/Footer'

function App() {
  return (
    <div className="min-h-full bg-navy-blue text-text-white">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/jobs"
          element={(
            <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
              <JobsList />
            </main>
          )}
        />
        <Route
          path="/jobs/:id"
          element={(
            <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
              <JobDetail />
            </main>
          )}
        />
        <Route
          path="/bposchool"
          element={(
            <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
              <BpoSchool />
            </main>
          )}
        />
        <Route
          path="/about"
          element={(
            <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
              <About />
            </main>
          )}
        />
        <Route
          path="/login"
          element={(
            <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
              <Login />
            </main>
          )}
        />
        <Route
          path="/register"
          element={(
            <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
              <Register />
            </main>
          )}
        />
        <Route path="/dashboard" element={(
          <ProtectedRoute>
            <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
              <Dashboard />
            </main>
          </ProtectedRoute>
        )} />
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
