import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import api from '@/lib/api-client';
import type { ApiResponse, AboutSection, CreateAboutSection, TeamMember, CreateTeamMember, StatSection, CreateStatSection } from '@/types/portfolio';

// ========== ABOUT SECTION ==========

export const aboutKeys = {
  all: ['about'] as const,
  lists: () => [...aboutKeys.all, 'list'] as const,
  detail: (id: string) => [...aboutKeys.all, 'detail', id] as const,
};

// Get active about section (public)
export function useAbout() {
  return useQuery({
    queryKey: aboutKeys.detail('active'),
    queryFn: () => api.get<ApiResponse<AboutSection>>('/api/portfolio/about'),
  });
}

// Get all about sections (admin)
export function useAllAbouts() {
  return useQuery({
    queryKey: aboutKeys.lists(),
    queryFn: () => api.get<ApiResponse<AboutSection[]>>('/api/admin/portfolio/about'),
  });
}

// Create about section
export function useCreateAbout() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateAboutSection) =>
      api.post<ApiResponse<AboutSection>>('/api/admin/portfolio/about', data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: aboutKeys.all });
    },
  });
}

// Update about section
export function useUpdateAbout() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<CreateAboutSection> }) =>
      api.put<ApiResponse<AboutSection>>(`/api/admin/portfolio/about/${id}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: aboutKeys.all });
    },
  });
}

// Delete about section
export function useDeleteAbout() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) =>
      api.delete<ApiResponse<void>>(`/api/admin/portfolio/about/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: aboutKeys.all });
    },
  });
}

// ========== TEAM MEMBERS ==========

export const teamKeys = {
  all: ['team'] as const,
  lists: () => [...teamKeys.all, 'list'] as const,
  detail: (id: string) => [...teamKeys.all, 'detail', id] as const,
};

// Get active team members (public)
export function useTeam() {
  return useQuery({
    queryKey: teamKeys.lists(),
    queryFn: () => api.get<ApiResponse<TeamMember[]>>('/api/portfolio/team'),
  });
}

// Get all team members (admin)
export function useAllTeam() {
  return useQuery({
    queryKey: [...teamKeys.lists(), 'admin'],
    queryFn: () => api.get<ApiResponse<TeamMember[]>>('/api/admin/portfolio/team'),
  });
}

// Create team member
export function useCreateTeamMember() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateTeamMember) =>
      api.post<ApiResponse<TeamMember>>('/api/admin/portfolio/team', data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: teamKeys.all });
    },
  });
}

// Update team member
export function useUpdateTeamMember() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<CreateTeamMember> }) =>
      api.put<ApiResponse<TeamMember>>(`/api/admin/portfolio/team/${id}`, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: teamKeys.all });
      queryClient.invalidateQueries({ queryKey: teamKeys.detail(variables.id) });
    },
  });
}

// Delete team member
export function useDeleteTeamMember() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) =>
      api.delete<ApiResponse<void>>(`/api/admin/portfolio/team/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: teamKeys.all });
    },
  });
}

// ========== STATISTICS ==========

export const statKeys = {
  all: ['stats'] as const,
  lists: () => [...statKeys.all, 'list'] as const,
  detail: (id: string) => [...statKeys.all, 'detail', id] as const,
};

// Get active stats (public)
export function useStats() {
  return useQuery({
    queryKey: statKeys.lists(),
    queryFn: () => api.get<ApiResponse<StatSection[]>>('/api/portfolio/stats'),
  });
}

// Get all stats (admin)
export function useAllStats() {
  return useQuery({
    queryKey: [...statKeys.lists(), 'admin'],
    queryFn: () => api.get<ApiResponse<StatSection[]>>('/api/admin/portfolio/stats'),
  });
}

// Create stat
export function useCreateStat() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateStatSection) =>
      api.post<ApiResponse<StatSection>>('/api/admin/portfolio/stats', data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: statKeys.all });
    },
  });
}

// Update stat
export function useUpdateStat() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<CreateStatSection> }) =>
      api.put<ApiResponse<StatSection>>(`/api/admin/portfolio/stats/${id}`, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: statKeys.all });
      queryClient.invalidateQueries({ queryKey: statKeys.detail(variables.id) });
    },
  });
}

// Delete stat
export function useDeleteStat() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) =>
      api.delete<ApiResponse<void>>(`/api/admin/portfolio/stats/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: statKeys.all });
    },
  });
}
