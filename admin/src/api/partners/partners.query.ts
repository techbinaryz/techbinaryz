import { useQuery } from '@tanstack/react-query';

// Query Keys
export const partnerKeys = {
  all: ['partners'] as const,
  lists: () => [...partnerKeys.all, 'list'] as const,
  list: (filters?: object) => [...partnerKeys.lists(), filters] as const,
  details: () => [...partnerKeys.all, 'detail'] as const,
  detail: (id: string) => [...partnerKeys.details(), id] as const,
};

// API Response Type
interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

// Partner Type
export interface Partner {
  _id: string;
  name: string;
  logo?: string;
  website?: string;
  description?: string;
  active?: boolean;
  order?: number;
  createdAt?: string;
  updatedAt?: string;
}

// Get all partners (admin view - includes inactive)
export function usePartners() {
  return useQuery({
    queryKey: partnerKeys.lists(),
    queryFn: async () => {
      const response = await fetch('/api/partners', {
        credentials: 'include',
      });
      if (!response.ok) {
        throw new Error('Failed to fetch partners');
      }
      return response.json() as Promise<ApiResponse<Partner[]>>;
    },
  });
}

// Get single partner by ID
export function usePartner(id: string) {
  return useQuery({
    queryKey: partnerKeys.detail(id),
    queryFn: async () => {
      const response = await fetch(`/api/partners/${id}`, {
        credentials: 'include',
      });
      if (!response.ok) {
        throw new Error('Failed to fetch partner');
      }
      return response.json() as Promise<ApiResponse<Partner>>;
    },
    enabled: !!id,
  });
}
