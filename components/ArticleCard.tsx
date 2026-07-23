import Link from 'next/link';

export default function ArticleCard({ article }: { article: any }) {
  return (
    <Link href={`/news/${article.slug}`}>
      <div className="glass-card" style={{ padding: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column', height: '100%' }}>
        <div style={{ position: 'relative', height: '200px', background: article.cover_image ? `url(${article.cover_image}) center/cover` : 'linear-gradient(45deg, var(--bg-darker), var(--bg-darkest))' }}>
          <div style={{ position: 'absolute', top: '16px', left: '16px', background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)', padding: '4px 12px', borderRadius: '4px', fontSize: '12px', color: 'var(--accent-yellow)', fontWeight: 600 }}>
            {article.category || 'Berita'}
          </div>
        </div>
        <div style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column' }}>
          <h3 style={{ fontSize: '20px', marginBottom: '12px', color: '#fff', lineHeight: 1.4 }}>{article.title}</h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '14px', lineHeight: 1.6, marginBottom: '20px', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
            {article.excerpt}
          </p>
          <div style={{ marginTop: 'auto', color: 'var(--text-muted)', fontSize: '12px' }}>
            {new Date(article.created_at || Date.now()).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}
          </div>
        </div>
      </div>
    </Link>
  );
}
