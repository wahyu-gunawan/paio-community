'use client';
import { useState, useEffect } from 'react';
import AirdropCard from '@/components/AirdropCard';

export default function AirdropPage() {
  const [airdrops, setAirdrops] = useState<any[]>([]);
  const [filter, setFilter] = useState('Semua');
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchAirdrops = async () => {
      try {
        const baseUrl = process.env.NEXT_PUBLIC_APP_URL || '';
        const res = await fetch(`${baseUrl}/api/airdrops`);
        if (res.ok) {
          const data = await res.json();
          setAirdrops(data);
        } else {
          throw new Error('Failed to fetch');
        }
      } catch (err) {
        setAirdrops([
          { id: 1, name: 'ZkSync', status: 'Active', description: 'Layer 2 Ethereum dengan potensi besar.', reward: 'TBA', deadline: new Date(Date.now() + 864000000).toISOString() },
          { id: 2, name: 'LayerZero', status: 'Upcoming', description: 'Omnichain interoperability protocol.', reward: 'Token ZRO', deadline: null },
          { id: 3, name: 'Starknet', status: 'Ended', description: 'ZK-Rollup Layer 2.', reward: 'STRK', deadline: new Date(Date.now() - 864000000).toISOString() },
          { id: 4, name: 'Berachain', status: 'Active', description: 'EVM compatible L1 on Cosmos.', reward: 'BERA', deadline: null }
        ]);
      } finally {
        setLoading(false);
      }
    };
    fetchAirdrops();
  }, []);

  const tabs = ['Semua', 'Upcoming', 'Active', 'Ended'];
  
  const filteredAirdrops = filter === 'Semua' 
    ? airdrops 
    : airdrops.filter(a => a.status?.toLowerCase() === filter.toLowerCase());

  return (
    <div className="container" style={{ paddingBottom: '80px' }}>
      <div style={{ textAlign: 'center', padding: '60px 0 40px' }}>
        <h1 className="text-gradient" style={{ fontSize: '40px', marginBottom: '16px' }}>Daftar Airdrop</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '18px', maxWidth: '600px', margin: '0 auto' }}>
          Temukan dan ikuti airdrop cryptocurrency terbaik yang dikurasi oleh tim kami.
        </p>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', marginBottom: '40px', flexWrap: 'wrap' }}>
        {tabs.map(tab => (
          <button
            key={tab}
            onClick={() => setFilter(tab)}
            style={{
              padding: '8px 24px',
              borderRadius: '20px',
              border: '1px solid var(--glass-border)',
              background: filter === tab ? 'var(--accent-yellow)' : 'var(--glass-bg)',
              color: filter === tab ? '#000' : '#fff',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '40px', color: 'var(--text-secondary)' }}>Loading...</div>
      ) : (
        <div className="grid-3 animate-fade-in">
          {filteredAirdrops.map(airdrop => (
            <AirdropCard key={airdrop.id} airdrop={airdrop} />
          ))}
        </div>
      )}
      
      {!loading && filteredAirdrops.length === 0 && (
        <div style={{ textAlign: 'center', padding: '60px', color: 'var(--text-secondary)', background: 'var(--glass-bg)', borderRadius: '12px' }}>
          Belum ada airdrop untuk kategori ini.
        </div>
      )}
    </div>
  );
}
