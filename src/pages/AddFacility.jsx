import { useState } from 'react'
import { toast, Toaster } from 'react-hot-toast'
import useAuth from '../hooks/useAuth'

const AddFacility = () => {
  const { user } = useAuth()
  const [formData, setFormData] = useState({
    name: '',
    facility_type: '',
    image: '',
    location: '',
    price_per_hour: '',
    capacity: '',
    available_slots: '',
    description: ''
  })

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const facilityData = {
      ...formData,
      owner_email: user.email,
      booking_count: 0
    }

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/facilities`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(facilityData)
      })
      const data = await res.json()
      if (data.insertedId) {
        toast.success('Facility added successfully!')
        setFormData({
          name: '', facility_type: '', image: '', location: '',
          price_per_hour: '', capacity: '', available_slots: '', description: ''
        })
      }
    } catch (error) {
      toast.error('Something went wrong!')
    }
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <Toaster />
      <h1 className="text-3xl font-bold text-center text-green-700 mb-8">Add New Facility</h1>

      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-lg space-y-4">
        <div>
          <label className="block text-gray-700 font-medium mb-1">Facility Name</label>
          <input name="name" value={formData.name} onChange={handleChange}
            placeholder="e.g. Green Turf Football Ground"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            required />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1">Facility Type</label>
          <select name="facility_type" value={formData.facility_type} onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            required>
            <option value="">Select type</option>
            <option value="Football">Football</option>
            <option value="Badminton">Badminton</option>
            <option value="Swimming">Swimming</option>
            <option value="Tennis">Tennis</option>
            <option value="Cricket">Cricket</option>
            <option value="Basketball">Basketball</option>
          </select>
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1">Image URL</label>
          <input name="image" value={formData.image} onChange={handleChange}
            placeholder="Paste image URL from imgbb or postimage"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            required />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1">Location</label>
          <input name="location" value={formData.location} onChange={handleChange}
            placeholder="e.g. Mirpur, Dhaka"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            required />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700 font-medium mb-1">Price Per Hour (৳)</label>
            <input name="price_per_hour" type="number" value={formData.price_per_hour} onChange={handleChange}
              placeholder="e.g. 500"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              required />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">Capacity</label>
            <input name="capacity" type="number" value={formData.capacity} onChange={handleChange}
              placeholder="e.g. 22"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              required />
          </div>
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1">Available Time Slots</label>
          <input name="available_slots" value={formData.available_slots} onChange={handleChange}
            placeholder="e.g. 6AM-8AM, 4PM-6PM, 8PM-10PM"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            required />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1">Description</label>
          <textarea name="description" value={formData.description} onChange={handleChange}
            placeholder="Describe the facility..."
            rows="4"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            required />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1">Owner Email</label>
          <input value={user?.email} readOnly
            className="w-full border border-gray-200 rounded-lg px-4 py-2 bg-gray-50 text-gray-500" />
        </div>

        <button type="submit"
          className="w-full bg-green-700 text-white py-3 rounded-lg font-semibold hover:bg-green-800 transition">
          Add Facility
        </button>
      </form>
    </div>
  )
}

export default AddFacility