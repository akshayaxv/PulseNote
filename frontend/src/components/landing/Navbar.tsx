import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const items = [
  { label: "Workflow", href: "/#workflow" },
  { label: "Use Cases", href: "/#use-cases" },
  { label: "Documentation", href: "/docs" },
];

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed top-0 inset-x-0 z-[100] flex justify-center pointer-events-none">
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className={`mt-4 sm:mt-6 pointer-events-auto flex items-center justify-between gap-2 sm:gap-4 px-2 sm:px-8 py-1.5 sm:py-3 rounded-2xl border transition-all duration-500 w-[95vw] sm:w-full max-w-7xl ${
          scrolled
            ? "glass-dark shadow-glow-emerald border-emerald/20"
            : "bg-[#020617]/80 backdrop-blur-2xl border-white/10"
        }`}
      >
        {/* Branding & Links Group */}
        <div className="flex items-center gap-1.5 sm:gap-6 min-w-0 overflow-hidden">
          <Link
            to="/"
            className="w-8 h-8 sm:w-11 sm:h-11 rounded-2xl bg-gradient-brand flex items-center justify-center shadow-emerald hover:scale-110 transition-transform duration-300 shrink-0"
          >
            <LogoIcon className="w-4 h-4 sm:w-6 sm:h-6 text-black" />
          </Link>

          <div className="h-4 sm:h-6 w-px bg-white/10 mx-0.5 sm:mx-1 shrink-0 hidden xs:block" />

          {/* Links Dock with Scroll Masking */}
          <div className="relative flex items-center min-w-0">
            <div className="flex items-center bg-white/5 rounded-xl px-1 py-1 sm:px-2 sm:py-1.5 border border-white/5 overflow-x-auto no-scrollbar mask-fade-edges">
              {items.map((item) => {
                const isExternal = item.href === "/docs";

                return isExternal ? (
                  <Link
                    key={item.label}
                    to={item.href}
                    className="px-3 sm:px-5 py-2 sm:py-2 text-[10px] sm:text-[11px] font-black uppercase tracking-widest text-white/50 hover:text-white hover:bg-white/10 rounded-xl transition-all duration-300 whitespace-nowrap"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <a
                    key={item.label}
                    href={item.href}
                    className="px-3 sm:px-5 py-2 sm:py-2 text-[10px] sm:text-[11px] font-black uppercase tracking-widest text-white/50 hover:text-white hover:bg-white/10 rounded-xl transition-all duration-300 whitespace-nowrap"
                  >
                    {item.label}
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* Action Button Group */}
        <div className="flex items-center gap-2 sm:gap-4 shrink-0">
          <div className="h-6 w-px bg-white/10 hidden lg:block" />
          <Button
            size="lg"
            asChild
            className="rounded-xl bg-white text-black hover:bg-emerald hover:text-black transition-all duration-300 px-4 sm:px-10 h-8 sm:h-12 font-bold text-[10px] sm:text-[11px] uppercase tracking-[0.1em] sm:tracking-widest border-0"
          >
            <Link to="/signup">
              <span className="xs:hidden">Start</span>
              <span className="hidden xs:inline">Start Free Trial</span>
            </Link>
          </Button>
        </div>
      </motion.nav>
    </header>
  );
};

// Helper component for the minimal logo icon
const LogoIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path
      d="M4 19V5L12 13L20 5V19"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <circle cx="12" cy="12" r="3" className="fill-current opacity-20" />
  </svg>
);
