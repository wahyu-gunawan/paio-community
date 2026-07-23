'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      router.push('/admin/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const navItems = [
    { name: 'Dashboard', path: '/admin', icon: '📊' },
    { name: 'Artikel', path: '/admin/articles', icon: '📰' },
    { name: 'Airdrop', path: '/admin/airdrops', icon: '🪂' },
    { name: 'Tim', path: '/admin/team', icon: '👥' },
  ];

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <>
      <button 
        className="btn btn-secondary" 
        style={{ position: 'fixed', top: '16px', left: '16px', zIndex: 101, display: 'none' /* Will be shown via CSS media query if needed */ }}
        onClick={toggleSidebar}
      >
        ☰
      </button>

      <aside className={`admin-sidebar ${isOpen ? 'open' : ''}`}>
        <div className="admin-brand">PAIO Admin</div>
        
        <nav className="admin-nav">
          {navItems.map((item) => (
            <Link 
              key={item.path} 
              href={item.path}
              className={`admin-nav-item ${pathname === item.path ? 'active' : ''}`}
            >
              <span>{item.icon}</span>
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="admin-sidebar-footer">
          <Link href="/" target="_blank" className="admin-nav-item" style={{ padding: '8px 0', fontSize: '0.875rem' }}>
            <span>🌐</span> Lihat Website
          </Link>
          <button 
            onClick={handleLogout}
            className="admin-nav-item" 
            style={{ width: '100%', background: 'none', border: 'none', cursor: 'pointer', padding: '8px 0', fontSize: '0.875rem', marginTop: '8px' }}
          >
            <span>🚪</span> Logout
          </button>
          
          <div style={{ marginTop: '24px', fontSize: '0.75rem', color: 'var(--admin-text-muted)' }}>
            Logged in as Admin
          </div>
        </div>
      </aside>
    </>
  );
}
