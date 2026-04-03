import { Link } from 'react-router-dom';
import { Hotel, Star, Shield, Clock, ArrowRight, Users, BedDouble, BookOpen } from 'lucide-react';

export default function Home() {
  const user = JSON.parse(localStorage.getItem('user') || 'null');

  const features = [
    { icon: <Hotel size={28}/>, title: 'Luxury Hotels', desc: 'Browse premium hotels handpicked for exceptional quality and service.', color:'#6C63FF' },
    { icon: <Shield size={28}/>, title: 'Secure Booking', desc: 'Your reservations are safely managed with instant confirmation.', color:'#10b981' },
    { icon: <Clock size={28}/>, title: '24/7 Support', desc: 'Our team is always available to make your stay perfect.', color:'#f59e0b' },
    { icon: <Star size={28}/>, title: 'Best Rates', desc: 'Get the most competitive prices directly, no hidden fees.', color:'#ef4444' },
  ];

  const stats = [
    { icon: <Hotel size={22}/>, value: '200+', label: 'Hotels' },
    { icon: <BedDouble size={22}/>, value: '5K+', label: 'Rooms' },
    { icon: <Users size={22}/>, value: '50K+', label: 'Guests' },
    { icon: <BookOpen size={22}/>, value: '99%', label: 'Satisfaction' },
  ];

  return (
    <div>
      {/* ── Hero ─────────────────────────────────────────────────── */}
      <section style={{
        minHeight: '88vh',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Background glow blobs */}
        <div style={{
          position: 'absolute', top: '10%', left: '5%',
          width: 500, height: 500,
          background: 'radial-gradient(circle, rgba(108,99,255,0.2) 0%, transparent 70%)',
          borderRadius: '50%', pointerEvents: 'none',
        }}/>
        <div style={{
          position: 'absolute', bottom: '10%', right: '5%',
          width: 400, height: 400,
          background: 'radial-gradient(circle, rgba(245,158,11,0.12) 0%, transparent 70%)',
          borderRadius: '50%', pointerEvents: 'none',
        }}/>

        <div className="container" style={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
          <div className="badge badge-info fade-in" style={{ display:'inline-flex', marginBottom:24, fontSize:13 }}>
            ✨ Premium Hotel Booking Experience
          </div>

          <h1 className="fade-in" style={{
            fontSize: 'clamp(36px, 7vw, 80px)',
            fontWeight: 800,
            lineHeight: 1.1,
            marginBottom: 24,
            background: 'linear-gradient(135deg, #ffffff 0%, #a5b4fc 50%, #6C63FF 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}>
            Your Dream Stay<br/>Awaits You
          </h1>

          <p className="fade-in" style={{
            fontSize: 18, color: '#a1a1aa',
            maxWidth: 560, margin: '0 auto 40px',
            lineHeight: 1.7,
          }}>
            Discover handpicked luxury hotels around the world. Book your perfect room in seconds with our seamless reservation system.
          </p>

          <div className="fade-in" style={{ display:'flex', gap:16, justifyContent:'center', flexWrap:'wrap' }}>
            <Link to="/hotels" className="btn btn-primary" style={{ fontSize:16, padding:'14px 32px' }}>
              Explore Hotels <ArrowRight size={18}/>
            </Link>
            {!user && (
              <Link to="/register" className="btn btn-secondary" style={{ fontSize:16, padding:'14px 32px' }}>
                Create Account
              </Link>
            )}
          </div>

          {/* Stats pill */}
          <div className="fade-in" style={{
            display: 'inline-flex', gap: 0,
            marginTop: 60,
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: 16,
            padding: 4,
            flexWrap: 'wrap',
            justifyContent: 'center',
            backdropFilter: 'blur(10px)',
          }}>
            {stats.map((s, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'center', gap: 10,
                padding: '12px 24px',
                borderRight: i < stats.length - 1 ? '1px solid rgba(255,255,255,0.1)' : 'none',
              }}>
                <span style={{ color:'#6C63FF' }}>{s.icon}</span>
                <div>
                  <div style={{ fontSize: 22, fontWeight: 800, color: 'white' }}>{s.value}</div>
                  <div style={{ fontSize: 11, color: '#71717a', textTransform:'uppercase', letterSpacing:'0.06em' }}>{s.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Features ──────────────────────────────────────────────── */}
      <section style={{ padding:'80px 0' }}>
        <div className="container">
          <div style={{ textAlign:'center', marginBottom:56 }}>
            <h2 style={{ fontSize:36, fontWeight:800, color:'white', marginBottom:12 }}>Why Choose HotelHub?</h2>
            <p style={{ color:'#a1a1aa', fontSize:16 }}>Everything you need for a perfect hotel experience</p>
          </div>
          <div className="grid grid-2" style={{ gap:24 }}>
            {features.map((f, i) => (
              <div key={i} className="card" style={{ display:'flex', gap:20, alignItems:'flex-start' }}>
                <div style={{
                  width:56, height:56,
                  background:`${f.color}20`,
                  border:`1px solid ${f.color}40`,
                  borderRadius:14,
                  display:'flex', alignItems:'center', justifyContent:'center',
                  color: f.color, flexShrink:0,
                }}>
                  {f.icon}
                </div>
                <div>
                  <h3 style={{ fontSize:18, fontWeight:700, color:'white', marginBottom:8 }}>{f.title}</h3>
                  <p style={{ color:'#71717a', fontSize:14, lineHeight:1.7 }}>{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA banner ────────────────────────────────────────────── */}
      <section style={{ padding:'0 0 80px' }}>
        <div className="container">
          <div style={{
            background: 'linear-gradient(135deg, rgba(108,99,255,0.25) 0%, rgba(79,70,229,0.15) 100%)',
            border: '1px solid rgba(108,99,255,0.3)',
            borderRadius: 24,
            padding: '52px 40px',
            textAlign: 'center',
            position: 'relative',
            overflow: 'hidden',
          }}>
            <div style={{
              position:'absolute', top:-60, right:-60,
              width:200, height:200,
              background:'radial-gradient(circle, rgba(108,99,255,0.3), transparent 70%)',
              borderRadius:'50%',
            }}/>
            <h2 style={{ fontSize:32, fontWeight:800, color:'white', marginBottom:12 }}>
              Ready to Book Your Stay?
            </h2>
            <p style={{ color:'#a1a1aa', fontSize:16, marginBottom:28, maxWidth:480, margin:'0 auto 28px' }}>
              Join thousands of happy travelers. Find and book your perfect room in minutes.
            </p>
            <Link to="/hotels" className="btn btn-primary" style={{ fontSize:16, padding:'14px 36px' }}>
              Browse All Hotels <ArrowRight size={18}/>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
