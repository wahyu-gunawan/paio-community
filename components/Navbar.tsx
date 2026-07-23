'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Beranda', path: '/' },
    { name: 'Berita', path: '/news' },
    { name: 'Airdrop', path: '/airdrop' },
    { name: 'Tim', path: '/team' },
  ];

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="container nav-container">
        <Link href="/" className="nav-logo">
          PAIO<span>Community</span>
        </Link>

        <div className="nav-links">
          {navLinks.map((link) => (
            <Link 
              key={link.path} 
              href={link.path}
              className={`nav-link ${pathname === link.path ? 'active' : ''}`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        <div className="nav-cta">
          <Link href="#" className="btn-primary">
            Join Telegram
          </Link>
        </div>

        <button 
          className="hamburger"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          ☰
        </button>
      </div>
      
      {/* Mobile Menu */}
      {mobileOpen && (
        <div style={{ background: 'var(--bg-darker)', padding: '20px', position: 'absolute', top: '80px', left: 0, right: 0, borderBottom: '1px solid var(--glass-border)' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {navLinks.map((link) => (
              <Link 
                key={link.path} 
                href={link.path}
                style={{ color: pathname === link.path ? '#fff' : 'var(--text-secondary)', textDecoration: 'none', fontWeight: 500 }}
                onClick={() => setMobileOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <Link href="#" className="btn-primary" style={{ textAlign: 'center', marginTop: '10px' }}>
              Join Telegram
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
