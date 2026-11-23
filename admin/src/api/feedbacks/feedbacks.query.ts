import { useQuery } from '@tanstack/react-query';

// Query Keys
export const feedbackKeys = {
  all: ['feedbacks'] as const,
  lists: () => [...feedbackKeys.all, 'list'] as const,
  list: (filters?: object) => [...feedbackKeys.lists(), filters] as const,
  details: () => [...feedbackKeys.all, 'detail'] as const,
  detail: (id: string) => [...feedbackKeys.details(), id] as const,
};

// API Response Type
interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

// Feedback Type
export interface Feedback {
  _id: string;
  name: string;
  email?: string;
  message: string;
  rating?: number;
  status?: 'pending' | 'reviewed' | 'archived';
  createdAt?: string;
  updatedAt?: string;
}

// Get all feedbacks (admin view)
export function useFeedbacks() {
  return useQuery({
    queryKey: feedbackKeys.lists(),
    queryFn: async () => {
      const response = await fetch('/api/feedbacks', {
        credentials: 'include',
      });
      if (!response.ok) {
        throw new Error('Failed to fetch feedbacks');
      }
      return response.json() as Promise<ApiResponse<Feedback[]>>;
    },
  });
}

// Get single feedback by ID
export function useFeedback(id: string) {
  return useQuery({
    queryKey: feedbackKeys.detail(id),
    queryFn: async () => {
      const response = await fetch(`/api/feedbacks/${id}`, {
        credentials: 'include',
      });
      if (!response.ok) {
        throw new Error('Failed to fetch feedback');
      }
      return response.json() as Promise<ApiResponse<Feedback>>;
    },
    enabled: !!id,
  });
}
