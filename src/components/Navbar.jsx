import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { toast, Toaster } from 'react-hot-toast'
import { FaBars, FaTimes } from 'react-icons/fa'
import useAuth from '../hooks/useAuth'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = async () => {
    try {
      await logout()
      toast.success('Logged out successfully!')
      navigate('/')
    } catch (error) {
      toast.error(error.message)
    }
  }

  return (
    <nav className="bg-green-900 text-white shadow-lg sticky top-0 z-50">
      <Toaster />
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="bg-white rounded-full w-10 h-10 flex items-center justify-center shadow-md border-2 border-green-200">
            <span className="text-green-700 font-extrabold text-sm tracking-tight">SN</span>
          </div>
          <span className="text-2xl font-extrabold tracking-wide">Sport<span className="text-green-200">Nest</span></span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">
          <Link to="/" className="hover:text-green-200 transition font-medium">Home</Link>
          <Link to="/facilities" className="hover:text-green-200 transition font-medium">All Facilities</Link>

          {user ? (
            <div className="relative">
              <img
                src={user.photoURL || 'https://i.ibb.co/MBtjqXQ/no-avatar.gif'}
                alt="Profile"
                className="w-10 h-10 rounded-full cursor-pointer border-2 border-white object-cover"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              />
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-52 bg-white text-gray-800 rounded-xl shadow-xl z-50 overflow-hidden">
                  <div className="bg-green-50 px-4 py-2 border-b">
                    <p className="font-semibold text-green-700 text-sm truncate">{user.displayName || user.email}</p>
                  </div>
                  <Link to="/my-bookings" onClick={() => setDropdownOpen(false)} className="block px-4 py-2 hover:bg-gray-100 text-sm">📅 My Bookings</Link>
                  <Link to="/add-facility" onClick={() => setDropdownOpen(false)} className="block px-4 py-2 hover:bg-gray-100 text-sm">➕ Add Facility</Link>
                  <Link to="/manage-facilities" onClick={() => setDropdownOpen(false)} className="block px-4 py-2 hover:bg-gray-100 text-sm">⚙️ Manage Facilities</Link>
                  <button onClick={handleLogout} className="w-full text-left px-4 py-2 hover:bg-red-50 text-red-500 text-sm border-t">🚪 Logout</button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login" className="bg-white text-green-700 px-5 py-2 rounded-full font-semibold hover:bg-green-100 transition">Login</Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-xl" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-green-800 px-4 py-3 flex flex-col gap-3">
          <Link to="/" onClick={() => setIsOpen(false)} className="hover:text-green-200 font-medium">Home</Link>
          <Link to="/facilities" onClick={() => setIsOpen(false)} className="hover:text-green-200 font-medium">All Facilities</Link>
          {user ? (
            <>
              <Link to="/my-bookings" onClick={() => setIsOpen(false)} className="hover:text-green-200">📅 My Bookings</Link>
              <Link to="/add-facility" onClick={() => setIsOpen(false)} className="hover:text-green-200">➕ Add Facility</Link>
              <Link to="/manage-facilities" onClick={() => setIsOpen(false)} className="hover:text-green-200">⚙️ Manage Facilities</Link>
              <button onClick={handleLogout} className="text-left text-red-300">🚪 Logout</button>
            </>
          ) : (
            <Link to="/login" onClick={() => setIsOpen(false)} className="hover:text-green-200">Login</Link>
          )}
        </div>
      )}
    </nav>
  )
}

export default Navbar