"use client";

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { profile } from '../assets';
import { useLang } from '../i18n/LangContext';
import translations from '../i18n/translations';

export default function TopNav() {
  const { lang, setLang } = useLang();
  const pathname = usePathname();
  const t = translations[lang].nav;

  const navItems = [
    { label: t.info, href: '/home' },
    { label: t.portfolio, href: '/project' },
    { label: t.blog, href: '/blog' },
    { label: t.contact, href: '/contact' },
  ];

  return (
    <div className="w-full border-b border-slate-200 bg-white text-slate-800 shadow-lg shadow-indigo-100/60">
      <div className="mx-auto flex w-full items-center justify-between gap-4 bg-white px-4 py-3 sm:px-6">
        <div className="flex items-center gap-2.5">
          <div className="p-0.5 rounded-full bg-gradient-to-br from-indigo-500 to-cyan-400 shadow-md shadow-indigo-200/60">
            <div className="h-9 w-9 overflow-hidden rounded-full ring-1 ring-white">
              <Image src={profile} alt="Profile" width={36} height={36} className="h-full w-full object-cover object-top scale-110" />
            </div>
          </div>
          <div className="leading-tight">
            <div className="text-sm font-bold tracking-wide text-slate-800">Phoomtanet</div>
            <div className="text-xs text-indigo-400 font-medium">Full Stack Dev</div>
          </div>
        </div>

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
