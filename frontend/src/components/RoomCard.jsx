import { useState } from 'react';
import { createBooking } from '../api';
import { BedDouble, DollarSign, Tag, CircleCheck } from 'lucide-react';

export default function RoomCard({ room, userId }) {
  const [paymentMethod, setPaymentMethod] = useState('');
  const [paymentData, setPaymentData] = useState({});
  const [showPayment, setShowPayment] = useState(false);

  const handleNextToPayment = () => {
    if (!checkIn || !checkOut) { setError('Please select both dates'); return; }
    if (checkIn >= checkOut) { setError('Check-out must be after check-in'); return; }
    setError('');
    setShowPayment(true);
  };

  const handleBook = async () => {
    if (!paymentMethod) { setError('Please select a payment method'); return; }
    setError(''); setLoading(true);
    try {
      await createBooking(userId, room.id, { 
        checkInDate: checkIn, 
        checkOutDate: checkOut,
        paymentMethod: paymentMethod,
        paymentStatus: 'PAID' // Mocking successful payment
      });
      setSuccess(true);
      setShowForm(false);
      setShowPayment(false);
    } catch {
      setError('Booking failed. This room may already be booked.');
    } finally { setLoading(false); }
  };

  return (
    <div className="card" style={{ borderLeft:`3px solid ${color}` }}>
      {success ? (
        <div style={{ textAlign:'center', padding:'20px 0' }}>
          <CircleCheck size={40} color="#10b981" style={{ marginBottom:12 }} />
          <h4 style={{ color:'white', fontWeight:700 }}>Booking Confirmed!</h4>
          <p style={{ color:'#a1a1aa', fontSize:14, marginTop:6 }}>Your room has been successfully booked.</p>
        </div>
      ) : (
        <>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:16 }}>
            <div>
              <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:6 }}>
                <BedDouble size={18} color={color} />
                <span style={{ fontSize:18, fontWeight:700, color:'white' }}>Room {room.roomNumber}</span>
              </div>
              <span className="badge" style={{ background:`${color}20`, color, border:`1px solid ${color}40` }}>
                <Tag size={10}/> {room.type}
              </span>
            </div>
            <div style={{ textAlign:'right' }}>
              <div style={{ display:'flex', alignItems:'center', gap:4, color:'white', fontWeight:700, fontSize:20 }}>
                <DollarSign size={16} color={color}/>₹{room.pricePerNight}
              </div>
              <div style={{ fontSize:11, color:'#71717a' }}>per night</div>
            </div>
          </div>

          <div className={`badge ${room.available ? 'badge-success' : 'badge-error'}`} style={{ marginBottom:16 }}>
            {room.available ? '✓ Available' : '✗ Not Available'}
          </div>

          {room.available && userId && !showForm && (
            <button onClick={() => setShowForm(true)} className="btn btn-primary" style={{ width:'100%', justifyContent:'center' }}>
              Book Now
            </button>
          )}

          {!userId && room.available && (
            <p style={{ color:'#71717a', fontSize:13, textAlign:'center' }}>Login to book this room</p>
          )}

          {showForm && !showPayment && (
            <div style={{ marginTop:12, display:'flex', flexDirection:'column', gap:12 }}>
              {error && <div className="alert alert-error">{error}</div>}
              <div className="form-group" style={{ margin:0 }}>
                <label>Check-In Date</label>
                <input type="date" value={checkIn} onChange={e=>setCheckIn(e.target.value)} min={new Date().toISOString().split('T')[0]} />
              </div>
              <div className="form-group" style={{ margin:0 }}>
                <label>Check-Out Date</label>
                <input type="date" value={checkOut} onChange={e=>setCheckOut(e.target.value)} min={checkIn || new Date().toISOString().split('T')[0]} />
              </div>
              {checkIn && checkOut && checkOut > checkIn && (
                <div style={{ padding:'10px 14px', background:'rgba(108,99,255,0.1)', borderRadius:8, border:'1px solid rgba(108,99,255,0.2)' }}>
                  <span style={{ color:'#a5b4fc', fontSize:13 }}>
                    Total: ₹{(room.pricePerNight * Math.ceil((new Date(checkOut)-new Date(checkIn))/(1000*60*60*24))).toLocaleString()}
                  </span>
                </div>
              )}
              <div style={{ display:'flex', gap:8 }}>
                <button onClick={handleNextToPayment} className="btn btn-primary" style={{ flex:1, justifyContent:'center' }}>
                  Next to Payment
                </button>
                <button onClick={()=>setShowForm(false)} className="btn btn-secondary">Cancel</button>
              </div>
            </div>
          )}

          {showForm && showPayment && (
            <div style={{ marginTop:12, display:'flex', flexDirection:'column', gap:12 }}>
              <div style={{ padding:'10px', background:'rgba(255,255,255,0.05)', borderRadius:8 }}>
                <div style={{ fontSize:14, fontWeight:700, color:'white', marginBottom:10 }}>Choose Payment Method</div>
                <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
                  <label style={{ display:'flex', alignItems:'center', gap:10, cursor:'pointer' }}>
                    <input type="radio" name="pay" value="PHONEPE" onChange={e=>setPaymentMethod(e.target.value)} /> PhonePe
                  </label>
                  <label style={{ display:'flex', alignItems:'center', gap:10, cursor:'pointer' }}>
                    <input type="radio" name="pay" value="GPAY" onChange={e=>setPaymentMethod(e.target.value)} /> GPay
                  </label>
                  <label style={{ display:'flex', alignItems:'center', gap:10, cursor:'pointer' }}>
                    <input type="radio" name="pay" value="CARD" onChange={e=>setPaymentMethod(e.target.value)} /> Debit Card / Credit Card
                  </label>
                  <label style={{ display:'flex', alignItems:'center', gap:10, cursor:'pointer' }}>
                    <input type="radio" name="pay" value="NETBANKING" onChange={e=>setPaymentMethod(e.target.value)} /> Net Banking
                  </label>
                </div>
              </div>

              {(paymentMethod === 'PHONEPE' || paymentMethod === 'GPAY') && (
                <div className="form-group">
                  <label>{paymentMethod === 'PHONEPE' ? 'PhonePe' : 'GPay'} UPI ID</label>
                  <input placeholder={paymentMethod === 'PHONEPE' ? 'number@ybl' : 'someone@okhdfcbank'} onChange={e=>setPaymentData({...paymentData, upi:e.target.value})} />
                </div>
              )}

              {paymentMethod === 'CARD' && (
                <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
                  <div className="form-group"><label>Card Number</label><input placeholder="XXXX XXXX XXXX XXXX" /></div>
                  <div style={{ display:'flex', gap:8 }}>
                    <div className="form-group" style={{ flex:1 }}><label>Expiry</label><input placeholder="MM/YY" /></div>
                    <div className="form-group" style={{ flex:1 }}><label>CVV</label><input placeholder="123" type="password" /></div>
                  </div>
                </div>
              )}

              <div style={{ display:'flex', gap:8 }}>
                <button onClick={handleBook} className="btn btn-success" disabled={loading} style={{ flex:1, justifyContent:'center' }}>
                  {loading ? 'Processing...' : 'Pay & Confirm'}
                </button>
                <button onClick={()=>setShowPayment(false)} className="btn btn-secondary">Back</button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );

}
