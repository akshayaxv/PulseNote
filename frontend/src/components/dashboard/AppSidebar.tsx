import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
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
  LogOut,
} from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";
import { getStoredUser, clearAuth } from "@/lib/auth";

const items = [
  { to: "/dashboard", label: "Overview", icon: LayoutDashboard },
  { to: "/dashboard/meetings", label: "Meeting Library", icon: Video },
  { to: "/dashboard/upload", label: "Upload Meeting", icon: Upload },
  { to: "/dashboard/tasks", label: "Task Board", icon: ListTodo },
  { to: "/dashboard/chat", label: "AI Assistant", icon: MessageSquare },
  { to: "/dashboard/analytics", label: "Insights", icon: BarChart3 },
  { to: "/dashboard/settings", label: "Settings", icon: Settings },
];

interface AppSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AppSidebar = ({ isOpen, onClose }: AppSidebarProps) => {
  const [collapsed, setCollapsed] = useState(false);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const user = getStoredUser();

  const handleLogout = () => {
    clearAuth();
    navigate("/login");
  };

  const initials = user?.name
    ? user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "??";

  return (
    <>
      <aside
        className={`fixed lg:relative z-[70] h-screen bg-[#020617]/95 backdrop-blur-2xl text-sidebar-foreground flex flex-col transition-all duration-500 ease-in-out border-r border-white/5 shadow-glow
          ${collapsed ? "lg:w-[80px]" : "lg:w-72"} 
          ${isOpen ? "translate-x-0 w-72" : "-translate-x-full lg:translate-x-0"}
          shrink-0`}
      >
        <div className="p-6 md:p-8 flex items-center justify-between lg:justify-start gap-4">
          <Link to="/" className="flex items-center gap-4 group/logo cursor-pointer">
            <motion.div
              whileHover={{ rotate: 10, scale: 1.05 }}
              className="w-10 h-10 md:w-11 md:h-11 rounded-xl md:rounded-2xl bg-gradient-brand flex items-center justify-center shrink-0 shadow-emerald border border-white/10 relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-white/20 blur-lg opacity-0 group-hover/logo:opacity-100 transition-opacity" />
              <svg
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 md:w-7 md:h-7 relative z-10 drop-shadow-emerald"
              >
                <path
                  d="M4 19V5L12 13L20 5V19"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-white"
                />
                <circle
                  cx="12"
                  cy="12"
                  r="3"
                  fill="currentColor"
                  className="text-primary opacity-40 shadow-glow"
                />
              </svg>
            </motion.div>

            {(!collapsed || isOpen) && (
              <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}>
                <span className="font-display font-black text-lg md:text-xl text-white tracking-tighter uppercase group-hover/logo:text-white/80 transition-colors">
                  MEETMIND <span className="text-primary">AI</span>
                </span>
              </motion.div>
            )}
          </Link>

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
                placeholder="Smart search..."
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
                    active ? "text-white" : "text-white/40 hover:bg-white/5 hover:text-white/60"
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
          <div
            className={`flex items-center gap-3 p-2.5 rounded-2xl ${collapsed && !isOpen ? "justify-center" : "bg-white/[0.03] border border-white/5 group relative overflow-hidden"}`}
          >
            <div className="relative shrink-0">
              <div className="w-10 h-10 rounded-xl bg-gradient-brand flex items-center justify-center text-white font-black text-sm border border-white/10 shadow-glow-sm">
                {initials}
              </div>
              <div className="absolute -right-0.5 -bottom-0.5 w-3 h-3 rounded-full bg-emerald border-2 border-[#020617]" />
            </div>
            {(!collapsed || isOpen) && (
              <div className="flex-1 min-w-0">
                <div className="text-xs font-bold text-white/90 truncate uppercase tracking-tight">
                  {user?.name || "Anonymous"}
                </div>
              </div>
            )}
            {(!collapsed || isOpen) && (
              <button
                onClick={handleLogout}
                className="w-8 h-8 rounded-lg bg-white/5 border border-white/5 flex items-center justify-center text-white/20 hover:text-red-400 hover:bg-red-400/10 hover:border-red-400/20 transition-all"
                title="Logout"
              >
                <LogOut className="w-3.5 h-3.5" />
              </button>
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
