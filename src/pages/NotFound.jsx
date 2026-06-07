import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <h1 className="text-9xl font-bold text-green-700">404</h1>
        <div className="text-6xl mb-4">🏟️</div>
        <h2 className="text-3xl font-semibold text-gray-700 mt-4">Page Not Found</h2>
        <p className="text-gray-500 mt-2 max-w-md mx-auto">
          Oops! The page you are looking for does not exist. It might have been moved or deleted.
        </p>
        <Link
          to="/"
          className="mt-6 inline-block bg-green-700 text-white px-8 py-3 rounded-full font-semibold hover:bg-green-800 transition"
        >
          Back to Home
        </Link>
      </motion.div>
    </div>
  )
}

export default NotFound