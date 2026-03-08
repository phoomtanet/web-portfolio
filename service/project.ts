import { apiFetch } from '@/lib/api';
import {
  ProjectCreatePayload,
  ProjectDetailResponse,
  ProjectListResponse,
  ProjectQuery,
  ProjectUpdatePayload,
} from '@/types/project';

function buildQuery(params: ProjectQuery) {
  const search = new URLSearchParams();
  if (params.limit !== undefined) search.set('limit', String(params.limit));
  if (params.offset !== undefined) search.set('offset', String(params.offset));
  if (params.keyword) search.set('keyword', params.keyword.trim());
  const qs = search.toString();
  return qs ? `?${qs}` : '';
}

export function fetchProjects(params: ProjectQuery = {}) {
  return apiFetch<ProjectListResponse>(`/project${buildQuery(params)}`);
}

export async function fetchProjectById(id: number | string) {
  const res = await apiFetch<ProjectDetailResponse>(`/project/${id}`);
  return res.data;
}

export async function createProject(payload: ProjectCreatePayload) {
  const res = await apiFetch<ProjectDetailResponse>('/project', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
  return res.data;
}

export async function updateProject(id: number | string, payload: ProjectUpdatePayload) {
  const res = await apiFetch<ProjectDetailResponse>(`/project/${id}`, {
    method: 'PUT',
    body: JSON.stringify(payload),
  });
  return res.data;
}

export function deleteProject(id: number | string) {
  return apiFetch<{ status: string; message: string }>(`/project/${id}`, { method: 'DELETE' });
}
