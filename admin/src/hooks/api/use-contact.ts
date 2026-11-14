import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import api from '@/lib/api-client';
import type { ApiResponse, ContactInfo, CreateContactInfo, ContactMessage, CreateContactMessage } from '@/types/portfolio';

// ========== CONTACT INFO ==========

export const contactInfoKeys = {
  all: ['contactInfo'] as const,
  lists: () => [...contactInfoKeys.all, 'list'] as const,
  detail: (id: string) => [...contactInfoKeys.all, 'detail', id] as const,
};

// Get active contact info (public)
export function useContactInfo() {
  return useQuery({
    queryKey: contactInfoKeys.detail('active'),
    queryFn: () => api.get<ApiResponse<ContactInfo>>('/api/portfolio/contact-info'),
  });
}

// Get all contact info (admin)
export function useAllContactInfo() {
  return useQuery({
    queryKey: contactInfoKeys.lists(),
    queryFn: () => api.get<ApiResponse<ContactInfo[]>>('/api/admin/portfolio/contact-info'),
  });
}

// Create contact info
export function useCreateContactInfo() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateContactInfo) =>
      api.post<ApiResponse<ContactInfo>>('/api/admin/portfolio/contact-info', data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: contactInfoKeys.all });
    },
  });
}

// Update contact info
export function useUpdateContactInfo() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<CreateContactInfo> }) =>
      api.put<ApiResponse<ContactInfo>>(`/api/admin/portfolio/contact-info/${id}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: contactInfoKeys.all });
    },
  });
}

// Delete contact info
export function useDeleteContactInfo() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) =>
      api.delete<ApiResponse<void>>(`/api/admin/portfolio/contact-info/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: contactInfoKeys.all });
    },
  });
}

// ========== CONTACT MESSAGES ==========

export const contactMessageKeys = {
  all: ['contactMessages'] as const,
  lists: () => [...contactMessageKeys.all, 'list'] as const,
  list: (filters?: { isRead?: boolean; isReplied?: boolean }) => [...contactMessageKeys.lists(), filters] as const,
  detail: (id: string) => [...contactMessageKeys.all, 'detail', id] as const,
};

// Submit contact form (public)
export function useSubmitContactForm() {
  return useMutation({
    mutationFn: (data: CreateContactMessage) =>
      api.post<ApiResponse<void>>('/api/portfolio/contact', data),
  });
}

// Get all contact messages (admin)
export function useContactMessages(filters?: { isRead?: boolean; isReplied?: boolean }) {
  const queryParams = new URLSearchParams();
  if (filters?.isRead !== undefined) queryParams.append('isRead', String(filters.isRead));
  if (filters?.isReplied !== undefined) queryParams.append('isReplied', String(filters.isReplied));
  
  const queryString = queryParams.toString();
  const endpoint = `/api/admin/portfolio/contact-messages${queryString ? `?${queryString}` : ''}`;

  return useQuery({
    queryKey: contactMessageKeys.list(filters),
    queryFn: () => api.get<ApiResponse<ContactMessage[]>>(endpoint),
  });
}

// Get single contact message (admin) - marks as read
export function useContactMessage(id: string) {
  const queryClient = useQueryClient();

  return useQuery({
    queryKey: contactMessageKeys.detail(id),
    queryFn: async () => {
      const result = await api.get<ApiResponse<ContactMessage>>(
        `/api/admin/portfolio/contact-messages/${id}`
      );
      // Invalidate lists after reading to update unread count
      queryClient.invalidateQueries({ queryKey: contactMessageKeys.lists() });
      return result;
    },
    enabled: !!id,
  });
}

// Mark message as read
export function useMarkAsRead() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) =>
      api.patch<ApiResponse<ContactMessage>>(`/api/admin/portfolio/contact-messages/${id}/read`),
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: contactMessageKeys.all });
      queryClient.invalidateQueries({ queryKey: contactMessageKeys.detail(id) });
    },
  });
}

// Mark message as replied
export function useMarkAsReplied() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) =>
      api.patch<ApiResponse<ContactMessage>>(`/api/admin/portfolio/contact-messages/${id}/replied`),
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: contactMessageKeys.all });
      queryClient.invalidateQueries({ queryKey: contactMessageKeys.detail(id) });
    },
  });
}

// Delete contact message
export function useDeleteContactMessage() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) =>
      api.delete<ApiResponse<void>>(`/api/admin/portfolio/contact-messages/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: contactMessageKeys.all });
    },
  });
}

// Bulk mark as read
export function useBulkMarkAsRead() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (messageIds: string[]) =>
      api.post<ApiResponse<void>>('/api/admin/portfolio/contact-messages/bulk-read', { messageIds }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: contactMessageKeys.all });
    },
  });
}

// Bulk delete messages
export function useBulkDeleteMessages() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (messageIds: string[]) =>
      api.post<ApiResponse<void>>('/api/admin/portfolio/contact-messages/bulk-delete', { messageIds }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: contactMessageKeys.all });
    },
  });
}
