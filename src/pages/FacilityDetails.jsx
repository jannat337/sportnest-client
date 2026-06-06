import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { toast, Toaster } from 'react-hot-toast'
import useAuth from '../hooks/useAuth'

const FacilityDetails = () => {
  const { id } = useParams()
  const { user } = useAuth()
  const navigate = useNavigate()
  const [facility, setFacility] = useState(null)
  const [loading, setLoading] = useState(true)
  const [bookingDate, setBookingDate] = useState('')
  const [timeSlot, setTimeSlot] = useState('')
  const [hours, setHours] = useState(1)

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/facilities/${id}`)
      .then(res => res.json())
      .then(data => {
        setFacility(data)
        setLoading(false)
      })
  }, [id])

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-16 h-16 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
  )

  const totalPrice = facility.price_per_hour * hours

  const handleBooking = async (e) => {
    e.preventDefault()
    const bookingData = {
      facility_id: facility._id,
      facility_name: facility.name,
      user_email: user.email,
      booking_date: bookingDate,
      time_slot: timeSlot,
      hours: hours,
      total_price: totalPrice,
      status: 'pending'
    }

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/bookings`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(bookingData)
      })
      const data = await res.json()
      if (data.insertedId) {
        toast.success('Booking successful!')
        setTimeout(() => navigate('/my-bookings'), 1500)
      }
    } catch (error) {
      toast.error('Something went wrong!')
    }
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <Toaster />
      <img src={facility.image} alt={facility.name} className="w-full h-64 object-cover rounded-2xl mb-6" />
      <div className="bg-white p-6 rounded-2xl shadow-md mb-6">
        <span className="bg-green-100 text-green-700 text-xs font-semibold px-2 py-1 rounded-full">
          {facility.facility_type}
        </span>
        <h1 className="text-3xl font-bold text-gray-800 mt-2">{facility.name}</h1>
        <p className="text-gray-500 mt-1">📍 {facility.location}</p>
        <p className="text-green-700 font-semibold mt-2 text-xl">৳{facility.price_per_hour}/hour</p>
        <p className="text-gray-500">👥 Capacity: {facility.capacity}</p>
        <p className="text-gray-500">🕐 Available Slots: {facility.available_slots}</p>
        <p className="text-gray-600 mt-4">{facility.description}</p>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Book This Facility</h2>
        <form onSubmit={handleBooking} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium mb-1">Facility Name</label>
            <input value={facility.name} readOnly
              className="w-full border border-gray-200 rounded-lg px-4 py-2 bg-gray-50 text-gray-500" />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">Booking Date</label>
            <input type="date" value={bookingDate} onChange={(e) => setBookingDate(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              required />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">Time Slot</label>
            <select value={timeSlot} onChange={(e) => setTimeSlot(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              required>
              <option value="">Select a slot</option>
              {facility.available_slots.split(',').map((slot, i) => (
                <option key={i} value={slot.trim()}>{slot.trim()}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">Hours</label>
            <input type="number" min="1" max="5" value={hours} onChange={(e) => setHours(Number(e.target.value))}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              required />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">Total Price</label>
            <input value={`৳${totalPrice}`} readOnly
              className="w-full border border-gray-200 rounded-lg px-4 py-2 bg-gray-50 text-green-700 font-semibold" />
          </div>
          <button type="submit"
            className="w-full bg-green-700 text-white py-3 rounded-lg font-semibold hover:bg-green-800 transition">
            Confirm Booking
          </button>
        </form>
      </div>
    </div>
  )
}

export default FacilityDetails