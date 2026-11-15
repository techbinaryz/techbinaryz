import { createFileRoute, redirect } from '@tanstack/react-router'
import { authStorage } from '@/lib/auth-storage'

export const Route = createFileRoute('/writtoo')({
  component: RouteComponent,
  beforeLoad: () => {
    if (typeof window !== "undefined" && !authStorage.isAuthenticated()) {
      return redirect({ to: '/login' })
    }
  },
})

function RouteComponent() {
  return <div>Hello "/writtoo"!</div>
}
