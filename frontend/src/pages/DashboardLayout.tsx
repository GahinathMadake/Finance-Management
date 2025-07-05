import { AppSidebar } from "@/components/app-sidebar"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { Avatar, AvatarFallback } from "@radix-ui/react-avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ChevronDown, LogOut, Settings, User } from "lucide-react"
import { Outlet } from "react-router-dom"

export default function DashboardLayout() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex shrink-0 items-center justify-between px-4 transition-all ease-linear sticky top-0 right-0 border-b bg-white">
          <div className="flex items-center gap-2">
            <SidebarTrigger />
            <Separator orientation="vertical" className="h-6" />
          </div>

          <DropdownMenu>
            <div className="relative h-8 w-8 md:h-auto md:w-auto md:px-2 md:py-1.5">
              <div className="flex items-center gap-2">
                <Avatar className="h-8 w-8 bg-sidebar flex justify-center items-center rounded-full">
                  {/* <AvatarImage src={} alt={data.user.name} /> */}
                  <AvatarFallback>
                    {"Gahinath Madake"
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="hidden md:block text-left">
                  <p className="text-sm font-medium truncate max-w-[120px]">
                    Gahinath Madake
                  </p>
                  <p className="text-xs text-muted-foreground truncate max-w-[120px]">
                    gahinathmadake@gmail.com
                  </p>
                </div>
                <DropdownMenuTrigger asChild>
                  <ChevronDown className="hidden md:block h-4 w-4 text-muted-foreground" />
                </DropdownMenuTrigger>
              </div>
            </div>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">
                    Gahinath Madake
                  </p>
                  <p className="text-xs leading-none text-muted-foreground">
                    gahinathmadake@gmail.com
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-red-500 hover:text-red-500 focus:text-red-500">
                <LogOut className="mr-2 h-4 w-4" />
                <span>Sign out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>

        <div className="p-4">
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
