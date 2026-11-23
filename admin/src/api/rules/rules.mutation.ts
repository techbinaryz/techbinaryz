import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ruleKeys, type Rule } from './rules.query';

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

export interface CreateRuleRequest {
  title: string;
  description: string;
  category?: string;
  priority?: number;
  active?: boolean;
}

export interface UpdateRuleRequest extends Partial<CreateRuleRequest> {
  _id?: string;
}

// ============================================================================
// API Helper Functions
// ============================================================================

const ruleFetch = async <T>(
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
// Rule Mutations
// ============================================================================

/**
 * Create Rule mutation
 * Creates a new rule (requires authentication)
 */
export function useCreateRule() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateRuleRequest) =>
      ruleFetch<ApiResponse<Rule>>('/api/rules', {
        method: 'POST',
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      // Invalidate rules list
      queryClient.invalidateQueries({ queryKey: ruleKeys.lists() });
    },
  });
}

/**
 * Update Rule mutation
 * Updates an existing rule (requires authentication)
 */
export function useUpdateRule() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateRuleRequest }) =>
      ruleFetch<ApiResponse<Rule>>(`/api/rules/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
      }),
    onSuccess: (_, variables) => {
      // Invalidate rules list and specific rule
      queryClient.invalidateQueries({ queryKey: ruleKeys.lists() });
      queryClient.invalidateQueries({ queryKey: ruleKeys.detail(variables.id) });
    },
  });
}

/**
 * Delete Rule mutation
 * Deletes a rule (requires authentication)
 */
export function useDeleteRule() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) =>
      ruleFetch<ApiResponse<null>>(`/api/rules/${id}`, {
        method: 'DELETE',
      }),
    onSuccess: () => {
      // Invalidate rules list
      queryClient.invalidateQueries({ queryKey: ruleKeys.lists() });
    },
  });
}
