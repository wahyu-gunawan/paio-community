import Link from 'next/link';

export default async function ArticleDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  let article: any = null;
  
  try {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
    const res = await fetch(`${baseUrl}/api/articles/${slug}`, { next: { revalidate: 60 } });
    if (res.ok) {
      article = await res.json();
    }
  } catch (error) {
    console.error('Failed to fetch article:', error);
  }

  if (!article) {
    article = {
      title: 'Judul Artikel Placeholder',
      content: '<p>Ini adalah konten placeholder karena gagal mengambil data dari API.</p><h2>Subjudul</h2><p>Lanjutkan membaca tentang kripto...</p>',
      category: 'Berita',
      created_at: new Date().toISOString(),
      cover_image: null
    };
  }

  return (
    <div className="container" style={{ maxWidth: '800px', paddingBottom: '80px' }}>
      <div style={{ margin: '40px 0 20px', color: 'var(--text-secondary)', fontSize: '14px' }}>
        <Link href="/" className="hover:text-white">Beranda</Link> &gt;{' '}
        <Link href="/news" className="hover:text-white">Berita</Link> &gt;{' '}
        <span style={{ color: '#fff' }}>{article.title}</span>
      </div>

      <div style={{ 
        width: '100%', height: '300px', 
        borderRadius: '16px', marginBottom: '32px',
        background: article.cover_image ? `url(${article.cover_image}) center/cover` : 'linear-gradient(135deg, var(--bg-darker), var(--bg-darkest))',
        position: 'relative', overflow: 'hidden'
      }}>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(10,22,40,1), transparent)' }}></div>
        <div style={{ position: 'absolute', bottom: '24px', left: '24px' }}>
          <span className="badge" style={{ background: 'var(--accent-yellow)', color: '#000', marginBottom: '12px' }}>{article.category || 'News'}</span>
          <div style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>
            {new Date(article.created_at).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}
          </div>
        </div>
      </div>

      <h1 style={{ fontSize: '36px', marginBottom: '32px', lineHeight: 1.3, color: '#fff', fontFamily: 'var(--font-heading)' }}>
        {article.title}
      </h1>

      <div 
        className="article-content"
        dangerouslySetInnerHTML={{ __html: article.content }}
      />
      
      <div style={{ marginTop: '60px', borderTop: '1px solid var(--glass-border)', paddingTop: '32px' }}>
        <Link href="/news" className="btn-outline">
          ← Kembali ke Berita
        </Link>
      </div>
    </div>
  );
}
