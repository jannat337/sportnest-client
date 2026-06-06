import { useEffect, useState } from 'react'
import { toast, Toaster } from 'react-hot-toast'
import useAuth from '../hooks/useAuth'

const ManageFacilities = () => {
  const { user } = useAuth()
  const [facilities, setFacilities] = useState([])
  const [loading, setLoading] = useState(true)
  const [editFacility, setEditFacility] = useState(null)

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/facilities`)
      .then(res => res.json())
      .then(data => {
        const myFacilities = data.filter(f => f.owner_email === user.email)
        setFacilities(myFacilities)
        setLoading(false)
      })
  }, [user.email])

  const handleDelete = async (id) => {
    const confirm = window.confirm('Are you sure you want to delete this facility?')
    if (!confirm) return

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/facilities/${id}`, {
        method: 'DELETE',
        credentials: 'include'
      })
      const data = await res.json()
      if (data.deletedCount) {
        toast.success('Facility deleted!')
        setFacilities(facilities.filter(f => f._id !== id))
      }
    } catch (error) {
      toast.error('Something went wrong!')
    }
  }

  const handleUpdate = async (e) => {
    e.preventDefault()
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/facilities/${editFacility._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(editFacility)
      })
      const data = await res.json()
      if (data._id) {
        toast.success('Facility updated!')
        setFacilities(facilities.map(f => f._id === data._id ? data : f))
        setEditFacility(null)
      }
    } catch (error) {
      toast.error('Something went wrong!')
    }
  }

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-16 h-16 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
  )

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <Toaster />
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">Manage My Facilities</h1>

      {facilities.length === 0 ? (
        <p className="text-center text-gray-500">You have not added any facilities yet!</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full bg-white rounded-2xl shadow-md overflow-hidden">
            <thead className="bg-green-700 text-white">
              <tr>
                <th className="px-4 py-3 text-left">Facility</th>
                <th className="px-4 py-3 text-left">Type</th>
                <th className="px-4 py-3 text-left">Location</th>
                <th className="px-4 py-3 text-left">Price/hr</th>
                <th className="px-4 py-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {facilities.map((facility, index) => (
                <tr key={facility._id} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                  <td className="px-4 py-3 font-medium">{facility.name}</td>
                  <td className="px-4 py-3">{facility.facility_type}</td>
                  <td className="px-4 py-3">{facility.location}</td>
                  <td className="px-4 py-3 text-green-700 font-semibold">৳{facility.price_per_hour}</td>
                  <td className="px-4 py-3 flex gap-2">
                    <button
                      onClick={() => setEditFacility(facility)}
                      className="bg-blue-500 text-white px-3 py-1 rounded-lg text-sm hover:bg-blue-600 transition"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(facility._id)}
                      className="bg-red-500 text-white px-3 py-1 rounded-lg text-sm hover:bg-red-600 transition"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {editFacility && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-lg max-h-screen overflow-y-auto">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Update Facility</h2>
            <form onSubmit={handleUpdate} className="space-y-3">
              <input value={editFacility.name}
                onChange={(e) => setEditFacility({ ...editFacility, name: e.target.value })}
                placeholder="Facility Name"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500" />
              <input value={editFacility.location}
                onChange={(e) => setEditFacility({ ...editFacility, location: e.target.value })}
                placeholder="Location"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500" />
              <input type="number" value={editFacility.price_per_hour}
                onChange={(e) => setEditFacility({ ...editFacility, price_per_hour: e.target.value })}
                placeholder="Price Per Hour"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500" />
              <input value={editFacility.available_slots}
                onChange={(e) => setEditFacility({ ...editFacility, available_slots: e.target.value })}
                placeholder="Available Slots"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500" />
              <textarea value={editFacility.description}
                onChange={(e) => setEditFacility({ ...editFacility, description: e.target.value })}
                placeholder="Description" rows="3"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500" />
              <div className="flex gap-3">
                <button type="submit"
                  className="flex-1 bg-green-700 text-white py-2 rounded-lg font-semibold hover:bg-green-800 transition">
                  Update
                </button>
                <button type="button" onClick={() => setEditFacility(null)}
                  className="flex-1 bg-gray-300 text-gray-800 py-2 rounded-lg font-semibold hover:bg-gray-400 transition">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default ManageFacilities