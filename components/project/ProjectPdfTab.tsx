"use client";

import { Code2, ExternalLink, FileDown, Search } from 'lucide-react';
import { useMemo, useState } from 'react';
import { useLang } from '@/i18n/LangContext';
import { allStacks, projects, statusBadge } from './projectData';

const tx = {
  en: {
    search: 'Search project...',
    filterStatus: 'Status',
    filterStack: 'Stack',
    all: 'All',
    inProgress: 'In Progress',
    completed: 'Completed',
    printPDF: 'Export PDF',
    noResult: 'No projects found',
    viewGithub: 'GitHub',
    viewDemo: 'Demo',
  },
  th: {
    search: 'ค้นหาโปรเจค...',
    filterStatus: 'สถานะ',
    filterStack: 'Stack',
    all: 'ทั้งหมด',
    inProgress: 'กำลังพัฒนา',
    completed: 'เสร็จสิ้น',
    printPDF: 'ส่งออก PDF',
    noResult: 'ไม่พบโปรเจค',
    viewGithub: 'GitHub',
    viewDemo: 'Demo',
  },
};

const selectCls =
  'rounded-xl border border-indigo-100 bg-white px-3 py-2 text-sm text-slate-700 outline-none transition focus:border-indigo-300 focus:ring-2 focus:ring-indigo-100';

export default function ProjectPdfTab() {
  const { lang } = useLang();
  const t = tx[lang];

  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'in-progress' | 'completed'>('all');
  const [stackFilter, setStackFilter] = useState('');

  const filtered = useMemo(
    () =>
      projects.filter((p) => {
        const matchName = p.name[lang].toLowerCase().includes(search.toLowerCase());
        const matchStatus = statusFilter === 'all' || p.status === statusFilter;
        const matchStack = !stackFilter || p.stack.includes(stackFilter);
        return matchName && matchStatus && matchStack;
      }),
    [search, statusFilter, stackFilter, lang],
  );

  return (
    <div className="flex flex-col gap-5">

      {/* Filter form */}
      <div className="flex flex-col gap-3 print:hidden sm:flex-row sm:items-center sm:gap-3">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={t.search}
            className="w-full rounded-xl border border-indigo-100 bg-white py-2 pl-9 pr-4 text-sm text-slate-700 outline-none transition focus:border-indigo-300 focus:ring-2 focus:ring-indigo-100 placeholder:text-slate-400"
          />
        </div>
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value as typeof statusFilter)} className={selectCls}>
          <option value="all">{t.filterStatus}: {t.all}</option>
          <option value="in-progress">{t.inProgress}</option>
          <option value="completed">{t.completed}</option>
        </select>
        <select value={stackFilter} onChange={(e) => setStackFilter(e.target.value)} className={selectCls}>
          <option value="">{t.filterStack}: {t.all}</option>
          {allStacks.map((s) => (<option key={s} value={s}>{s}</option>))}
        </select>
        <button onClick={() => window.print()} className="flex items-center gap-2 whitespace-nowrap rounded-xl bg-indigo-500 px-4 py-2 text-sm font-semibold text-white shadow-sm shadow-indigo-200 transition hover:bg-indigo-600">
          <FileDown className="h-4 w-4" />
          {t.printPDF}
        </button>
      </div>

      {/* Project cards */}
      {filtered.length === 0 ? (
        <div className="flex items-center justify-center py-12 text-sm text-slate-400">{t.noResult}</div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {filtered.map((p) => {
            const badge = statusBadge[p.status];
            return (
              <div key={p.id} className="flex flex-col gap-3 rounded-2xl border border-indigo-100 bg-slate-50/60 p-5 transition hover:border-indigo-200 hover:shadow-sm">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="font-bold text-indigo-600">{p.name[lang]}</h3>
                    <span className={`mt-1 inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold ${badge.cls}`}>{badge[lang]}</span>
                  </div>
                  <div className="flex shrink-0 gap-1.5 print:hidden">
                    {p.github && (
                      <a href={p.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 rounded-full border border-slate-200 px-2.5 py-1 text-xs font-semibold text-slate-600 transition hover:border-indigo-300 hover:text-indigo-600">
                        <Code2 className="h-3 w-3" />{t.viewGithub}
                      </a>
                    )}
                    {p.demo && (
                      <a href={p.demo} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 rounded-full bg-indigo-500 px-2.5 py-1 text-xs font-semibold text-white transition hover:bg-indigo-600">
                        <ExternalLink className="h-3 w-3" />{t.viewDemo}
                      </a>
                    )}
                  </div>
                </div>
                <p className="text-sm leading-relaxed text-slate-600">{p.desc[lang]}</p>
                <div className="flex flex-wrap gap-1.5">
                  {p.stack.map((s) => (
                    <span key={s} className="rounded-full bg-indigo-50 px-2.5 py-0.5 text-xs font-semibold text-indigo-600 ring-1 ring-indigo-100">{s}</span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
