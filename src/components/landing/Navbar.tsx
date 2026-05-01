import { motion, useScroll, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

import { Link } from "react-router-dom";
import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

const items = [
  { label: "Features", href: "#features" },
  { label: "Architecture", href: "#architecture" },
  { label: "Workflow", href: "#workflow" },
  { label: "Stack", href: "#tech-stack" },
  { label: "Use Cases", href: "#use-cases" },
  { label: "FAQ", href: "#faq" },
];

export const Navbar = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);


  return (
    <header className="fixed top-0 inset-x-0 z-50">
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-emerald origin-left z-[60]"
        style={{ scaleX }}
      />
      
      <div className="flex justify-center px-4 pt-4">
        <nav
          className={`w-full max-w-6xl rounded-full transition-all duration-500 ${
            scrolled
              ? "glass-dark shadow-glow"
              : "bg-black/20 backdrop-blur-md border border-white/10"
          }`}
        >
          <div className="flex items-center justify-between px-5 py-2.5">
            <Logo />
            <div className="hidden lg:flex items-center gap-1">
              {items.map((it) => (
                <a
                  key={it.label}
                  href={it.href}
                  className="px-4 py-2 text-xs font-bold uppercase tracking-widest text-white/60 hover:text-primary transition-all duration-300"
                >
                  {it.label}
                </a>
              ))}
            </div>
            <div className="hidden md:flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                asChild
                className="rounded-full text-white/80 hover:text-white hover:bg-white/10"
              >
                <Link to="/login">Login</Link>
              </Button>
              <Button
                size="sm"
                asChild
                className="rounded-full bg-gradient-brand hover:scale-105 transition-transform shadow-emerald border-0 font-bold text-xs uppercase tracking-tighter"
              >
                <Link to="/signup">Get Started</Link>
              </Button>
            </div>
            <button className="lg:hidden p-2 text-white" onClick={() => setOpen(!open)}>
              {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile Menu Overlay */}
      <motion.div
        initial={false}
        animate={open ? "open" : "closed"}
        variants={{
          open: { 
            clipPath: "circle(150% at 100% 0%)",
            transition: { type: "spring", stiffness: 30, restDelta: 2 }
          },
          closed: { 
            clipPath: "circle(0% at 100% 0%)",
            transition: { delay: 0.1, type: "spring", stiffness: 400, damping: 40 }
          }
        }}
        className={`fixed inset-0 z-[100] bg-[#020617]/98 backdrop-blur-3xl lg:hidden flex flex-col pt-32 px-10 overflow-hidden`}
      >
        <div className="absolute top-10 left-10 flex items-center justify-between w-[calc(100%-80px)]">
          <Logo />
          <button 
            onClick={() => setOpen(false)} 
            className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white bg-white/5 hover:bg-white/10 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <nav className="flex flex-col gap-6 sm:gap-8">
          {items.map((item, i) => (
            <motion.a
              key={item.label}
              href={item.href}
              onClick={() => setOpen(false)}
              variants={{
                open: { opacity: 1, x: 0, transition: { delay: 0.1 * i + 0.3 } },
                closed: { opacity: 0, x: -20 }
              }}
              className="text-4xl sm:text-5xl font-display font-black text-white hover:text-primary transition-colors tracking-tighter"
            >
              {item.label}
            </motion.a>
          ))}
        </nav>

        <motion.div
          variants={{
            open: { opacity: 1, y: 0, transition: { delay: 0.8 } },
            closed: { opacity: 0, y: 20 }
          }}
          className="mt-auto mb-16 space-y-6"
        >
          <div className="h-px w-full bg-white/10" />
          <p className="text-white/40 text-[10px] font-bold uppercase tracking-[0.4em]">
            Autonomous Intelligence
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" className="flex-1 h-16 rounded-2xl bg-white/5 border border-white/10 text-white font-black uppercase tracking-widest text-xs" asChild>
              <Link to="/login" onClick={() => setOpen(false)}>Login</Link>
            </Button>
            <Button size="lg" className="flex-1 h-16 rounded-2xl bg-gradient-brand border-0 text-black font-black uppercase tracking-widest text-xs shadow-glow-emerald" asChild>
              <Link to="/signup" onClick={() => setOpen(false)}>Get Started</Link>
            </Button>
          </div>
        </motion.div>
      </motion.div>
    </header>
  );
};


