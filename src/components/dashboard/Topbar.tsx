import { Bell, Search, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Topbar = ({ title }: { title: string }) => (
  <header className="h-16 border-b border-border/60 bg-white/70 backdrop-blur-xl px-6 flex items-center gap-4 sticky top-0 z-30">
    <h1 className="font-display font-bold text-lg">{title}</h1>
    <div className="ml-auto flex items-center gap-3">
      <div className="relative hidden md:block">
        <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <input
          placeholder="Search meetings, tasks, people…"
          className="pl-10 pr-4 h-10 w-72 rounded-full bg-muted/60 text-sm border-0 focus:outline-none focus:ring-2 focus:ring-primary/30 placeholder:text-muted-foreground"
        />
      </div>
      <Button size="sm" className="rounded-full bg-gradient-brand border-0 hidden md:inline-flex">
        <Plus className="w-4 h-4 mr-1.5" /> New
      </Button>
      <button className="relative w-10 h-10 rounded-full bg-muted/60 flex items-center justify-center hover:bg-muted transition-colors">
        <Bell className="w-4 h-4" />
        <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-emerald" />
      </button>
      <div className="w-10 h-10 rounded-full bg-gradient-brand text-white font-bold flex items-center justify-center text-sm">SC</div>
    </div>
  </header>
);
