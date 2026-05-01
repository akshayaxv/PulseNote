import { Bell, ChevronRight, LayoutGrid, Menu, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

interface TopbarProps {
  title: string;
  onMenuClick: () => void;
}

export const Topbar = ({ title, onMenuClick }: TopbarProps) => (
  <header className="h-16 md:h-20 border-b border-white/5 bg-[#020617]/60 backdrop-blur-xl px-4 md:px-8 flex items-center gap-4 sticky top-0 z-50">
    <button 
      onClick={onMenuClick}
      className="lg:hidden w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/40 hover:text-white transition-all active:scale-95"
    >
      <Menu className="w-5 h-5" />
    </button>

    <div className="flex items-center gap-2 text-white/40 overflow-hidden">
      <div className="hidden md:flex items-center gap-3 shrink-0">
        <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/5 flex items-center justify-center">
          <LayoutGrid className="w-3.5 h-3.5" />
        </div>
        <ChevronRight className="w-3 h-3 opacity-20" />
        <span className="text-[9px] font-black uppercase tracking-[0.3em] text-white/20">
          MAIN_WORKSPACE
        </span>
        <ChevronRight className="w-3 h-3 opacity-20" />
      </div>
      <h1 className="font-display font-black text-xs md:text-sm text-white/90 uppercase tracking-tight truncate">{title}</h1>
    </div>

    <div className="ml-auto flex items-center gap-3 md:gap-5">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="hidden xl:flex items-center gap-3 px-4 py-2 rounded-xl bg-emerald/5 border border-emerald/10 shadow-glow-sm"
      >
        <div className="w-1.5 h-1.5 rounded-full bg-emerald animate-pulse shadow-glow" />
        <span className="text-[9px] font-black text-emerald uppercase tracking-[0.2em]">
          AI ANALYSIS ACTIVE
        </span>
      </motion.div>

      <div className="h-8 w-px bg-white/5 mx-1 hidden md:block" />

      <Button
        size="sm"
        className="rounded-xl bg-gradient-brand border-0 h-10 md:h-12 px-4 md:px-6 shadow-emerald hover:scale-105 transition-all group active:scale-95"
      >
        <Sparkles className="w-4 h-4 md:mr-2.5 group-hover:rotate-12 transition-transform" /> 
        <span className="hidden sm:inline text-[10px] font-black uppercase tracking-widest">New Meeting</span>
      </Button>

      <div className="flex items-center gap-2">
        <button className="relative w-10 md:w-12 h-10 md:h-12 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center hover:bg-white/10 hover:border-primary/40 transition-all group active:scale-95">
          <Bell className="w-4 h-4 text-white/20 group-hover:text-primary transition-colors" />
          <span className="absolute top-3 right-3 w-2 h-2 rounded-full bg-primary border-2 border-[#020617] shadow-glow" />
        </button>
      </div>
    </div>
  </header>
);
