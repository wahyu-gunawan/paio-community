'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import AdminSidebar from '@/components/AdminSidebar';
import './admin.css';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const isLoginPage = pathname === '/admin/login';

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch('/api/auth/check');
        if (res.ok) {
          setIsAuthenticated(true);
          if (isLoginPage) {
            router.push('/admin');
          }
        } else {
          setIsAuthenticated(false);
          if (!isLoginPage) {
            router.push('/admin/login');
          }
        }
      } catch (error) {
        console.error('Auth check failed:', error);
        setIsAuthenticated(false);
        if (!isLoginPage) {
          router.push('/admin/login');
        }
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [pathname, router, isLoginPage]);

  if (isLoading) {
    return (
      <div className="admin-container admin-main-full">
        <div className="spinner spinner-lg"></div>
      </div>
    );
  }

  if (isLoginPage) {
    return <div className="admin-container">{children}</div>;
  }

  if (!isAuthenticated) {
    return null; // Will redirect in useEffect
  }

  return (
    <div className="admin-container">
      <AdminSidebar />
      <main className="admin-main">
        {children}
      </main>
    </div>
  );
}
