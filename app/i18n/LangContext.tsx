"use client";

import { createContext, useContext, useEffect, useState } from 'react';

export type Lang = 'en' | 'th';

interface LangContextValue {
  lang: Lang;
  setLang: (l: Lang) => void;
}

const LangContext = createContext<LangContextValue>({ lang: 'th', setLang: () => {} });

export function LangProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>('th');

  useEffect(() => {
    const stored = localStorage.getItem('lang');
    if (stored === 'en' || stored === 'th') setLangState(stored);
  }, []);

  const setLang = (next: Lang) => {
    setLangState(next);
    localStorage.setItem('lang', next);
  };

  return (
    <LangContext.Provider value={{ lang, setLang }}>
      {children}
    </LangContext.Provider>
  );
}

export const useLang = () => useContext(LangContext);
