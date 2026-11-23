import { useQuery } from '@tanstack/react-query';

// Query Keys
export const ruleKeys = {
  all: ['rules'] as const,
  lists: () => [...ruleKeys.all, 'list'] as const,
  list: (filters?: object) => [...ruleKeys.lists(), filters] as const,
  details: () => [...ruleKeys.all, 'detail'] as const,
  detail: (id: string) => [...ruleKeys.details(), id] as const,
};

// API Response Type
interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

// Rule Type
export interface Rule {
  _id: string;
  title: string;
  description: string;
  category?: string;
  priority?: number;
  active?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

// Get all rules (admin view - includes inactive)
export function useRules() {
  return useQuery({
    queryKey: ruleKeys.lists(),
    queryFn: async () => {
      const response = await fetch('/api/rules', {
        credentials: 'include',
      });
      if (!response.ok) {
        throw new Error('Failed to fetch rules');
      }
      return response.json() as Promise<ApiResponse<Rule[]>>;
    },
  });
}

// Get single rule by ID
export function useRule(id: string) {
  return useQuery({
    queryKey: ruleKeys.detail(id),
    queryFn: async () => {
      const response = await fetch(`/api/rules/${id}`, {
        credentials: 'include',
      });
      if (!response.ok) {
        throw new Error('Failed to fetch rule');
      }
      return response.json() as Promise<ApiResponse<Rule>>;
    },
    enabled: !!id,
  });
}
