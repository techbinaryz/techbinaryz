/**
 * Central API exports
 * Import hooks from this file for cleaner imports
 * 
 * Example usage:
 * import { useLogin, useProjects, useCreateProject } from '@/api';
 */

// Auth
export * from './auth/auth.query';
export * from './auth/auth.mutation';

// Projects
export * from './projects/projects.query';
export * from './projects/projects.mutation';

// Services
export * from './services/services.query';
export * from './services/services.mutation';

// FAQs
export * from './faqs/faqs.query';
export * from './faqs/faqs.mutation';

// Feedbacks
export * from './feedbacks/feedbacks.query';
export * from './feedbacks/feedbacks.mutation';

// Partners
export * from './partners/partners.query';
export * from './partners/partners.mutation';

// Rules
export * from './rules/rules.query';
export * from './rules/rules.mutation';
