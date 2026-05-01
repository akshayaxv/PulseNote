import { NavLink, useLocation } from "react-router-dom";
import { LayoutDashboard, Video, Upload, ListTodo, MessageSquare, BarChart3, Plug, Settings, Brain, ChevronLeft } from "lucide-react";
import { useState } from "react";

const items = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/dashboard/meetings", label: "Meetings", icon: Video },
  { to: "/dashboard/upload", label: "Upload", icon: Upload },
  { to: "/dashboard/tasks", label: "Tasks", icon: ListTodo },
  { to: "/dashboard/chat", label: "AI Chat", icon: MessageSquare },
  { to: "/dashboard/analytics", label: "Analytics", icon: BarChart3 },
  { to: "/dashboard/integrations", label: "Integrations", icon: Plug },
  { to: "/dashboard/settings", label: "Settings", icon: Settings },
];

export const AppSidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const { pathname } = useLocation();
  return (
    <aside
      className={`relative bg-sidebar text-sidebar-foreground flex flex-col transition-all duration-300 ${collapsed ? "w-[76px]" : "w-64"} shrink-0`}
    >
      <div className="p-5 flex items-center gap-2.5">
        <div className="w-9 h-9 rounded-xl bg-gradient-brand flex items-center justify-center shrink-0 shadow-soft">
          <Brain className="w-5 h-5 text-white" />
        </div>
        {!collapsed && <span className="font-display font-bold text-white">MeetMind <span className="text-gradient">AI</span></span>}
      </div>

      <nav className="flex-1 px-3 py-2 space-y-1">
        {items.map(it => {
          const active = pathname === it.to || (it.to !== "/dashboard" && pathname.startsWith(it.to));
          return (
            <NavLink
              key={it.to}
              to={it.to}
              end={it.to === "/dashboard"}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                active
                  ? "bg-sidebar-accent text-white shadow-soft"
                  : "text-sidebar-foreground hover:bg-sidebar-accent/60 hover:text-white"
              }`}
            >
              <it.icon className={`w-[18px] h-[18px] shrink-0 ${active ? "text-primary" : "text-primary/80"}`} />
              {!collapsed && <span>{it.label}</span>}
              {!collapsed && active && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-emerald" />}
            </NavLink>
          );
        })}
      </nav>

      {!collapsed && (
        <div className="p-3">
          <div className="rounded-2xl bg-sidebar-accent/60 p-4">
            <div className="text-xs font-semibold text-white mb-1">Pro Trial · 9 days left</div>
            <div className="h-1.5 bg-white/10 rounded-full overflow-hidden mb-3">
              <div className="h-full w-[64%] bg-gradient-brand rounded-full" />
            </div>
            <button className="text-xs font-semibold text-emerald hover:underline">Upgrade plan →</button>
          </div>
        </div>
      )}

      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-3 top-20 w-6 h-6 rounded-full bg-white border border-border shadow-soft flex items-center justify-center text-foreground hover:scale-110 transition-transform z-10"
      >
        <ChevronLeft className={`w-3 h-3 transition-transform ${collapsed ? "rotate-180" : ""}`} />
      </button>
    </aside>
  );
};
