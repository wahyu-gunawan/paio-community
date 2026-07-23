import Link from 'next/link';

export default function AirdropCard({ airdrop }: { airdrop: any }) {
  const getStatusClass = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'active': return 'badge-active';
      case 'ended': return 'badge-ended';
      default: return 'badge-upcoming';
    }
  };

  return (
    <div className="glass-card" style={{ display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'linear-gradient(135deg, var(--accent-yellow), var(--accent-orange))', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', fontWeight: 'bold' }}>
            {airdrop.name?.charAt(0) || '?'}
          </div>
          <h3 style={{ fontSize: '20px', color: '#fff' }}>{airdrop.name}</h3>
        </div>
        <span className={`badge ${getStatusClass(airdrop.status)}`}>{airdrop.status || 'Upcoming'}</span>
      </div>
      
      <p style={{ color: 'var(--text-secondary)', fontSize: '14px', lineHeight: 1.6, marginBottom: '24px', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
        {airdrop.description}
      </p>
      
      <div style={{ background: 'rgba(0,0,0,0.2)', padding: '16px', borderRadius: '8px', marginBottom: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
          <span style={{ fontSize: '18px' }}>💰</span>
          <span style={{ color: '#fff', fontWeight: 600 }}>{airdrop.reward || 'TBA'}</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-secondary)', fontSize: '13px' }}>
          <span>📅</span>
          <span>{airdrop.deadline ? `Berakhir: ${new Date(airdrop.deadline).toLocaleDateString('id-ID')}` : 'TBA'}</span>
        </div>
      </div>
      
      <div style={{ marginTop: 'auto' }}>
        {airdrop.status?.toLowerCase() === 'active' ? (
          <Link href={`/airdrop/${airdrop.id || airdrop.slug}`} className="btn-primary" style={{ width: '100%' }}>
            Ikuti Airdrop
          </Link>
        ) : (
          <Link href={`/airdrop/${airdrop.id || airdrop.slug}`} className="btn-outline" style={{ width: '100%', display: 'block', textAlign: 'center' }}>
            Detail
          </Link>
        )}
      </div>
    </div>
  );
}
