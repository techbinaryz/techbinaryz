import { useMutation, useQueryClient } from '@tanstack/react-query';
import { faqKeys, type FAQ } from './faqs.query';

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

export interface CreateFAQRequest {
  question: string;
  answer: string;
  category?: string;
  order?: number;
  active?: boolean;
}

export interface UpdateFAQRequest extends Partial<CreateFAQRequest> {
  _id?: string;
}

// ============================================================================
// API Helper Functions
// ============================================================================

const faqFetch = async <T>(
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
// FAQ Mutations
// ============================================================================

/**
 * Create FAQ mutation
 * Creates a new FAQ (requires authentication)
 */
export function useCreateFAQ() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateFAQRequest) =>
      faqFetch<ApiResponse<FAQ>>('/api/faqs', {
        method: 'POST',
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      // Invalidate FAQs list
      queryClient.invalidateQueries({ queryKey: faqKeys.lists() });
    },
  });
}

/**
 * Update FAQ mutation
 * Updates an existing FAQ (requires authentication)
 */
export function useUpdateFAQ() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateFAQRequest }) =>
      faqFetch<ApiResponse<FAQ>>(`/api/faqs/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
      }),
    onSuccess: (_, variables) => {
      // Invalidate FAQs list and specific FAQ
      queryClient.invalidateQueries({ queryKey: faqKeys.lists() });
      queryClient.invalidateQueries({ queryKey: faqKeys.detail(variables.id) });
    },
  });
}

/**
 * Delete FAQ mutation
 * Deletes a FAQ (requires authentication)
 */
export function useDeleteFAQ() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) =>
      faqFetch<ApiResponse<null>>(`/api/faqs/${id}`, {
        method: 'DELETE',
      }),
    onSuccess: () => {
      // Invalidate FAQs list
      queryClient.invalidateQueries({ queryKey: faqKeys.lists() });
    },
  });
}
