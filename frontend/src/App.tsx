import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import JobsList from './pages/JobsList'
import JobDetail from './pages/JobDetail'
import BpoSchool from './pages/BpoSchool'
import About from './pages/About'
import Login from './pages/Login'
import Register from './pages/Register'

function App() {
  return (
    <div className="min-h-full bg-gray-50 text-gray-900">
      <Navbar />
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/jobs" element={<JobsList />} />
          <Route path="/jobs/:id" element={<JobDetail />} />
          <Route path="/bposchool" element={<BpoSchool />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
