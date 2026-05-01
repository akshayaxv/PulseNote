import { motion } from "framer-motion";
import { Mic, Sparkles, ListChecks, Calendar, Search, BarChart3, Upload, Brain, ArrowRight, Check, Star, LayoutGrid, Zap, Users, FileText } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const fade = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.7 },
};

const faqs = [
  { q: "How does the AI handle privacy?", a: "MeetMind AI processes all data with enterprise-grade encryption. As a portfolio project, no data is permanently stored or sold." },
  { q: "What is the RAG pipeline?", a: "Retrieval-Augmented Generation (RAG) allows the AI to search through your specific meeting history to provide contextually accurate answers." },
  { q: "Can it handle long lectures?", a: "Yes, the pipeline is optimized for audio files up to 2 hours long, with automatic chapter generation." },
];

const features = [
  { 
    icon: Mic, 
    title: "Audio Transcription", 
    desc: "Industry-leading accuracy with 50+ languages and speaker diarization.",
    span: "col-span-1 md:col-span-2",
    img: "bg-gradient-to-br from-sky/20 to-transparent"
  },
  { 
    icon: Sparkles, 
    title: "Smart Summaries", 
    desc: "GPT-powered TL;DRs that capture context, not just keywords.",
    span: "col-span-1",
    img: "bg-gradient-to-br from-emerald/20 to-transparent"
  },
  { 
    icon: ListChecks, 
    title: "Task Extraction", 
    desc: "AI detects action items and assigns them instantly.",
    span: "col-span-1",
    img: "bg-gradient-to-br from-primary/20 to-transparent"
  },
  { 
    icon: Search, 
    title: "RAG Search", 
    desc: "Ask anything across your entire meeting history with semantic AI.",
    span: "col-span-1 md:col-span-2",
    img: "bg-gradient-to-br from-cyan/20 to-transparent"
  },
  { 
    icon: BarChart3, 
    title: "Team Analytics", 
    desc: "Visualize speaking patterns, sentiment, and productivity velocity.",
    span: "col-span-1 md:col-span-3",
    img: "bg-gradient-to-br from-navy/10 to-transparent"
  },
];

