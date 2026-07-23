'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function NewArticle() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    category: 'news',
    excerpt: '',
    coverImage: '',
    content: '',
    published: false
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await fetch('/api/articles', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        router.push('/admin/articles');
        router.refresh();
      } else {
        alert('Gagal menyimpan artikel');
      }
    } catch (error) {
      console.error('Submit failed:', error);
      alert('Terjadi kesalahan');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="admin-card" style={{ maxWidth: '800px', margin: '0 auto' }}>
      <h1 className="admin-title" style={{ marginBottom: '24px' }}>Tulis Artikel Baru</h1>
      
      <form onSubmit={handleSubmit}>
        <div className="admin-form-group">
          <label className="admin-label">Judul</label>
          <input required type="text" name="title" className="admin-input" value={formData.title} onChange={handleChange} />
        </div>
        
        <div className="admin-form-group">
          <label className="admin-label">Kategori</label>
          <select name="category" className="admin-select" value={formData.category} onChange={handleChange}>
            <option value="news">Berita</option>
            <option value="tutorial">Tutorial</option>
            <option value="analysis">Analisa</option>
          </select>
        </div>

        <div className="admin-form-group">
          <label className="admin-label">Ringkasan (Excerpt)</label>
          <textarea required name="excerpt" className="admin-textarea" style={{ minHeight: '80px' }} value={formData.excerpt} onChange={handleChange} />
        </div>

        <div className="admin-form-group">
          <label className="admin-label">URL Gambar Cover</label>
          <input required type="url" name="coverImage" className="admin-input" value={formData.coverImage} onChange={handleChange} />
        </div>

        <div className="admin-form-group">
          <label className="admin-label">Konten (HTML)</label>
          <textarea required name="content" className="admin-textarea" style={{ minHeight: '300px' }} value={formData.content} onChange={handleChange} />
        </div>

        <div className="admin-form-group">
          <label className="admin-checkbox-label">
            <input type="checkbox" name="published" checked={formData.published} onChange={handleChange} />
            Terbitkan artikel ini (Publish)
          </label>
        </div>

        <div style={{ display: 'flex', gap: '16px', marginTop: '32px' }}>
          <button type="submit" className="btn btn-primary" disabled={isLoading}>
            {isLoading ? <div className="spinner"></div> : 'Simpan Artikel'}
          </button>
          <button type="button" className="btn btn-secondary" onClick={() => router.back()}>
            Batal
          </button>
        </div>
      </form>
    </div>
  );
}
