import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useAuth } from '../context/AuthContext'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const { isAuthenticated, user, logout } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const onHomeRoute = location.pathname === '/'

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `px-3 py-2 rounded-md text-sm font-medium ${isActive ? 'text-neon-green' : 'text-text-light-gray hover:text-text-white'}`

  return (
    <nav className="bg-navy-blue absolute inset-x-0 top-0 z-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="text-lg font-semibold text-text-white">
              BPO OS
            </Link>
            <div className="hidden md:block ml-6">
              <div className="flex space-x-4">
                <NavLink to="/" className={navLinkClass} end>
                  Home
                </NavLink>
                <NavLink to="/jobs" className={navLinkClass}>
                  Jobs
                </NavLink>
                <NavLink to="/bposchool" className={navLinkClass}>
                  BPO School
                </NavLink>
                <NavLink to="/about" className={navLinkClass}>
                  About
                </NavLink>
                {isAuthenticated && (
                  <NavLink to="/dashboard" className={navLinkClass}>
                    Dashboard
                  </NavLink>
                )}
              </div>
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-3">
            {isAuthenticated ? (
              <>
                <span className="text-sm text-text-light-gray">{user?.name}</span>
                <button onClick={handleLogout} className="btn-secondary">
                  Logout
                </button>
              </>
            ) : (
              <>
                <NavLink to="/login" className={navLinkClass}>
                  Login
                </NavLink>
                <NavLink to="/register" className="btn-primary">
                  Register
                </NavLink>
              </>
            )}
          </div>

          <div className="md:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-md p-2 text-text-white hover:bg-navy-blue-light focus:outline-none"
              onClick={() => setOpen(!open)}
            >
              <span className="sr-only">Open main menu</span>
              {open ? (
                <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
              ) : (
                <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" /></svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t border-navy-blue-light bg-navy-blue">
          <div className="space-y-1 px-2 py-3">
            <NavLink to="/" className={navLinkClass} end onClick={() => setOpen(false)}>
              Home
            </NavLink>
            <NavLink to="/jobs" className={navLinkClass} onClick={() => setOpen(false)}>
              Jobs
            </NavLink>
            <NavLink to="/bposchool" className={navLinkClass} onClick={() => setOpen(false)}>
              BPO School
            </NavLink>
            <NavLink to="/about" className={navLinkClass} onClick={() => setOpen(false)}>
              About
            </NavLink>
                {isAuthenticated && (
                  <NavLink to="/dashboard" className={navLinkClass} onClick={() => setOpen(false)}>
                    Dashboard
                  </NavLink>
                )}
            {isAuthenticated ? (
              <button
                onClick={() => { setOpen(false); handleLogout() }}
                className="block w-full text-left px-3 py-2 rounded-md text-sm font-medium text-text-white hover:bg-navy-blue-light"
              >
                Logout
              </button>
            ) : (
              <>
                <NavLink to="/login" className={navLinkClass} onClick={() => setOpen(false)}>
                  Login
                </NavLink>
                <NavLink to="/register" className={navLinkClass} onClick={() => setOpen(false)}>
                  Register
                </NavLink>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}