export const Features = () => (
  <section id="features" className="py-28 relative overflow-hidden">
    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 blur-[120px] -z-10 rounded-full" />
    <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-emerald/5 blur-[120px] -z-10 rounded-full" />
    
    <div className="container">
      <motion.div {...fade} className="text-center max-w-3xl mx-auto mb-20">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-[10px] font-black uppercase tracking-[0.2em] mb-6">
          <Sparkles className="w-3 h-3" /> Core Capabilities
        </div>
        <h2 className="text-4xl md:text-6xl font-bold font-display mb-6 tracking-tight">
          Intelligent infrastructure for <span className="text-gradient">modern teams.</span>
        </h2>
        <p className="text-muted-foreground text-lg md:text-xl font-medium">
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
              <div className={`absolute inset-0 ${f.img} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
              <div>
                <div className="w-14 h-14 rounded-2xl bg-gradient-brand flex items-center justify-center mb-6 shadow-float group-hover:scale-110 transition-all duration-500">
                  <f.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-display font-bold text-2xl mb-3 tracking-tight">{f.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed font-medium max-w-[240px]">{f.desc}</p>
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
  { icon: Upload, label: "Upload", color: "bg-sky", desc: "MP3, WAV, MP4" },
  { icon: Mic, label: "Transcribe", color: "bg-cyan", desc: "50+ Languages" },
  { icon: Brain, label: "Analyze", color: "bg-primary", desc: "Contextual RAG" },
  { icon: ListChecks, label: "Extract", color: "bg-emerald", desc: "Action Items" },
];

export const Workflow = () => (
  <section id="workflow" className="py-28 relative">
    <div className="container">
      <div className="glass p-12 md:p-20 rounded-[3rem] border-white/60 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 blur-[80px]" />
        
        <motion.div {...fade} className="text-center max-w-2xl mx-auto mb-20 relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald/10 text-emerald text-[10px] font-black uppercase tracking-[0.2em] mb-6">
            Autonomous Pipeline
          </div>
          <h2 className="text-4xl md:text-5xl font-bold font-display mb-6 tracking-tight">
            From audio to action in <span className="text-gradient">minutes</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 relative z-10">
          {steps.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="flex flex-col items-center text-center group"
            >
              <div className={`relative w-24 h-24 rounded-[2rem] ${s.color} flex items-center justify-center shadow-float mb-6 group-hover:scale-110 transition-transform duration-500`}>
                <s.icon className="w-10 h-10 text-white" />
                <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-white border-4 border-navy text-navy text-[10px] font-black flex items-center justify-center shadow-soft">
                  0{i+1}
                </div>
              </div>
              <div className="font-display font-bold text-xl mb-1 tracking-tight">{s.label}</div>
              <div className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">{s.desc}</div>
              
              {i < steps.length - 1 && (
                <div className="hidden md:block absolute top-12 left-[calc(100%/8+2rem+i*(100%/4))] w-[calc(100%/4-6rem)] h-px bg-gradient-to-r from-primary/30 to-transparent" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export const ProductDemo = () => (
  <section id="solutions" className="py-28">
    <div className="container text-center">
      <motion.div {...fade} className="max-w-2xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-4">SYSTEM PREVIEW</div>
        <h2 className="text-4xl md:text-5xl font-bold font-display mb-4">A dashboard built for <span className="text-gradient">insights</span></h2>
      </motion.div>
      <motion.div {...fade} className="relative max-w-5xl mx-auto">
        <div className="absolute -inset-6 bg-gradient-brand opacity-20 blur-3xl rounded-[3rem]" />
        <Card className="relative p-2 rounded-3xl bg-white/50 border border-white/60 shadow-float backdrop-blur-sm overflow-hidden">
          <div className="aspect-video bg-navy rounded-2xl flex items-center justify-center">
             <div className="text-white/20 font-display font-black text-4xl">DASHBOARD_PREVIEW.JSX</div>
          </div>
        </Card>
      </motion.div>
    </div>
  </section>
);

const techStack = [
  { name: "React 18", desc: "Modern UI library for reactive components", icon: LayoutGrid, color: "text-blue-400" },
  { name: "Bun / Vite", desc: "Ultra-fast build tool and runtime", icon: Zap, color: "text-amber-400" },
  { name: "OpenAI Whisper", desc: "State-of-the-art speech-to-text", icon: Mic, color: "text-emerald-400" },
  { name: "GPT-4o", desc: "Advanced reasoning for summarization", icon: Brain, color: "text-primary" },
  { name: "RAG Pipeline", desc: "Semantic search across meeting history", icon: Search, color: "text-cyan-400" },
  { name: "Framer Motion", desc: "Production-ready animations", icon: Sparkles, color: "text-pink-400" },
];

export const TechStack = () => (
  <section id="tech-stack" className="py-28 relative overflow-hidden">
    <div className="container">
      <motion.div {...fade} className="text-center max-w-2xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-4">ENGINEERING</div>
        <h2 className="text-4xl md:text-5xl font-bold font-display mb-4">Built with a <span className="text-gradient">modern stack</span></h2>
        <p className="text-muted-foreground text-lg">Leveraging cutting-edge tools for speed, intelligence, and a premium UX.</p>
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
  { title: "Academic Lectures", desc: "Transcribe long lectures and extract key concepts and study notes automatically.", icon: FileText },
  { title: "Team Syncs", desc: "Convert messy standups into clear action items and assignees for the next sprint.", icon: Users },
  { title: "Research Interviews", desc: "Analyze qualitative data from interviews with semantic search and sentiment analysis.", icon: Search },
];

export const UseCases = () => (
  <section id="use-cases" className="py-28 bg-navy text-white relative overflow-hidden rounded-[4rem] my-10 mx-4">
    <div className="absolute inset-0 bg-gradient-brand opacity-10" />
    <div className="container relative z-10">
      <motion.div {...fade} className="text-center max-w-2xl mx-auto mb-16">
        <h2 className="text-4xl md:text-5xl font-bold font-display mb-4">Perfect for <span className="text-emerald">any workflow</span></h2>
        <p className="text-white/60 text-lg">Whether you're a student, researcher, or developer.</p>
      </motion.div>
      <div className="grid md:grid-cols-3 gap-8">
        {useCases.map((u, i) => (
          <motion.div key={u.title} {...fade} transition={{ delay: i * 0.1 }}>
            <div className="p-8 rounded-[2rem] bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
              <u.icon className="w-10 h-10 text-emerald mb-6" />
              <h4 className="text-xl font-display font-bold mb-3">{u.title}</h4>
              <p className="text-sm text-white/50 leading-relaxed">{u.desc}</p>
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
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald/10 text-emerald text-xs font-semibold mb-4">ARCHITECTURE</div>
          <h2 className="text-4xl md:text-5xl font-bold font-display mb-6">How the <span className="text-gradient">intelligence</span> flows</h2>
          <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
            MeetMind AI uses a sophisticated multi-stage pipeline to transform raw audio into actionable intelligence. 
            From local file processing to cloud-based neural transcription.
          </p>
          <div className="space-y-4">
            {[
              { t: "Speech Processing", d: "Whisper-v3 diarization for speaker identification." },
              { t: "Vector Indexing", d: "Content is embedded for semantic search via RAG." },
              { t: "Action Extraction", d: "GPT-4o reasons over context to find tasks and risks." },
            ].map(f => (
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
                    <div className="flex-1 p-3 rounded-xl bg-white border border-border/40 shadow-soft">
                      <div className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">{s.l}</div>
                      <div className="text-sm font-bold">{s.v}</div>
                    </div>
                  </div>
                  {i < 3 && <div className="absolute left-[5px] top-6 w-px h-6 bg-gradient-to-b from-border/60 to-transparent" />}
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
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-4">FAQ</div>
        <h2 className="text-4xl md:text-5xl font-bold font-display mb-4">Frequently asked <span className="text-gradient">questions</span></h2>
      </motion.div>
      <Accordion type="single" collapsible className="space-y-3">
        {faqs.map((f, i) => (
          <AccordionItem key={i} value={`item-${i}`} className="bg-white rounded-2xl border border-border/50 px-6 shadow-soft">
            <AccordionTrigger className="text-left font-semibold hover:no-underline">{f.q}</AccordionTrigger>
            <AccordionContent className="text-muted-foreground leading-relaxed">{f.a}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  </section>
);

export const CTA = () => (
  <section className="py-20">
    <div className="container">
      <motion.div {...fade} className="relative overflow-hidden rounded-[2.5rem] bg-navy text-white p-12 md:p-16 text-center">
        <div className="absolute inset-0 bg-gradient-brand opacity-30" />
        <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-emerald/30 blur-3xl" />
        <div className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-primary/30 blur-3xl" />
        <div className="relative">
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">Ready to build the future?</h2>
          <p className="text-white/70 text-lg mb-8 max-w-xl mx-auto">Explore the project and see how AI can transform productivity.</p>
          <Button size="lg" className="rounded-full bg-emerald hover:bg-emerald/90 text-white border-0 h-13 px-8 shadow-emerald" asChild>
            <Link to="/dashboard">Explore Dashboard <ArrowRight className="ml-2 w-4 h-4" /></Link>
          </Button>
        </div>
      </motion.div>
    </div>
  </section>
);

export const Footer = () => (
  <footer id="contact" className="border-t border-border/40 py-16 bg-white/40">
    <div className="container text-center">
      <div className="flex items-center justify-center gap-2 mb-6">
        <div className="w-10 h-10 rounded-xl bg-gradient-brand flex items-center justify-center shadow-soft">
          <Brain className="w-6 h-6 text-white" />
        </div>
        <span className="font-display font-black text-xl">MeetMind <span className="text-gradient">AI</span></span>
      </div>
      <p className="text-muted-foreground max-w-sm mx-auto mb-8">Built as a high-fidelity AI demonstration for a postgraduate portfolio. Focused on UX and Intelligence.</p>
      <div className="flex justify-center gap-8 text-xs font-bold text-muted-foreground uppercase tracking-[0.2em]">
        <a href="#features" className="hover:text-primary transition-colors">Features</a>
        <a href="#architecture" className="hover:text-primary transition-colors">Architecture</a>
        <a href="#tech-stack" className="hover:text-primary transition-colors">Stack</a>
      </div>
      <div className="mt-12 pt-8 border-t border-border/20 text-[10px] text-muted-foreground font-medium uppercase tracking-tighter">
        © 2026 MeetMind AI · Designed for Excellence
      </div>
    </div>
  </footer>
);


