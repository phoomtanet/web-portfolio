import { apiFetch } from '@/lib/api';
import { ProjectApi, ProjectListResponse } from '@/types/project';

export interface ProjectQuery {
  limit?: number;
  offset?: number;
  keyword?: string;
}

interface ProjectDetailResponse {
  status: string;
  data: ProjectApi;
}

interface MessageResponse {
  status: string;
  message: string;
}

export interface ProjectCreatePayload {
  project_name_th: string;
  project_name_en?: string;
  is_active?: boolean;
}

export interface ProjectUpdatePayload {
  project_name_th?: string;
  project_name_en?: string;
  is_active?: boolean;
}

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
  return apiFetch<MessageResponse>(`/project/${id}`, { method: 'DELETE' });
}
