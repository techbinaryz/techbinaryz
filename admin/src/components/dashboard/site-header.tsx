import { SidebarTrigger } from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Search, Bell, ArrowRight } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"

export function SiteHeader() {
  return (
    <header className="my-2 flex h-(--header-height) shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />

        <div className="ml-auto flex items-center gap-2">
          {/* Search Dialog */}
          <Dialog>
            <DialogTrigger
              render={
                <Button
                  variant="outline"
                  size="sm"
                  aria-label="Search"
                  className="gap-2 px-3"
                />
              }
            >
              <Search className="size-3.5" />
              <span className="hidden text-muted-foreground sm:inline">
                Search
              </span>
            </DialogTrigger>
            <DialogContent showCloseButton={false} className="p-0">
              <div className="flex items-center border-b px-3">
                <Search className="mr-2 size-4 shrink-0 text-muted-foreground" />
                <Input
                  placeholder="Search documentation..."
                  className="h-11 border-0 focus-visible:ring-0"
                />
              </div>
              <div className="max-h-75 overflow-y-auto p-2">
                <div className="mb-2 px-2 py-1.5">
                  <p className="text-xs font-medium text-muted-foreground">
                    Pages
                  </p>
                </div>
                <button className="flex w-full items-center gap-2 rounded-md px-2 py-2 text-sm hover:bg-muted">
                  <ArrowRight className="size-3.5" />
                  <span>Dashboard</span>
                </button>
                <button className="flex w-full items-center gap-2 rounded-md px-2 py-2 text-sm hover:bg-muted">
                  <ArrowRight className="size-3.5" />
                  <span>Docs</span>
                </button>
                <button className="flex w-full items-center gap-2 rounded-md px-2 py-2 text-sm hover:bg-muted">
                  <ArrowRight className="size-3.5" />
                  <span>Components</span>
                </button>
                <button className="flex w-full items-center gap-2 rounded-md px-2 py-2 text-sm hover:bg-muted">
                  <ArrowRight className="size-3.5" />
                  <span>Edits</span>
                </button>
                <button className="flex w-full items-center gap-2 rounded-md px-2 py-2 text-sm hover:bg-muted">
                  <ArrowRight className="size-3.5" />
                  <span>Charts</span>
                </button>
                <button className="flex w-full items-center gap-2 rounded-md px-2 py-2 text-sm hover:bg-muted">
                  <ArrowRight className="size-3.5" />
                  <span>Typeset</span>
                </button>
                <button className="flex w-full items-center gap-2 rounded-md px-2 py-2 text-sm hover:bg-muted">
                  <ArrowRight className="size-3.5" />
                  <span>Create</span>
                </button>
                <Separator className="my-2" />
                <button className="flex w-full items-center gap-2 rounded-md px-2 py-2 text-sm hover:bg-muted">
                  <span className="text-muted-foreground">Go to Page</span>
                </button>
              </div>
            </DialogContent>
          </Dialog>

          {/* Notifications Sheet */}
          <Sheet>
            <SheetTrigger
              render={
                <Button
                  variant="secondary"
                  size="icon-sm"
                  aria-label="Notifications"
                  className="relative"
                />
              }
            >
              <Bell className="size-4" />
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Notifications</SheetTitle>
                <SheetDescription>Get latest notifications at the top</SheetDescription>
              </SheetHeader>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
