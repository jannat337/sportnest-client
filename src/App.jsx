import { Routes, Route } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import Home from './pages/Home'
import AllFacilities from './pages/AllFacilities'
import Login from './pages/Login'
import Register from './pages/Register'
import NotFound from './pages/NotFound'
import PrivateRoute from './components/PrivateRoute'
import AddFacility from './pages/AddFacility'
import ManageFacilities from './pages/ManageFacilities'
import MyBookings from './pages/MyBookings'
import FacilityDetails from './pages/FacilityDetails'

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="facilities" element={<AllFacilities />} />
        <Route path="facility/:id" element={<PrivateRoute><FacilityDetails /></PrivateRoute>} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="add-facility" element={<PrivateRoute><AddFacility /></PrivateRoute>} />
        <Route path="manage-facilities" element={<PrivateRoute><ManageFacilities /></PrivateRoute>} />
        <Route path="my-bookings" element={<PrivateRoute><MyBookings /></PrivateRoute>} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default App