import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { loginUser } from '../api';
import { LogIn, Mail, Lock, Hotel } from 'lucide-react';

export default function Login() {
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [error, setError]       = useState('');
  const [loading, setLoading]   = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(''); setLoading(true);
    try {
      const res = await loginUser(email, password);
      localStorage.setItem('user', JSON.stringify(res.data));
      window.location.href = '/';
    } catch {
      setError('Invalid email or password. Please try again.');
    } finally { setLoading(false); }
  };

  return (
    <div style={{ minHeight:'90vh', display:'flex', alignItems:'center', justifyContent:'center', padding:'40px 16px' }}>
      {/* Background glow */}
      <div style={{ position:'fixed', top:'20%', left:'50%', transform:'translateX(-50%)',
        width:500, height:500, background:'radial-gradient(circle, rgba(108,99,255,0.15), transparent 70%)',
        borderRadius:'50%', pointerEvents:'none', zIndex:0 }}/>

      <div style={{ width:'100%', maxWidth:440, position:'relative', zIndex:1 }}>
        {/* Card */}
        <div style={{
          background:'rgba(255,255,255,0.05)',
          border:'1px solid rgba(255,255,255,0.1)',
          borderRadius:24,
          padding:40,
          backdropFilter:'blur(30px)',
          boxShadow:'0 24px 80px rgba(0,0,0,0.5)',
        }}>
          {/* Logo */}
          <div style={{ textAlign:'center', marginBottom:32 }}>
            <div style={{
              width:56, height:56,
              background:'linear-gradient(135deg,#6C63FF,#4f46e5)',
              borderRadius:16,
              display:'flex', alignItems:'center', justifyContent:'center',
              margin:'0 auto 16px',
              boxShadow:'0 8px 24px rgba(108,99,255,0.4)',
            }}>
              <Hotel size={28} color="white"/>
            </div>
            <h2 style={{ fontSize:26, fontWeight:800, color:'white' }}>Welcome Back</h2>
            <p style={{ color:'#71717a', fontSize:14, marginTop:6 }}>Sign in to your HotelHub account</p>
          </div>

          {error && <div className="alert alert-error"><span>⚠</span>{error}</div>}

          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label>Email Address</label>
              <div style={{ position:'relative' }}>
                <Mail size={16} color="#71717a" style={{ position:'absolute', left:14, top:'50%', transform:'translateY(-50%)' }}/>
                <input
                  type="email" placeholder="you@example.com" required
                  value={email} onChange={e => setEmail(e.target.value)}
                  style={{ paddingLeft:42 }}
                />
              </div>
            </div>
            <div className="form-group">
              <label>Password</label>
              <div style={{ position:'relative' }}>
                <Lock size={16} color="#71717a" style={{ position:'absolute', left:14, top:'50%', transform:'translateY(-50%)' }}/>
                <input
                  type="password" placeholder="••••••••" required
                  value={password} onChange={e => setPassword(e.target.value)}
                  style={{ paddingLeft:42 }}
                />
              </div>
            </div>
            <button type="submit" className="btn btn-primary" disabled={loading}
              style={{ width:'100%', justifyContent:'center', marginTop:8, padding:'14px', fontSize:16 }}>
              {loading ? 'Signing in...' : <><LogIn size={18}/>Sign In</>}
            </button>
          </form>

          <div className="divider"/>
          <p style={{ textAlign:'center', color:'#71717a', fontSize:14 }}>
            Don't have an account?{' '}
            <Link to="/register" style={{ color:'#6C63FF', fontWeight:600, textDecoration:'none' }}>Create one →</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
