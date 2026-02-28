"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function GuestRedirect() {
  const router = useRouter();

  useEffect(() => {
    localStorage.setItem('isGuest', 'true');
    router.replace('/home');
  }, [router]);

  return null;
}
