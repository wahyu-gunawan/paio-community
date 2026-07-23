'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function AdminTeam() {
  const [team, setTeam] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchTeam = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/team');
      if (res.ok) {
        const data = await res.json();
        setTeam(Array.isArray(data) ? data : []);
      }
    } catch (error) {
      console.error('Failed to fetch team:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTeam();
  }, []);

  const handleDelete = async (id: string) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus anggota tim ini?')) {
      try {
        const res = await fetch(`/api/team/${id}`, { method: 'DELETE' });
        if (res.ok) {
          fetchTeam();
        } else {
          alert('Gagal menghapus anggota');
        }
      } catch (error) {
        console.error('Delete failed:', error);
      }
    }
  };

  return (
    <div>
      <div className="admin-header">
        <h1 className="admin-title">Kelola Tim</h1>
        <Link href="/admin/team/new" className="btn btn-primary">
          + Tambah Anggota
        </Link>
      </div>

      <div className="admin-table-container">
        {isLoading ? (
          <div className="loading-container"><div className="spinner spinner-lg"></div></div>
        ) : team.length === 0 ? (
          <div style={{ padding: '40px', textAlign: 'center', color: 'var(--admin-text-muted)' }}>
            Belum ada anggota tim.
          </div>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Avatar</th>
                <th>Nama</th>
                <th>Peran</th>
                <th>Sosial</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {team.map((member) => (
                <tr key={member.id || member._id}>
                  <td>
                    <img 
                      src={member.avatarUrl} 
                      alt={member.name} 
                      style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover' }}
                      onError={(e) => { (e.target as HTMLImageElement).src = 'https://via.placeholder.com/40' }}
                    />
                  </td>
                  <td style={{ fontWeight: 500 }}>{member.name}</td>
                  <td><span className="badge badge-neutral">{member.role}</span></td>
                  <td>
                    <div style={{ display: 'flex', gap: '8px', fontSize: '0.875rem' }}>
                      {member.twitter && <a href={`https://twitter.com/${member.twitter}`} target="_blank" style={{ color: 'var(--admin-primary)' }}>TW</a>}
                      {member.telegram && <a href={`https://t.me/${member.telegram}`} target="_blank" style={{ color: 'var(--admin-primary)' }}>TG</a>}
                    </div>
                  </td>
                  <td>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <Link href={`/admin/team/${member.id || member._id}`} className="btn btn-sm btn-secondary">
                        Edit
                      </Link>
                      <button onClick={() => handleDelete(member.id || member._id)} className="btn btn-sm btn-danger">
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
