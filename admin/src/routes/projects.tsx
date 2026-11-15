import MainProject from '@/components/projects/MainProject'
import { createFileRoute, redirect } from '@tanstack/react-router'
import { authStorage } from '@/lib/auth-storage'

export const Route = createFileRoute('/projects')({
  component: RouteComponent,
  beforeLoad: () => {
    if (typeof window !== "undefined" && !authStorage.isAuthenticated()) {
      throw redirect({ to: '/login' })
    }
  },
})

function RouteComponent() {
  return <MainProject />
}
