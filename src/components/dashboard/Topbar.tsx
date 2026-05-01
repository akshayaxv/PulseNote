import { Bell, Search, Plus, Sparkles, ChevronRight, LayoutGrid } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export const Topbar = ({ title }: { title: string }) => (
  <header className="h-16 border-b border-white/10 bg-white/40 backdrop-blur-xl px-6 flex items-center gap-4 sticky top-0 z-30">
    <div className="flex items-center gap-2 text-muted-foreground">
      <LayoutGrid className="w-4 h-4" />
      <ChevronRight className="w-3 h-3 opacity-40" />
      <span className="text-xs font-bold uppercase tracking-widest text-foreground/40">Workspace</span>
      <ChevronRight className="w-3 h-3 opacity-40" />
      <h1 className="font-display font-bold text-sm text-foreground">{title}</h1>
    </div>

    <div className="ml-auto flex items-center gap-4">
      <motion.div 
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald/5 border border-emerald/10"
      >
        <div className="w-1.5 h-1.5 rounded-full bg-emerald animate-pulse" />
        <span className="text-[10px] font-black text-emerald uppercase tracking-widest">AI Indexing active</span>
      </motion.div>

      <div className="h-6 w-px bg-border/40 mx-2 hidden md:block" />

      <Button size="sm" className="rounded-xl bg-gradient-brand border-0 h-10 px-5 shadow-soft hover:scale-105 transition-transform hidden md:inline-flex group">
        <Sparkles className="w-4 h-4 mr-2 group-hover:rotate-12 transition-transform" /> New Intelligence
      </Button>

      <div className="flex items-center gap-2">
        <button className="relative w-10 h-10 rounded-xl bg-white border border-border/60 flex items-center justify-center hover:shadow-soft hover:border-primary/40 transition-all group">
          <Bell className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
          <span className="absolute top-2.5 right-2.5 w-2 h-2 rounded-full bg-primary border-2 border-white" />
        </button>
      </div>
    </div>
  </header>
);

