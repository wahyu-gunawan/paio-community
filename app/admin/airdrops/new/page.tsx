'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function NewAirdrop() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    projectName: '',
    description: '',
    logoUrl: '',
    reward: '',
    status: 'upcoming',
    startDate: '',
    endDate: '',
    link: '',
    steps: '' // User inputs as multiline text, we'll convert to array
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const payload = {
      ...formData,
      steps: formData.steps.split('\n').filter(s => s.trim() !== '')
    };

    try {
      const res = await fetch('/api/airdrops', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        router.push('/admin/airdrops');
        router.refresh();
      } else {
        alert('Gagal menyimpan airdrop');
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
      <h1 className="admin-title" style={{ marginBottom: '24px' }}>Tambah Airdrop Baru</h1>
      
      <form onSubmit={handleSubmit}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
          <div className="admin-form-group">
            <label className="admin-label">Judul</label>
            <input required type="text" name="title" className="admin-input" value={formData.title} onChange={handleChange} placeholder="e.g. ZKSync Airdrop Campaign" />
          </div>
          
          <div className="admin-form-group">
            <label className="admin-label">Nama Project</label>
            <input required type="text" name="projectName" className="admin-input" value={formData.projectName} onChange={handleChange} placeholder="e.g. ZKSync" />
          </div>
        </div>

        <div className="admin-form-group">
          <label className="admin-label">Deskripsi</label>
          <textarea required name="description" className="admin-textarea" value={formData.description} onChange={handleChange} />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
          <div className="admin-form-group">
            <label className="admin-label">URL Logo</label>
            <input required type="url" name="logoUrl" className="admin-input" value={formData.logoUrl} onChange={handleChange} />
          </div>
          
          <div className="admin-form-group">
            <label className="admin-label">Reward (Est)</label>
            <input required type="text" name="reward" className="admin-input" value={formData.reward} onChange={handleChange} placeholder="e.g. 100 USDT" />
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px' }}>
          <div className="admin-form-group">
            <label className="admin-label">Status</label>
            <select name="status" className="admin-select" value={formData.status} onChange={handleChange}>
              <option value="upcoming">Akan Datang (Upcoming)</option>
              <option value="active">Aktif (Active)</option>
              <option value="ended">Berakhir (Ended)</option>
            </select>
          </div>

          <div className="admin-form-group">
            <label className="admin-label">Tanggal Mulai</label>
            <input type="date" name="startDate" className="admin-input" value={formData.startDate} onChange={handleChange} />
          </div>

          <div className="admin-form-group">
            <label className="admin-label">Tanggal Berakhir (Deadline)</label>
            <input type="date" name="endDate" className="admin-input" value={formData.endDate} onChange={handleChange} />
          </div>
        </div>

        <div className="admin-form-group">
          <label className="admin-label">Link Airdrop / Garapan</label>
          <input required type="url" name="link" className="admin-input" value={formData.link} onChange={handleChange} />
        </div>

        <div className="admin-form-group">
          <label className="admin-label">Langkah-langkah (Satu langkah per baris)</label>
          <textarea required name="steps" className="admin-textarea" style={{ minHeight: '150px' }} value={formData.steps} onChange={handleChange} placeholder="1. Kunjungi website&#10;2. Connect wallet&#10;3. Lakukan transaksi" />
        </div>

        <div style={{ display: 'flex', gap: '16px', marginTop: '32px' }}>
          <button type="submit" className="btn btn-primary" disabled={isLoading}>
            {isLoading ? <div className="spinner"></div> : 'Simpan Airdrop'}
          </button>
          <button type="button" className="btn btn-secondary" onClick={() => router.back()}>
            Batal
          </button>
        </div>
      </form>
    </div>
  );
}
