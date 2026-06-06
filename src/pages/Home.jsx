import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div>
      <section className="bg-gradient-to-r from-green-800 to-green-600 text-white py-24 px-4 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          Book Your Sports Facility
        </h1>
        <p className="text-lg md:text-xl text-green-100 mb-8 max-w-2xl mx-auto">
          Find and book the best football turfs, badminton courts, swimming lanes and tennis courts near you.
        </p>
        <Link
          to="/facilities"
          className="bg-white text-green-700 px-8 py-3 rounded-full font-bold text-lg hover:bg-green-100 transition"
        >
          Explore Facilities
        </Link>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">
          Featured Facilities
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <p className="text-center text-gray-500 col-span-3">Loading facilities...</p>
        </div>
      </section>
    </div>
  )
}

export default Home