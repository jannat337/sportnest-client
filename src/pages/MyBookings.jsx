import { useEffect, useState } from 'react'
import { toast, Toaster } from 'react-hot-toast'
import useAuth from '../hooks/useAuth'

const MyBookings = () => {
  const { user } = useAuth()
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/bookings?email=${user.email}`, {
      credentials: 'include'
    })
      .then(res => res.json())
      .then(data => {
        setBookings(data)
        setLoading(false)
      })
  }, [user.email])

  const handleCancel = async (id) => {
    const confirm = window.confirm('Are you sure you want to cancel this booking?')
    if (!confirm) return

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/bookings/${id}`, {
        method: 'DELETE',
        credentials: 'include'
      })
      const data = await res.json()
      if (data.deletedCount) {
        toast.success('Booking cancelled!')
        setBookings(bookings.filter(b => b._id !== id))
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
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">My Bookings</h1>

      {bookings.length === 0 ? (
        <p className="text-center text-gray-500">No bookings found!</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full bg-white rounded-2xl shadow-md overflow-hidden">
            <thead className="bg-green-700 text-white">
              <tr>
                <th className="px-4 py-3 text-left">Facility</th>
                <th className="px-4 py-3 text-left">Date</th>
                <th className="px-4 py-3 text-left">Time Slot</th>
                <th className="px-4 py-3 text-left">Price</th>
                <th className="px-4 py-3 text-left">Status</th>
                <th className="px-4 py-3 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking, index) => (
                <tr key={booking._id} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                  <td className="px-4 py-3 font-medium">{booking.facility_name}</td>
                  <td className="px-4 py-3">{booking.booking_date}</td>
                  <td className="px-4 py-3">{booking.time_slot}</td>
                  <td className="px-4 py-3 text-green-700 font-semibold">৳{booking.total_price}</td>
                  <td className="px-4 py-3">
                    <span className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full text-xs font-semibold">
                      {booking.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => handleCancel(booking._id)}
                      className="bg-red-500 text-white px-3 py-1 rounded-lg text-sm hover:bg-red-600 transition"
                    >
                      Cancel
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

export default MyBookings