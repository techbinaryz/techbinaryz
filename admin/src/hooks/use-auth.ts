/**
 * Re-export auth hooks from the API layer
 * This provides backward compatibility for components using @/hooks/use-auth
 */

// Query exports
export {
  useAuth,
  useAuthSession,
  useAuthProfile,
  useAuthCheck,
  authKeys,
  type AuthUser,
  type AuthSession,
} from '@/api/auth/auth.query';

// Mutation exports
export {
  useLogin,
  useLoginVerify,
  useSendOtp,
  useRegister,
  useAdminSendOtp,
  useAdminLogin,
  useLogout,
  useRefreshToken,
  useForgotPassword,
  useResetPassword,
  useChangePassword,
  useUpdateProfile,
  type LoginRequest,
  type RegisterRequest,
  type SendOtpRequest,
  type VerifyOtpRequest,
  type AdminSendOtpRequest,
  type AdminLoginRequest,
  type LoginResponse,
  type RegisterResponse,
  type SendOtpResponse,
  type VerifyOtpResponse,
  type LogoutResponse,
} from '@/api/auth/auth.mutation';
