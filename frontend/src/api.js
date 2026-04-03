import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:8081/api',
  headers: { 'Content-Type': 'application/json' },
});

// ── Auth ───────────────────────────────────────────
export const registerUser = (data) => API.post('users/register', data);
export const loginUser    = (email, password) =>
  API.post(`users/login?email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`);

// ── Hotels ─────────────────────────────────────────
export const getAllHotels  = ()     => API.get('hotels');
export const getHotelById = (id)   => API.get(`hotels/${id}`);
export const addHotel     = (data) => API.post('hotels', data);

// ── Rooms ──────────────────────────────────────────
export const getRoomsByHotel       = (hotelId) => API.get(`rooms/hotel/${hotelId}`);
export const getAvailableRooms     = (hotelId) => API.get(`rooms/hotel/${hotelId}/available`);
export const addRoom               = (hotelId, data) => API.post(`rooms/hotel/${hotelId}`, data);

// ── Bookings ───────────────────────────────────────
export const createBooking     = (userId, roomId, data) => API.post(`bookings/user/${userId}/room/${roomId}`, data);
export const getUserBookings   = (userId) => API.get(`bookings/user/${userId}`);
export const getAllBookings     = ()       => API.get('bookings');
