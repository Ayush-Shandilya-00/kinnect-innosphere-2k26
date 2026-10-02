'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useApp } from '@/lib/app-context';

export default function Home() {
  const router = useRouter();
  const { isAuthenticated, user, isLoading } = useApp();

  useEffect(() => {
    if (isLoading) return;
    if (isAuthenticated && user) {
      router.replace(`/${user.role}`);
    } else {
      router.replace('/login');
    }
  }, [isAuthenticated, user, isLoading, router]);

  return (
    <div className="flex h-screen items-center justify-center bg-background">
      <div className="h-10 w-10 animate-spin rounded-full border-2 border-primary border-t-transparent" />
    </div>
  );
}
