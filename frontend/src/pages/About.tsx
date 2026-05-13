import { motion } from "framer-motion";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Sections";
import { ScrollToTop } from "@/components/landing/ScrollToTop";
import {
  GraduationCap,
  Code2,
  Brain,
  Rocket,
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  Sparkles,
  Coffee,
  Layers,
  Zap,
} from "lucide-react";

const fade = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
};

const skills = [
  { name: "React & TypeScript", icon: Code2, color: "text-blue-400", bg: "bg-blue-500/10 border-blue-500/20" },
  { name: "Python & FastAPI", icon: Zap, color: "text-yellow-400", bg: "bg-yellow-500/10 border-yellow-500/20" },
  { name: "AI / LLM Integration", icon: Brain, color: "text-primary", bg: "bg-primary/10 border-primary/20" },
  { name: "Full-Stack Systems", icon: Layers, color: "text-emerald-400", bg: "bg-emerald-500/10 border-emerald-500/20" },
  { name: "UI/UX Design", icon: Sparkles, color: "text-pink-400", bg: "bg-pink-500/10 border-pink-500/20" },
  { name: "Cloud & Deployment", icon: Rocket, color: "text-cyan-400", bg: "bg-cyan-500/10 border-cyan-500/20" },
];

const timeline = [
  {
    year: "2024",
    title: "Started MeetMind AI",
    desc: "Identified the problem of information loss in meetings. Started building a solution as a personal project during university.",
    icon: Coffee,
  },
  {
    year: "2024",
    title: "Core Transcription Engine",
    desc: "Integrated OpenAI Whisper for high-accuracy speech-to-text. Built the first working prototype with basic summarization.",
    icon: Brain,
  },
  {
    year: "2025",
    title: "Full-Stack Launch",
    desc: "Rebuilt with React 18 + FastAPI backend. Added AI chat, action item extraction, and user authentication.",
    icon: Rocket,
  },
  {
    year: "2025",
    title: "Production Ready",
    desc: "Optimized for performance, added mobile support, and polished the UI to a premium standard. Deployed to the web.",
    icon: Sparkles,
  },
];

