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

// Rule Types
export type RuleCategory = 'general' | 'privacy' | 'security' | 'content' | 'user_conduct' | 'other';

export interface Rule {
  _id: string;
  title: string;
  description: string;
  category?: RuleCategory;
  rule_number?: string;
  is_active?: boolean;
  is_mandatory?: boolean;
  display_order?: number;
  effective_date?: string;
  last_modified_by?: string;
  created_at?: string;
  updated_at?: string;
}

// Get all active rules
export function useRules() {
  return useQuery({
    queryKey: ruleKeys.lists(),
    queryFn: async () => {
      const response = await fetch('/api/portfolio/rules');
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
      const response = await fetch(`/api/portfolio/rules/${id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch rule');
      }
      return response.json() as Promise<ApiResponse<Rule>>;
    },
    enabled: !!id,
  });
}
