import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import api from '@/lib/api-client';
import type { ApiResponse, HeroSection, CreateHeroSection } from '@/types/portfolio';

// Query Keys
export const heroKeys = {
  all: ['hero'] as const,
  lists: () => [...heroKeys.all, 'list'] as const,
  list: (filters?: object) => [...heroKeys.lists(), filters] as const,
  details: () => [...heroKeys.all, 'detail'] as const,
  detail: (id: string) => [...heroKeys.details(), id] as const,
};

// Get active hero (public)
export function useHero() {
  return useQuery({
    queryKey: heroKeys.detail('active'),
    queryFn: () => api.get<ApiResponse<HeroSection>>('/api/portfolio/hero'),
  });
}

// Get all heroes (admin)
export function useHeroes() {
  return useQuery({
    queryKey: heroKeys.lists(),
    queryFn: () => api.get<ApiResponse<HeroSection[]>>('/api/admin/portfolio/hero'),
  });
}

// Create hero
export function useCreateHero() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateHeroSection) =>
      api.post<ApiResponse<HeroSection>>('/api/admin/portfolio/hero', data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: heroKeys.lists() });
      queryClient.invalidateQueries({ queryKey: heroKeys.detail('active') });
    },
  });
}

// Update hero
export function useUpdateHero() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<CreateHeroSection> }) =>
      api.put<ApiResponse<HeroSection>>(`/api/admin/portfolio/hero/${id}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: heroKeys.lists() });
      queryClient.invalidateQueries({ queryKey: heroKeys.detail('active') });
    },
  });
}

// Delete hero
export function useDeleteHero() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) =>
      api.delete<ApiResponse<void>>(`/api/admin/portfolio/hero/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: heroKeys.lists() });
      queryClient.invalidateQueries({ queryKey: heroKeys.detail('active') });
    },
  });
}

// Toggle hero active status
export function useToggleHero() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) =>
      api.patch<ApiResponse<HeroSection>>(`/api/admin/portfolio/hero/${id}/toggle`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: heroKeys.lists() });
      queryClient.invalidateQueries({ queryKey: heroKeys.detail('active') });
    },
  });
}
