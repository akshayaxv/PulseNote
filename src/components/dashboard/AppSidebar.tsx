import { NavLink, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Video,
  Upload,
  ListTodo,
  MessageSquare,
  BarChart3,
  Plug,
  Settings,
  Brain,
  ChevronLeft,
  User,
  Search,
  Sparkles,
} from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";

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
      className={`relative bg-sidebar/95 backdrop-blur-xl text-sidebar-foreground flex flex-col transition-all duration-500 ease-in-out ${collapsed ? "w-[80px]" : "w-64"} shrink-0 border-r border-white/5 shadow-float`}
    >
      <div className="p-6 flex items-center gap-3">
        <motion.div
          whileHover={{ rotate: 10, scale: 1.1 }}
          className="w-10 h-10 rounded-2xl bg-gradient-brand flex items-center justify-center shrink-0 shadow-float relative overflow-hidden group"
        >
          <div className="absolute inset-0 bg-white/20 blur-lg opacity-0 group-hover:opacity-100 transition-opacity" />
          <img src="/logo.png" alt="Logo" className="w-6 h-6 object-contain relative z-10" />
        </motion.div>

        {!collapsed && (
          <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}>
            <span className="font-display font-black text-lg text-white tracking-tight">
              MeetMind <span className="text-gradient">AI</span>
            </span>
          </motion.div>
        )}
      </div>

      {!collapsed && (
        <div className="px-4 mb-4">
          <div className="relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30 group-focus-within:text-primary transition-colors" />
            <input
              placeholder="Search meetings... (⌘K)"
              className="w-full h-10 bg-white/5 border border-white/10 rounded-xl pl-9 pr-4 text-xs text-white/70 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-transparent transition-all"
            />
          </div>
        </div>
      )}

      <nav className="flex-1 px-3 py-2 space-y-1.5 overflow-y-auto scrollbar-hide">
        {items.map((it, i) => {
          const active =
            pathname === it.to || (it.to !== "/dashboard" && pathname.startsWith(it.to));
          return (
            <motion.div
              key={it.to}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <NavLink
                to={it.to}
                end={it.to === "/dashboard"}
                className={`flex items-center gap-3 px-3.5 py-3 rounded-2xl text-sm font-bold transition-all relative group ${
                  active
                    ? "text-white shadow-soft"
                    : "text-white/60 hover:bg-white/5 hover:text-white"
                }`}
              >
                {active && (
                  <motion.div
                    layoutId="activeNav"
                    className="absolute inset-0 bg-gradient-brand opacity-20 rounded-2xl border border-white/10"
                  />
                )}
                <it.icon
                  className={`w-5 h-5 shrink-0 transition-transform group-hover:scale-110 ${active ? "text-primary" : "text-white/40"}`}
                />
                {!collapsed && <span className="relative z-10">{it.label}</span>}
                {!collapsed && active && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="ml-auto w-1.5 h-1.5 rounded-full bg-emerald shadow-[0_0_8px_rgba(16,185,129,0.6)]"
                  />
                )}
              </NavLink>
            </motion.div>
          );
        })}
      </nav>

      <div className="p-4 space-y-4">
        {!collapsed && (
          <div className="rounded-2xl bg-white/5 border border-white/10 p-4 relative overflow-hidden group">
            <div className="absolute -right-2 -top-2 opacity-10 group-hover:opacity-20 transition-opacity">
              <Sparkles className="w-12 h-12 text-primary" />
            </div>
            <div className="text-[10px] font-black text-primary uppercase tracking-[0.2em] mb-1.5">
              Free Trial
            </div>
            <div className="text-xs font-bold text-white mb-2">9 days remaining</div>
            <div className="h-1.5 bg-white/10 rounded-full overflow-hidden mb-3">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "64%" }}
                className="h-full bg-gradient-brand rounded-full shadow-[0_0_8px_rgba(96,165,250,0.4)]"
              />
            </div>
            <button className="text-[10px] font-black text-emerald hover:text-emerald/80 transition-colors uppercase tracking-widest">
              Upgrade to Pro →
            </button>
          </div>
        )}

        <div
          className={`flex items-center gap-3 p-2 rounded-2xl ${collapsed ? "justify-center" : "bg-white/5 border border-white/10 hover:bg-white/10 transition-colors cursor-pointer"}`}
        >
          <div className="relative">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold text-sm shadow-soft">
              S
            </div>
            <div className="absolute -right-0.5 -bottom-0.5 w-3 h-3 rounded-full bg-emerald border-2 border-[#0F172A]" />
          </div>
          {!collapsed && (
            <div className="flex-1 min-w-0">
              <div className="text-xs font-bold text-white truncate">Sarah Chen</div>
              <div className="text-[10px] text-white/40 font-bold uppercase tracking-tight">
                Enterprise Plan
              </div>
            </div>
          )}
        </div>
      </div>

      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-3 top-20 w-6 h-6 rounded-full bg-sidebar-accent border border-white/10 shadow-glow flex items-center justify-center text-white hover:scale-110 transition-transform z-10"
      >
        <ChevronLeft
          className={`w-3 h-3 transition-transform text-primary ${collapsed ? "rotate-180" : ""}`}
        />
      </button>
    </aside>
  );
};
