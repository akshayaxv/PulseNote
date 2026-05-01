import { Brain } from "lucide-react";
import { Link } from "react-router-dom";

export const Logo = ({ light = false }: { light?: boolean }) => (
  <Link to="/" className="flex items-center gap-2 group">
    <div className="relative">
      <div className="absolute inset-0 bg-gradient-brand blur-md opacity-60 group-hover:opacity-100 transition-opacity rounded-xl" />
      <div className="relative w-9 h-9 rounded-xl bg-gradient-brand flex items-center justify-center shadow-soft">
        <Brain className="w-5 h-5 text-white" strokeWidth={2.5} />
      </div>
    </div>
    <span className={`font-display font-bold text-lg tracking-tight ${light ? "text-white" : "text-foreground"}`}>
      MeetMind <span className="text-gradient">AI</span>
    </span>
  </Link>
);
