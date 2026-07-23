'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function AdminArticles() {
  const [articles, setArticles] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchArticles = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/articles');
      if (res.ok) {
        const data = await res.json();
        setArticles(Array.isArray(data) ? data : []);
      }
    } catch (error) {
      console.error('Failed to fetch articles:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  const handleDelete = async (id: string) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus artikel ini?')) {
      try {
        const res = await fetch(`/api/articles/${id}`, {
          method: 'DELETE',
        });
        if (res.ok) {
          fetchArticles();
        } else {
          alert('Gagal menghapus artikel');
        }
      } catch (error) {
        console.error('Delete failed:', error);
        alert('Terjadi kesalahan saat menghapus');
      }
    }
  };

  return (
    <div>
      <div className="admin-header">
        <h1 className="admin-title">Kelola Artikel</h1>
        <Link href="/admin/articles/new" className="btn btn-primary">
          + Tambah Artikel
        </Link>
      </div>

      <div className="admin-table-container">
        {isLoading ? (
          <div className="loading-container"><div className="spinner spinner-lg"></div></div>
        ) : articles.length === 0 ? (
          <div style={{ padding: '40px', textAlign: 'center', color: 'var(--admin-text-muted)' }}>
            Belum ada artikel. Silakan tambah artikel baru.
          </div>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Judul</th>
                <th>Kategori</th>
                <th>Status</th>
                <th>Tanggal</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {articles.map((article) => (
                <tr key={article.id || article._id}>
                  <td>{article.title}</td>
                  <td><span className="badge badge-neutral">{article.category}</span></td>
                  <td>
                    <span className={`badge ${article.published ? 'badge-success' : 'badge-warning'}`}>
                      {article.published ? 'Published' : 'Draft'}
                    </span>
                  </td>
                  <td>{new Date(article.createdAt || Date.now()).toLocaleDateString('id-ID')}</td>
                  <td>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <Link href={`/admin/articles/${article.id || article._id}`} className="btn btn-sm btn-secondary">
                        Edit
                      </Link>
                      <button 
                        onClick={() => handleDelete(article.id || article._id)} 
                        className="btn btn-sm btn-danger"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
