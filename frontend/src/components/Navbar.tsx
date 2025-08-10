import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useAuth } from '../context/AuthContext'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const { isAuthenticated, user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `px-3 py-2 rounded-md text-sm font-medium ${isActive ? 'text-blue-600' : 'text-gray-700 hover:text-gray-900'}`

  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="text-lg font-semibold text-gray-900">
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
              </div>
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-3">
            {isAuthenticated ? (
              <>
                <span className="text-sm text-gray-700">{user?.name}</span>
                <button onClick={handleLogout} className="inline-flex items-center rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-white hover:bg-gray-800">
                  Logout
                </button>
              </>
            ) : (
              <>
                <NavLink to="/login" className={navLinkClass}>
                  Login
                </NavLink>
                <NavLink to="/register" className="inline-flex items-center rounded-md bg-blue-600 px-3 py-2 text-sm font-medium text-white hover:bg-blue-700">
                  Register
                </NavLink>
              </>
            )}
          </div>

          <div className="md:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-md p-2 text-gray-700 hover:bg-gray-100 focus:outline-none"
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
        <div className="md:hidden border-t border-gray-200">
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
            {isAuthenticated ? (
              <button
                onClick={() => { setOpen(false); handleLogout() }}
                className="block w-full text-left px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100"
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



