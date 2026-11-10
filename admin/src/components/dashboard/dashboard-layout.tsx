import { AppSidebar } from "@/components/dashboard/app-sidebar"
import { SiteHeader } from "@/components/dashboard/site-header"
import { SectionCards } from "@/components/dashboard/section-cards"
import { ChartAreaInteractive } from "@/components/dashboard/chart-area-interactive"
import { DataTable } from "@/components/dashboard/data-table"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"

import dashboardData from "@/app/dashboard/data.json"

export function DashboardLayout() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="@container/main">
        <SiteHeader />
        <main className="flex flex-1 flex-col gap-4 overflow-y-auto py-4">
          <SectionCards />
          <div className="px-4 lg:px-6">
            <ChartAreaInteractive />
          </div>
          <DataTable data={dashboardData} />
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}