const About = () => {
  return (
    <div className="min-h-screen bg-[#020617] text-white selection:bg-primary/30">
      <Navbar />
      <ScrollToTop />

      {/* Hero */}
      <section className="relative pt-40 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/5 blur-[120px] pointer-events-none" />
        <div className="container relative z-10 text-center">
          <motion.div {...fade}>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-dark mb-6 text-[10px] font-black uppercase tracking-[0.3em] border border-white/10 text-primary">
              <GraduationCap className="w-3.5 h-3.5" /> Student Portfolio Project
            </div>
            <h1 className="text-4xl md:text-7xl font-black font-display mb-6 tracking-tighter">
              Built by a <span className="text-gradient">student.</span>
              <br className="hidden md:block" /> Powered by curiosity.
            </h1>
            <p className="text-white/50 text-lg md:text-xl max-w-2xl mx-auto font-medium leading-relaxed">
              MeetMind AI is a full-stack capstone project exploring the intersection of AI, real-time
              speech processing, and modern web engineering — built from scratch as a learning exercise
              and shipped as a real product.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Builder Section */}
      <section className="py-24 border-t border-white/5">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-16 items-center max-w-5xl mx-auto">
            <motion.div {...fade}>
              {/* Avatar placeholder */}
              <div className="relative w-48 h-48 mx-auto lg:mx-0">
                <div className="w-full h-full rounded-[2rem] bg-gradient-to-br from-primary/20 via-cyan/10 to-emerald/20 border border-white/10 flex items-center justify-center">
                  <span className="text-6xl font-black text-gradient font-display">V</span>
                </div>
                <div className="absolute -bottom-3 -right-3 px-3 py-1.5 rounded-full bg-emerald/10 border border-emerald/30 text-emerald text-[9px] font-black uppercase tracking-widest">
                  Open to Work
                </div>
              </div>
            </motion.div>

            <motion.div {...fade} transition={{ duration: 0.7, delay: 0.1 }}>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-black uppercase tracking-[0.2em] mb-5">
                The Builder
              </div>
              <h2 className="text-3xl md:text-4xl font-bold font-display mb-4 tracking-tight">
                Hi, I'm <span className="text-gradient">Vara</span>
              </h2>
              <p className="text-white/50 text-base leading-relaxed mb-6">
                A computer science student passionate about building things that solve real problems.
                MeetMind AI started as a question: <em className="text-white/70">"Why do we always forget what was decided in that meeting?"</em> — and turned into a full production application.
              </p>
              <p className="text-white/40 text-sm leading-relaxed mb-8">
                I'm interested in AI-augmented productivity tools, developer experience, and crafting
                interfaces that feel alive. When I'm not coding, I'm probably reading papers on LLMs
                or watching F1 races.
              </p>

              {/* Social Links */}
              <div className="flex flex-wrap gap-3">
                {[
                  { icon: Github, label: "GitHub", href: "https://github.com" },
                  { icon: Linkedin, label: "LinkedIn", href: "https://linkedin.com" },
                  { icon: Mail, label: "Email", href: "mailto:hello@example.com" },
                ].map(({ icon: Icon, label, href }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 text-white/60 hover:text-primary hover:border-primary/40 hover:bg-primary/5 transition-all duration-300 text-xs font-bold"
                  >
                    <Icon className="w-3.5 h-3.5" /> {label}
                  </a>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Skills */}
      <section className="py-24 border-t border-white/5">
        <div className="container">
          <motion.div {...fade} className="text-center mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald/10 text-emerald text-[10px] font-black uppercase tracking-[0.2em] mb-4">
              Technical Stack
            </div>
            <h2 className="text-3xl md:text-5xl font-bold font-display tracking-tighter">
              What I <span className="text-gradient">work with</span>
            </h2>
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-3xl mx-auto">
            {skills.map((s, i) => (
              <motion.div
                key={s.name}
                {...fade}
                transition={{ duration: 0.5, delay: i * 0.07 }}
                className={`flex items-center gap-3 p-4 rounded-2xl border ${s.bg} hover:-translate-y-1 transition-transform duration-300`}
              >
                <s.icon className={`w-5 h-5 shrink-0 ${s.color}`} />
                <span className="text-sm font-bold text-white/80">{s.name}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-24 border-t border-white/5">
        <div className="container max-w-3xl">
          <motion.div {...fade} className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-black uppercase tracking-[0.2em] mb-4">
              Project Journey
            </div>
            <h2 className="text-3xl md:text-5xl font-bold font-display tracking-tighter">
              How this was <span className="text-gradient">built</span>
            </h2>
          </motion.div>

          <div className="relative">
            <div className="absolute left-[22px] top-0 bottom-0 w-px bg-gradient-to-b from-primary/40 via-white/10 to-transparent" />
            <div className="space-y-12">
              {timeline.map((item, i) => (
                <motion.div
                  key={item.title}
                  {...fade}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  className="flex gap-6 pl-2"
                >
                  <div className="relative shrink-0">
                    <div className="w-11 h-11 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                      <item.icon className="w-5 h-5 text-primary" />
                    </div>
                  </div>
                  <div className="pt-1">
                    <div className="text-[9px] font-black text-primary uppercase tracking-widest mb-1">
                      {item.year}
                    </div>
                    <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                    <p className="text-white/40 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 border-t border-white/5">
        <div className="container max-w-2xl text-center">
          <motion.div {...fade}>
            <h2 className="text-3xl md:text-5xl font-bold font-display mb-6 tracking-tight">
              Want to <span className="text-gradient">collaborate?</span>
            </h2>
            <p className="text-white/40 text-base mb-10 leading-relaxed">
              I'm actively looking for internship opportunities, open-source collaborations, and
              interesting projects to contribute to. Let's build something great.
            </p>
            <a
              href="mailto:hello@example.com"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-primary text-black font-black text-xs uppercase tracking-widest hover:scale-105 active:scale-95 transition-all duration-300 shadow-[0_0_30px_rgba(16,185,129,0.3)]"
            >
              Get In Touch <ExternalLink className="w-4 h-4" />
            </a>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
