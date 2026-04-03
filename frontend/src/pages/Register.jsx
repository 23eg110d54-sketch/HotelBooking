import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { registerUser } from '../api';
import { UserPlus, Mail, Lock, User, Hotel, Shield } from 'lucide-react';

export default function Register() {
  const [form, setForm] = useState({ name:'', email:'', password:'', role:'CUSTOMER' });
  const [error, setError]   = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleRegister = async (e) => {
    e.preventDefault();
    setError(''); setLoading(true);
    try {
      await registerUser(form);
      navigate('/login');
    } catch (err) {
      setError(err?.response?.data?.message || 'Registration failed. Email may already exist.');
    } finally { setLoading(false); }
  };

  return (
    <div style={{ minHeight:'90vh', display:'flex', alignItems:'center', justifyContent:'center', padding:'40px 16px' }}>
      <div style={{ position:'fixed', top:'20%', right:'20%',
        width:400, height:400, background:'radial-gradient(circle, rgba(245,158,11,0.1), transparent 70%)',
        borderRadius:'50%', pointerEvents:'none', zIndex:0 }}/>

      <div style={{ width:'100%', maxWidth:480, position:'relative', zIndex:1 }}>
        <div style={{
          background:'rgba(255,255,255,0.05)',
          border:'1px solid rgba(255,255,255,0.1)',
          borderRadius:24, padding:40,
          backdropFilter:'blur(30px)',
          boxShadow:'0 24px 80px rgba(0,0,0,0.5)',
        }}>
          <div style={{ textAlign:'center', marginBottom:32 }}>
            <div style={{
              width:56, height:56,
              background:'linear-gradient(135deg,#10b981,#059669)',
              borderRadius:16,
              display:'flex', alignItems:'center', justifyContent:'center',
              margin:'0 auto 16px',
              boxShadow:'0 8px 24px rgba(16,185,129,0.4)',
            }}>
              <Hotel size={28} color="white"/>
            </div>
            <h2 style={{ fontSize:26, fontWeight:800, color:'white' }}>Create Account</h2>
            <p style={{ color:'#71717a', fontSize:14, marginTop:6 }}>Join HotelHub and start booking</p>
          </div>

          {error && <div className="alert alert-error"><span>⚠</span>{error}</div>}

          <form onSubmit={handleRegister}>
            <div className="form-group">
              <label>Full Name</label>
              <div style={{ position:'relative' }}>
                <User size={16} color="#71717a" style={{ position:'absolute', left:14, top:'50%', transform:'translateY(-50%)' }}/>
                <input name="name" type="text" placeholder="John Doe" required
                  value={form.name} onChange={handleChange} style={{ paddingLeft:42 }}/>
              </div>
            </div>
            <div className="form-group">
              <label>Email Address</label>
              <div style={{ position:'relative' }}>
                <Mail size={16} color="#71717a" style={{ position:'absolute', left:14, top:'50%', transform:'translateY(-50%)' }}/>
                <input name="email" type="email" placeholder="you@example.com" required
                  value={form.email} onChange={handleChange} style={{ paddingLeft:42 }}/>
              </div>
            </div>
            <div className="form-group">
              <label>Password</label>
              <div style={{ position:'relative' }}>
                <Lock size={16} color="#71717a" style={{ position:'absolute', left:14, top:'50%', transform:'translateY(-50%)' }}/>
                <input name="password" type="password" placeholder="••••••••" required
                  value={form.password} onChange={handleChange} style={{ paddingLeft:42 }}/>
              </div>
            </div>
            <div className="form-group">
              <label>Account Type</label>
              <div style={{ position:'relative' }}>
                <Shield size={16} color="#71717a" style={{ position:'absolute', left:14, top:'50%', transform:'translateY(-50%)' }}/>
                <select name="role" value={form.role} onChange={handleChange} style={{ paddingLeft:42 }}>
                  <option value="CUSTOMER">Customer</option>
                  <option value="ADMIN">Admin</option>
                </select>
              </div>
            </div>
            <button type="submit" className="btn btn-primary" disabled={loading}
              style={{ width:'100%', justifyContent:'center', marginTop:8, padding:'14px', fontSize:16, background:'linear-gradient(135deg,#10b981,#059669)', boxShadow:'0 4px 20px rgba(16,185,129,0.4)' }}>
              {loading ? 'Creating Account...' : <><UserPlus size={18}/>Create Account</>}
            </button>
          </form>

          <div className="divider"/>
          <p style={{ textAlign:'center', color:'#71717a', fontSize:14 }}>
            Already have an account?{' '}
            <Link to="/login" style={{ color:'#6C63FF', fontWeight:600, textDecoration:'none' }}>Sign in →</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
