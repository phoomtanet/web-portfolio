import { apiFetch } from '@/lib/api';
import { LoginResponse, RegisterResponse } from '@/types/auth';

export async function apiLogin(identifier: string, password: string) {
  return apiFetch<LoginResponse>('/login', {
    method: 'POST',
    body: JSON.stringify({ identifier, password }),
  });
}

export async function apiRegister(username: string, password: string, email: string) {
  return apiFetch<RegisterResponse>('/register', {
    method: 'POST',
    body: JSON.stringify({ username, password, email }),
  });
}

export async function apiLogout() {
  return apiFetch<{ status: string; message: string }>('/logout', { method: 'POST' });
}
