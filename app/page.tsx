import Link from 'next/link';
import ArticleCard from '@/components/ArticleCard';
import AirdropCard from '@/components/AirdropCard';

export const revalidate = 3600;

export default async function Home() {
  let articles = [];
  let airdrops = [];

  try {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
    const [articlesRes, airdropsRes] = await Promise.all([
      fetch(`${baseUrl}/api/articles?published=true&limit=3`, { next: { revalidate: 3600 } }).catch(() => null),
      fetch(`${baseUrl}/api/airdrops?limit=3`, { next: { revalidate: 3600 } }).catch(() => null)
    ]);
    
    if (articlesRes?.ok) {
      const data = await articlesRes.json();
      articles = data.slice(0, 3);
    }
    if (airdropsRes?.ok) {
      const data = await airdropsRes.json();
      airdrops = data.slice(0, 3);
    }
  } catch (error) {
    console.error('Failed to fetch data:', error);
  }

  // Placeholder data if fetch fails
  if (articles.length === 0) {
    articles = [
      { id: 1, title: 'Cara Memulai Investasi Kripto', slug: 'cara-memulai', excerpt: 'Panduan lengkap untuk pemula...', created_at: new Date().toISOString(), category: 'Tutorial' },
      { id: 2, title: 'Analisa Bitcoin Bulan Ini', slug: 'analisa-btc', excerpt: 'Melihat pergerakan harga...', created_at: new Date().toISOString(), category: 'Analysis' },
      { id: 3, title: '5 Altcoin Potensial', slug: '5-altcoin', excerpt: 'Koin yang wajib masuk watchlist...', created_at: new Date().toISOString(), category: 'News' }
    ];
  }
  if (airdrops.length === 0) {
    airdrops = [
      { id: 1, name: 'ZkSync', status: 'Active', description: 'Layer 2 Ethereum dengan potensi besar.', reward: 'TBA', deadline: new Date(Date.now() + 864000000).toISOString() },
      { id: 2, name: 'LayerZero', status: 'Upcoming', description: 'Omnichain interoperability protocol.', reward: 'Token ZRO', deadline: null },
      { id: 3, name: 'Starknet', status: 'Ended', description: 'ZK-Rollup Layer 2.', reward: 'STRK', deadline: new Date(Date.now() - 864000000).toISOString() }
    ];
  }

  return (
    <>
      <section className="hero-section">
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <h1 className="hero-title animate-fade-in text-gradient">
            Selamat Datang di PAIO Community
          </h1>
          <p className="hero-subtitle animate-fade-in" style={{ animationDelay: '0.2s' }}>
            Komunitas kripto terbesar di Indonesia. Bergabung bersama ribuan member untuk belajar, berbagi, dan meraih peluang di dunia crypto.
          </p>
          <div className="hero-actions animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <Link href="#" className="btn-primary animate-pulse">
              Gabung Telegram
            </Link>
            <Link href="/airdrop" className="btn-outline">
              Jelajahi Airdrop
            </Link>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="animate-float" style={{ position: 'absolute', top: '20%', left: '10%', fontSize: '40px', opacity: 0.5 }}>💎</div>
        <div className="animate-float" style={{ position: 'absolute', top: '40%', right: '15%', fontSize: '50px', opacity: 0.5, animationDelay: '1s' }}>🚀</div>
        <div className="animate-float" style={{ position: 'absolute', bottom: '20%', left: '20%', fontSize: '30px', opacity: 0.5, animationDelay: '2s' }}>💸</div>
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '600px', height: '600px', background: 'radial-gradient(circle, rgba(245,158,11,0.1) 0%, transparent 70%)', zIndex: 0, pointerEvents: 'none' }}></div>
      </section>

      <div className="container">
        <section className="stats-grid animate-fade-in" style={{ animationDelay: '0.6s' }}>
          <div className="glass-card stat-card">
            <div className="stat-value">500+</div>
            <div className="stat-label">Total Artikel</div>
          </div>
          <div className="glass-card stat-card">
            <div className="stat-value">50+</div>
            <div className="stat-label">Airdrop Aktif</div>
          </div>
          <div className="glass-card stat-card">
            <div className="stat-value">1000+</div>
            <div className="stat-label">Anggota Komunitas</div>
          </div>
          <div className="glass-card stat-card">
            <div className="stat-value">2024</div>
            <div className="stat-label">Tahun Berdiri</div>
          </div>
        </section>

        <section style={{ marginBottom: '80px' }}>
          <div className="section-header">
            <div>
              <h2 className="section-title text-gradient">Berita Terkini</h2>
              <p style={{ color: 'var(--text-secondary)', marginTop: '8px' }}>Informasi terbaru seputar dunia kripto.</p>
            </div>
            <Link href="/news" className="section-link">Lihat Semua →</Link>
          </div>
          <div className="grid-3">
            {articles.map((article: any) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        </section>

        <section style={{ marginBottom: '80px' }}>
          <div className="section-header">
            <div>
              <h2 className="section-title text-gradient">Airdrop Terbaru</h2>
              <p style={{ color: 'var(--text-secondary)', marginTop: '8px' }}>Peluang mendapatkan token gratis.</p>
            </div>
            <Link href="/airdrop" className="section-link">Lihat Semua →</Link>
          </div>
          <div className="grid-3">
            {airdrops.map((airdrop: any) => (
              <AirdropCard key={airdrop.id} airdrop={airdrop} />
            ))}
          </div>
        </section>

        <section className="glass-card" style={{ background: 'linear-gradient(135deg, rgba(15, 32, 66, 0.9), rgba(245, 158, 11, 0.1))', textAlign: 'center', padding: '60px 20px', border: '1px solid rgba(245, 158, 11, 0.2)' }}>
          <h2 style={{ fontSize: '32px', marginBottom: '16px', color: '#fff', fontFamily: 'var(--font-heading)' }}>Bergabung dengan PAIO Community</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '18px', maxWidth: '600px', margin: '0 auto 32px', lineHeight: 1.6 }}>
            Dapatkan informasi terbaru seputar cryptocurrency, airdrop, dan peluang investasi. Mari bertumbuh bersama.
          </p>
          <Link href="#" className="btn-primary animate-pulse" style={{ padding: '16px 40px', fontSize: '18px' }}>
            Join Group Telegram
          </Link>
        </section>
      </div>
    </>
  );
}
