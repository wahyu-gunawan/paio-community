import Link from 'next/link';

export default function Footer() {
  return (
    <footer style={{ 
      background: 'var(--bg-darker)', 
      borderTop: '1px solid var(--glass-border)',
      padding: '60px 0 30px',
      marginTop: '80px',
      position: 'relative'
    }}>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: 'linear-gradient(90deg, transparent, var(--accent-orange), transparent)' }}></div>
      <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '40px', marginBottom: '40px' }}>
        <div>
          <h3 style={{ fontSize: '24px', color: '#fff', marginBottom: '16px', fontFamily: 'var(--font-heading)' }}>PAIO<span style={{color: 'var(--accent-yellow)'}}>Community</span></h3>
          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            Komunitas kripto terbesar di Indonesia. Tempat terbaik untuk belajar, berbagi informasi, dan berdiskusi seputar cryptocurrency dan airdrop.
          </p>
        </div>
        
        <div>
          <h4 style={{ color: '#fff', marginBottom: '20px' }}>Quick Links</h4>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <li><Link href="/news" style={{ color: 'var(--text-secondary)' }}>Berita & Artikel</Link></li>
            <li><Link href="/airdrop" style={{ color: 'var(--text-secondary)' }}>Daftar Airdrop</Link></li>
            <li><Link href="/team" style={{ color: 'var(--text-secondary)' }}>Tim Kami</Link></li>
          </ul>
        </div>
        
        <div>
          <h4 style={{ color: '#fff', marginBottom: '20px' }}>Komunitas</h4>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <li><a href="#" style={{ color: 'var(--text-secondary)' }}>Telegram Group</a></li>
            <li><a href="#" style={{ color: 'var(--text-secondary)' }}>Telegram Channel</a></li>
            <li><a href="#" style={{ color: 'var(--text-secondary)' }}>Twitter / X</a></li>
          </ul>
        </div>
      </div>
      
      <div className="container" style={{ borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '30px', textAlign: 'center', color: 'var(--text-muted)', fontSize: '14px' }}>
        <p>© 2024 PAIO Community. All rights reserved.</p>
        <p style={{ marginTop: '8px' }}>Built with ❤️ by PAIO Community</p>
      </div>
    </footer>
  );
}
