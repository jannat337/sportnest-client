import { Link } from 'react-router-dom'
import { useState } from 'react'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="bg-green-700 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 text-2xl font-bold">
          🏟️ SportNest
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">
          <Link to="/" className="hover:text-green-200 transition">Home</Link>
          <Link to="/facilities" className="hover:text-green-200 transition">All Facilities</Link>
          <Link to="/login" className="bg-white text-green-700 px-4 py-2 rounded-full font-semibold hover:bg-green-100 transition">Login</Link>
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-green-800 px-4 py-3 flex flex-col gap-3">
          <Link to="/" className="hover:text-green-200">Home</Link>
          <Link to="/facilities" className="hover:text-green-200">All Facilities</Link>
          <Link to="/login" className="hover:text-green-200">Login</Link>
        </div>
      )}
    </nav>
  )
}

export default Navbar