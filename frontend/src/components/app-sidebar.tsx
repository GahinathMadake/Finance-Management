import * as React from "react"
import {
  LayoutDashboard,
  ListOrdered,
  Wallet,
  BarChart2,
  FileText,
  LifeBuoy,
  PieChart,
  Send,
  Settings2,
  BadgeIndianRupee,
  type LucideIcon,
} from "lucide-react";

import { NavMain } from "@/components/nav-main"
import { NavProjects } from "@/components/nav-projects"
import { NavSecondary } from "@/components/nav-secondary"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

const data = {
  user: {
    name: "Gahinath Madake",
    email: "gahinathmadake@gmail.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      title: "Transactions",
      url: "/dashboard/transactions",
      icon: ListOrdered,
    },
    {
      title: "Categories",
      url: "/dashboard/categories",
      icon: PieChart,
    },
    {
      title: "Budgets",
      url: "",
      icon: Wallet,
      items: [
        {
          title: "Set Budgets",
          url: "/dashboard/budgets/set",
        },
        {
          title: "Compare Spending",
          url: "/dashboard/budgets/compare",
        },
      ],
    },
    {
      title: "Insights",
      url: "",
      icon: BarChart2,
      items: [
        {
          title: "Monthly Trends",
          url: "",
        },
        {
          title: "Category Breakdown",
          url: "/dashboard/insights/categories",
        },
      ],
    },
    {
      title: "Reports",
      url: "",
      icon: FileText,
      items: [
        {
          title: "Export Data",
          url: "/dashboard/reports/export",
        },
        {
          title: "Spending Summary",
          url: "/dashboard/reports/summary",
        },
      ],
    },
    {
      title: "Settings",
      url: "",
      icon: Settings2,
      items: [
        {
          title: "Preferences",
          url: "/dashboard/settings/preferences",
        },
        {
          title: "Limits",
          url: "/dashboard/settings/limits",
        },
      ],
    },
  ],
  navSecondary: [
    {
      title: "Support",
      url: "#",
      icon: LifeBuoy,
    },
    {
      title: "Feedback",
      url: "#",
      icon: Send,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="#">
                <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                  <BadgeIndianRupee className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">Finance Mangement</span>
                  <span className="truncate text-xs">MITAOE</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            <SidebarGroupLabel>Platform</SidebarGroupLabel>
            {data.navMain.map((menu, index) => {
              if ("items" in menu) {
                return <NavMain key={index} item={{ ...menu, icon: menu.icon as LucideIcon }} />;
              } else {
                return <NavProjects key={index} item={{ ...menu, icon: menu.icon as LucideIcon }} />;
              }
            })}
          </SidebarMenu>
        </SidebarGroup>

        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  )
}
