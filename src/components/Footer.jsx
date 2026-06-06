import { Link } from 'react-router-dom'
import { FaFacebook, FaInstagram, FaLinkedin } from 'react-icons/fa'
import { FaXTwitter } from 'react-icons/fa6'

const Footer = () => {
  return (
    <footer className="bg-green-900 text-white pt-10 pb-6">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Logo & About */}
        <div>
          <h2 className="text-2xl font-bold mb-3">🏟️ SportNest</h2>
          <p className="text-green-300 text-sm">
            Your go-to platform for booking sports facilities. Find and book football turfs, badminton courts, swimming lanes and more.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-green-300 text-sm">
            <li><Link to="/" className="hover:text-white transition">Home</Link></li>
            <li><Link to="/facilities" className="hover:text-white transition">All Facilities</Link></li>
            <li><Link to="/login" className="hover:text-white transition">Login</Link></li>
            <li><Link to="/register" className="hover:text-white transition">Register</Link></li>
          </ul>
        </div>

        {/* Contact & Social */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Contact Us</h3>
          <p className="text-green-300 text-sm">📧 support@sportnest.com</p>
          <p className="text-green-300 text-sm">📞 +880 1234-567890</p>
          <div className="flex gap-4 mt-4 text-xl">
            <a href="#" className="hover:text-green-300 transition"><FaFacebook /></a>
            <a href="#" className="hover:text-green-300 transition"><FaXTwitter /></a>
            <a href="#" className="hover:text-green-300 transition"><FaInstagram /></a>
            <a href="#" className="hover:text-green-300 transition"><FaLinkedin /></a>
          </div>
        </div>

      </div>

      <div className="text-center text-green-400 text-sm mt-8 border-t border-green-700 pt-4">
        © {new Date().getFullYear()} SportNest. All rights reserved.
      </div>
    </footer>
  )
}

export default Footer