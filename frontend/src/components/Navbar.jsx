import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Hotel, BookOpen, LayoutDashboard, LogIn, LogOut, UserPlus, Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem('user') || 'null');
  const [open, setOpen] = useState(false);

  const logout = () => {
    localStorage.removeItem('user');
    navigate('/login');
    window.location.reload();
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav style={{
      position: 'sticky', top: 0, zIndex: 100,
      background: 'rgba(15,15,26,0.85)',
      backdropFilter: 'blur(20px)',
      borderBottom: '1px solid rgba(255,255,255,0.08)',
    }}>
      <div className="container" style={{ display:'flex', alignItems:'center', justifyContent:'space-between', height:68 }}>
        {/* Logo */}
        <Link to="/" style={{ display:'flex', alignItems:'center', gap:10, textDecoration:'none' }}>
          <div style={{
            width:38, height:38,
            background:'linear-gradient(135deg,#6C63FF,#4f46e5)',
            borderRadius:10,
            display:'flex', alignItems:'center', justifyContent:'center',
            boxShadow:'0 4px 16px rgba(108,99,255,0.4)',
          }}>
            <Hotel size={20} color="white" />
          </div>
          <span style={{ fontSize:20, fontWeight:800, color:'white' }}>
            Hotel<span style={{ color:'#6C63FF' }}>Hub</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <div style={{ display:'flex', alignItems:'center', gap:8 }} className="desktop-nav">
          {[
            { path: '/hotels', label: 'Hotels', icon: <Hotel size={16}/> },
            ...(user ? [{ path: '/my-bookings', label: 'My Bookings', icon: <BookOpen size={16}/> }] : []),
            ...(user?.role === 'ADMIN' ? [{ path: '/admin', label: 'Admin', icon: <LayoutDashboard size={16}/> }] : []),
          ].map(({ path, label, icon }) => (
            <Link key={path} to={path} style={{
              display:'flex', alignItems:'center', gap:6,
              padding:'8px 14px',
              borderRadius:10,
              textDecoration:'none',
              fontSize:14, fontWeight:600,
              transition:'all 0.2s',
              color: isActive(path) ? '#6C63FF' : '#a1a1aa',
              background: isActive(path) ? 'rgba(108,99,255,0.12)' : 'transparent',
            }}>
              {icon}{label}
            </Link>
          ))}

          <div style={{ width:1, height:24, background:'rgba(255,255,255,0.1)', margin:'0 8px' }} />

          {user ? (
            <div style={{ display:'flex', alignItems:'center', gap:10 }}>
              <div style={{ display:'flex', alignItems:'center', gap:8 }}>
                <div style={{
                  width:32, height:32,
                  background:'linear-gradient(135deg,#6C63FF,#a5b4fc)',
                  borderRadius:'50%',
                  display:'flex', alignItems:'center', justifyContent:'center',
                  fontSize:13, fontWeight:700, color:'white',
                }}>
                  {user.name?.[0]?.toUpperCase() || 'U'}
                </div>
                <div>
                  <div style={{ fontSize:13, fontWeight:600, color:'white' }}>{user.name}</div>
                  <div style={{ fontSize:11, color:'#6C63FF', fontWeight:700, textTransform:'uppercase' }}>{user.role}</div>
                </div>
              </div>
              <button onClick={logout} className="btn btn-secondary btn-sm" style={{ gap:6 }}>
                <LogOut size={14}/> Logout
              </button>
            </div>
          ) : (
            <div style={{ display:'flex', gap:8 }}>
              <Link to="/login" className="btn btn-secondary btn-sm"><LogIn size={14}/> Login</Link>
              <Link to="/register" className="btn btn-primary btn-sm"><UserPlus size={14}/> Sign Up</Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
