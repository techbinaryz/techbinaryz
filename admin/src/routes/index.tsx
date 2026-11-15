import { createFileRoute, redirect } from '@tanstack/react-router'
import { DashboardLayout } from '@/components/dashboard/dashboard-layout'
import { authStorage } from '@/lib/auth-storage'

export const Route = createFileRoute('/')({
  component: Home,
  beforeLoad: () => {
    // Redirect to login if not authenticated
    if (typeof window !== "undefined" && !authStorage.isAuthenticated()) {
      throw redirect({ to: '/login' })
    }
  },
})

function Home() {
  return <DashboardLayout />
}
