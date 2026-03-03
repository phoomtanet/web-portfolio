"use client";

import { createContext, useContext, useState } from 'react';
import ErrorModal from '@/components/ErrorModal';

interface ErrorContextValue {
  showError: (message: string) => void;
}

const ErrorContext = createContext<ErrorContextValue>({ showError: () => {} });

export function ErrorProvider({ children }: { children: React.ReactNode }) {
  const [message, setMessage] = useState<string | null>(null);

  return (
    <ErrorContext.Provider value={{ showError: setMessage }}>
      {children}
      {message && <ErrorModal message={message} onClose={() => setMessage(null)} />}
    </ErrorContext.Provider>
  );
}

export const useError = () => useContext(ErrorContext);
