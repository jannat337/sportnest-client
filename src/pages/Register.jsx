import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast, Toaster } from 'react-hot-toast'

const Register = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [photoURL, setPhotoURL] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleRegister = (e) => {
    e.preventDefault()

    // Password validation
    if (password.length < 6) {
      return toast.error('Password must be at least 6 characters!')
    }
    if (!/[A-Z]/.test(password)) {
      return toast.error('Password must have at least one uppercase letter!')
    }
    if (!/[a-z]/.test(password)) {
      return toast.error('Password must have at least one lowercase letter!')
    }

    toast.success('Registration successful!')
    setTimeout(() => navigate('/login'), 1500)
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <Toaster />
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-green-700 mb-6">Create Account</h2>

        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium mb-1">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Photo URL</label>
            <input
              type="url"
              value={photoURL}
              onChange={(e) => setPhotoURL(e.target.value)}
              placeholder="Enter your photo URL"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-700 text-white py-2 rounded-lg font-semibold hover:bg-green-800 transition"
          >
            Register
          </button>
        </form>

        <div className="mt-4">
          <button className="w-full border border-gray-300 py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-50 transition">
            <img src="https://www.google.com/favicon.ico" alt="Google" className="w-5 h-5" />
            Continue with Google
          </button>
        </div>

        <p className="text-center text-gray-600 mt-4">
          Already have an account?{' '}
          <Link to="/login" className="text-green-700 font-semibold hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Register