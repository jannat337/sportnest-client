import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <h1 className="text-9xl font-bold text-green-700">404</h1>
      <h2 className="text-3xl font-semibold text-gray-700 mt-4">Page Not Found</h2>
      <p className="text-gray-500 mt-2 text-center px-4">
        Oops! The page you are looking for does not exist.
      </p>
      <Link
        to="/"
        className="mt-6 bg-green-700 text-white px-6 py-3 rounded-full font-semibold hover:bg-green-800 transition"
      >
        Back to Home
      </Link>
    </div>
  )
}

export default NotFound