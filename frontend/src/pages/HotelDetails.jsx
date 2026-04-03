import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getHotelById, getAvailableRooms } from '../api';
import RoomCard from '../components/RoomCard';
import { MapPin, ArrowLeft, BedDouble } from 'lucide-react';

export default function HotelDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user') || 'null');

  const [hotel, setHotel]   = useState(null);
  const [rooms, setRooms]   = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([getHotelById(id), getAvailableRooms(id)])
      .then(([hRes, rRes]) => { setHotel(hRes.data); setRooms(rRes.data); })
      .catch(() => navigate('/hotels'))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div className="spinner" style={{ marginTop:80 }}/>;
  if (!hotel)  return null;

  return (
    <div className="container" style={{ paddingBottom:60 }}>
      {/* Back */}
      <div style={{ paddingTop:32, marginBottom:24 }}>
        <button onClick={() => navigate(-1)} className="btn btn-secondary btn-sm">
          <ArrowLeft size={16}/> Back to Hotels
        </button>
      </div>

      {/* Hotel banner */}
      <div style={{
        background:'linear-gradient(135deg, rgba(108,99,255,0.2) 0%, rgba(79,70,229,0.1) 100%)',
        border:'1px solid rgba(108,99,255,0.25)',
        borderRadius:20,
        padding:'40px 40px',
        marginBottom:40,
        position:'relative',
        overflow:'hidden',
      }}>
        <div style={{
          position:'absolute', top:-60, right:-60,
          width:250, height:250,
          background:'radial-gradient(circle, rgba(108,99,255,0.25), transparent 70%)',
          borderRadius:'50%',
        }}/>
        <div style={{ fontSize:48, marginBottom:16 }}>🏨</div>
        <h1 style={{ fontSize:36, fontWeight:800, color:'white', marginBottom:10 }}>{hotel.name}</h1>
        <div style={{ display:'flex', alignItems:'center', gap:6, color:'#a5b4fc', marginBottom:14 }}>
          <MapPin size={16}/> {hotel.location}
        </div>
        <p style={{ color:'#a1a1aa', fontSize:16, maxWidth:600, lineHeight:1.7 }}>
          {hotel.description || 'A premium hotel offering world-class amenities and exceptional service for every type of traveler.'}
        </p>
      </div>

      {/* Rooms heading */}
      <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:28 }}>
        <BedDouble size={22} color="#6C63FF"/>
        <h2 style={{ fontSize:24, fontWeight:700, color:'white' }}>
          Available Rooms <span style={{ fontSize:16, color:'#71717a', fontWeight:400 }}>({rooms.length})</span>
        </h2>
      </div>

      {rooms.length === 0 ? (
        <div className="empty-state">
          <BedDouble size={56} style={{ margin:'0 auto 16px', display:'block', opacity:0.3 }}/>
          <h3>No Available Rooms</h3>
          <p style={{ fontSize:14 }}>All rooms are currently booked. Check back later!</p>
        </div>
      ) : (
        <div className="grid grid-3" style={{ gap:24 }}>
          {rooms.map(room => (
            <RoomCard key={room.id} room={room} userId={user?.id}/>
          ))}
        </div>
      )}

      {!user && (
        <div style={{
          marginTop:32,
          padding:'20px 24px',
          background:'rgba(108,99,255,0.08)',
          border:'1px solid rgba(108,99,255,0.2)',
          borderRadius:12,
          textAlign:'center',
          color:'#a5b4fc', fontSize:15,
        }}>
          🔐 Please <a href="/login" style={{ color:'#6C63FF', fontWeight:700 }}>login</a> to book rooms
        </div>
      )}
    </div>
  );
}
