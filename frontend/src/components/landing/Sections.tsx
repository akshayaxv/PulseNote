import { motion } from "framer-motion";
import {
  Mic,
  Sparkles,
  ListChecks,
  Calendar,
  Search,
  BarChart3,
  Upload,
  Brain,
  ArrowRight,
  Check,
  Star,
  LayoutGrid,
  Zap,
  Users,
  FileText,
  ShieldCheck,
  Twitter,
  Github,
  Linkedin,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

ScrollTrigger.config({
  ignoreMobileResize: true, // Prevents 100vh jumping and refresh errors on mobile
});

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Logo } from "@/components/Logo";

const fade = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.7 },
};

const faqs = [
  {
    q: "How does the AI handle privacy?",
    a: "MeetMind AI processes all data with enterprise-grade encryption. No meeting data is ever stored permanently or shared with third parties.",
  },
  {
    q: "How does the Smart Search work?",
    a: "Our Smart Search system allows the AI to look through your entire meeting history to provide accurate answers based on the actual context of your conversations.",
  },
  {
    q: "Can it handle long lectures?",
    a: "Yes, our system is optimized for audio files up to 2 hours long, automatically organizing them into easy-to-read chapters.",
  },
];

const features = [
  {
    icon: Mic,
    title: "Transcription",
    desc: "Industry-leading accuracy with 50+ languages and automatic speaker labeling.",
    span: "col-span-1 md:col-span-2",
    img: "bg-gradient-to-br from-sky/20 to-transparent",
  },
  {
    icon: Sparkles,
    title: "Smart Summaries",
    desc: "AI-powered summaries that capture context, not just keywords.",
    span: "col-span-1",
    img: "bg-gradient-to-br from-emerald/20 to-transparent",
  },
  {
    icon: ListChecks,
    title: "Task Extraction",
    desc: "AI detects action items and assigns them instantly.",
    span: "col-span-1",
    img: "bg-gradient-to-br from-primary/20 to-transparent",
  },
  {
    icon: Search,
    title: "Instant Retrieval",
    desc: "Ask questions about your entire meeting history and get instant, context-aware answers.",
    span: "col-span-1 md:col-span-2",
    img: "bg-gradient-to-br from-cyan/20 to-transparent",
  },
  {
    icon: BarChart3,
    title: "Team Analytics",
    desc: "Visualize speaking patterns, sentiment, and productivity trends.",
    span: "col-span-1 md:col-span-3",
    img: "bg-gradient-to-br from-navy/10 to-transparent",
  },
];

