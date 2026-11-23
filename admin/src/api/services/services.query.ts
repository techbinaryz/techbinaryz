import { useQuery } from '@tanstack/react-query';

// Query Keys
export const serviceKeys = {
  all: ['services'] as const,
  lists: () => [...serviceKeys.all, 'list'] as const,
  list: (filters?: object) => [...serviceKeys.lists(), filters] as const,
  details: () => [...serviceKeys.all, 'detail'] as const,
  detail: (id: string) => [...serviceKeys.details(), id] as const,
};

// API Response Type
interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

// Service Type
export interface Service {
  _id: string;
  title: string;
  description: string;
  icon?: string;
  active?: boolean;
  order?: number;
  createdAt?: string;
  updatedAt?: string;
}

// Get all services (admin view - includes inactive)
export function useServices() {
  return useQuery({
    queryKey: serviceKeys.lists(),
    queryFn: async () => {
      const response = await fetch('/api/services', {
        credentials: 'include',
      });
      if (!response.ok) {
        throw new Error('Failed to fetch services');
      }
      return response.json() as Promise<ApiResponse<Service[]>>;
    },
  });
}

// Get single service by ID
export function useService(id: string) {
  return useQuery({
    queryKey: serviceKeys.detail(id),
    queryFn: async () => {
      const response = await fetch(`/api/services/${id}`, {
        credentials: 'include',
      });
      if (!response.ok) {
        throw new Error('Failed to fetch service');
      }
      return response.json() as Promise<ApiResponse<Service>>;
    },
    enabled: !!id,
  });
}
