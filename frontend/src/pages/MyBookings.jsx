import { useEffect, useState } from 'react';
import { getUserBookings } from '../api';
import { BookOpen, MapPin, Calendar, DollarSign, BedDouble } from 'lucide-react';

const statusStyle = {
  CONFIRMED: { bg:'rgba(16,185,129,0.12)', color:'#10b981', border:'rgba(16,185,129,0.3)', label:'✓ Confirmed' },
  PENDING:   { bg:'rgba(245,158,11,0.12)', color:'#f59e0b', border:'rgba(245,158,11,0.3)', label:'⏳ Pending' },
  CANCELLED: { bg:'rgba(239,68,68,0.12)',  color:'#ef4444', border:'rgba(239,68,68,0.3)',  label:'✗ Cancelled' },
};

export default function MyBookings() {
  const user = JSON.parse(localStorage.getItem('user') || 'null');
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading]   = useState(true);

  useEffect(() => {
    getUserBookings(user.id)
      .then(res => setBookings(res.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="container" style={{ paddingBottom:60 }}>
      <div className="page-header">
        <h1 className="page-title">My Bookings</h1>
        <p className="page-subtitle">Manage and track all your hotel reservations</p>
      </div>

      {loading ? (
        <div className="spinner"/>
      ) : bookings.length === 0 ? (
        <div className="empty-state">
          <BookOpen size={56} style={{ margin:'0 auto 16px', display:'block', opacity:0.3 }}/>
          <h3>No Bookings Yet</h3>
          <p style={{ fontSize:14 }}>Explore hotels and make your first booking!</p>
          <a href="/hotels" className="btn btn-primary" style={{ marginTop:20, display:'inline-flex' }}>Browse Hotels</a>
        </div>
      ) : (
        <div style={{ display:'flex', flexDirection:'column', gap:16 }}>
          {bookings.map(b => {
            const st = statusStyle[b.status] || statusStyle.PENDING;
            const nights = Math.ceil((new Date(b.checkOutDate) - new Date(b.checkInDate)) / (1000*60*60*24));
            return (
              <div key={b.id} className="card" style={{ display:'flex', flexDirection:'column', gap:16 }}>
                <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', flexWrap:'wrap', gap:12 }}>
                  <div>
                    <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:6 }}>
                      <BedDouble size={18} color="#6C63FF"/>
                      <span style={{ fontSize:18, fontWeight:700, color:'white' }}>
                        {b.room?.hotel?.name || 'Hotel'} — Room {b.room?.roomNumber}
                      </span>
                    </div>
                    <div style={{ display:'flex', alignItems:'center', gap:6, color:'#a1a1aa', fontSize:14 }}>
                      <MapPin size={13} color="#6C63FF"/>
                      {b.room?.hotel?.location || 'Location'} &nbsp;•&nbsp;
                      <span style={{ color:'#a5b4fc' }}>{b.room?.type}</span>
                    </div>
                  </div>
                  <span style={{
                    padding:'6px 14px', borderRadius:999,
                    background:st.bg, color:st.color,
                    border:`1px solid ${st.border}`,
                    fontSize:13, fontWeight:700,
                  }}>
                    {st.label}
                  </span>
                </div>

                <div style={{ height:1, background:'rgba(255,255,255,0.07)' }}/>

                <div style={{ display:'flex', gap:24, flexWrap:'wrap' }}>
                  <div style={{ display:'flex', alignItems:'center', gap:8 }}>
                    <Calendar size={15} color="#71717a"/>
                    <div>
                      <div style={{ fontSize:11, color:'#71717a', textTransform:'uppercase', letterSpacing:'0.05em' }}>Check-In</div>
                      <div style={{ fontSize:14, fontWeight:600, color:'white' }}>{b.checkInDate}</div>
                    </div>
                  </div>
                  <div style={{ display:'flex', alignItems:'center', gap:8 }}>
                    <Calendar size={15} color="#71717a"/>
                    <div>
                      <div style={{ fontSize:11, color:'#71717a', textTransform:'uppercase', letterSpacing:'0.05em' }}>Check-Out</div>
                      <div style={{ fontSize:14, fontWeight:600, color:'white' }}>{b.checkOutDate}</div>
                    </div>
                  </div>
                  <div style={{ display:'flex', alignItems:'center', gap:8 }}>
                    <DollarSign size={15} color="#10b981"/>
                    <div>
                      <div style={{ fontSize:11, color:'#71717a', textTransform:'uppercase', letterSpacing:'0.05em' }}>Total</div>
                      <div style={{ fontSize:16, fontWeight:700, color:'#10b981' }}>₹{b.totalPrice?.toLocaleString()}</div>
                    </div>
                  </div>
                  <div>
                    <div style={{ fontSize:11, color:'#71717a', textTransform:'uppercase', letterSpacing:'0.05em' }}>Duration</div>
                    <div style={{ fontSize:14, fontWeight:600, color:'white' }}>{nights} night{nights !== 1 ? 's' : ''}</div>
                  </div>
                  <div style={{ display:'flex', alignItems:'center', gap:8 }}>
                    <div>
                      <div style={{ fontSize:11, color:'#71717a', textTransform:'uppercase', letterSpacing:'0.05em' }}>Payment</div>
                      <div style={{ fontSize:13, fontWeight:700, color:b.paymentStatus==='PAID' ? '#10b981' : '#f59e0b' }}>
                        {b.paymentStatus==='PAID' ? '✓ PAID' : 'PENDING'} 
                        <span style={{ fontSize:11, color:'#71717a', fontWeight:400, marginLeft:4 }}>via {b.paymentMethod}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
