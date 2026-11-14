import ReactDOM from 'react-dom/client'
import { RouterProvider } from '@tanstack/react-router'
import { QueryProvider } from './lib/query-client'
import { getRouter } from './router'

const router = getRouter()

const rootElement = document.getElementById('app')!

if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement)
  root.render(
    <QueryProvider>
      <RouterProvider router={router} />
    </QueryProvider>
  )
}
