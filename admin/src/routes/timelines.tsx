import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/timelines')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/timelines"!</div>
}
