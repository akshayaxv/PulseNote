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
          scrolled ? "glass shadow-soft" : "bg-white/40 backdrop-blur-md border border-white/40"
        }`}
      >
        <div className="flex items-center justify-between px-5 py-2.5">
          <Logo />
          <div className="hidden lg:flex items-center gap-1">
            {items.map((it) => (
              <a
                key={it.label}
                href={it.href}
                className="px-3 py-2 text-sm font-medium text-foreground/70 hover:text-foreground rounded-full hover:bg-muted transition-colors"
              >
                {it.label}
              </a>
            ))}
          </div>
          <div className="hidden md:flex items-center gap-2">
            <Button variant="ghost" size="sm" asChild className="rounded-full">
              <Link to="/login">Login</Link>
            </Button>
            <Button size="sm" asChild className="rounded-full bg-gradient-brand hover:opacity-90 shadow-soft border-0">
              <Link to="/signup">Get Started</Link>
            </Button>
          </div>
          <button className="lg:hidden p-2" onClick={() => setOpen(!open)}>
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
        {open && (
          <div className="lg:hidden border-t border-border/50 p-4 flex flex-col gap-2 animate-fade-in">
            {items.map((it) => (
              <a key={it.label} href={it.href} className="px-3 py-2 text-sm font-medium" onClick={() => setOpen(false)}>
                {it.label}
              </a>
            ))}
            <div className="flex gap-2 pt-2">
              <Button variant="outline" size="sm" asChild className="flex-1 rounded-full"><Link to="/login">Login</Link></Button>
              <Button size="sm" asChild className="flex-1 rounded-full bg-gradient-brand border-0"><Link to="/signup">Get Started</Link></Button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};
