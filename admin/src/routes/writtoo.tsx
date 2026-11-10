import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/writtoo')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/writtoo"!</div>
}
