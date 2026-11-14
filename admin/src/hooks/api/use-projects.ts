import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import api from '@/lib/api-client';
import type { ApiResponse, ProjectSection, CreateProjectSection } from '@/types/portfolio';

// Query Keys
export const projectKeys = {
  all: ['projects'] as const,
  lists: () => [...projectKeys.all, 'list'] as const,
  list: (filters?: { category?: string; featured?: boolean }) => [...projectKeys.lists(), filters] as const,
  details: () => [...projectKeys.all, 'detail'] as const,
  detail: (id: string) => [...projectKeys.details(), id] as const,
};

// Get active projects (public)
export function useProjects(params?: { category?: string; featured?: boolean }) {
  const queryParams = new URLSearchParams();
  if (params?.category) queryParams.append('category', params.category);
  if (params?.featured) queryParams.append('featured', 'true');
  
  const queryString = queryParams.toString();
  const endpoint = `/api/portfolio/projects${queryString ? `?${queryString}` : ''}`;

  return useQuery({
    queryKey: projectKeys.list(params),
    queryFn: () => api.get<ApiResponse<ProjectSection[]>>(endpoint),
  });
}

// Get single project (public)
export function useProject(id: string) {
  return useQuery({
    queryKey: projectKeys.detail(id),
    queryFn: () => api.get<ApiResponse<ProjectSection>>(`/api/portfolio/projects/${id}`),
    enabled: !!id,
  });
}

// Get all projects (admin)
export function useAllProjects() {
  return useQuery({
    queryKey: projectKeys.lists(),
    queryFn: () => api.get<ApiResponse<ProjectSection[]>>('/api/admin/portfolio/projects'),
  });
}

// Create project
export function useCreateProject() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateProjectSection) =>
      api.post<ApiResponse<ProjectSection>>('/api/admin/portfolio/projects', data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: projectKeys.all });
    },
  });
}

// Update project
export function useUpdateProject() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<CreateProjectSection> }) =>
      api.put<ApiResponse<ProjectSection>>(`/api/admin/portfolio/projects/${id}`, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: projectKeys.all });
      queryClient.invalidateQueries({ queryKey: projectKeys.detail(variables.id) });
    },
  });
}

// Delete project
export function useDeleteProject() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) =>
      api.delete<ApiResponse<void>>(`/api/admin/portfolio/projects/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: projectKeys.all });
    },
  });
}

// Toggle featured status
export function useToggleFeatured() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) =>
      api.patch<ApiResponse<ProjectSection>>(`/api/admin/portfolio/projects/${id}/featured`),
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: projectKeys.all });
      queryClient.invalidateQueries({ queryKey: projectKeys.detail(id) });
    },
  });
}
