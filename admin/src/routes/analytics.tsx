import Analytics from '@/components/analytics/Analytics'
import { createFileRoute, redirect } from '@tanstack/react-router'
import { authStorage } from '@/lib/auth-storage'

export const Route = createFileRoute('/analytics')({
  component: RouteComponent,
  beforeLoad: () => {
    if (typeof window !== "undefined" && !authStorage.isAuthenticated()) {
      throw redirect({ to: '/login' })
    }
  },
})

function RouteComponent() {
  return (
    <>
      <Analytics />
    </>
  )
}
