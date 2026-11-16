import { useQuery } from '@tanstack/react-query';

// Query Keys
export const faqKeys = {
  all: ['faqs'] as const,
  lists: () => [...faqKeys.all, 'list'] as const,
  list: (filters?: object) => [...faqKeys.lists(), filters] as const,
  details: () => [...faqKeys.all, 'detail'] as const,
  detail: (id: string) => [...faqKeys.details(), id] as const,
};

// API Response Type
interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

// FAQ Type
export interface FAQ {
  _id: string;
  question: string;
  answer: string;
  asked_by: string;
  asked_on?: string;
}

// Get all FAQs
export function useFAQs() {
  return useQuery({
    queryKey: faqKeys.lists(),
    queryFn: async () => {
      const response = await fetch('/api/portfolio/faqs');
      if (!response.ok) {
        throw new Error('Failed to fetch FAQs');
      }
      return response.json() as Promise<ApiResponse<FAQ[]>>;
    },
  });
}

// Get single FAQ by ID
export function useFAQ(id: string) {
  return useQuery({
    queryKey: faqKeys.detail(id),
    queryFn: async () => {
      const response = await fetch(`/api/portfolio/faqs/${id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch FAQ');
      }
      return response.json() as Promise<ApiResponse<FAQ>>;
    },
    enabled: !!id,
  });
}
