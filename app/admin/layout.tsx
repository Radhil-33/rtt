'use client';
import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useSiteStore } from '@/store/useSiteStore';
import AdminSidebar from '@/components/admin/AdminSidebar';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { isAdminLoggedIn } = useSiteStore();
  const router = useRouter();
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);
  useEffect(() => {
    if (mounted && !isAdminLoggedIn && pathname !== '/admin') {
      router.push('/admin');
    }
  }, [mounted, isAdminLoggedIn, pathname, router]);

  if (!mounted) return null;

  if (!isAdminLoggedIn) return <>{children}</>;

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#0F0A05' }}>
      <AdminSidebar />
      <main style={{ flex: 1, marginLeft: 260, overflowX: 'hidden' }}>
        {children}
      </main>
    </div>
  );
}
