"use client";

import { createContext, useContext, useEffect, useState } from 'react';
import { AuthModal } from '@/components';
import { apiLogout } from '@/service/auth';

interface AuthContextValue {
  username: string | null;
  token: string | null;
  isAdmin: boolean;
  openLogin: () => void;
  logout: () => void;
  setSession: (username: string, token: string) => void;
}

const AuthContext = createContext<AuthContextValue>({
  username: null,
  token: null,
  isAdmin: false,
  openLogin: () => {},
  logout: () => {},
  setSession: () => {},
});

interface DecodedSession {
  username: string;
  isAdmin: boolean;
}

function decodeSession(token: string): DecodedSession | null {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    if (payload.exp * 1000 > Date.now()) {
      return { username: payload.username as string, isAdmin: payload.isAdmin === true };
    }
    return null;
  } catch {
    return null;
  }
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [username, setUsername] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('token');
    if (stored) {
      const session = decodeSession(stored);
      if (session) {
        setUsername(session.username);
        setToken(stored);
        setIsAdmin(session.isAdmin);
      } else {
        localStorage.removeItem('token');
      }
    }
  }, []);

  function setSession(name: string, newToken: string) {
    const session = decodeSession(newToken);
    setUsername(name);
    setToken(newToken);
    setIsAdmin(session?.isAdmin ?? false);
    localStorage.setItem('token', newToken);
  }

  function handleSuccess(name: string, newToken: string) {
    setSession(name, newToken);
    setShowModal(false);
  }

  function logout() {
    apiLogout().catch(() => {});
    setUsername(null);
    setToken(null);
    setIsAdmin(false);
    localStorage.removeItem('token');
  }

  return (
    <AuthContext.Provider value={{ username, token, isAdmin, openLogin: () => setShowModal(true), logout, setSession }}>
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
