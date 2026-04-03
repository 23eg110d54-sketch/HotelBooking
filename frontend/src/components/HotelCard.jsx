import { Link } from 'react-router-dom';
import { MapPin, ArrowRight } from 'lucide-react';

export default function HotelCard({ hotel }) {
  const colors = ['#6C63FF','#10b981','#f59e0b','#ef4444','#3b82f6'];
  const color = colors[hotel.id % colors.length];

  return (
    <div className="card fade-in" style={{ position:'relative', overflow:'hidden' }}>
      {/* Decorative gradient blob */}
      <div style={{
        position:'absolute', top:-40, right:-40,
        width:120, height:120,
        background:`radial-gradient(circle, ${color}40 0%, transparent 70%)`,
        borderRadius:'50%',
      }} />

      {/* Hotel icon */}
      <div style={{
        width:52, height:52,
        background:`linear-gradient(135deg, ${color}30, ${color}15)`,
        border:`1px solid ${color}40`,
        borderRadius:14,
        display:'flex', alignItems:'center', justifyContent:'center',
        fontSize:24, marginBottom:16,
      }}>
        🏨
      </div>

      <h3 style={{ fontSize:20, fontWeight:700, color:'white', marginBottom:6 }}>{hotel.name}</h3>

      <div style={{ display:'flex', alignItems:'center', gap:6, color:'#a1a1aa', fontSize:14, marginBottom:10 }}>
        <MapPin size={14} color={'#6C63FF'} />
        {hotel.location}
      </div>

      <p style={{ color:'#71717a', fontSize:14, lineHeight:1.6, marginBottom:20 }}>
        {hotel.description || 'A premium hotel offering world-class amenities and exceptional service.'}
      </p>

      <Link to={`/hotels/${hotel.id}`} className="btn btn-primary" style={{ width:'100%', justifyContent:'center' }}>
        View Rooms <ArrowRight size={16} />
      </Link>
    </div>
  );
}
