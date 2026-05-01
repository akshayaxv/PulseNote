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
    a: "MeetMind AI processes all data with enterprise-grade encryption. As a portfolio project, no data is permanently stored or sold.",
  },
  {
    q: "What is the RAG pipeline?",
    a: "Retrieval-Augmented Generation (RAG) allows the AI to search through your specific meeting history to provide contextually accurate answers.",
  },
  {
    q: "Can it handle long lectures?",
    a: "Yes, the pipeline is optimized for audio files up to 2 hours long, with automatic chapter generation.",
  },
];

const features = [
  {
    icon: Mic,
    title: "Audio Transcription",
    desc: "Industry-leading accuracy with 50+ languages and speaker diarization.",
    span: "col-span-1 md:col-span-2",
    img: "bg-gradient-to-br from-sky/20 to-transparent",
  },
  {
    icon: Sparkles,
    title: "Smart Summaries",
    desc: "GPT-powered TL;DRs that capture context, not just keywords.",
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
    title: "RAG Search",
    desc: "Ask anything across your entire meeting history with semantic AI.",
    span: "col-span-1 md:col-span-2",
    img: "bg-gradient-to-br from-cyan/20 to-transparent",
  },
  {
    icon: BarChart3,
    title: "Team Analytics",
    desc: "Visualize speaking patterns, sentiment, and productivity velocity.",
    span: "col-span-1 md:col-span-3",
    img: "bg-gradient-to-br from-navy/10 to-transparent",
  },
];

