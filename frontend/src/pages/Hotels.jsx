import { useEffect, useState } from 'react';
import { getAllHotels } from '../api';
import HotelCard from '../components/HotelCard';
import { Hotel, Search } from 'lucide-react';

export default function Hotels() {
  const [hotels, setHotels]   = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch]   = useState('');

  useEffect(() => {
    getAllHotels()
      .then(res => setHotels(res.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const filtered = hotels.filter(h =>
    h.name.toLowerCase().includes(search.toLowerCase()) ||
    h.location.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container" style={{ paddingBottom:60 }}>
      <div className="page-header">
        <h1 className="page-title">Explore Hotels</h1>
        <p className="page-subtitle">Find your perfect place to stay from our curated collection</p>
      </div>

      {/* Search bar */}
      <div style={{ position:'relative', maxWidth:480, marginBottom:40 }}>
        <Search size={18} color="#71717a" style={{ position:'absolute', left:16, top:'50%', transform:'translateY(-50%)', pointerEvents:'none' }}/>
        <input
          type="text" placeholder="Search by hotel name or location..."
          value={search} onChange={e => setSearch(e.target.value)}
          style={{ paddingLeft:48 }}
        />
      </div>

      {loading ? (
        <div className="spinner"/>
      ) : filtered.length === 0 ? (
        <div className="empty-state">
          <Hotel size={56} style={{ margin:'0 auto 16px', display:'block', opacity:0.3 }}/>
          <h3>{search ? 'No hotels match your search' : 'No hotels available yet'}</h3>
          <p style={{ fontSize:14 }}>{search ? 'Try a different keyword' : 'Check back soon!'}</p>
        </div>
      ) : (
        <div className="grid grid-3" style={{ gap:24 }}>
          {filtered.map(hotel => (
            <HotelCard key={hotel.id} hotel={hotel}/>
          ))}
        </div>
      )}
    </div>
  );
}
