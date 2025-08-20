import { useState } from "react"
import { 
  Activity, 
  Search, 
  Files, 
  Users, 
  Network,
  Settings,
  Home,
  Upload,
  Download
} from "lucide-react"
import { NavLink } from "react-router-dom"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"

const navigationItems = [
  { title: "Dashboard", url: "/", icon: Home },
  { title: "Files", url: "/files", icon: Files },
  { title: "Search", url: "/search", icon: Search },
  { title: "Peers", url: "/peers", icon: Users },
  { title: "Network", url: "/network", icon: Network },
]

const quickActions = [
  { title: "Upload", url: "/upload", icon: Upload },
  { title: "Downloads", url: "/downloads", icon: Download },
  { title: "Analytics", url: "/analytics", icon: Activity },
]

export function AppSidebar() {
  const { state } = useSidebar()
  const collapsed = state === "collapsed"

  const getNavClassName = ({ isActive }: { isActive: boolean }) =>
    `transition-all duration-200 ${
      isActive 
        ? "bg-gradient-primary text-primary-foreground shadow-glow" 
        : "hover:bg-accent/50 hover:text-accent-foreground"
    }`

  return (
    <Sidebar className={`${collapsed ? "w-16" : "w-72"} bg-gradient-card border-border/50`}>
      <SidebarContent className="px-3 py-6">
        {/* Logo/Brand */}
        <div className="mb-8 flex items-center gap-3 px-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-primary shadow-glow">
            <Network className="h-5 w-5 text-primary-foreground" />
          </div>
          {!collapsed && (
            <div>
              <h1 className="text-lg font-bold text-foreground">FileNest</h1>
              <p className="text-xs text-muted-foreground">P2P Network</p>
            </div>
          )}
        </div>

        {/* Main Navigation */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-muted-foreground">Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink to={item.url} end className={getNavClassName}>
                      <item.icon className="h-4 w-4" />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Quick Actions */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-muted-foreground">Quick Actions</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {quickActions.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink to={item.url} className={getNavClassName}>
                      <item.icon className="h-4 w-4" />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Node Status */}
        {!collapsed && (
          <div className="mt-auto p-4 rounded-xl bg-card border border-border/50">
            <div className="flex items-center gap-2 mb-2">
              <div className="h-2 w-2 rounded-full bg-node-online animate-status-ping"></div>
              <span className="text-sm font-medium text-foreground">Node Online</span>
            </div>
            <p className="text-xs text-muted-foreground">12 peers connected</p>
          </div>
        )}
      </SidebarContent>
    </Sidebar>
  )
}