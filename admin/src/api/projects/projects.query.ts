import { useQuery } from '@tanstack/react-query';

// Query Keys
export const projectKeys = {
  all: ['projects'] as const,
  lists: () => [...projectKeys.all, 'list'] as const,
  list: (filters?: object) => [...projectKeys.lists(), filters] as const,
  details: () => [...projectKeys.all, 'detail'] as const,
  detail: (id: string) => [...projectKeys.details(), id] as const,
};

// API Response Type
interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

// Project Types
export type ProjectStatus = 'planning' | 'in_progress' | 'completed' | 'on_hold' | 'cancelled';
export type ProjectCategory = 
  | 'web_development' 
  | 'mobile_development' 
  | 'cloud_services' 
  | 'consulting' 
  | 'design' 
  | 'custom_software' 
  | 'maintainance' 
  | 'other';

export interface Project {
  _id: string;
  title: string;
  description: string;
  short_description?: string;
  category?: ProjectCategory;
  status?: ProjectStatus;
  technologies?: string[];
  image?: string;
  gallery?: string[];
  github_url?: string;
  live_url?: string;
  start_date?: string;
  end_date?: string;
  client_name?: string;
  team_size?: number;
  is_featured?: boolean;
  is_published?: boolean;
  display_order?: number;
  created_by?: string;
  created_at?: string;
  updated_at?: string;
}

// Get all projects (admin view - includes unpublished)
export function useProjects() {
  return useQuery({
    queryKey: projectKeys.lists(),
    queryFn: async () => {
      const response = await fetch('/api/projects', {
        credentials: 'include',
      });
      if (!response.ok) {
        throw new Error('Failed to fetch projects');
      }
      return response.json() as Promise<ApiResponse<Project[]>>;
    },
  });
}

// Get single project by ID
export function useProject(id: string) {
  return useQuery({
    queryKey: projectKeys.detail(id),
    queryFn: async () => {
      const response = await fetch(`/api/projects/${id}`, {
        credentials: 'include',
      });
      if (!response.ok) {
        throw new Error('Failed to fetch project');
      }
      return response.json() as Promise<ApiResponse<Project>>;
    },
    enabled: !!id,
  });
}
