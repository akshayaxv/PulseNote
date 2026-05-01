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
  { to: "/dashboard", label: "Core Dashboard", icon: LayoutDashboard },
  { to: "/dashboard/meetings", label: "Knowledge Base", icon: Video },
  { to: "/dashboard/upload", label: "Neural Synthesis", icon: Upload },
  { to: "/dashboard/tasks", label: "Action Map", icon: ListTodo },
  { to: "/dashboard/chat", label: "Neural Chat", icon: MessageSquare },
  { to: "/dashboard/analytics", label: "Intelligence", icon: BarChart3 },
  { to: "/dashboard/integrations", label: "Connectors", icon: Plug },
  { to: "/dashboard/settings", label: "System Core", icon: Settings },
];

interface AppSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AppSidebar = ({ isOpen, onClose }: AppSidebarProps) => {
  const [collapsed, setCollapsed] = useState(false);
  const { pathname } = useLocation();

  return (
    <>
      <aside
        className={`fixed lg:relative z-[70] h-screen bg-[#020617]/95 backdrop-blur-2xl text-sidebar-foreground flex flex-col transition-all duration-500 ease-in-out border-r border-white/5 shadow-glow
          ${collapsed ? "lg:w-[80px]" : "lg:w-72"} 
          ${isOpen ? "translate-x-0 w-72" : "-translate-x-full lg:translate-x-0"}
          shrink-0`}
      >
        <div className="p-6 md:p-8 flex items-center justify-between lg:justify-start gap-4">
          <div className="flex items-center gap-4">
            <motion.div
              whileHover={{ rotate: 10, scale: 1.05 }}
              className="w-10 h-10 md:w-11 md:h-11 rounded-xl md:rounded-2xl bg-gradient-brand flex items-center justify-center shrink-0 shadow-emerald border border-white/10 relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-white/20 blur-lg opacity-0 group-hover:opacity-100 transition-opacity" />
              <img src="/logo.png" alt="Logo" className="w-6 h-6 md:w-7 md:h-7 object-contain relative z-10" />
            </motion.div>

            {(!collapsed || isOpen) && (
              <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}>
                <span className="font-display font-black text-lg md:text-xl text-white tracking-tighter uppercase">
                  MEETMIND <span className="text-primary">OS</span>
                </span>
              </motion.div>
            )}
          </div>

          <button
            onClick={onClose}
            className="lg:hidden w-10 h-10 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center text-white/40 hover:text-white"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
        </div>

        {(!collapsed || isOpen) && (
          <div className="px-5 md:px-6 mb-6">
            <div className="relative group">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white/20 group-focus-within:text-primary transition-colors" />
              <input
                placeholder="Neural search..."
                className="w-full h-11 bg-white/[0.03] border border-white/5 rounded-xl pl-10 pr-4 text-xs font-bold text-white/60 placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
              />
            </div>
          </div>
        )}

        <nav className="flex-1 px-4 py-2 space-y-1.5 overflow-y-auto scrollbar-hide">
          {items.map((it, i) => {
            const active =
              pathname === it.to || (it.to !== "/dashboard" && pathname.startsWith(it.to));
            return (
              <motion.div
                key={it.to}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.04 }}
              >
                <NavLink
                  to={it.to}
                  end={it.to === "/dashboard"}
                  className={`flex items-center gap-4 px-4 py-3.5 rounded-2xl text-[11px] font-black uppercase tracking-[0.1em] transition-all relative group ${
                    active
                      ? "text-white"
                      : "text-white/40 hover:bg-white/5 hover:text-white/60"
                  }`}
                >
                  {active && (
                    <motion.div
                      layoutId="activeNav"
                      className="absolute inset-0 bg-white/5 rounded-2xl border border-white/10 shadow-glow-sm"
                    />
                  )}
                  <it.icon
                    className={`w-4.5 h-4.5 shrink-0 transition-all group-hover:scale-110 ${active ? "text-primary drop-shadow-[0_0_8px_rgba(16,185,129,0.5)]" : "text-white/20"}`}
                  />
                  {(!collapsed || (isOpen && window.innerWidth < 1024)) && (
                    <span className="relative z-10">{it.label}</span>
                  )}
                  {(!collapsed || (isOpen && window.innerWidth < 1024)) && active && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="ml-auto w-1 h-1 rounded-full bg-primary shadow-glow"
                    />
                  )}
                </NavLink>
              </motion.div>
            );
          })}
        </nav>

        <div className="p-5 md:p-6 space-y-5">
          {(!collapsed || isOpen) && (
            <div className="rounded-[1.5rem] bg-white/[0.02] border border-white/5 p-5 relative overflow-hidden group">
              <div className="absolute -right-2 -top-2 opacity-5 group-hover:opacity-10 transition-opacity">
                <Sparkles className="w-16 h-16 text-primary" />
              </div>
              <div className="text-[9px] font-black text-primary uppercase tracking-[0.3em] mb-2">
                Neural Trial
              </div>
              <div className="text-xs font-bold text-white/80 mb-3">9 CYCLES REMAINING</div>
              <div className="h-1 bg-white/5 rounded-full overflow-hidden mb-4">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "64%" }}
                  className="h-full bg-gradient-brand rounded-full shadow-emerald"
                />
              </div>
              <button className="w-full h-9 rounded-xl bg-white/5 border border-white/10 text-[9px] font-black text-white/40 hover:text-white hover:bg-white/10 transition-all uppercase tracking-widest">
                SCALE TO PRO
              </button>
            </div>
          )}

          <div
            className={`flex items-center gap-3 p-2.5 rounded-2xl ${collapsed && !isOpen ? "justify-center" : "bg-white/[0.03] border border-white/5 hover:bg-white/10 transition-all cursor-pointer group"}`}
          >
            <div className="relative">
              <div className="w-10 h-10 rounded-xl bg-gradient-brand flex items-center justify-center text-white font-black text-sm border border-white/10 shadow-glow-sm">
                SC
              </div>
              <div className="absolute -right-0.5 -bottom-0.5 w-3 h-3 rounded-full bg-emerald border-2 border-[#020617]" />
            </div>
            {(!collapsed || isOpen) && (
              <div className="flex-1 min-w-0">
                <div className="text-xs font-bold text-white/90 truncate uppercase tracking-tight">Sarah Chen</div>
                <div className="text-[9px] text-primary font-black uppercase tracking-widest mt-0.5">
                  Pro Status
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Desktop Collapse Toggle */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="hidden lg:flex absolute -right-3.5 top-24 w-7 h-7 rounded-full bg-[#020617] border border-white/10 shadow-glow items-center justify-center text-white hover:scale-110 transition-all z-10"
        >
          <ChevronLeft
            className={`w-3.5 h-3.5 transition-transform text-primary ${collapsed ? "rotate-180" : ""}`}
          />
        </button>
      </aside>
    </>
  );
};
