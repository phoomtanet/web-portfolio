import { apiFetch } from './api';

interface LoginResponse {
  status: string;
  token: string;
  user: { id: number; username: string };
}

interface RegisterResponse {
  status: string;
  data: { id: number; username: string };
}

export async function apiLogin(identifier: string, password: string) {
  return apiFetch<LoginResponse>('/login', {
    method: 'POST',
    body: JSON.stringify({ identifier, password }),
  });
}

export async function apiRegister(username: string, password: string, email?: string) {
  return apiFetch<RegisterResponse>('/register', {
    method: 'POST',
    body: JSON.stringify({ username, password, email }),
  });
}
