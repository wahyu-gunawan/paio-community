'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function AdminAirdrops() {
  const [airdrops, setAirdrops] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchAirdrops = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/airdrops');
      if (res.ok) {
        const data = await res.json();
        setAirdrops(Array.isArray(data) ? data : []);
      }
    } catch (error) {
      console.error('Failed to fetch airdrops:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAirdrops();
  }, []);

  const handleDelete = async (id: string) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus airdrop ini?')) {
      try {
        const res = await fetch(`/api/airdrops/${id}`, { method: 'DELETE' });
        if (res.ok) {
          fetchAirdrops();
        } else {
          alert('Gagal menghapus airdrop');
        }
      } catch (error) {
        console.error('Delete failed:', error);
      }
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active': return <span className="badge badge-success">Aktif</span>;
      case 'upcoming': return <span className="badge badge-warning">Akan Datang</span>;
      case 'ended': return <span className="badge badge-danger">Berakhir</span>;
      default: return <span className="badge badge-neutral">{status}</span>;
    }
  };

  return (
    <div>
      <div className="admin-header">
        <h1 className="admin-title">Kelola Airdrop</h1>
        <Link href="/admin/airdrops/new" className="btn btn-primary">
          + Tambah Airdrop
        </Link>
      </div>

      <div className="admin-table-container">
        {isLoading ? (
          <div className="loading-container"><div className="spinner spinner-lg"></div></div>
        ) : airdrops.length === 0 ? (
          <div style={{ padding: '40px', textAlign: 'center', color: 'var(--admin-text-muted)' }}>
            Belum ada airdrop.
          </div>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Nama Project</th>
                <th>Reward</th>
                <th>Status</th>
                <th>Deadline</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {airdrops.map((item) => (
                <tr key={item.id || item._id}>
                  <td>
                    <div style={{ fontWeight: 500 }}>{item.projectName}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--admin-text-muted)' }}>{item.title}</div>
                  </td>
                  <td>{item.reward}</td>
                  <td>{getStatusBadge(item.status)}</td>
                  <td>{item.endDate ? new Date(item.endDate).toLocaleDateString('id-ID') : '-'}</td>
                  <td>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <Link href={`/admin/airdrops/${item.id || item._id}`} className="btn btn-sm btn-secondary">
                        Edit
                      </Link>
                      <button onClick={() => handleDelete(item.id || item._id)} className="btn btn-sm btn-danger">
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
