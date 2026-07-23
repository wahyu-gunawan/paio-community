import Link from 'next/link';

export default async function AirdropDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  let airdrop: any = null;
  
  try {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
    const res = await fetch(`${baseUrl}/api/airdrops/${id}`, { next: { revalidate: 60 } });
    if (res.ok) {
      airdrop = await res.json();
    }
  } catch (error) {
    console.error('Failed to fetch airdrop:', error);
  }

  if (!airdrop) {
    airdrop = {
      name: 'Project Name Placeholder',
      status: 'Active',
      description: 'Ini adalah deskripsi airdrop placeholder karena data tidak ditemukan.',
      reward: 'TBA',
      deadline: new Date(Date.now() + 864000000).toISOString(),
      steps: JSON.stringify(['Kunjungi website project', 'Connect wallet', 'Selesaikan task di Galxe', 'Claim NFT']),
      link: 'https://example.com'
    };
  }

  let steps = [];
  try {
    steps = typeof airdrop.steps === 'string' ? JSON.parse(airdrop.steps) : (airdrop.steps || []);
  } catch(e) {
    steps = [];
  }

  const getStatusClass = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'active': return 'badge-active';
      case 'ended': return 'badge-ended';
      default: return 'badge-upcoming';
    }
  };

  return (
    <div className="container" style={{ maxWidth: '800px', paddingBottom: '80px' }}>
      <div style={{ margin: '40px 0 20px', color: 'var(--text-secondary)', fontSize: '14px' }}>
        <Link href="/" className="hover:text-white">Beranda</Link> &gt;{' '}
        <Link href="/airdrop" className="hover:text-white">Airdrop</Link> &gt;{' '}
        <span style={{ color: '#fff' }}>{airdrop.name}</span>
      </div>

      <div className="glass-card" style={{ padding: '40px', marginBottom: '40px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '20px', marginBottom: '32px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
            <div style={{ width: '80px', height: '80px', borderRadius: '20px', background: 'linear-gradient(135deg, var(--accent-yellow), var(--accent-orange))', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '36px', fontWeight: 'bold' }}>
              {airdrop.name?.charAt(0) || '?'}
            </div>
            <div>
              <h1 style={{ fontSize: '32px', color: '#fff', marginBottom: '8px', fontFamily: 'var(--font-heading)' }}>{airdrop.name}</h1>
              <span className={`badge ${getStatusClass(airdrop.status)}`}>{airdrop.status || 'Upcoming'}</span>
            </div>
          </div>
          <a href={airdrop.link || '#'} target="_blank" rel="noreferrer" className="btn-primary" style={{ padding: '14px 32px' }}>
            Ikuti Sekarang
          </a>
        </div>

        <p style={{ color: 'var(--text-secondary)', fontSize: '18px', lineHeight: 1.7, marginBottom: '32px' }}>
          {airdrop.description}
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '40px' }}>
          <div style={{ background: 'rgba(0,0,0,0.3)', padding: '20px', borderRadius: '12px' }}>
            <div style={{ color: 'var(--text-secondary)', fontSize: '14px', marginBottom: '8px' }}>💰 Reward</div>
            <div style={{ color: '#fff', fontSize: '20px', fontWeight: 600 }}>{airdrop.reward || 'TBA'}</div>
          </div>
          <div style={{ background: 'rgba(0,0,0,0.3)', padding: '20px', borderRadius: '12px' }}>
            <div style={{ color: 'var(--text-secondary)', fontSize: '14px', marginBottom: '8px' }}>📅 Deadline</div>
            <div style={{ color: '#fff', fontSize: '20px', fontWeight: 600 }}>
              {airdrop.deadline ? new Date(airdrop.deadline).toLocaleDateString('id-ID') : 'TBA'}
            </div>
          </div>
        </div>

        <h3 style={{ fontSize: '24px', color: '#fff', marginBottom: '20px', fontFamily: 'var(--font-heading)' }}>Cara Berpartisipasi</h3>
        {steps && steps.length > 0 ? (
          <ul style={{ listStyle: 'none', counterReset: 'step' }}>
            {steps.map((step: string, idx: number) => (
              <li key={idx} style={{ position: 'relative', paddingLeft: '48px', marginBottom: '20px', fontSize: '16px', lineHeight: 1.6, color: '#e2e8f0', minHeight: '32px', display: 'flex', alignItems: 'center' }}>
                <div style={{ position: 'absolute', left: 0, top: '0', width: '32px', height: '32px', borderRadius: '50%', background: 'rgba(245, 158, 11, 0.1)', color: 'var(--accent-yellow)', border: '1px solid rgba(245, 158, 11, 0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>
                  {idx + 1}
                </div>
                {step}
              </li>
            ))}
          </ul>
        ) : (
          <p style={{ color: 'var(--text-secondary)' }}>Tidak ada informasi langkah-langkah untuk airdrop ini.</p>
        )}
      </div>
      
      <div style={{ marginTop: '60px', borderTop: '1px solid var(--glass-border)', paddingTop: '32px' }}>
        <Link href="/airdrop" className="btn-outline">
          ← Kembali ke Daftar Airdrop
        </Link>
      </div>
    </div>
  );
}
