/**
 * Auth API utilities
 * Helper functions for auth-related operations
 */

/**
 * Extract error message from error object
 * Handles various error types and formats
 */
export function getErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  }
  
  if (typeof error === 'string') {
    return error;
  }
  
  if (error && typeof error === 'object' && 'message' in error) {
    return String(error.message);
  }
  
  return 'An unknown error occurred';
}

/**
 * Check if error is a network error
 */
export function isNetworkError(error: unknown): boolean {
  if (error instanceof Error) {
    return error.message.toLowerCase().includes('network') ||
           error.message.toLowerCase().includes('fetch');
  }
  return false;
}

/**
 * Check if error is an authentication error
 */
export function isAuthError(error: unknown): boolean {
  const message = getErrorMessage(error).toLowerCase();
  return message.includes('unauthorized') ||
         message.includes('authentication') ||
         message.includes('token');
}
