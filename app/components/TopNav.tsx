"use client";

import { useEffect, useState } from 'react';
const navItems = [
  { label: 'หน้าแรก', href: '/' },
  { label: 'ผลงาน', href: '/portfolio' },
  { label: 'บทความ', href: '/blog' },
  { label: 'ติดต่อ', href: '/contact' },
];

export default function TopNav() {
  const [isGuest, setIsGuest] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const flag = localStorage.getItem('isGuest');
    setIsGuest(flag === 'true');
  }, []);

  const handleLoginClick = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('isGuest');
    }
  };

  return (
    <div className="w-full border-b border-slate-200 bg-white text-slate-800 shadow-lg shadow-indigo-100/60">
      <div className="mx-auto flex w-full items-center justify-between gap-4 bg-white px-4 py-3 sm:px-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-md bg-gradient-to-br from-indigo-500 to-cyan-400 text-lg font-extrabold text-white shadow-lg shadow-indigo-300/50">
            PT
          </div>
          <div className="leading-tight">
            <div className="text-sm font-semibold uppercase tracking-[0.08em]">Portfolio</div>
            <div className="text-xs text-slate-500">Digital Studio</div>
          </div>
        </div>

        <nav className="hidden items-center gap-5 text-sm font-semibold text-slate-700 sm:flex">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="rounded-md px-2 py-1 transition hover:bg-indigo-50 hover:text-indigo-700"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {isGuest && (
          <a
            href="/login"
            onClick={handleLoginClick}
            className="flex items-center gap-2 rounded-full border border-indigo-200 bg-gradient-to-r from-indigo-500 to-cyan-400 px-4 py-2 text-sm font-semibold text-white shadow-md shadow-indigo-200/60 transition hover:shadow-indigo-300/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400"
          >
            Login
          </a>
        )}
      </div>
    </div>
  );
}
