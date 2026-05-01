import { motion } from "framer-motion";
import { Mic, Sparkles, ListChecks, Calendar, Search, BarChart3, Upload, Brain, FileSearch, Send, Download, ArrowRight, Check, Star } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const fade = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.7 },
};

export const TrustedBy = () => (
  <section className="py-16 border-y border-border/40 bg-white/40 backdrop-blur-sm">
    <div className="container">
      <p className="text-center text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-8">
        Trusted by 12,000+ teams worldwide
      </p>
      <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6 opacity-60">
        {["NORTHWIND", "ACME CORP", "PIXELFORGE", "QUANTUM", "OBSIDIAN", "LUMEN", "VERTEX"].map((b) => (
          <span key={b} className="font-display font-bold tracking-widest text-foreground/60 text-lg">{b}</span>
        ))}
      </div>
    </div>
  </section>
);

const features = [
  { icon: Mic, title: "Audio Transcription", desc: "Industry-leading accuracy across 50+ languages with speaker diarization." },
  { icon: Sparkles, title: "Smart Summaries", desc: "GPT-powered TL;DRs that capture decisions, blockers, and outcomes." },
  { icon: ListChecks, title: "Task Extraction", desc: "Automatically detect action items with assignees and context." },
  { icon: Calendar, title: "Deadline Detection", desc: "Recognize time references and sync directly to your calendar." },
  { icon: Search, title: "RAG Search", desc: "Ask anything across your meeting library with semantic understanding." },
  { icon: BarChart3, title: "Team Analytics", desc: "Visualize speaking time, sentiment, and team productivity trends." },
];

