'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    articles: 0,
    airdrops: 0,
    team: 0
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [articlesRes, airdropsRes, teamRes] = await Promise.all([
          fetch('/api/articles'),
          fetch('/api/airdrops'),
          fetch('/api/team')
        ]);
        
        const articles = await articlesRes.ok ? await articlesRes.json() : [];
        const airdrops = await airdropsRes.ok ? await airdropsRes.json() : [];
        const team = await teamRes.ok ? await teamRes.json() : [];

        setStats({
          articles: Array.isArray(articles) ? articles.length : 0,
          airdrops: Array.isArray(airdrops) ? airdrops.length : 0,
          team: Array.isArray(team) ? team.length : 0
        });
      } catch (error) {
        console.error('Failed to fetch stats:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStats();
  }, []);

  return (
    <div>
      <div className="admin-header">
        <h1 className="admin-title">Selamat Datang, Admin!</h1>
      </div>

      <div className="admin-stat-cards">
        <div className="admin-card">
          <h3 className="admin-card-title">Total Artikel</h3>
          {isLoading ? <div className="spinner"></div> : <p className="admin-card-value">{stats.articles}</p>}
        </div>
        <div className="admin-card">
          <h3 className="admin-card-title">Total Airdrop</h3>
          {isLoading ? <div className="spinner"></div> : <p className="admin-card-value">{stats.airdrops}</p>}
        </div>
        <div className="admin-card">
          <h3 className="admin-card-title">Total Anggota Tim</h3>
          {isLoading ? <div className="spinner"></div> : <p className="admin-card-value">{stats.team}</p>}
        </div>
      </div>

      <h2 style={{ marginTop: '48px', marginBottom: '24px', fontFamily: 'Space Grotesk' }}>Aksi Cepat</h2>
      <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
        <Link href="/admin/articles/new" className="btn btn-primary">
          <span>✍️</span> Tulis Artikel
        </Link>
        <Link href="/admin/airdrops/new" className="btn btn-primary">
          <span>🎁</span> Tambah Airdrop
        </Link>
        <Link href="/admin/team/new" className="btn btn-primary">
          <span>👤</span> Tambah Anggota
        </Link>
      </div>
    </div>
  );
}
