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
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed top-4 inset-x-0 z-50 flex justify-center px-4">
      <nav
        className={`w-full max-w-6xl rounded-full transition-all duration-500 ${
          scrolled ? "glass-dark shadow-glow" : "bg-black/20 backdrop-blur-md border border-white/10"
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
            <Button variant="ghost" size="sm" asChild className="rounded-full text-white/80 hover:text-white hover:bg-white/10">
              <Link to="/login">Login</Link>
            </Button>
            <Button size="sm" asChild className="rounded-full bg-gradient-brand hover:scale-105 transition-transform shadow-emerald border-0 font-bold text-xs uppercase tracking-tighter">
              <Link to="/signup">Get Started</Link>
            </Button>
          </div>
          <button className="lg:hidden p-2 text-white" onClick={() => setOpen(!open)}>
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
        {open && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:hidden border-t border-white/10 p-6 flex flex-col gap-5 bg-black/90 backdrop-blur-3xl rounded-b-[2.5rem] shadow-glow"
          >
            {items.map((it) => (
              <a 
                key={it.label} 
                href={it.href} 
                className="px-4 py-3 text-sm font-bold text-white/60 uppercase tracking-widest hover:text-primary active:text-primary transition-all" 
                onClick={() => setOpen(false)}
              >
                {it.label}
              </a>
            ))}
            <div className="flex flex-col gap-3 pt-4 border-t border-white/5">
              <Button variant="outline" size="lg" asChild className="w-full rounded-2xl border-white/10 text-white h-14 font-bold text-sm uppercase tracking-widest bg-white/5"><Link to="/login">Login</Link></Button>
              <Button size="lg" asChild className="w-full rounded-2xl bg-gradient-brand border-0 h-14 font-bold text-sm uppercase tracking-widest"><Link to="/signup">Get Started</Link></Button>
            </div>
          </motion.div>
        )}

      </nav>

    </header>
  );
};
