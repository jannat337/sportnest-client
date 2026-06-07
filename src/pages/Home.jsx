import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { FaMapMarkerAlt } from 'react-icons/fa'
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
        <div className="relative z-10">
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
        </div>
      </section>

      {/* Featured Facilities */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">
          Featured Facilities
        </h2>
        {loading ? (
          <div className="flex justify-center">
            <div className="w-16 h-16 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {facilities.map(facility => (
              <div key={facility._id} className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition">
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
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Why Choose Us Section */}
      <section className="bg-gray-50 py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">Why Choose SportNest?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-white rounded-2xl shadow-md">
              <div className="text-5xl mb-4">🏆</div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Premium Facilities</h3>
              <p className="text-gray-500">Access top-quality sports facilities at affordable prices.</p>
            </div>
            <div className="text-center p-6 bg-white rounded-2xl shadow-md">
              <div className="text-5xl mb-4">⚡</div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Easy Booking</h3>
              <p className="text-gray-500">Book your favorite facility in just a few clicks.</p>
            </div>
            <div className="text-center p-6 bg-white rounded-2xl shadow-md">
              <div className="text-5xl mb-4">🔒</div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Secure Payments</h3>
              <p className="text-gray-500">Your bookings and payments are always safe with us.</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-700 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">1</div>
              <h3 className="font-bold text-gray-800 mb-2">Browse Facilities</h3>
              <p className="text-gray-500 text-sm">Explore our wide range of sports facilities.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-700 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">2</div>
              <h3 className="font-bold text-gray-800 mb-2">Select Date & Time</h3>
              <p className="text-gray-500 text-sm">Choose your preferred date and time slot.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-700 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">3</div>
              <h3 className="font-bold text-gray-800 mb-2">Confirm Booking</h3>
              <p className="text-gray-500 text-sm">Review and confirm your booking details.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-700 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">4</div>
              <h3 className="font-bold text-gray-800 mb-2">Play & Enjoy</h3>
              <p className="text-gray-500 text-sm">Show up and enjoy your sports session!</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home