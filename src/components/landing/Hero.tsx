import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Play,
  Sparkles,
  FileText,
  ListChecks,
  MessageSquare,
  BarChart3,
  CheckCircle2,
} from "lucide-react";
import { VoiceWave } from "./VoiceWave";

export const Hero = () => {
  return (
    <section className="relative pt-28 pb-16 lg:pt-36 lg:pb-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-hero pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,hsl(160_84%_45%/0.15),transparent_60%)] pointer-events-none" />

      {/* Floating clouds - Optimized for Mobile */}
      <div className="absolute top-32 left-10 w-40 h-40 md:w-72 md:h-72 rounded-full bg-primary/10 blur-2xl md:blur-3xl animate-float-slow" />
      <div
        className="absolute top-80 right-10 w-48 h-48 md:w-96 md:h-96 rounded-full bg-emerald/10 blur-2xl md:blur-3xl animate-float-slow"
        style={{ animationDelay: "2s" }}
      />

      <div className="container relative">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-6xl lg:text-8xl font-black font-display leading-[0.95] mb-8 tracking-tighter">

              Conversations <br />
              turned into <br />
              <span className="text-gradient">Intelligence.</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-xl mb-10 leading-relaxed font-medium">
              A high-fidelity AI meeting hub designed for speed. Transcribe, summarize, and query
              your meeting history with intelligent AI memory.
            </p>
            <div className="flex flex-wrap items-center gap-4 mb-12">
              <Button
                size="lg"
                className="rounded-2xl bg-gradient-brand border-0 shadow-soft hover:scale-[1.03] transition-all h-14 px-8 text-base font-bold"
                asChild
              >
                <Link to="/dashboard">
                  Explore Dashboard <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="rounded-2xl h-14 px-8 text-base font-bold bg-white/5 backdrop-blur-md border-white/10 hover:bg-white/10 hover:border-primary/40 transition-all text-white"
              >
                <Play className="mr-2 w-4 h-4" /> System Architecture
              </Button>
            </div>
            <div className="flex flex-wrap gap-6 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/60">
              {["Smart AI Reasoning", "Speaker Identification", "Intelligent Search"].map((t) => (
                <div key={t} className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald" /> {t}
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right — dashboard mockup with voice wave */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="relative"
          >
            {/* Floating cards */}
            <FloatingCard
              icon={<FileText className="w-4 h-4" />}
              title="Meeting Summary"
              sub="3 key decisions"
              className="absolute -top-4 -left-4 z-20"
              delay={0.6}
            />
            <FloatingCard
              icon={<ListChecks className="w-4 h-4" />}
              title="Action Items"
              sub="7 tasks extracted"
              className="absolute top-1/3 -right-4 z-20 hidden md:flex"
              delay={0.8}
              accent
            />
            <FloatingCard
              icon={<MessageSquare className="w-4 h-4" />}
              title="AI Chat"
              sub='"What did Sarah commit?"'
              className="absolute -bottom-2 -left-6 z-20 hidden md:flex"
              delay={1}
            />
            <FloatingCard
              icon={<BarChart3 className="w-4 h-4" />}
              title="Analytics"
              sub="+24% productivity"
              className="absolute bottom-10 -right-2 z-20"
              delay={1.2}
            />

            {/* Mock dashboard */}
            <div className="relative rounded-3xl overflow-hidden shadow-glow bg-[#020617]/90 md:bg-gradient-card border border-white/10 p-6 md:backdrop-blur-xl">
              <div className="flex items-center gap-2 mb-5">
                <div className="w-3 h-3 rounded-full bg-red-400" />
                <div className="w-3 h-3 rounded-full bg-yellow-400" />
                <div className="w-3 h-3 rounded-full bg-emerald" />
                <div className="ml-3 text-xs text-muted-foreground font-mono">
                  meetmind.ai/dashboard
                </div>
              </div>
              <div className="mb-5">
                <div className="text-xs font-semibold text-muted-foreground mb-1 text-emerald">
                  LIVE TRANSCRIPTION
                </div>
                <h3 className="font-display font-bold text-lg">Q4 Product Strategy Sync</h3>
              </div>
              <VoiceWave />
              <div className="grid grid-cols-3 gap-3 mt-5">
                {[
                  { label: "Speakers", value: "5" },
                  { label: "Words", value: "8.2k" },
                  { label: "Actions", value: "12" },
                ].map((s) => (
                  <div
                    key={s.label}
                    className="rounded-2xl bg-white/5 border border-white/5 p-3 text-center"
                  >
                    <div className="text-xl font-bold font-display">{s.value}</div>
                    <div className="text-[10px] text-white/40 uppercase tracking-wider">
                      {s.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

interface FloatingCardProps {
  icon: React.ReactNode;
  title: string;
  sub: string;
  className?: string;
  delay?: number;
  accent?: boolean;
}

const FloatingCard = ({
  icon,
  title,
  sub,
  className,
  delay = 0,
  accent = false,
}: FloatingCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20, scale: 0.9 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    transition={{ duration: 0.6, delay }}
    className={`bg-[#020617]/95 md:glass-dark rounded-2xl p-3 pr-4 shadow-glow flex items-center gap-3 border-white/10 will-change-transform ${className}`}
    style={{
      animation: window.innerWidth > 768 ? `float-slow ${5 + delay}s ease-in-out infinite` : "none",
      animationDelay: `${delay}s`,
    }}
  >
    <div
      className={`w-9 h-9 rounded-xl flex items-center justify-center ${accent ? "bg-emerald text-white" : "bg-gradient-brand text-white"}`}
    >
      {icon}
    </div>
    <div>
      <div className="text-xs font-semibold">{title}</div>
      <div className="text-[10px] text-muted-foreground">{sub}</div>
    </div>
  </motion.div>
);
