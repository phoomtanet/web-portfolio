const BASE = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3000';

// Global error handler for API failures
function handleApiError(error: Error) {
  console.error('API Error:', error.message);
  
  // Check if it's a connection/auth related error
  if (error.message.includes('เชื่อมต่อ') || 
      error.message.includes('เข้าสู่ระบบ') ||
      error.message.includes('connection') ||
      error.message.includes('network')) {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
  }
}

export async function apiFetch<T>(path: string, options?: RequestInit): Promise<T> {
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

  let res: Response;
  try {
    res = await fetch(`${BASE}/api/v1${path}`, {
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...(options?.headers ?? {}),
      },
      ...options,
    });
  } catch (error) {
    const errorMessage = 'ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์ได้ กรุณาตรวจสอบการเชื่อมต่อ';
    handleApiError(new Error(errorMessage));
    throw new Error(errorMessage);
  }

  // Handle 401 Unauthorized - redirect to login
  if (res.status === 401) {
    const errorMessage = 'กรุณาเข้าสู่ระบบใหม่';
    handleApiError(new Error(errorMessage));
    throw new Error(errorMessage);
  }

  const text = await res.text();
  let data: Record<string, unknown>;
  try {
    data = JSON.parse(text);
  } catch {
    throw new Error('เซิร์ฟเวอร์ไม่ตอบสนอง กรุณาลองใหม่ภายหลัง');
  }

  if (!res.ok) {
    const errorMessage = (data.message as string) ?? 'เกิดข้อผิดพลาด';
    // For other API errors, don't redirect but still handle
    if (res.status >= 500) {
      handleApiError(new Error(errorMessage));
    }
    throw new Error(errorMessage);
  }
  
  return data as T;
}
