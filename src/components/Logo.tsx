import { Link } from "react-router-dom";

export const Logo = ({ light = false }: { light?: boolean }) => (
  <Link to="/" className="flex items-center gap-2 group">
    <div className="relative">
      <div className="absolute inset-0 bg-gradient-brand blur-md opacity-40 group-hover:opacity-80 transition-opacity rounded-xl" />
      <div className="relative w-10 h-10 rounded-xl overflow-hidden shadow-soft bg-white/10 backdrop-blur-sm flex items-center justify-center p-1.5">
        <img src="/logo.png" alt="MeetMind AI Logo" className="w-full h-full object-contain" />
      </div>
    </div>
    <span className="font-display font-black text-xl tracking-tighter text-white">
      MeetMind <span className="text-gradient">AI</span>
    </span>
  </Link>
);
