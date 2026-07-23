'use client';
import { useState, useEffect } from 'react';
import ArticleCard from '@/components/ArticleCard';

export default function NewsPage() {
  const [articles, setArticles] = useState<any[]>([]);
  const [filter, setFilter] = useState('Semua');
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const baseUrl = process.env.NEXT_PUBLIC_APP_URL || '';
        const res = await fetch(`${baseUrl}/api/articles?published=true`);
        if (res.ok) {
          const data = await res.json();
          setArticles(data);
        } else {
          throw new Error('Failed to fetch');
        }
      } catch (err) {
        setArticles([
          { id: 1, title: 'Cara Memulai Investasi Kripto', slug: 'cara-memulai', excerpt: 'Panduan lengkap untuk pemula...', created_at: new Date().toISOString(), category: 'Tutorial' },
          { id: 2, title: 'Analisa Bitcoin Bulan Ini', slug: 'analisa-btc', excerpt: 'Melihat pergerakan harga...', created_at: new Date().toISOString(), category: 'Analysis' },
          { id: 3, title: '5 Altcoin Potensial', slug: '5-altcoin', excerpt: 'Koin yang wajib masuk watchlist...', created_at: new Date().toISOString(), category: 'News' },
          { id: 4, title: 'Mengenal Teknologi Blockchain', slug: 'mengenal-blockchain', excerpt: 'Dasar-dasar teknologi di balik kripto...', created_at: new Date().toISOString(), category: 'Tutorial' }
        ]);
      } finally {
        setLoading(false);
      }
    };
    fetchArticles();
  }, []);

  const tabs = ['Semua', 'News', 'Tutorial', 'Analysis'];
  
  const filteredArticles = filter === 'Semua' 
    ? articles 
    : articles.filter(a => a.category === filter);

  return (
    <div className="container" style={{ paddingBottom: '80px' }}>
      <div style={{ textAlign: 'center', padding: '60px 0 40px' }}>
        <h1 className="text-gradient" style={{ fontSize: '40px', marginBottom: '16px' }}>Berita & Artikel</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '18px', maxWidth: '600px', margin: '0 auto' }}>
          Informasi terkini seputar dunia cryptocurrency, tutorial, dan analisa pasar.
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
          {filteredArticles.map(article => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      )}
      
      {!loading && filteredArticles.length === 0 && (
        <div style={{ textAlign: 'center', padding: '60px', color: 'var(--text-secondary)', background: 'var(--glass-bg)', borderRadius: '12px' }}>
          Belum ada artikel untuk kategori ini.
        </div>
      )}
    </div>
  );
}
