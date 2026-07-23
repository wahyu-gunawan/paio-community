'use client';

import './globals.css'
import { usePathname } from 'next/navigation'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith('/admin');

  return (
    <html lang="id">
      <head>
        <title>PAIO Community | Komunitas Kripto Indonesia</title>
        <meta name="description" content="Komunitas kripto terbesar di Indonesia. Bergabung bersama ribuan member untuk belajar, berbagi, dan meraih peluang di dunia crypto." />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body>
        {!isAdmin && <Navbar />}
        <main className={isAdmin ? '' : 'main-content'}>
          {children}
        </main>
        {!isAdmin && <Footer />}
      </body>
    </html>
  )
}