export const Features = () => (
    <section id="features" className="py-28 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 md:w-[500px] md:h-[500px] bg-primary/5 blur-[60px] md:blur-[120px] -z-10 rounded-full" />
      <div className="absolute bottom-0 left-0 w-64 h-64 md:w-[500px] md:h-[500px] bg-emerald/5 blur-[60px] md:blur-[120px] -z-10 rounded-full" />

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
            className={f.span}
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
    label: "Ingest", 
    color: "from-sky to-blue-600", 
    desc: "Cloud-native upload with automatic file sanitization.",
    details: ["MP3 / WAV / MP4", "Local Encryption", "Fast Caching"]
  },
  { 
    icon: Mic, 
    label: "Transcribe", 
    color: "from-cyan to-emerald", 
    desc: "Neural diarization with Whisper-v3 precision.",
    details: ["Speaker ID", "50+ Languages", "Timestamp Sync"]
  },
  { 
    icon: Brain, 
    label: "Analyze", 
    color: "from-primary to-purple-600", 
    desc: "Contextual reasoning via advanced RAG pipelines.",
    details: ["Semantic Search", "Insight Map", "Risk Detection"]
  },
  { 
    icon: ListChecks, 
    label: "Automate", 
    color: "from-emerald to-teal-600", 
    desc: "Instant task extraction and workflow triggers.",
    details: ["Action Items", "Auto-Assign", "Export Logic"]
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
          A multi-stage neural pipeline designed for speed and contextual accuracy.
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
                ease: [0.22, 1, 0.36, 1] 
              }}
              className="group relative"
            >
            {/* Connecting Thread (Mobile) */}
            {i < steps.length - 1 && (
              <div className="absolute left-1/2 bottom-[-1.5rem] w-px h-6 bg-gradient-to-b from-white/10 to-transparent md:hidden" />
            )}

            <div className="relative h-full glass-dark p-8 rounded-[2.5rem] border-white/5 group-hover:border-white/10 transition-all duration-500 flex flex-col items-center text-center">
              {/* Animated Progress Ring */}
              <div className="absolute -inset-0.5 rounded-[2.5rem] bg-gradient-to-b from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm" />
              
              {/* Step Icon */}
              <div className={`relative w-20 h-20 rounded-[1.8rem] bg-gradient-to-br ${s.color} flex items-center justify-center shadow-glow-emerald mb-8 group-hover:scale-110 transition-transform duration-500`}>
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
                {s.details.map(detail => (
                  <span key={detail} className="px-2 py-0.5 rounded-md bg-white/5 border border-white/5 text-[8px] font-bold text-white/40 uppercase tracking-widest whitespace-nowrap">
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


export const ProductDemo = () => (
  <section id="solutions" className="py-28">
    <div className="container text-center">
      <motion.div {...fade} className="max-w-2xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-4">
          SYSTEM PREVIEW
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-display mb-4">
          A dashboard built for <span className="text-gradient">insights</span>
        </h2>
      </motion.div>
      <motion.div {...fade} className="relative max-w-5xl mx-auto px-4 sm:px-0">
        <div className="absolute -inset-2 sm:-inset-6 bg-gradient-brand opacity-20 blur-3xl rounded-[3rem]" />
        <Card className="relative p-2 rounded-3xl bg-white/5 border border-white/10 shadow-float backdrop-blur-sm overflow-hidden">
          <div className="aspect-video bg-navy rounded-2xl flex items-center justify-center">
            <div className="text-white/20 font-display font-black text-4xl">
              DASHBOARD_PREVIEW.JSX
            </div>
          </div>
        </Card>
      </motion.div>
    </div>
  </section>
);

const techStack = [
  {
    name: "React 18",
    desc: "Modern UI library for reactive components",
    icon: LayoutGrid,
    color: "text-blue-400",
  },
  {
    name: "Bun / Vite",
    desc: "Ultra-fast build tool and runtime",
    icon: Zap,
    color: "text-amber-400",
  },
  {
    name: "OpenAI Whisper",
    desc: "State-of-the-art speech-to-text",
    icon: Mic,
    color: "text-emerald-400",
  },
  {
    name: "GPT-4o",
    desc: "Advanced reasoning for summarization",
    icon: Brain,
    color: "text-primary",
  },
  {
    name: "RAG Pipeline",
    desc: "Semantic search across meeting history",
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
    desc: "Convert messy, multi-timezone standups into structured action items. AI detects blockers and automatically notifies relevant stakeholders.",
    icon: Users,
    glow: "shadow-emerald/20",
    metric: "90% Faster Synthesis",
    image: "bg-gradient-to-br from-emerald/10 via-transparent to-transparent"
  },
  {
    title: "Academic Research",
    label: "Education",
    desc: "Transcribe 2-hour long lectures and instantly query them with RAG. Extract citations, key concepts, and generated flashcards.",
    icon: FileText,
    glow: "shadow-primary/20",
    metric: "Instant Indexing",
    image: "bg-gradient-to-br from-primary/10 via-transparent to-transparent"
  },
  {
    title: "Executive Strategy",
    label: "Leadership",
    desc: "Distill high-stakes board meetings into risk assessments and strategic milestones. Private, secure, and locally-processed intelligence.",
    icon: ShieldCheck,
    glow: "shadow-cyan/20",
    metric: "Zero-Leak Architecture",
    image: "bg-gradient-to-br from-cyan/10 via-transparent to-transparent"
  },
];

export const UseCases = () => (
  <section
    id="use-cases"
    className="py-32 relative overflow-hidden"
  >
    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_50%_0%,rgba(16,185,129,0.05)_0%,transparent_50%)]" />
    
    <div className="container relative z-10">
      <motion.div {...fade} className="text-center max-w-3xl mx-auto mb-20">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald/10 text-emerald text-[10px] font-black uppercase tracking-[0.3em] mb-6">
          Real-World Impact
        </div>
        <h2 className="text-4xl md:text-6xl font-bold font-display mb-6 tracking-tighter">
          Intelligence for <br className="hidden md:block" /> <span className="text-gradient">every high-stakes environment.</span>
        </h2>
        <p className="text-muted-foreground text-lg font-medium leading-relaxed">
          From the classroom to the boardroom, MeetMind AI adapts to your specific neural workflow.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {useCases.map((u, i) => (
          <motion.div
            key={u.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.8 }}
            className="group relative"
          >
            <div className={`absolute -inset-0.5 rounded-[2.5rem] bg-gradient-to-b from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm ${u.glow}`} />
            
            <div className="relative h-full p-8 md:p-10 rounded-[2.5rem] bg-[#020617] border border-white/5 overflow-hidden flex flex-col justify-between hover:border-white/10 transition-all duration-500">
              {/* Background Glow */}
              <div className={`absolute top-0 right-0 w-40 h-40 ${u.image} blur-3xl opacity-50 group-hover:opacity-100 transition-opacity duration-500`} />
              
              <div>
                <div className="flex items-center justify-between mb-8">
                  <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-500">
                    <u.icon className="w-6 h-6" />
                  </div>
                  <div className="px-3 py-1 rounded-full border border-white/5 bg-white/5 text-[9px] font-black uppercase tracking-widest text-white/40">
                    {u.label}
                  </div>
                </div>
                
                <h3 className="text-2xl md:text-3xl font-display font-bold mb-4 tracking-tight group-hover:text-primary transition-colors duration-300">
                  {u.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-8">
                  {u.desc}
                </p>
              </div>

              <div className="flex items-center justify-between pt-6 border-t border-white/5">
                <div className="flex flex-col">
                  <span className="text-[9px] font-black text-white/30 uppercase tracking-[0.2em] mb-1">Impact Metric</span>
                  <span className="text-xs font-bold text-emerald">{u.metric}</span>
                </div>
                <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-primary group-hover:text-black transition-all duration-300">
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
            MeetMind AI uses a sophisticated multi-stage pipeline to transform raw audio into
            actionable intelligence. From local file processing to cloud-based neural transcription.
          </p>
          <div className="space-y-4">
            {[
              { t: "Speech Processing", d: "Whisper-v3 diarization for speaker identification." },
              { t: "Vector Indexing", d: "Content is embedded for semantic search via RAG." },
              { t: "Action Extraction", d: "GPT-4o reasons over context to find tasks and risks." },
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
                { l: "Input", v: "Audio / Video File", color: "bg-blue-500" },
                { l: "Stage 1", v: "AI Transcription (Whisper)", color: "bg-emerald-500" },
                { l: "Stage 2", v: "Semantic Embedding (RAG)", color: "bg-cyan-500" },
                { l: "Output", v: "Tasks & Insights (GPT-4)", color: "bg-primary" },
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
  <section className="py-20">
    <div className="container">
      <motion.div
        {...fade}
        className="relative overflow-hidden rounded-[2.5rem] bg-navy text-white p-12 md:p-16 text-center"
      >
        <div className="absolute inset-0 bg-gradient-brand opacity-30" />
        <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-emerald/30 blur-3xl" />
        <div className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-primary/30 blur-3xl" />
        <div className="relative">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold mb-4">
            Ready to build the future?
          </h2>
          <p className="text-white/70 text-lg mb-8 max-w-xl mx-auto">
            Explore the project and see how AI can transform productivity.
          </p>
          <Button
            size="lg"
            className="rounded-full bg-emerald hover:bg-emerald/90 text-white border-0 h-13 px-8 shadow-emerald"
            asChild
          >
            <Link to="/dashboard">
              Explore Dashboard <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </Button>
        </div>
      </motion.div>
    </div>
  </section>
);

export const Footer = () => {
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
    <footer id="contact" className="relative border-t border-white/5 pt-24 pb-12 bg-[#020617]/80 backdrop-blur-xl">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12 mb-20">
          {/* Brand Column */}
          <div className="space-y-6 flex flex-col items-center sm:items-start text-center sm:text-left">
            <Logo />
            <p className="text-white/50 text-sm leading-relaxed max-w-xs">
              Next-generation meeting intelligence. Transcribe, analyze, and automate your workflow with MeetMind AI.
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
                  <a href={link.href} className="text-white/40 hover:text-white text-sm transition-colors duration-300">
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
                  <a href={link.href} className="text-white/40 hover:text-white text-sm transition-colors duration-300">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
          <p className="text-white/20 text-[10px] font-bold uppercase tracking-[0.3em] text-center md:text-left">
            © 2026 MEETMIND AI · DESIGNED FOR EXCELLENCE
          </p>
          <div className="flex flex-wrap justify-center gap-6 md:gap-8">
            <a href="#" className="text-white/20 hover:text-white text-[10px] font-bold uppercase tracking-widest transition-colors">Terms</a>
            <a href="#" className="text-white/20 hover:text-white text-[10px] font-bold uppercase tracking-widest transition-colors">Privacy</a>
            <a href="#" className="text-white/20 hover:text-white text-[10px] font-bold uppercase tracking-widest transition-colors">Security</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
