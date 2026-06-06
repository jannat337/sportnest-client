import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { FaMapMarkerAlt } from 'react-icons/fa'
import useAuth from '../hooks/useAuth'

const AllFacilities = () => {
  const [facilities, setFacilities] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('')
  const { user } = useAuth()

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/facilities`)
      .then(res => res.json())
      .then(data => {
        setFacilities(data)
        setLoading(false)
      })
  }, [])

  const filtered = facilities.filter(f => {
    const matchSearch = f.name.toLowerCase().includes(search.toLowerCase())
    const matchFilter = filter ? f.facility_type === filter : true
    return matchSearch && matchFilter
  })

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-16 h-16 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
  )

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">All Facilities</h1>

      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <input
          type="text"
          placeholder="Search by facility name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          <option value="">All Types</option>
          <option value="Football">Football</option>
          <option value="Badminton">Badminton</option>
          <option value="Swimming">Swimming</option>
          <option value="Tennis">Tennis</option>
          <option value="Cricket">Cricket</option>
          <option value="Basketball">Basketball</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.length === 0 ? (
          <p className="text-center text-gray-500 col-span-3">No facilities found!</p>
        ) : (
          filtered.map(facility => (
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
                <p className="text-gray-500 text-sm">👥 Capacity: {facility.capacity}</p>
                <Link
                  to={user ? `/facility/${facility._id}` : '/login'}
                  className="mt-4 block text-center bg-green-700 text-white py-2 rounded-lg font-semibold hover:bg-green-800 transition"
                >
                  Book Now
                </Link>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default AllFacilities