export const Features = () => (
  <section id="features" className="py-28 relative">
    <div className="container">
      <motion.div {...fade} className="text-center max-w-2xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-4">
          FEATURES
        </div>
        <h2 className="text-4xl md:text-5xl font-bold font-display mb-4">Everything you need, <span className="text-gradient">nothing you don't</span></h2>
        <p className="text-muted-foreground text-lg">Built for teams that ship — from async standups to all-hands.</p>
      </motion.div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {features.map((f, i) => (
          <motion.div key={f.title} {...fade} transition={{ duration: 0.6, delay: i * 0.05 }}>
            <Card className="hover-lift h-full p-7 rounded-3xl border-border/60 bg-gradient-card group">
              <div className="w-12 h-12 rounded-2xl bg-gradient-brand flex items-center justify-center mb-5 shadow-soft group-hover:scale-110 transition-transform">
                <f.icon className="w-5 h-5 text-white" />
              </div>
              <h3 className="font-display font-bold text-xl mb-2">{f.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{f.desc}</p>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

const steps = [
  { icon: Upload, label: "Upload", color: "from-sky to-cyan" },
  { icon: Mic, label: "Transcribe", color: "from-cyan to-primary" },
  { icon: Brain, label: "Analyze", color: "from-primary to-cyan" },
  { icon: ListChecks, label: "Extract", color: "from-cyan to-emerald" },
  { icon: FileSearch, label: "Search", color: "from-emerald to-primary" },
  { icon: Download, label: "Export", color: "from-emerald to-sky" },
];

export const Workflow = () => (
  <section id="workflow" className="py-28 bg-gradient-to-b from-transparent via-white/60 to-transparent">
    <div className="container">
      <motion.div {...fade} className="text-center max-w-2xl mx-auto mb-20">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald/10 text-emerald text-xs font-semibold mb-4">
          WORKFLOW
        </div>
        <h2 className="text-4xl md:text-5xl font-bold font-display mb-4">From audio to action in <span className="text-gradient">minutes</span></h2>
      </motion.div>

      <div className="relative">
        {/* connecting line */}
        <div className="absolute top-10 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent hidden md:block" />
        <div className="grid grid-cols-2 md:grid-cols-6 gap-6 md:gap-2 relative">
          {steps.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="flex flex-col items-center text-center"
            >
              <div className={`relative w-20 h-20 rounded-3xl bg-gradient-to-br ${s.color} flex items-center justify-center shadow-float mb-4`}>
                <s.icon className="w-8 h-8 text-white" />
                <div className="absolute -top-1.5 -right-1.5 w-7 h-7 rounded-full bg-white border-2 border-primary text-primary text-xs font-bold flex items-center justify-center">{i+1}</div>
              </div>
              <div className="font-display font-bold">{s.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export const ProductDemo = () => (
  <section id="solutions" className="py-28">
    <div className="container">
      <motion.div {...fade} className="text-center max-w-2xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-4">PRODUCT</div>
        <h2 className="text-4xl md:text-5xl font-bold font-display mb-4">A workspace your team will <span className="text-gradient">actually love</span></h2>
        <p className="text-muted-foreground text-lg">A glance is all it takes to know what's happening — and what's next.</p>
      </motion.div>

      <motion.div {...fade} className="relative max-w-6xl mx-auto">
        <div className="absolute -inset-6 bg-gradient-brand opacity-20 blur-3xl rounded-[3rem]" />
        <div className="relative rounded-3xl overflow-hidden border border-white/60 shadow-float bg-gradient-card">
          <div className="grid md:grid-cols-[240px_1fr] min-h-[480px]">
            <div className="bg-navy text-white p-6 hidden md:block">
              <div className="font-display font-bold mb-6">MeetMind AI</div>
              {["Dashboard","Meetings","Tasks","AI Chat","Analytics","Settings"].map((it,i)=>(
                <div key={it} className={`text-sm py-2.5 px-3 rounded-xl mb-1 ${i===1?"bg-white/10 text-white":"text-white/60"}`}>{it}</div>
              ))}
            </div>
            <div className="p-8">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <div className="text-xs font-semibold text-muted-foreground mb-1">MEETINGS</div>
                  <h3 className="text-2xl font-display font-bold">Recent activity</h3>
                </div>
                <div className="flex gap-2">
                  <span className="text-xs px-3 py-1.5 rounded-full bg-emerald/10 text-emerald font-semibold">+24%</span>
                </div>
              </div>
              <div className="space-y-3">
                {[
                  { title: "Q4 Strategy Sync", time: "2h ago", actions: 12 },
                  { title: "Engineering Standup", time: "5h ago", actions: 4 },
                  { title: "Customer Discovery — Acme", time: "Yesterday", actions: 8 },
                  { title: "Design Review — Onboarding v2", time: "Yesterday", actions: 6 },
                ].map(m=>(
                  <div key={m.title} className="flex items-center justify-between p-4 rounded-2xl bg-muted/40 hover:bg-muted transition-colors">
                    <div>
                      <div className="font-semibold text-sm">{m.title}</div>
                      <div className="text-xs text-muted-foreground">{m.time}</div>
                    </div>
                    <span className="text-xs px-3 py-1 rounded-full bg-emerald/15 text-emerald font-semibold">{m.actions} actions</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  </section>
);

const testimonials = [
  { name: "Sarah Chen", role: "VP Product, Northwind", quote: "MeetMind cut our meeting follow-up time by 80%. It's now part of our weekly ritual.", rating: 5 },
  { name: "Marcus Reilly", role: "CTO, Pixelforge", quote: "The RAG search alone is worth it. We finally have a searchable memory of every decision.", rating: 5 },
  { name: "Aisha Patel", role: "Head of Ops, Quantum", quote: "Action items used to vanish into Slack. Now they show up in Jira automatically.", rating: 5 },
];

export const Testimonials = () => (
  <section id="testimonials" className="py-28">
    <div className="container">
      <motion.div {...fade} className="text-center max-w-2xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald/10 text-emerald text-xs font-semibold mb-4">LOVED BY TEAMS</div>
        <h2 className="text-4xl md:text-5xl font-bold font-display mb-4">Built for teams that <span className="text-gradient">ship</span></h2>
      </motion.div>
      <div className="grid md:grid-cols-3 gap-5">
        {testimonials.map((t, i) => (
          <motion.div key={t.name} {...fade} transition={{ delay: i * 0.1, duration: 0.6 }}>
            <Card className="glass p-7 rounded-3xl h-full hover-lift border-white/60">
              <div className="flex gap-0.5 mb-4">{Array.from({ length: t.rating }).map((_, i) => (<Star key={i} className="w-4 h-4 fill-emerald text-emerald" />))}</div>
              <p className="text-foreground/80 mb-6 leading-relaxed">"{t.quote}"</p>
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full bg-gradient-brand text-white flex items-center justify-center font-bold">{t.name[0]}</div>
                <div>
                  <div className="font-semibold text-sm">{t.name}</div>
                  <div className="text-xs text-muted-foreground">{t.role}</div>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

const tiers = [
  { name: "Starter", price: "0", desc: "For individuals exploring AI meetings", features: ["5 meetings / month", "Basic transcription", "AI summaries", "Email support"], cta: "Start Free" },
  { name: "Pro", price: "29", desc: "For growing teams that ship daily", features: ["Unlimited meetings", "Advanced RAG search", "Task & calendar sync", "Integrations (Notion, Jira, Slack)", "Priority support"], cta: "Start Pro Trial", featured: true },
  { name: "Enterprise", price: "Custom", desc: "For organizations with scale needs", features: ["SSO / SAML", "On-prem deployment", "Custom retention", "SLA & dedicated CSM", "Audit logs"], cta: "Contact Sales" },
];

export const Pricing = () => (
  <section id="pricing" className="py-28 bg-gradient-to-b from-transparent via-white/40 to-transparent">
    <div className="container">
      <motion.div {...fade} className="text-center max-w-2xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-4">PRICING</div>
        <h2 className="text-4xl md:text-5xl font-bold font-display mb-4">Simple, <span className="text-gradient">transparent pricing</span></h2>
        <p className="text-muted-foreground text-lg">Free for individuals. Scale as your team grows.</p>
      </motion.div>
      <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {tiers.map((t, i) => (
          <motion.div key={t.name} {...fade} transition={{ delay: i * 0.1, duration: 0.6 }}>
            <Card className={`p-8 rounded-3xl h-full relative ${t.featured ? "bg-navy text-white border-0 shadow-float scale-[1.03]" : "bg-gradient-card border-border/60"}`}>
              {t.featured && <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-emerald text-white text-xs font-bold shadow-emerald">MOST POPULAR</div>}
              <div className={`text-sm font-semibold mb-2 ${t.featured ? "text-white/70" : "text-muted-foreground"}`}>{t.name}</div>
              <div className="flex items-baseline gap-1 mb-2">
                <span className="text-5xl font-display font-black">{t.price === "Custom" ? "Custom" : `$${t.price}`}</span>
                {t.price !== "Custom" && t.price !== "0" && <span className={`text-sm ${t.featured ? "text-white/70" : "text-muted-foreground"}`}>/mo</span>}
              </div>
              <p className={`text-sm mb-6 ${t.featured ? "text-white/70" : "text-muted-foreground"}`}>{t.desc}</p>
              <Button className={`w-full rounded-full mb-6 ${t.featured ? "bg-emerald hover:bg-emerald/90 text-white border-0" : "bg-gradient-brand text-white border-0"}`}>{t.cta}</Button>
              <ul className="space-y-3">
                {t.features.map(f => (
                  <li key={f} className="flex items-start gap-2 text-sm">
                    <Check className={`w-4 h-4 mt-0.5 shrink-0 ${t.featured ? "text-emerald" : "text-emerald"}`} />
                    <span className={t.featured ? "text-white/90" : ""}>{f}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

const faqs = [
  { q: "How does MeetMind handle privacy?", a: "All recordings are encrypted at rest and in transit. We're SOC 2 Type II certified, GDPR compliant, and offer EU data residency on Pro and Enterprise plans." },
  { q: "Which platforms do you integrate with?", a: "Zoom, Google Meet, Microsoft Teams, Notion, Jira, Slack, Linear, Asana, and Google Calendar — with webhooks for everything else." },
  { q: "Can I bring my own model?", a: "Enterprise customers can deploy with private OpenAI, Azure OpenAI, or self-hosted Llama models on their own infrastructure." },
  { q: "What languages are supported?", a: "Transcription works in 50+ languages with automatic detection. Summaries and chat are available in 30+ languages." },
  { q: "Is there a free trial?", a: "Yes — every paid plan starts with a 14-day free trial. No credit card required." },
];

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
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">Ready to turn meetings into momentum?</h2>
          <p className="text-white/70 text-lg mb-8 max-w-xl mx-auto">Join 12,000+ teams shipping faster with MeetMind AI.</p>
          <Button size="lg" className="rounded-full bg-emerald hover:bg-emerald/90 text-white border-0 h-13 px-8 shadow-emerald">
            Start Free Trial <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        </div>
      </motion.div>
    </div>
  </section>
);

export const Footer = () => (
  <footer id="contact" className="border-t border-border/40 py-16 bg-white/40">
    <div className="container">
      <div className="grid md:grid-cols-5 gap-10 mb-12">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-9 h-9 rounded-xl bg-gradient-brand flex items-center justify-center">
              <Brain className="w-5 h-5 text-white" />
            </div>
            <span className="font-display font-bold">MeetMind <span className="text-gradient">AI</span></span>
          </div>
          <p className="text-sm text-muted-foreground max-w-sm mb-4">AI-powered meeting intelligence for modern teams. Turn every conversation into action.</p>
          <div className="flex gap-2">
            <input className="bg-white rounded-full px-4 py-2 text-sm border border-border w-full max-w-xs" placeholder="you@company.com" />
            <Button size="sm" className="rounded-full bg-gradient-brand border-0">Subscribe</Button>
          </div>
        </div>
        {[
          { title: "Product", links: ["Features", "Pricing", "Integrations", "Changelog", "Roadmap"] },
          { title: "Company", links: ["About", "Blog", "Careers", "Press", "Contact"] },
          { title: "Resources", links: ["Docs", "API", "Status", "Security", "Privacy"] },
        ].map(c => (
          <div key={c.title}>
            <div className="font-display font-semibold mb-3 text-sm">{c.title}</div>
            <ul className="space-y-2">
              {c.links.map(l => <li key={l}><a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">{l}</a></li>)}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-border/40 pt-6 flex flex-col md:flex-row justify-between items-center gap-3 text-xs text-muted-foreground">
        <div>© 2026 MeetMind AI. All rights reserved.</div>
        <div className="flex gap-5">
          <a href="#" className="hover:text-foreground">Terms</a>
          <a href="#" className="hover:text-foreground">Privacy</a>
          <a href="#" className="hover:text-foreground">Cookies</a>
        </div>
      </div>
    </div>
  </footer>
);
