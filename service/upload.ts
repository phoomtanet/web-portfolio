const BASE = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3000';

export interface UploadResult {
  url: string;
  key: string;
  originalName: string;
  mimetype: string;
  size: number;
}

/** อัปโหลดไฟล์ไปยัง S3 ผ่าน API (multipart/form-data) */
export async function uploadChatFile(file: File, folder = 'chat'): Promise<UploadResult> {
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

  const formData = new FormData();
  formData.append('file', file);

  const res = await fetch(`${BASE}/api/v1/upload?folder=${folder}`, {
    method: 'POST',
    headers: token ? { Authorization: `Bearer ${token}` } : {},
    body: formData,
  });

  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.message ?? 'อัปโหลดไฟล์ไม่สำเร็จ');

  return (data as { data: UploadResult }).data;
}
