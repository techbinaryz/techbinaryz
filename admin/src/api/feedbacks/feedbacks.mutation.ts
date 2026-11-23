import { useMutation, useQueryClient } from '@tanstack/react-query';
import { feedbackKeys, type Feedback } from './feedbacks.query';

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

export interface CreateFeedbackRequest {
  name: string;
  email?: string;
  message: string;
  rating?: number;
  status?: 'pending' | 'reviewed' | 'archived';
}

export interface UpdateFeedbackRequest extends Partial<CreateFeedbackRequest> {
  _id?: string;
}

// ============================================================================
// API Helper Functions
// ============================================================================

const feedbackFetch = async <T>(
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
// Feedback Mutations
// ============================================================================

/**
 * Create Feedback mutation
 * Creates a new feedback (requires authentication)
 */
export function useCreateFeedback() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateFeedbackRequest) =>
      feedbackFetch<ApiResponse<Feedback>>('/api/feedbacks', {
        method: 'POST',
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      // Invalidate feedbacks list
      queryClient.invalidateQueries({ queryKey: feedbackKeys.lists() });
    },
  });
}

/**
 * Update Feedback mutation
 * Updates an existing feedback (requires authentication)
 */
export function useUpdateFeedback() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateFeedbackRequest }) =>
      feedbackFetch<ApiResponse<Feedback>>(`/api/feedbacks/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
      }),
    onSuccess: (_, variables) => {
      // Invalidate feedbacks list and specific feedback
      queryClient.invalidateQueries({ queryKey: feedbackKeys.lists() });
      queryClient.invalidateQueries({ queryKey: feedbackKeys.detail(variables.id) });
    },
  });
}

/**
 * Delete Feedback mutation
 * Deletes a feedback (requires authentication)
 */
export function useDeleteFeedback() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) =>
      feedbackFetch<ApiResponse<null>>(`/api/feedbacks/${id}`, {
        method: 'DELETE',
      }),
    onSuccess: () => {
      // Invalidate feedbacks list
      queryClient.invalidateQueries({ queryKey: feedbackKeys.lists() });
    },
  });
}
