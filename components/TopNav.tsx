"use client";

import { LogOut, Menu, X } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useLang } from '@/i18n/LangContext';
import translations from '@/i18n/translations';

export default function TopNav() {
  const { lang, setLang } = useLang();
  const pathname = usePathname();
  const t = translations[lang].nav;
  const { username, openLogin, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = [
    { label: t.info, href: '/home' },
    { label: t.portfolio, href: '/project' },
    { label: t.blog, href: '/blog' },
    { label: t.contact, href: '/contact' },
  ];

  return (
    <div className="w-full border-b border-slate-200 bg-white text-slate-800 shadow-lg shadow-indigo-100/60 print:hidden">
      <div className="mx-auto flex w-full items-center justify-between gap-4 bg-white px-4 py-3 sm:px-6">

        {/* Login / User */}
        {username ? (
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-indigo-600">{username}</span>
            <button
              onClick={logout}
              className="flex items-center gap-1 rounded-full border border-slate-200 px-3 py-1.5 text-xs text-slate-500 transition hover:bg-slate-50"
            >
              <LogOut className="h-3.5 w-3.5" />
              {lang === 'th' ? 'ออกจากระบบ' : 'Logout'}
            </button>
          </div>
        ) : (
          <button
            onClick={openLogin}
            className="rounded-full bg-gradient-to-r from-indigo-500 to-cyan-400 px-5 py-1.5 text-sm font-semibold text-white shadow-md shadow-indigo-200/60 transition hover:opacity-90"
          >
            {lang === 'th' ? 'เข้าสู่ระบบ' : 'Login'}
          </button>
        )}

        {/* Nav — desktop only */}
        <nav className="hidden items-center gap-5 text-sm font-semibold text-slate-700 sm:flex">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.label}
                href={item.href}
                className={`rounded-full px-3 py-1 transition ${
                  isActive
                    ? 'bg-indigo-100 text-indigo-700 font-bold'
                    : 'hover:bg-indigo-50 hover:text-indigo-700'
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-2">
          {/* Lang toggle — desktop only */}
          <div className="hidden overflow-hidden rounded-full border border-indigo-200 text-xs font-semibold sm:flex">
            <button
              onClick={() => setLang('th')}
              className={`px-4 py-1.5 transition ${lang === 'th' ? 'bg-indigo-600 text-white' : 'text-indigo-600 hover:bg-indigo-50'}`}
            >
              TH
            </button>
            <button
              onClick={() => setLang('en')}
              className={`px-4 py-1.5 transition ${lang === 'en' ? 'bg-indigo-600 text-white' : 'text-indigo-600 hover:bg-indigo-50'}`}
            >
              EN
            </button>
          </div>

          {/* Hamburger — mobile only */}
          <button
            onClick={() => setMenuOpen((prev) => !prev)}
            className="rounded-lg p-1.5 text-slate-500 transition hover:bg-slate-100 sm:hidden"
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="border-t border-slate-100 bg-white px-4 pb-4 pt-3 sm:hidden">
          <nav className="flex flex-col gap-1 text-sm font-semibold text-slate-700">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className={`rounded-xl px-4 py-2.5 transition ${
                    isActive
                      ? 'bg-indigo-100 text-indigo-700 font-bold'
                      : 'hover:bg-indigo-50 hover:text-indigo-700'
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Lang toggle in mobile menu */}
          <div className="mt-3 flex overflow-hidden rounded-full border border-indigo-200 text-xs font-semibold">
            <button
              onClick={() => setLang('th')}
              className={`flex-1 py-2 transition ${lang === 'th' ? 'bg-indigo-600 text-white' : 'text-indigo-600 hover:bg-indigo-50'}`}
            >
              TH
            </button>
            <button
              onClick={() => setLang('en')}
              className={`flex-1 py-2 transition ${lang === 'en' ? 'bg-indigo-600 text-white' : 'text-indigo-600 hover:bg-indigo-50'}`}
            >
              EN
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
