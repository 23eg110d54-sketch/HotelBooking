import { useEffect, useState } from 'react';
import { getAllHotels, addHotel, addRoom, getAllBookings } from '../api';
import { LayoutDashboard, Hotel, BedDouble, BookOpen, Plus, X } from 'lucide-react';

export default function AdminDashboard() {
  const [hotels, setHotels]   = useState([]);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  // Hotel form
  const [hotelForm, setHotelForm] = useState({ name:'', location:'', description:'' });
  const [hotelMsg, setHotelMsg] = useState('');

  // Room form
  const [roomForm, setRoomForm] = useState({ roomNumber:'', type:'Single', pricePerNight:'', hotelId:'' });
  const [roomMsg, setRoomMsg] = useState('');

  useEffect(() => {
    Promise.all([getAllHotels(), getAllBookings()])
      .then(([hr, br]) => { setHotels(hr.data); setBookings(br.data); })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const submitHotel = async (e) => {
    e.preventDefault();
    try {
      const res = await addHotel(hotelForm);
      setHotels(prev => [...prev, res.data]);
      setHotelForm({ name:'', location:'', description:'' });
      setHotelMsg('success');
    } catch { setHotelMsg('error'); }
    setTimeout(() => setHotelMsg(''), 3000);
  };

  const submitRoom = async (e) => {
    e.preventDefault();
    const { hotelId, ...roomData } = roomForm;
    try {
      await addRoom(hotelId, { ...roomData, pricePerNight: parseFloat(roomData.pricePerNight) });
      setRoomForm({ roomNumber:'', type:'Single', pricePerNight:'', hotelId:'' });
      setRoomMsg('success');
    } catch { setRoomMsg('error'); }
    setTimeout(() => setRoomMsg(''), 3000);
  };

  const tabs = [
    { key:'overview', label:'Overview',    icon:<LayoutDashboard size={16}/> },
    { key:'hotels',   label:'Hotels',      icon:<Hotel size={16}/> },
    { key:'rooms',    label:'Add Room',    icon:<BedDouble size={16}/> },
    { key:'bookings', label:'All Bookings',icon:<BookOpen size={16}/> },
  ];

  return (
    <div className="container" style={{ paddingBottom:60 }}>
      <div className="page-header">
        <div className="badge badge-admin" style={{ display:'inline-flex', marginBottom:12 }}>
          ⚡ Admin Dashboard
        </div>
        <h1 className="page-title">Manage Your Properties</h1>
        <p className="page-subtitle">Add hotels, manage rooms, and view all bookings</p>
      </div>

      {/* Tabs */}
      <div style={{
        display:'flex', gap:4,
        background:'rgba(255,255,255,0.04)',
        border:'1px solid rgba(255,255,255,0.08)',
        borderRadius:14, padding:4,
        marginBottom:32, flexWrap:'wrap',
      }}>
        {tabs.map(t => (
          <button key={t.key} onClick={() => setActiveTab(t.key)}
            className="btn" style={{
              padding:'10px 20px', fontSize:14,
              background: activeTab === t.key ? 'linear-gradient(135deg,#6C63FF,#4f46e5)' : 'transparent',
              color: activeTab === t.key ? 'white' : '#a1a1aa',
              boxShadow: activeTab === t.key ? '0 4px 14px rgba(108,99,255,0.4)' : 'none',
              border:'none', borderRadius:10,
            }}>
            {t.icon}{t.label}
          </button>
        ))}
      </div>

      {loading ? <div className="spinner"/> : (
        <>
          {/* ── Overview ───────────────────────────────────────── */}
          {activeTab === 'overview' && (
            <div>
              <div className="grid" style={{ gridTemplateColumns:'repeat(auto-fill,minmax(200px,1fr))', gap:20, marginBottom:32 }}>
                {[
                  { label:'Total Hotels',  value:hotels.length,   color:'#6C63FF' },
                  { label:'Total Bookings',value:bookings.length, color:'#10b981' },
                  { label:'Confirmed',     value:bookings.filter(b=>b.status==='CONFIRMED').length, color:'#f59e0b' },
                  { label:'Revenue (₹)',   value:'₹'+bookings.reduce((s,b)=>s+(b.totalPrice||0),0).toLocaleString(), color:'#ef4444' },
                ].map((s,i) => (
                  <div key={i} className="stat-box">
                    <div style={{ fontSize:11, color:'#71717a', textTransform:'uppercase', letterSpacing:'0.08em', fontWeight:700 }}>{s.label}</div>
                    <div style={{ fontSize:32, fontWeight:800, color:s.color }}>{s.value}</div>
                  </div>
                ))}
              </div>
              <div>
                <h3 style={{ fontSize:18, fontWeight:700, color:'white', marginBottom:16 }}>Recent Bookings</h3>
                {bookings.slice(0,5).map(b => (
                  <div key={b.id} style={{ display:'flex', justifyContent:'space-between', alignItems:'center',
                    padding:'14px 20px', background:'rgba(255,255,255,0.04)',
                    borderRadius:12, marginBottom:8, border:'1px solid rgba(255,255,255,0.07)' }}>
                    <div>
                      <div style={{ fontWeight:600, color:'white', fontSize:14 }}>
                        {b.user?.name} → Room {b.room?.roomNumber} @ {b.room?.hotel?.name}
                      </div>
                      <div style={{ color:'#71717a', fontSize:12 }}>{b.checkInDate} → {b.checkOutDate}</div>
                    </div>
                    <div style={{ fontWeight:700, color:'#10b981' }}>₹{b.totalPrice?.toLocaleString()}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── Add Hotel ──────────────────────────────────────── */}
          {activeTab === 'hotels' && (
            <div style={{ maxWidth:560 }}>
              <h3 style={{ fontSize:20, fontWeight:700, color:'white', marginBottom:24 }}>Add New Hotel</h3>
              {hotelMsg === 'success' && <div className="alert alert-success">✓ Hotel added successfully!</div>}
              {hotelMsg === 'error'   && <div className="alert alert-error">⚠ Failed to add hotel.</div>}
              <form onSubmit={submitHotel}>
                <div className="form-group">
                  <label>Hotel Name</label>
                  <input value={hotelForm.name} onChange={e=>setHotelForm({...hotelForm,name:e.target.value})} placeholder="e.g. Grand Palace" required/>
                </div>
                <div className="form-group">
                  <label>Location</label>
                  <input value={hotelForm.location} onChange={e=>setHotelForm({...hotelForm,location:e.target.value})} placeholder="e.g. Mumbai, India" required/>
                </div>
                <div className="form-group">
                  <label>Description</label>
                  <textarea value={hotelForm.description} onChange={e=>setHotelForm({...hotelForm,description:e.target.value})} placeholder="Describe the hotel..." rows={3}/>
                </div>
                <button type="submit" className="btn btn-primary" style={{ width:'100%', justifyContent:'center', padding:'14px' }}>
                  <Plus size={18}/> Add Hotel
                </button>
              </form>

              <div className="divider"/>
              <h3 style={{ fontSize:18, fontWeight:700, color:'white', marginBottom:16 }}>Existing Hotels ({hotels.length})</h3>
              {hotels.map(h => (
                <div key={h.id} style={{ display:'flex', justifyContent:'space-between', alignItems:'center',
                  padding:'14px 20px', background:'rgba(255,255,255,0.04)',
                  borderRadius:12, marginBottom:8, border:'1px solid rgba(255,255,255,0.07)' }}>
                  <div>
                    <div style={{ fontWeight:600, color:'white' }}>🏨 {h.name}</div>
                    <div style={{ color:'#71717a', fontSize:13 }}>📍 {h.location}</div>
                  </div>
                  <span className="badge badge-info">ID: {h.id}</span>
                </div>
              ))}
            </div>
          )}

          {/* ── Add Room ───────────────────────────────────────── */}
          {activeTab === 'rooms' && (
            <div style={{ maxWidth:560 }}>
              <h3 style={{ fontSize:20, fontWeight:700, color:'white', marginBottom:24 }}>Add Room to a Hotel</h3>
              {roomMsg === 'success' && <div className="alert alert-success">✓ Room added successfully!</div>}
              {roomMsg === 'error'   && <div className="alert alert-error">⚠ Failed to add room.</div>}
              <form onSubmit={submitRoom}>
                <div className="form-group">
                  <label>Select Hotel</label>
                  <select value={roomForm.hotelId} onChange={e=>setRoomForm({...roomForm,hotelId:e.target.value})} required>
                    <option value="">-- Choose Hotel --</option>
                    {hotels.map(h => <option key={h.id} value={h.id}>{h.name} ({h.location})</option>)}
                  </select>
                </div>
                <div className="form-group">
                  <label>Room Number</label>
                  <input value={roomForm.roomNumber} onChange={e=>setRoomForm({...roomForm,roomNumber:e.target.value})} placeholder="e.g. 101" required/>
                </div>
                <div className="form-group">
                  <label>Room Type</label>
                  <select value={roomForm.type} onChange={e=>setRoomForm({...roomForm,type:e.target.value})}>
                    <option>Single</option>
                    <option>Double</option>
                    <option>Deluxe</option>
                    <option>Suite</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Price Per Night (₹)</label>
                  <input type="number" min="1" value={roomForm.pricePerNight} onChange={e=>setRoomForm({...roomForm,pricePerNight:e.target.value})} placeholder="e.g. 2500" required/>
                </div>
                <button type="submit" className="btn btn-primary" style={{ width:'100%', justifyContent:'center', padding:'14px' }}>
                  <Plus size={18}/> Add Room
                </button>
              </form>
            </div>
          )}

          {/* ── All Bookings ───────────────────────────────────── */}
          {activeTab === 'bookings' && (
            <div>
              <h3 style={{ fontSize:20, fontWeight:700, color:'white', marginBottom:24 }}>
                All Bookings <span style={{ color:'#71717a', fontSize:15, fontWeight:400 }}>({bookings.length})</span>
              </h3>
              {bookings.length === 0 ? (
                <div className="empty-state"><h3>No bookings yet</h3></div>
              ) : (
                <div className="table-wrapper">
                  <table>
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Guest</th>
                        <th>Hotel</th>
                        <th>Room</th>
                        <th>Check-In</th>
                        <th>Check-Out</th>
                        <th>Total</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {bookings.map((b,i) => {
                        const stClr = b.status==='CONFIRMED'?'#10b981':b.status==='CANCELLED'?'#ef4444':'#f59e0b';
                        return (
                          <tr key={b.id}>
                            <td style={{ color:'#6C63FF', fontWeight:700 }}>#{i+1}</td>
                            <td style={{ color:'white', fontWeight:600 }}>{b.user?.name}</td>
                            <td>{b.room?.hotel?.name}</td>
                            <td>{b.room?.roomNumber} ({b.room?.type})</td>
                            <td>{b.checkInDate}</td>
                            <td>{b.checkOutDate}</td>
                            <td style={{ color:'#10b981', fontWeight:700 }}>₹{b.totalPrice?.toLocaleString()}</td>
                            <td><span style={{ color:stClr, fontWeight:700 }}>{b.status}</span></td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
}
