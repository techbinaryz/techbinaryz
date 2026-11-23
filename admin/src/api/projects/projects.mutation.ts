import { useMutation, useQueryClient } from '@tanstack/react-query';
import { projectKeys, type Project, type ProjectStatus, type ProjectCategory } from './projects.query';

// API Response Type
interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

// ============================================================================
// Request Types
// ============================================================================

export interface CreateProjectRequest {
  title: string;
  description: string;
  short_description?: string;
  category?: ProjectCategory;
  status?: ProjectStatus;
  technologies?: string[];
  image?: string;
  gallery?: string[];
  github_url?: string;
  live_url?: string;
  start_date?: string;
  end_date?: string;
  client_name?: string;
  team_size?: number;
  is_featured?: boolean;
  is_published?: boolean;
  display_order?: number;
}

export interface UpdateProjectRequest extends Partial<CreateProjectRequest> {
  _id?: string;
}

// ============================================================================
// API Helper Functions
// ============================================================================

const projectFetch = async <T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> => {
  const response = await fetch(endpoint, {
    ...options,
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || data.message || 'Request failed');
  }

  return data;
};

// ============================================================================
// Project Mutations
// ============================================================================

/**
 * Create Project mutation
 * Creates a new project (requires authentication)
 */
export function useCreateProject() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateProjectRequest) =>
      projectFetch<ApiResponse<Project>>('/api/projects', {
        method: 'POST',
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      // Invalidate projects list
      queryClient.invalidateQueries({ queryKey: projectKeys.lists() });
    },
  });
}

/**
 * Update Project mutation
 * Updates an existing project (requires authentication)
 */
export function useUpdateProject() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateProjectRequest }) =>
      projectFetch<ApiResponse<Project>>(`/api/projects/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
      }),
    onSuccess: (_, variables) => {
      // Invalidate projects list and specific project
      queryClient.invalidateQueries({ queryKey: projectKeys.lists() });
      queryClient.invalidateQueries({ queryKey: projectKeys.detail(variables.id) });
    },
  });
}

/**
 * Delete Project mutation
 * Deletes a project (requires authentication)
 */
export function useDeleteProject() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) =>
      projectFetch<ApiResponse<null>>(`/api/projects/${id}`, {
        method: 'DELETE',
      }),
    onSuccess: () => {
      // Invalidate projects list
      queryClient.invalidateQueries({ queryKey: projectKeys.lists() });
    },
  });
}
