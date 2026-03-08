export interface LoginResponse {
  status: string;
  token: string;
  user: { id: number; username: string };
}

export interface RegisterResponse {
  status: string;
  data: { id: number; username: string };
}
