import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mic } from "lucide-react";

export const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Show button when page is scrolled down
  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0, y: 20 }}
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-[100] group"
          aria-label="Scroll to top"
        >
          {/* Neural Glow Aura */}
          <div className="absolute inset-0 bg-primary/40 blur-xl group-hover:bg-primary/60 transition-colors rounded-full animate-pulse-glow" />
          
          {/* Mic Button Body */}
          <div className="relative w-14 h-14 rounded-full bg-navy border border-primary/30 flex items-center justify-center text-primary shadow-glow overflow-hidden transition-all duration-500 group-hover:scale-110 group-hover:-translate-y-1">
            <div className="absolute inset-0 bg-gradient-brand opacity-0 group-hover:opacity-10 transition-opacity" />
            <Mic className="w-6 h-6 relative z-10" />
            
            {/* Animated Progress Ring (Optional visual flair) */}
            <svg className="absolute inset-0 w-full h-full -rotate-90">
              <circle
                cx="28"
                cy="28"
                r="26"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeDasharray="163"
                strokeDashoffset="163"
                className="opacity-20 group-hover:opacity-40 transition-all duration-500"
              />
            </svg>
          </div>
          
          {/* Tooltip */}
          <span className="absolute right-full mr-4 top-1/2 -translate-y-1/2 px-3 py-1 rounded-lg bg-navy border border-white/10 text-[10px] font-black uppercase tracking-widest text-white opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
            Scroll to Top
          </span>
        </motion.button>
      )}
    </AnimatePresence>
  );
};
