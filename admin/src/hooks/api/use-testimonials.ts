import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import api from '@/lib/api-client';
import type { ApiResponse, TestimonialSection, CreateTestimonialSection } from '@/types/portfolio';

// Query Keys
export const testimonialKeys = {
  all: ['testimonials'] as const,
  lists: () => [...testimonialKeys.all, 'list'] as const,
  list: (filters?: object) => [...testimonialKeys.lists(), filters] as const,
  details: () => [...testimonialKeys.all, 'detail'] as const,
  detail: (id: string) => [...testimonialKeys.details(), id] as const,
};

// Get active testimonials (public)
export function useTestimonials() {
  return useQuery({
    queryKey: testimonialKeys.list({ active: true }),
    queryFn: () => api.get<ApiResponse<TestimonialSection[]>>('/api/portfolio/testimonials'),
  });
}

// Get all testimonials (admin)
export function useAllTestimonials() {
  return useQuery({
    queryKey: testimonialKeys.lists(),
    queryFn: () => api.get<ApiResponse<TestimonialSection[]>>('/api/admin/portfolio/testimonials'),
  });
}

// Get single testimonial (admin)
export function useTestimonial(id: string) {
  return useQuery({
    queryKey: testimonialKeys.detail(id),
    queryFn: () => api.get<ApiResponse<TestimonialSection>>(`/api/admin/portfolio/testimonials/${id}`),
    enabled: !!id,
  });
}

// Create testimonial
export function useCreateTestimonial() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateTestimonialSection) =>
      api.post<ApiResponse<TestimonialSection>>('/api/admin/portfolio/testimonials', data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: testimonialKeys.all });
    },
  });
}

// Update testimonial
export function useUpdateTestimonial() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<CreateTestimonialSection> }) =>
      api.put<ApiResponse<TestimonialSection>>(`/api/admin/portfolio/testimonials/${id}`, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: testimonialKeys.all });
      queryClient.invalidateQueries({ queryKey: testimonialKeys.detail(variables.id) });
    },
  });
}

// Delete testimonial
export function useDeleteTestimonial() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) =>
      api.delete<ApiResponse<void>>(`/api/admin/portfolio/testimonials/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: testimonialKeys.all });
    },
  });
}

// Toggle testimonial active status
export function useToggleTestimonial() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) =>
      api.patch<ApiResponse<TestimonialSection>>(`/api/admin/portfolio/testimonials/${id}/toggle`),
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: testimonialKeys.all });
      queryClient.invalidateQueries({ queryKey: testimonialKeys.detail(id) });
    },
  });
}

// Reorder testimonials
export function useReorderTestimonials() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (testimonialIds: string[]) =>
      api.post<ApiResponse<void>>('/api/admin/portfolio/testimonials/reorder', { testimonialIds }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: testimonialKeys.all });
    },
  });
}
