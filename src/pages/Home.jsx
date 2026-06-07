import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { FaMapMarkerAlt } from 'react-icons/fa'
import { motion } from 'framer-motion'
import useAuth from '../hooks/useAuth'

const Home = () => {
  const [facilities, setFacilities] = useState([])
  const [loading, setLoading] = useState(true)
  const { user } = useAuth()

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/facilities`)
      .then(res => res.json())
      .then(data => {
        setFacilities(data.slice(0, 6))
        setLoading(false)
      })
  }, [])

  return (
    <div>
      {/* Banner Section */}
      <section
        className="relative text-white py-32 px-4 text-center"
        style={{
          backgroundImage: "url('https://img.freepik.com/premium-photo/football-match-group-b-uefa-champions-league-fc-shakhtar-donetsk-vs-real-madrid-fc_1308175-144567.jpg?w=1600')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div className="absolute inset-0 bg-black opacity-55"></div>
        <motion.div
          className="relative z-10"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Book Your Sports Facility
          </h1>
          <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
            Find and book the best football turfs, badminton courts, swimming lanes and tennis courts near you.
          </p>
          <Link
            to="/facilities"
            className="bg-white text-green-700 px-8 py-3 rounded-full font-bold text-lg hover:bg-green-100 transition"
          >
            Explore Facilities
          </Link>
        </motion.div>
      </section>

      {/* Featured Facilities */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <motion.h2
          className="text-3xl font-bold text-center text-gray-800 mb-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          Featured Facilities
        </motion.h2>
        {loading ? (
          <div className="flex justify-center">
            <div className="w-16 h-16 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {facilities.map((facility, index) => (
              <motion.div
                key={facility._id}
                className="bg-white rounded-2xl shadow-md overflow-hidden transition"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.03, boxShadow: "0 20px 40px rgba(0,0,0,0.15)" }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <img src={facility.image} alt={facility.name} className="w-full h-48 object-cover" />
                <div className="p-5">
                  <span className="bg-green-100 text-green-700 text-xs font-semibold px-2 py-1 rounded-full">
                    {facility.facility_type}
                  </span>
                  <h3 className="text-xl font-bold text-gray-800 mt-2">{facility.name}</h3>
                  <p className="text-gray-500 text-sm mt-1 flex items-center gap-1">
                    <FaMapMarkerAlt className="text-green-600" /> {facility.location}
                  </p>
                  <p className="text-green-700 font-semibold mt-2">BDT {facility.price_per_hour}/hour</p>
                  <Link
                    to={user ? `/facility/${facility._id}` : '/login'}
                    className="mt-4 block text-center bg-green-700 text-white py-2 rounded-lg font-semibold hover:bg-green-800 transition"
                  >
                    Book Now
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </section>

      {/* Why Choose Us Section */}
      <section className="bg-gray-50 py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            className="text-3xl font-bold text-center text-gray-800 mb-10"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            Why Choose SportNest?
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: '🏆', title: 'Premium Facilities', desc: 'Access top-quality sports facilities at affordable prices.' },
              { icon: '⚡', title: 'Easy Booking', desc: 'Book your favorite facility in just a few clicks.' },
              { icon: '🔒', title: 'Secure Payments', desc: 'Your bookings and payments are always safe with us.' }
            ].map((item, index) => (
              <motion.div
                key={index}
                className="text-center p-6 bg-white rounded-2xl shadow-md"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.05, boxShadow: "0 15px 30px rgba(0,0,0,0.1)" }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <div className="text-5xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">{item.title}</h3>
                <p className="text-gray-500">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            className="text-3xl font-bold text-center text-gray-800 mb-10"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            How It Works
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { num: 1, title: 'Browse Facilities', desc: 'Explore our wide range of sports facilities.' },
              { num: 2, title: 'Select Date & Time', desc: 'Choose your preferred date and time slot.' },
              { num: 3, title: 'Confirm Booking', desc: 'Review and confirm your booking details.' },
              { num: 4, title: 'Play & Enjoy', desc: 'Show up and enjoy your sports session!' }
            ].map((item, index) => (
              <motion.div
                key={index}
                className="text-center"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <div className="w-16 h-16 bg-green-700 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">{item.num}</div>
                <h3 className="font-bold text-gray-800 mb-2">{item.title}</h3>
                <p className="text-gray-500 text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home