import Analytics from '@/components/analytics/Analytics'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/analytics')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
   <Analytics />
  )
}
