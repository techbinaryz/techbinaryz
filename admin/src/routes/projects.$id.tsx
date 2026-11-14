import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/projects/$id')({
  component: RouteComponent,
})

function RouteComponent() {
  const { id } = Route.useParams()
  
  return (
    <div className="px-4 lg:px-6">
      <h1 className="text-2xl font-bold">Project Details</h1>
      <p className="mt-2 text-muted-foreground">Project ID: {id}</p>
    </div>
  )
}