export const Features = () => (
  <section id="features" className="py-28 relative overflow-hidden">
    <div className="absolute top-0 right-0 w-64 h-64 md:w-[500px] md:h-[500px] bg-primary/5 blur-[60px] md:blur-[80px] -z-10 rounded-full will-change-[filter]" />
    <div className="absolute bottom-0 left-0 w-64 h-64 md:w-[500px] md:h-[500px] bg-emerald/5 blur-[60px] md:blur-[80px] -z-10 rounded-full will-change-[filter]" />

    <div className="container">
      <motion.div {...fade} className="text-center max-w-3xl mx-auto mb-20">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-[10px] font-black uppercase tracking-[0.2em] mb-6">
          <Sparkles className="w-3 h-3" /> Core Capabilities
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold font-display mb-6 tracking-tight">
          Intelligent infrastructure for <span className="text-gradient">modern teams.</span>
        </h2>
        <p className="text-muted-foreground text-base sm:text-lg md:text-xl font-medium">
          Built for teams that ship — from async standups to global all-hands.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {features.map((f, i) => (
          <motion.div
            key={f.title}
            {...fade}
            transition={{ duration: 0.6, delay: i * 0.1 }}
            className={`${f.span} will-change-transform`}
          >
            <Card className="h-full p-8 rounded-[2.5rem] border-border/60 bg-gradient-card group relative overflow-hidden flex flex-col justify-between">
              <div
                className={`absolute inset-0 ${f.img} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
              />
              <div>
                <div className="w-14 h-14 rounded-2xl bg-gradient-brand flex items-center justify-center mb-6 shadow-float group-hover:scale-110 transition-all duration-500">
                  <f.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-display font-bold text-2xl mb-3 tracking-tight">{f.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed font-medium max-w-[240px]">
                  {f.desc}
                </p>
              </div>
              <div className="mt-8 flex items-center text-[10px] font-black text-primary uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                Learn more <ArrowRight className="ml-1 w-3 h-3" />
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

const steps = [
  {
    icon: Upload,
    label: "Import",
    color: "from-sky to-blue-600",
    desc: "Seamless upload with automatic audio optimization.",
    details: ["Multi-Format", "Secure Processing", "Quick Loading"],
  },
  {
    icon: Mic,
    label: "Transcribe",
    color: "from-cyan to-emerald",
    desc: "Precise speech detection with high-fidelity output.",
    details: ["Speaker ID", "50+ Languages", "Timestamp Sync"],
  },
  {
    icon: Brain,
    label: "Analyze",
    color: "from-primary to-purple-600",
    desc: "Extracting deep insights using context-aware AI reasoning.",
    details: ["Smart Search", "Insight Mapping", "Actionable Data"],
  },
  {
    icon: ListChecks,
    label: "Automate",
    color: "from-emerald to-teal-600",
    desc: "Instant task detection and automated smart actions.",
    details: ["Action Items", "Smart Assignment", "Easy Export"],
  },
];

export const Workflow = () => (
  <section id="workflow" className="py-32 relative overflow-hidden">
    {/* Background Neural Trace */}
    <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-y-1/2 hidden md:block" />

    <div className="container relative z-10">
      <motion.div {...fade} className="text-center max-w-2xl mx-auto mb-24">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-[10px] font-black uppercase tracking-[0.3em] mb-6">
          System Methodology
        </div>
        <h2 className="text-4xl md:text-6xl font-bold font-display mb-6 tracking-tighter leading-tight">
          How the <span className="text-gradient">intelligence</span> evolves.
        </h2>
        <p className="text-muted-foreground text-lg font-medium">
          An advanced multi-stage system designed for speed and contextual accuracy.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
        {steps.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{
              delay: i * 0.1,
              duration: 0.6,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="group relative will-change-transform"
          >
            {/* Connecting Thread (Mobile) */}
            {i < steps.length - 1 && (
              <div className="absolute left-1/2 bottom-[-1.5rem] w-px h-6 bg-gradient-to-b from-white/10 to-transparent md:hidden" />
            )}

            <div className="relative h-full bg-[#030816] md:glass-dark p-8 rounded-[2.5rem] border border-white/5 group-hover:border-white/10 transition-all duration-500 flex flex-col items-center text-center">
              {/* Animated Progress Ring */}
              <div className="absolute -inset-0.5 rounded-[2.5rem] bg-gradient-to-b from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm" />

              {/* Step Icon */}
              <div
                className={`relative w-20 h-20 rounded-[1.8rem] bg-gradient-to-br ${s.color} flex items-center justify-center shadow-glow-emerald mb-8 group-hover:scale-110 transition-transform duration-500`}
              >
                <s.icon className="w-9 h-9 text-white" />
                <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-[#020617] border-2 border-white/10 flex items-center justify-center text-[10px] font-black text-white shadow-soft">
                  0{i + 1}
                </div>
              </div>

              <h3 className="text-xl font-display font-bold mb-3 tracking-tight">{s.label}</h3>
              <p className="text-[11px] text-muted-foreground leading-relaxed font-medium mb-6 uppercase tracking-wider">
                {s.desc}
              </p>

              {/* Sub-Intelligence Labels */}
              <div className="flex flex-wrap justify-center gap-1.5 mt-auto">
                {s.details.map((detail) => (
                  <span
                    key={detail}
                    className="px-2 py-0.5 rounded-md bg-white/5 border border-white/5 text-[8px] font-bold text-white/40 uppercase tracking-widest whitespace-nowrap"
                  >
                    {detail}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

const techStack = [
  {
    name: "React 18",
    desc: "Modern foundation for fluid user interfaces",
    icon: LayoutGrid,
    color: "text-blue-400",
  },
  {
    name: "Bun / Vite",
    desc: "Ultra-fast engine for real-time performance",
    icon: Zap,
    color: "text-amber-400",
  },
  {
    name: "OpenAI Transcription",
    desc: "Crystal-clear speech-to-text conversion",
    icon: Mic,
    color: "text-emerald-400",
  },
  {
    name: "Smart Reasoning",
    desc: "Advanced logic for professional summarization",
    icon: Brain,
    color: "text-primary",
  },
  {
    name: "Intelligent Search",
    desc: "Instant answers from your meeting history",
    icon: Search,
    color: "text-cyan-400",
  },
  {
    name: "Framer Motion",
    desc: "Production-ready animations",
    icon: Sparkles,
    color: "text-pink-400",
  },
];

export const TechStack = () => (
  <section id="tech-stack" className="py-28 relative overflow-hidden">
    <div className="container">
      <motion.div {...fade} className="text-center max-w-2xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-4">
          ENGINEERING
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-display mb-4">
          Built with a <span className="text-gradient">modern stack</span>
        </h2>
        <p className="text-muted-foreground text-base sm:text-lg">
          Leveraging cutting-edge tools for speed, intelligence, and a premium UX.
        </p>
      </motion.div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        {techStack.map((t, i) => (
          <motion.div key={t.name} {...fade} transition={{ delay: i * 0.05 }}>
            <Card className="p-6 rounded-3xl bg-gradient-card border-border/60 hover-lift">
              <t.icon className={`w-8 h-8 mb-4 ${t.color}`} />
              <h4 className="font-bold text-lg mb-1">{t.name}</h4>
              <p className="text-xs text-muted-foreground leading-relaxed">{t.desc}</p>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

const useCases = [
  {
    title: "Global Team Syncs",
    label: "Product Teams",
    desc: "Convert messy, multi-timezone standups into structured action items. AI automatically identifies key blockers and notifies the right people.",
    icon: Users,
    glow: "shadow-emerald/20",
    metric: "90% Faster Summaries",
    image: "bg-gradient-to-br from-emerald/10 via-transparent to-transparent",
  },
  {
    title: "Academic Excellence",
    label: "Education",
    desc: "Transcribe long lectures and instantly search for specific facts. Automatically identify key concepts and citations for easy studying.",
    icon: FileText,
    glow: "shadow-primary/20",
    metric: "Instant Fact-Finding",
    image: "bg-gradient-to-br from-primary/10 via-transparent to-transparent",
  },
  {
    title: "Executive Strategy",
    label: "Leadership",
    desc: "Distill high-stakes board meetings into clear strategic milestones. Built with private and secure data processing for total peace of mind.",
    icon: ShieldCheck,
    glow: "shadow-cyan/20",
    metric: "Total Privacy & Security",
    image: "bg-gradient-to-br from-cyan/10 via-transparent to-transparent",
  },
];

const TextPathAnimation = () => {
  const textPathRef = useRef<SVGTextPathElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!textPathRef.current) return;

    const ctx = gsap.context(() => {
      // Continuous loop
      const tl = gsap.to(textPathRef.current, {
        attr: { startOffset: "0%" },
        duration: 60,
        repeat: -1,
        ease: "none",
      });

      // Scroll acceleration effect
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top bottom",
        end: "bottom top",
        onUpdate: (self) => {
          const velocity = Math.abs(self.getVelocity() / 400);
          gsap.to(tl, { timeScale: 1 + velocity, duration: 0.6, ease: "power1.out" });
        },
      });
    }, containerRef);

    return () => ctx.revert(); // Clean up everything inside the context
  }, []);

  const textPart =
    "PRODUCT TEAMS ♧ GLOBAL SYNCS ♧ EDUCATION ♧ LEADERSHIP ♧ AI INSIGHTS ♧ SMART DECISIONS ";
  // Repeated many times to ensure no gaps during the -100% to 0% offset transition
  const fullText = Array(10).fill(textPart).join("");

  return (
    <div
      ref={containerRef}
      className="w-full overflow-hidden py-14 opacity-50 select-none pointer-events-none"
    >
      <svg viewBox="0 0 1000 180" className="w-[150%] md:w-full h-auto scale-110">
        <defs>
          <path
            id="wavePath"
            d="M-500,90 C-300,160 -150,20 0,90 C150,160 300,20 500,90 C700,160 850,20 1000,90 C1150,160 1300,20 1500,90"
          />
        </defs>
        <text className="fill-primary font-display font-black text-4xl md:text-5xl uppercase tracking-[0.15em]">
          <textPath ref={textPathRef} href="#wavePath" startOffset="-100%" spacing="auto">
            {fullText}
          </textPath>
        </text>
      </svg>
    </div>
  );
};

export const UseCases = () => (
  <section id="use-cases" className="py-32 relative overflow-hidden">
    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_50%_0%,rgba(16,185,129,0.05)_0%,transparent_50%)]" />

    <div className="container relative z-10">
      <motion.div {...fade} className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald/10 text-emerald text-[10px] font-black uppercase tracking-[0.3em] mb-6">
          Real-World Impact
        </div>
        <h2 className="text-4xl md:text-6xl font-bold font-display mb-6 tracking-tighter">
          Built for teams that turn <br className="hidden md:block" />{" "}
          <span className="text-gradient">conversations into action.</span>
        </h2>
      </motion.div>

      {/* Animated Path Divider */}
      <TextPathAnimation />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-10">
        {useCases.map((u, i) => (
          <motion.div
            key={u.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.8 }}
            className="group relative will-change-transform"
          >
            <div
              className={`absolute -inset-0.5 rounded-[2.5rem] bg-gradient-to-b from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm ${u.glow}`}
            />

            <div className="relative h-full p-8 md:p-10 rounded-[2.5rem] bg-[#020617]/80 backdrop-blur-lg border border-white/5 overflow-hidden flex flex-col justify-between hover:border-primary/20 transition-all duration-500 group-hover:-translate-y-2">
              {/* Background Glow */}
              <div
                className={`absolute top-0 right-0 w-40 h-40 ${u.image} blur-3xl opacity-30 group-hover:opacity-60 transition-opacity duration-500`}
              />

              <div>
                <div className="flex items-center justify-between mb-8">
                  <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white group-hover:scale-110 group-hover:bg-primary/10 group-hover:text-primary transition-all duration-500">
                    <u.icon className="w-6 h-6" />
                  </div>
                  <div className="px-3 py-1 rounded-full border border-white/5 bg-white/5 text-[9px] font-black uppercase tracking-widest text-white/40">
                    {u.label}
                  </div>
                </div>

                <h3 className="text-2xl md:text-3xl font-display font-bold mb-4 tracking-tight group-hover:text-primary transition-colors duration-300">
                  {u.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-8">{u.desc}</p>
              </div>

              <div className="flex items-center justify-between pt-6 border-t border-white/5">
                <div className="flex flex-col">
                  <span className="text-[9px] font-black text-white/30 uppercase tracking-[0.2em] mb-1">
                    Impact Metric
                  </span>
                  <span className="text-xs font-bold text-emerald group-hover:text-primary transition-colors">
                    {u.metric}
                  </span>
                </div>
                <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-primary group-hover:text-black transition-all duration-300">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export const Architecture = () => (
  <section id="architecture" className="py-28">
    <div className="container">
      <div className="grid lg:grid-cols-2 gap-16 items-center">
        <motion.div {...fade}>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald/10 text-emerald text-xs font-semibold mb-4">
            ARCHITECTURE
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-display mb-6">
            How the <span className="text-gradient">intelligence</span> flows
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg mb-8 leading-relaxed">
            MeetMind AI uses a sophisticated multi-stage system to transform raw audio into
            actionable intelligence. From local file processing to intelligent transcription.
          </p>
          <div className="space-y-4">
            {[
              {
                t: "Voice Intelligence",
                d: "Automatically detects and labels individual speakers.",
              },
              {
                t: "Smart Organization",
                d: "Content is organized logically for easy information retrieval.",
              },
              {
                t: "Action Extraction",
                d: "AI identifies key tasks, decisions, and future milestones.",
              },
            ].map((f) => (
              <div key={f.t} className="flex gap-4">
                <div className="w-6 h-6 rounded-full bg-emerald/10 flex items-center justify-center shrink-0 mt-1">
                  <Check className="w-3.5 h-3.5 text-emerald" />
                </div>
                <div>
                  <h4 className="font-bold text-sm">{f.t}</h4>
                  <p className="text-xs text-muted-foreground">{f.d}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
        <motion.div {...fade} className="relative">
          <div className="absolute -inset-4 bg-gradient-brand opacity-20 blur-3xl rounded-full" />
          <Card className="relative p-8 rounded-[2.5rem] bg-gradient-card border-border/60 shadow-float">
            <div className="space-y-6">
              {[
                { l: "Input", v: "Audio / Video Content", color: "bg-blue-500" },
                { l: "Stage 1", v: "High-Accuracy Transcription", color: "bg-emerald-500" },
                { l: "Stage 2", v: "Intelligent Organization", color: "bg-cyan-500" },
                { l: "Output", v: "Ready-to-Use Insights", color: "bg-primary" },
              ].map((s, i) => (
                <div key={s.l} className="relative">
                  <div className="flex items-center gap-4">
                    <div className={`w-3 h-3 rounded-full ${s.color} shadow-lg`} />
                    <div className="flex-1 p-3 rounded-xl bg-white/5 border border-white/10 shadow-soft">
                      <div className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">
                        {s.l}
                      </div>
                      <div className="text-sm font-bold">{s.v}</div>
                    </div>
                  </div>
                  {i < 3 && (
                    <div className="absolute left-[5px] top-6 w-px h-6 bg-gradient-to-b from-border/60 to-transparent" />
                  )}
                </div>
              ))}
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  </section>
);

export const FAQ = () => (
  <section id="faq" className="py-28">
    <div className="container max-w-3xl">
      <motion.div {...fade} className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-4">
          FAQ
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-display mb-4">
          Frequently asked <span className="text-gradient">questions</span>
        </h2>
      </motion.div>
      <Accordion type="single" collapsible className="space-y-3">
        {faqs.map((f, i) => (
          <AccordionItem
            key={i}
            value={`item-${i}`}
            className="bg-white/5 rounded-2xl border border-white/10 px-6 shadow-soft"
          >
            <AccordionTrigger className="text-left font-semibold hover:no-underline">
              {f.q}
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground leading-relaxed">
              {f.a}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  </section>
);

export const CTA = () => (
  <section className="py-32">
    <div className="container">
      <motion.div
        {...fade}
        className="relative overflow-hidden rounded-[3rem] sm:rounded-[4rem] bg-[#020617] border border-white/10 text-white p-10 md:p-24 text-center shadow-float"
      >
        {/* Abstract Background Effects */}
        <div className="absolute inset-0 bg-gradient-brand opacity-[0.03]" />
        <div className="absolute -top-48 -right-48 w-[600px] h-[600px] rounded-full bg-primary/10 blur-[80px] animate-pulse-glow will-change-[filter,transform]" />
        <div className="absolute -bottom-48 -left-48 w-[600px] h-[600px] rounded-full bg-emerald/10 blur-[80px] animate-pulse-glow will-change-[filter,transform]" />

        <div className="relative z-10 max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-primary text-[10px] font-black uppercase tracking-[0.3em] mb-8"
          >
            <Sparkles className="w-3.5 h-3.5" /> Final Frontier
          </motion.div>

          <h2 className="text-4xl md:text-7xl font-display font-bold mb-8 tracking-tighter leading-[0.9]">
            Ready to build the <span className="text-gradient">future?</span>
          </h2>

          <p className="text-white/50 text-lg md:text-xl mb-12 max-w-xl mx-auto leading-relaxed">
            Join the inner circle of engineers building next-generation meeting intelligence.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Button
              size="lg"
              className="group relative h-16 px-10 rounded-full bg-primary text-black font-black text-xs uppercase tracking-widest overflow-hidden transition-all duration-500 hover:scale-105 active:scale-95 shadow-emerald"
              asChild
            >
              <Link to="/dashboard">
                <span className="relative z-10 flex items-center gap-3">
                  Launch Dashboard{" "}
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity" />
              </Link>
            </Button>

            <button className="text-white/40 hover:text-white text-[11px] font-black uppercase tracking-[0.2em] transition-colors flex items-center gap-2 group">
              View Repository{" "}
              <Github className="w-4 h-4 group-hover:rotate-12 transition-transform" />
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  </section>
);

export const Footer = () => {
  const footerRef = useRef<HTMLDivElement>(null);
  const footerLinks = {
    product: [
      { name: "Features", href: "/docs#features" },
      { name: "Architecture", href: "/docs#architecture" },
      { name: "Workflow", href: "/#workflow" },
      { name: "Tech Stack", href: "/docs#tech-stack" },
    ],
    company: [
      { name: "About", href: "#" },
      { name: "Careers", href: "#" },
      { name: "Blog", href: "#" },
      { name: "Privacy", href: "#" },
    ],
    social: [
      { name: "Twitter", href: "#", icon: <Twitter className="w-4 h-4" /> },
      { name: "GitHub", href: "#", icon: <Github className="w-4 h-4" /> },
      { name: "LinkedIn", href: "#", icon: <Linkedin className="w-4 h-4" /> },
    ],
  };

  return (
    <footer
      id="contact"
      className="relative border-t border-white/5 pt-24 pb-12 bg-[#020617]/80 backdrop-blur-lg"
    >
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12 mb-20">
          {/* Brand Column */}
          <div className="space-y-6 flex flex-col items-center sm:items-start text-center sm:text-left">
            <Logo />
            <p className="text-white/50 text-sm leading-relaxed max-w-xs">
              Next-generation meeting intelligence. Transcribe, analyze, and automate your workflow
              with MeetMind AI.
            </p>
            <div className="flex gap-4">
              {footerLinks.social.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-primary hover:border-primary/50 hover:bg-primary/5 transition-all duration-300"
                >
                  {item.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Links Columns */}
          <div className="space-y-6 flex flex-col items-center sm:items-start text-center sm:text-left">
            <h4 className="text-white font-bold text-sm uppercase tracking-widest">Product</h4>
            <ul className="space-y-4">
              {footerLinks.product.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-white/40 hover:text-white text-sm transition-colors duration-300"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-6 flex flex-col items-center sm:items-start text-center sm:text-left">
            <h4 className="text-white font-bold text-sm uppercase tracking-widest">Resources</h4>
            <ul className="space-y-4">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-white/40 hover:text-white text-sm transition-colors duration-300"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-12 border-t border-white/5 flex flex-col lg:flex-row justify-between items-center gap-8">
          <p className="text-white/20 text-[10px] font-bold uppercase tracking-[0.3em] text-center lg:text-left">
            © 2026 MEETMIND AI
          </p>

          <p className="text-white/40 text-[10px] font-black uppercase tracking-[0.4em] text-center">
            Cooked and Served by <span className="text-primary">Vara</span>
          </p>

          <div className="flex flex-wrap justify-center gap-6 md:gap-8">
            <a
              href="#"
              className="text-white/20 hover:text-white text-[10px] font-bold uppercase tracking-widest transition-colors"
            >
              Terms
            </a>
            <a
              href="#"
              className="text-white/20 hover:text-white text-[10px] font-bold uppercase tracking-widest transition-colors"
            >
              Privacy
            </a>
            <a
              href="#"
              className="text-white/20 hover:text-white text-[10px] font-bold uppercase tracking-widest transition-colors"
            >
              Security
            </a>
          </div>
        </div>
      </div>

      {/* Brand Giant Text - Professional Parallax Pixel Design */}
      <div 
        ref={footerRef}
        className="mt-0 -mb-20 w-full overflow-hidden pointer-events-none select-none relative pb-10 flex justify-center items-center h-[40vh]"
      >
        <div className="relative flex justify-center items-center w-full">
          {"MEETMIND AI".split("").map((char, index) => {
            // Randomly decide if letter comes from top or bottom
            const direction = index % 2 === 0 ? 1 : -1;
            
            return (
              <motion.span
                key={index}
                initial={{ 
                  opacity: 0, 
                  y: direction * 150,
                  filter: "blur(10px) brightness(0)" 
                }}
                whileInView={{ 
                  opacity: 0.25, 
                  y: [direction * 10, -direction * 10], // Continuous float loop
                  filter: "blur(0px) brightness(1)" 
                }}
                viewport={{ once: false, margin: "-100px" }}
                transition={{
                  y: {
                    duration: 3 + (index % 3), // Staggered loop duration
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "easeInOut",
                    delay: index * 0.1
                  },
                  opacity: { duration: 1, delay: index * 0.04 },
                  filter: { duration: 1, delay: index * 0.04 }
                }}
                style={{
                  WebkitTextStroke: "1px rgba(255,255,255,1)",
                  color: "transparent",
                  translateX: (index - 5) * 8,
                }}
                className="text-[14vw] font-black leading-none tracking-[0.02em] whitespace-nowrap font-display uppercase scale-y-[4.5] origin-bottom inline-block hover:text-primary transition-colors duration-500"
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>
            );
          })}
          
          {/* Parallax Ghost Layer (Slightly Offset) */}
          <div className="absolute inset-0 flex justify-center items-center opacity-30 blur-[2px] pointer-events-none translate-y-4">
             {"MEETMIND AI".split("").map((char, index) => (
              <motion.span
                key={`ghost-${index}`}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 0.1 }}
                transition={{ delay: index * 0.06 + 0.2 }}
                style={{
                  WebkitTextStroke: "0.5px rgba(16,185,129,0.5)",
                  color: "transparent",
                }}
                className="text-[14vw] font-black leading-none tracking-[0.02em] whitespace-nowrap font-display uppercase scale-y-[4.5] origin-bottom inline-block"
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
          </div>
        </div>

        {/* Dynamic Scanline Overlay */}
        <motion.div 
          animate={{ 
            backgroundPosition: ["0% 0%", "0% 100%"],
          }}
          transition={{ 
            duration: 8, 
            repeat: Infinity, 
            ease: "linear" 
          }}
          className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(16,185,129,0.05)_50%)] bg-[length:100%_8px] mix-blend-screen opacity-40"
        />
        
        {/* Pixel Noise Overlay */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-repeat" />
      </div>
    </footer>
  );
};
