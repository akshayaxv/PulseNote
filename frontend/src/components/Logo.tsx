import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export const Logo = () => (
  <Link to="/" className="flex items-center gap-3 group">
    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="relative">
      <div className="absolute inset-0 bg-primary/20 blur-xl group-hover:bg-primary/40 transition-colors rounded-full" />
      <div className="relative w-11 h-11 rounded-2xl bg-[#020617] border border-white/10 flex items-center justify-center p-2.5 overflow-hidden shadow-2xl">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald/10 to-transparent" />
        <svg
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full relative z-10"
        >
          <motion.path
            d="M4 19V5L12 13L20 5V19"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-primary"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          />
          <motion.circle
            cx="12"
            cy="12"
            r="3"
            className="fill-primary/20 stroke-primary/50"
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 3, repeat: Infinity }}
          />
        </svg>
      </div>
    </motion.div>
    <div className="flex flex-col">
      <span className="font-display font-black text-2xl tracking-tighter text-white leading-none">
        MeetMind <span className="text-gradient">AI</span>
      </span>
    </div>
  </Link>
);
