import { motion } from "framer-motion";
import { Features, Architecture, TechStack, FAQ, Footer } from "@/components/landing/Sections";
import { Navbar } from "@/components/landing/Navbar";
import { Sparkles, BookOpen, Cpu, ShieldCheck } from "lucide-react";

const Docs = () => {
  return (
    <div className="min-h-screen bg-[#020617] text-white selection:bg-primary/30">
      <Navbar />
      
      {/* Docs Header */}
      <section className="relative pt-40 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero pointer-events-none" />
        <div className="container relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-dark mb-6 text-[10px] font-black uppercase tracking-[0.3em] border-white/10 text-primary">
              <BookOpen className="w-3.5 h-3.5" /> Documentation Hub
            </div>
            <h1 className="text-4xl md:text-7xl font-black font-display mb-6 tracking-tighter">
              The <span className="text-gradient">Intelligence</span> <br className="hidden md:block" /> Methodology
            </h1>
            <p className="text-white/50 text-lg md:text-xl max-w-2xl mx-auto font-medium leading-relaxed">
              Deep dive into the neural pipelines, semantic architectures, and advanced RAG systems powering MeetMind AI.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Docs Quick Navigation (Internal Page Links) */}
      <section className="py-10 border-y border-white/5 bg-white/[0.02]">
        <div className="container overflow-x-auto no-scrollbar">
          <div className="flex items-center justify-center gap-8 min-w-max px-4">
            {[
              { label: "Core Capabilities", icon: Sparkles, href: "#features" },
              { label: "Neural Architecture", icon: Cpu, href: "#architecture" },
              { label: "Tech Stack", icon: Cpu, href: "#tech-stack" },
              { label: "Security & Privacy", icon: ShieldCheck, href: "#faq" }
            ].map((nav) => (
              <a 
                key={nav.label}
                href={nav.href}
                className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-white/40 hover:text-primary transition-colors"
              >
                <nav.icon className="w-3.5 h-3.5" /> {nav.label}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* The Migrated Sections */}
      <main className="relative">
        <Features />
        <div className="h-px w-full bg-gradient-to-r from-transparent via-white/5 to-transparent" />
        <Architecture />
        <div className="h-px w-full bg-gradient-to-r from-transparent via-white/5 to-transparent" />
        <TechStack />
        <div className="h-px w-full bg-gradient-to-r from-transparent via-white/5 to-transparent" />
        <FAQ />
      </main>

      <Footer />
    </div>
  );
};

export default Docs;
