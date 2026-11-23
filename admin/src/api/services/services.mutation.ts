import { useMutation, useQueryClient } from '@tanstack/react-query';
import { serviceKeys, type Service } from './services.query';

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

export interface CreateServiceRequest {
  title: string;
  description: string;
  icon?: string;
  active?: boolean;
  order?: number;
}

export interface UpdateServiceRequest extends Partial<CreateServiceRequest> {
  _id?: string;
}

// ============================================================================
// API Helper Functions
// ============================================================================

const serviceFetch = async <T>(
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
// Service Mutations
// ============================================================================

/**
 * Create Service mutation
 * Creates a new service (requires authentication)
 */
export function useCreateService() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateServiceRequest) =>
      serviceFetch<ApiResponse<Service>>('/api/services', {
        method: 'POST',
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      // Invalidate services list
      queryClient.invalidateQueries({ queryKey: serviceKeys.lists() });
    },
  });
}

/**
 * Update Service mutation
 * Updates an existing service (requires authentication)
 */
export function useUpdateService() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateServiceRequest }) =>
      serviceFetch<ApiResponse<Service>>(`/api/services/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
      }),
    onSuccess: (_, variables) => {
      // Invalidate services list and specific service
      queryClient.invalidateQueries({ queryKey: serviceKeys.lists() });
      queryClient.invalidateQueries({ queryKey: serviceKeys.detail(variables.id) });
    },
  });
}

/**
 * Delete Service mutation
 * Deletes a service (requires authentication)
 */
export function useDeleteService() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) =>
      serviceFetch<ApiResponse<null>>(`/api/services/${id}`, {
        method: 'DELETE',
      }),
    onSuccess: () => {
      // Invalidate services list
      queryClient.invalidateQueries({ queryKey: serviceKeys.lists() });
    },
  });
}
