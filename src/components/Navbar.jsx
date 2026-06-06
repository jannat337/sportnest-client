import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { toast, Toaster } from 'react-hot-toast'
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
    <nav className="bg-green-700 text-white shadow-lg">
      <Toaster />
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 text-2xl font-bold">
          🏟️ SportNest
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">
          <Link to="/" className="hover:text-green-200 transition">Home</Link>
          <Link to="/facilities" className="hover:text-green-200 transition">All Facilities</Link>

          {user ? (
            <div className="relative">
              <img
                src={user.photoURL || 'https://i.ibb.co/MBtjqXQ/no-avatar.gif'}
                alt="Profile"
                className="w-10 h-10 rounded-full cursor-pointer border-2 border-white"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              />
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white text-gray-800 rounded-lg shadow-lg z-50">
                  <Link to="/my-bookings" className="block px-4 py-2 hover:bg-gray-100">My Bookings</Link>
                  <Link to="/add-facility" className="block px-4 py-2 hover:bg-gray-100">Add Facility</Link>
                  <Link to="/manage-facilities" className="block px-4 py-2 hover:bg-gray-100">Manage My Facilities</Link>
                  <button onClick={handleLogout} className="w-full text-left px-4 py-2 hover:bg-gray-100 text-red-500">Logout</button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login" className="bg-white text-green-700 px-4 py-2 rounded-full font-semibold hover:bg-green-100 transition">Login</Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>☰</button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-green-800 px-4 py-3 flex flex-col gap-3">
          <Link to="/" className="hover:text-green-200">Home</Link>
          <Link to="/facilities" className="hover:text-green-200">All Facilities</Link>
          {user ? (
            <>
              <Link to="/my-bookings" className="hover:text-green-200">My Bookings</Link>
              <Link to="/add-facility" className="hover:text-green-200">Add Facility</Link>
              <Link to="/manage-facilities" className="hover:text-green-200">Manage My Facilities</Link>
              <button onClick={handleLogout} className="text-left text-red-300">Logout</button>
            </>
          ) : (
            <Link to="/login" className="hover:text-green-200">Login</Link>
          )}
        </div>
      )}
    </nav>
  )
}

export default Navbar