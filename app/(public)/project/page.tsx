"use client";

import { FileDown, MessageSquare } from 'lucide-react';
import { useState } from 'react';
import { BorderBox, ProjectChatTab, ProjectPdfTab, TopNav } from '@/components';
import { useLang } from '@/i18n/LangContext';

const tx = {
  en: { tabPdf: 'Projects → PDF', tabChat: 'Chat' },
  th: { tabPdf: 'โปรเจค → PDF', tabChat: 'แชต' },
};

export default function ProjectPage() {
  const { lang } = useLang();
  const t = tx[lang];
  const [tab, setTab] = useState<'pdf' | 'chat'>('chat');

  return (
    <>
      <TopNav />
      <main className="mx-auto flex min-h-screen max-w-5xl flex-col px-4 py-8 text-slate-900 sm:py-12 print:py-4">
        <BorderBox>
          <div className="flex flex-col gap-5">
            <div className="flex gap-1 rounded-xl bg-slate-100 p-1 print:hidden">
              <button
                onClick={() => setTab('chat')}
                className={`flex flex-1 items-center justify-center gap-2 rounded-lg py-2 text-sm font-semibold transition ${
                  tab === 'chat' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                <MessageSquare className="h-4 w-4" />
                {t.tabChat}
              </button>
              <button
                onClick={() => setTab('pdf')}
                className={`flex flex-1 items-center justify-center gap-2 rounded-lg py-2 text-sm font-semibold transition ${
                  tab === 'pdf' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                <FileDown className="h-4 w-4" />
                {t.tabPdf}
              </button>
            </div>
            <div className="h-px w-full rounded-full bg-indigo-100" />
            {tab === 'pdf' && <ProjectPdfTab />}
            {tab === 'chat' && <ProjectChatTab />}
          </div>
        </BorderBox>
      </main>
    </>
  );
}
