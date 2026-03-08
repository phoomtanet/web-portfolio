export interface ProjectApi {
  id: number;
  project_name_th: string | null;
  project_name_en: string | null;
  is_active: boolean | null;
  created_at: string;
  created_by: string | null;
  updated_at: string | null;
  updated_by: string | null;
  deleted_at: string | null;
  deleted_by: string | null;
}

export interface ProjectListResponse {
  status: string;
  data: ProjectApi[];
  total: number;
  limit: number;
  offset: number;
}

export interface ProjectDetailResponse {
  status: string;
  data: ProjectApi;
}

export interface ProjectQuery {
  limit?: number;
  offset?: number;
  keyword?: string;
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
