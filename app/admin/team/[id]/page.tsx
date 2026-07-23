'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';

export default function EditTeamMember() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  
  const [isFetching, setIsFetching] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    bio: '',
    avatarUrl: '',
    twitter: '',
    telegram: '',
    order: 0
  });

  useEffect(() => {
    const fetchMember = async () => {
      try {
        const res = await fetch(`/api/team/${id}`);
        if (res.ok) {
          const data = await res.json();
          setFormData({
            name: data.name || '',
            role: data.role || '',
            bio: data.bio || '',
            avatarUrl: data.avatarUrl || '',
            twitter: data.twitter || '',
            telegram: data.telegram || '',
            order: data.order || 0
          });
        } else {
          alert('Anggota tidak ditemukan');
          router.push('/admin/team');
        }
      } catch (error) {
        console.error('Fetch failed:', error);
      } finally {
        setIsFetching(false);
      }
    };

    if (id) {
      fetchMember();
    }
  }, [id, router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'number' ? parseInt(value) || 0 : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await fetch(`/api/team/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        router.push('/admin/team');
        router.refresh();
      } else {
        alert('Gagal menyimpan perubahan');
      }
    } catch (error) {
      console.error('Submit failed:', error);
      alert('Terjadi kesalahan');
    } finally {
      setIsLoading(false);
    }
  };

  if (isFetching) {
    return <div className="loading-container"><div className="spinner spinner-lg"></div></div>;
  }

  return (
    <div className="admin-card" style={{ maxWidth: '800px', margin: '0 auto' }}>
      <h1 className="admin-title" style={{ marginBottom: '24px' }}>Edit Anggota Tim</h1>
      
      <form onSubmit={handleSubmit}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
          <div className="admin-form-group">
            <label className="admin-label">Nama</label>
            <input required type="text" name="name" className="admin-input" value={formData.name} onChange={handleChange} />
          </div>
          
          <div className="admin-form-group">
            <label className="admin-label">Peran / Jabatan</label>
            <input required type="text" name="role" className="admin-input" value={formData.role} onChange={handleChange} />
          </div>
        </div>

        <div className="admin-form-group">
          <label className="admin-label">URL Avatar</label>
          <input required type="url" name="avatarUrl" className="admin-input" value={formData.avatarUrl} onChange={handleChange} />
        </div>

        <div className="admin-form-group">
          <label className="admin-label">Bio Singkat</label>
          <textarea required name="bio" className="admin-textarea" style={{ minHeight: '80px' }} value={formData.bio} onChange={handleChange} />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
          <div className="admin-form-group">
            <label className="admin-label">Twitter Username (tanpa @)</label>
            <input type="text" name="twitter" className="admin-input" value={formData.twitter} onChange={handleChange} />
          </div>
          
          <div className="admin-form-group">
            <label className="admin-label">Telegram Username (tanpa @)</label>
            <input type="text" name="telegram" className="admin-input" value={formData.telegram} onChange={handleChange} />
          </div>
        </div>

        <div className="admin-form-group" style={{ maxWidth: '200px' }}>
          <label className="admin-label">Urutan Tampil</label>
          <input type="number" name="order" className="admin-input" value={formData.order} onChange={handleChange} />
        </div>

        <div style={{ display: 'flex', gap: '16px', marginTop: '32px' }}>
          <button type="submit" className="btn btn-primary" disabled={isLoading}>
            {isLoading ? <div className="spinner"></div> : 'Simpan Perubahan'}
          </button>
          <button type="button" className="btn btn-secondary" onClick={() => router.back()}>
            Batal
          </button>
        </div>
      </form>
    </div>
  );
}
