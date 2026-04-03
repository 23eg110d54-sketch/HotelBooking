import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Hotels from './pages/Hotels';
import HotelDetails from './pages/HotelDetails';
import MyBookings from './pages/MyBookings';
import AdminDashboard from './pages/AdminDashboard';

function App() {
  const user = JSON.parse(localStorage.getItem('user') || 'null');

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/"          element={<Home />} />
        <Route path="/login"     element={user ? <Navigate to="/" /> : <Login />} />
        <Route path="/register"  element={user ? <Navigate to="/" /> : <Register />} />
        <Route path="/hotels"    element={<Hotels />} />
        <Route path="/hotels/:id" element={<HotelDetails />} />
        <Route path="/my-bookings" element={user ? <MyBookings /> : <Navigate to="/login" />} />
        <Route path="/admin"     element={user?.role === 'ADMIN' ? <AdminDashboard /> : <Navigate to="/" />} />
        <Route path="*"          element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
