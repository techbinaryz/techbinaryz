import { useMutation, useQueryClient } from '@tanstack/react-query';
import { partnerKeys, type Partner } from './partners.query';

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

export interface CreatePartnerRequest {
  name: string;
  logo?: string;
  website?: string;
  description?: string;
  active?: boolean;
  order?: number;
}

export interface UpdatePartnerRequest extends Partial<CreatePartnerRequest> {
  _id?: string;
}

// ============================================================================
// API Helper Functions
// ============================================================================

const partnerFetch = async <T>(
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
// Partner Mutations
// ============================================================================

/**
 * Create Partner mutation
 * Creates a new partner (requires authentication)
 */
export function useCreatePartner() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreatePartnerRequest) =>
      partnerFetch<ApiResponse<Partner>>('/api/partners', {
        method: 'POST',
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      // Invalidate partners list
      queryClient.invalidateQueries({ queryKey: partnerKeys.lists() });
    },
  });
}

/**
 * Update Partner mutation
 * Updates an existing partner (requires authentication)
 */
export function useUpdatePartner() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdatePartnerRequest }) =>
      partnerFetch<ApiResponse<Partner>>(`/api/partners/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
      }),
    onSuccess: (_, variables) => {
      // Invalidate partners list and specific partner
      queryClient.invalidateQueries({ queryKey: partnerKeys.lists() });
      queryClient.invalidateQueries({ queryKey: partnerKeys.detail(variables.id) });
    },
  });
}

/**
 * Delete Partner mutation
 * Deletes a partner (requires authentication)
 */
export function useDeletePartner() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) =>
      partnerFetch<ApiResponse<null>>(`/api/partners/${id}`, {
        method: 'DELETE',
      }),
    onSuccess: () => {
      // Invalidate partners list
      queryClient.invalidateQueries({ queryKey: partnerKeys.lists() });
    },
  });
}
