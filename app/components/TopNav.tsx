"use client";

import { usePathname } from 'next/navigation';
import { useLang } from '../i18n/LangContext';
import translations from '../i18n/translations';

export default function TopNav() {
  const { lang, setLang } = useLang();
  const pathname = usePathname();
  const t = translations[lang].nav;

  const navItems = [
    { label: t.info, href: '/home' },
    { label: t.portfolio, href: '/portfolio' },
    { label: t.blog, href: '/blog' },
    { label: t.contact, href: '/contact' },
  ];

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
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <a
                key={item.label}
                href={item.href}
                className={`rounded-full px-3 py-1 transition ${
                  isActive
                    ? 'bg-indigo-100 text-indigo-700 font-bold'
                    : 'hover:bg-indigo-50 hover:text-indigo-700'
                }`}
              >
                {item.label}
              </a>
            );
          })}
        </nav>

        <div className="flex overflow-hidden rounded-full border border-indigo-200 text-xs font-semibold">
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
      </div>
    </div>
  );
}
