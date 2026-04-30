"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarTrigger,
  SidebarInset,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard,
  ShoppingCart,
  Factory,
  Package,
  RefreshCw,
  DollarSign,
  BarChart3,
  Settings,
  Bell,
  User,
  ChevronDown,
  Search,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const navItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
    description: "Overview & KPIs",
  },
  {
    title: "Sourcing",
    href: "/sourcing",
    icon: ShoppingCart,
    description: "Product Orders",
  },
  {
    title: "Production",
    href: "/production",
    icon: Factory,
    description: "Intake & Processing",
  },
  {
    title: "Inventory",
    href: "/inventory",
    icon: Package,
    description: "Stock Management",
  },
  {
    title: "Zoho Sync",
    href: "/zoho",
    icon: RefreshCw,
    description: "Sales Integration",
  },
  {
    title: "Costs",
    href: "/costs",
    icon: DollarSign,
    description: "Cost Management",
  },
  {
    title: "Reports",
    href: "/reports",
    icon: BarChart3,
    description: "Analytics & Trends",
  },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <SidebarProvider defaultOpen>
      <Sidebar variant="sidebar" collapsible="icon">
        <SidebarHeader className="border-b border-border p-4">
          <Link href="/dashboard" className="flex items-center gap-3">
            <Image
              src="/nyumbani-logo.avif"
              alt="Nyumbani Greens"
              width={36}
              height={36}
              className="h-9 w-auto"
            />
            <div className="flex flex-col group-data-[collapsible=icon]:hidden">
              <span className="text-sm font-semibold text-foreground">
                Nyumbani Greens
              </span>
              <span className="text-xs text-muted-foreground">ERP System</span>
            </div>
          </Link>
        </SidebarHeader>

        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Modules</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {navItems.map((item) => (
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton
                      asChild
                      isActive={pathname === item.href}
                      tooltip={item.title}
                    >
                      <Link href={item.href}>
                        <item.icon className="h-4 w-4" />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>

        <SidebarFooter className="border-t border-border p-2">
          <SidebarMenu>
            <SidebarMenuItem>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuButton className="w-full">
                    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-nyumbani-green text-xs font-semibold text-white">
                      SM
                    </div>
                    <div className="flex flex-1 flex-col text-left group-data-[collapsible=icon]:hidden">
                      <span className="text-sm font-medium">Sarah M.</span>
                      <span className="text-xs text-muted-foreground">
                        Manager
                      </span>
                    </div>
                    <ChevronDown className="h-4 w-4 group-data-[collapsible=icon]:hidden" />
                  </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-56">
                  <DropdownMenuItem>
                    <User className="mr-2 h-4 w-4" />
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Settings className="mr-2 h-4 w-4" />
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-destructive-foreground">
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>

      <SidebarInset>
        {/* Top Bar */}
        <header className="sticky top-0 z-10 flex h-14 items-center gap-4 border-b border-border bg-background px-4">
          <SidebarTrigger />

          <div className="flex flex-1 items-center gap-4">
            <div className="relative max-w-md flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search POs, products, batches..."
                className="h-9 w-full rounded-lg border border-border bg-input pl-9 pr-4 text-sm placeholder:text-muted-foreground focus:border-nyumbani-green focus:outline-none focus:ring-1 focus:ring-nyumbani-green"
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-4 w-4" />
              <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-crimson" />
            </Button>
            <Button
              size="sm"
              className="bg-nyumbani-green text-white hover:bg-nyumbani-green/90"
            >
              + New PO
            </Button>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-auto">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
