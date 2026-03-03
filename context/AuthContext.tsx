"use client";

import { createContext, useContext, useEffect, useState } from 'react';
import { AuthModal } from '@/components';
import { apiLogout } from '@/lib/auth';

interface AuthContextValue {
  username: string | null;
  token: string | null;
  openLogin: () => void;
  logout: () => void;
  setSession: (username: string, token: string) => void;
}

const AuthContext = createContext<AuthContextValue>({
  username: null,
  token: null,
  openLogin: () => {},
  logout: () => {},
  setSession: () => {},
});

function decodeUsername(token: string): string | null {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    if (payload.exp * 1000 > Date.now()) return payload.username as string;
    return null;
  } catch {
    return null;
  }
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [username, setUsername] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('token');
    if (stored) {
      const name = decodeUsername(stored);
      if (name) {
        setUsername(name);
        setToken(stored);
      } else {
        localStorage.removeItem('token');
      }
    }
  }, []);

  function setSession(name: string, newToken: string) {
    setUsername(name);
    setToken(newToken);
    localStorage.setItem('token', newToken);
  }

  function handleSuccess(name: string, newToken: string) {
    setSession(name, newToken);
    setShowModal(false);
  }

  function logout() {
    apiLogout().catch(() => {}); // fire-and-forget — invalidate session on server
    setUsername(null);
    setToken(null);
    localStorage.removeItem('token');
  }

  return (
    <AuthContext.Provider value={{ username, token, openLogin: () => setShowModal(true), logout, setSession }}>
      {children}
      {showModal && (
        <AuthModal
          onClose={() => setShowModal(false)}
          onSuccess={handleSuccess}
        />
      )}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
