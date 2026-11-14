import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import api from '@/lib/api-client';
import type { ApiResponse, ServiceSection, CreateServiceSection } from '@/types/portfolio';

// Query Keys
export const serviceKeys = {
  all: ['services'] as const,
  lists: () => [...serviceKeys.all, 'list'] as const,
  list: (filters?: object) => [...serviceKeys.lists(), filters] as const,
  details: () => [...serviceKeys.all, 'detail'] as const,
  detail: (id: string) => [...serviceKeys.details(), id] as const,
};

// Get active services (public)
export function useServices() {
  return useQuery({
    queryKey: serviceKeys.list({ active: true }),
    queryFn: () => api.get<ApiResponse<ServiceSection[]>>('/api/portfolio/services'),
  });
}

// Get all services (admin)
export function useAllServices() {
  return useQuery({
    queryKey: serviceKeys.lists(),
    queryFn: () => api.get<ApiResponse<ServiceSection[]>>('/api/admin/portfolio/services'),
  });
}

// Get single service (admin)
export function useService(id: string) {
  return useQuery({
    queryKey: serviceKeys.detail(id),
    queryFn: () => api.get<ApiResponse<ServiceSection>>(`/api/admin/portfolio/services/${id}`),
    enabled: !!id,
  });
}

// Create service
export function useCreateService() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateServiceSection) =>
      api.post<ApiResponse<ServiceSection>>('/api/admin/portfolio/services', data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: serviceKeys.lists() });
      queryClient.invalidateQueries({ queryKey: serviceKeys.list({ active: true }) });
    },
  });
}

// Update service
export function useUpdateService() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<CreateServiceSection> }) =>
      api.put<ApiResponse<ServiceSection>>(`/api/admin/portfolio/services/${id}`, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: serviceKeys.lists() });
      queryClient.invalidateQueries({ queryKey: serviceKeys.detail(variables.id) });
      queryClient.invalidateQueries({ queryKey: serviceKeys.list({ active: true }) });
    },
  });
}

// Delete service
export function useDeleteService() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) =>
      api.delete<ApiResponse<void>>(`/api/admin/portfolio/services/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: serviceKeys.lists() });
      queryClient.invalidateQueries({ queryKey: serviceKeys.list({ active: true }) });
    },
  });
}

// Reorder services
export function useReorderServices() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (serviceIds: string[]) =>
      api.post<ApiResponse<void>>('/api/admin/portfolio/services/reorder', { serviceIds }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: serviceKeys.lists() });
      queryClient.invalidateQueries({ queryKey: serviceKeys.list({ active: true }) });
    },
  });
}
