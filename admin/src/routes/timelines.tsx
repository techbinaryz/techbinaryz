import Timelines from '@/components/timelines/Timelines'
import { createFileRoute, redirect } from '@tanstack/react-router'
import { authStorage } from '@/lib/auth-storage'

export const Route = createFileRoute('/timelines')({
  component: RouteComponent,
  beforeLoad: () => {
    if (typeof window !== "undefined" && !authStorage.isAuthenticated()) {
      throw redirect({ to: '/login' })
    }
  },
})

function RouteComponent() {
  return <Timelines />
}
