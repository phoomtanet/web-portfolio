"use client";

import { ChevronDown, LogOut, Menu, User, X } from 'lucide-react';
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
  const [showDropdown, setShowDropdown] = useState(false);

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
          <div className="relative">
            {/* Pill trigger */}
            <button
              onClick={() => setShowDropdown((prev) => !prev)}
              className="flex items-center gap-2 rounded-full border border-indigo-100 bg-indigo-50/70 px-2 py-1 shadow-sm ring-1 ring-indigo-100/60 transition hover:bg-indigo-100/70"
            >
              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-cyan-400 text-[11px] font-bold text-white shadow shadow-indigo-200/60">
                {username.charAt(0).toUpperCase()}
              </div>
              <span className="max-w-[96px] truncate text-sm font-semibold text-indigo-700">
                {username}
              </span>
              <ChevronDown className={`h-3.5 w-3.5 text-indigo-400 transition-transform ${showDropdown ? 'rotate-180' : ''}`} />
            </button>

            {/* Dropdown */}
            {showDropdown && (
              <>
                {/* Backdrop */}
                <div className="fixed inset-0 z-10" onClick={() => setShowDropdown(false)} />

                {/* Card */}
                <div className="absolute left-0 top-full z-20 mt-2 w-60 overflow-hidden rounded-2xl border border-indigo-100 bg-white shadow-xl shadow-indigo-200/50 ring-1 ring-indigo-100/60">

                  {/* Header */}
                  <div className="flex items-center gap-3 bg-gradient-to-br from-indigo-50 to-cyan-50 px-4 py-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-cyan-400 text-lg font-bold text-white shadow-md shadow-indigo-200/60">
                      {username.charAt(0).toUpperCase()}
                    </div>
                    <div className="min-w-0">
                      <p className="truncate text-sm font-bold text-slate-800">{username}</p>
                      <span className="mt-0.5 inline-flex items-center rounded-full bg-indigo-100 px-2 py-0.5 text-[10px] font-semibold text-indigo-600">
                        สมาชิก
                      </span>
                    </div>
                  </div>

                  {/* Info rows */}
                  <div className="border-t border-slate-100 px-4 py-3 space-y-2">
                    <div className="flex items-center gap-2.5 text-sm text-slate-600">
                      <User className="h-4 w-4 shrink-0 text-indigo-400" />
                      <span className="truncate">{username}</span>
                    </div>
                  </div>

                  {/* Logout */}
                  <div className="border-t border-slate-100 p-2">
                    <button
                      onClick={() => { logout(); setShowDropdown(false); }}
                      className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-medium text-red-500 transition hover:bg-red-50"
                    >
                      <LogOut className="h-4 w-4" />
                      {lang === 'th' ? 'ออกจากระบบ' : 'Logout'}
                    </button>
                  </div>
                </div>
              </>
            )}
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
