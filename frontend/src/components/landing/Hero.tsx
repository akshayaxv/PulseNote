import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import {
  ArrowRight,
  Play,
  FileText,
  ListChecks,
  CheckCircle2,
  Mic,
  Video,
  PhoneOff,
  LayoutGrid,
  Users,
  MessageSquare,
  Sparkles,
  Settings,
  ArrowUpRight,
} from "lucide-react";
import { VoiceWave } from "./VoiceWave";

export const Hero = () => {
  const { scrollY } = useScroll();
  const { user } = useAuth();

  // Subtle parallax for floating elements - only for desktop
  const y1 = useTransform(scrollY, [0, 500], [0, -50]);
  const y2 = useTransform(scrollY, [0, 500], [0, -100]);

  return (
    <section className="relative pt-24 pb-16 lg:pt-48 lg:pb-32 overflow-hidden bg-[#020617]">
      {/* Background Creative Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* ... existing svg and gradient code ... */}
        <svg
          className="absolute inset-0 w-full h-full opacity-30"
          viewBox="0 0 1440 800"
          fill="none"
          preserveAspectRatio="none"
        >
          <motion.path
            d="M0 0L720 450"
            stroke="url(#line-grad-left)"
            strokeWidth="2"
            strokeDasharray="10 10"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          />
          <motion.path
            d="M1440 0L720 450"
            stroke="url(#line-grad-right)"
            strokeWidth="2"
            strokeDasharray="10 10"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          />
          <defs>
            <linearGradient
              id="line-grad-left"
              x1="0"
              y1="0"
              x2="720"
              y2="450"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="transparent" />
              <stop offset="0.5" stopColor="hsl(var(--primary))" />
              <stop offset="1" stopColor="transparent" />
            </linearGradient>
            <linearGradient
              id="line-grad-right"
              x1="1440"
              y1="0"
              x2="720"
              y2="450"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="transparent" />
              <stop offset="0.5" stopColor="hsl(var(--primary))" />
              <stop offset="1" stopColor="transparent" />
            </linearGradient>
          </defs>
        </svg>

        <div className="absolute top-[10%] left-[-5%] w-[80%] md:w-[50%] h-[50%] rounded-full bg-emerald/10 blur-[80px] md:blur-[140px] animate-pulse" />
        <div
          className="absolute bottom-[-10%] right-[-5%] w-[80%] md:w-[50%] h-[50%] rounded-full bg-primary/10 blur-[80px] md:blur-[140px] animate-pulse"
          style={{ animationDelay: "2s" }}
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[1px] bg-gradient-to-r from-transparent via-emerald/20 to-transparent rotate-[-25deg] blur-[1px] md:blur-[2px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_50%_50%,hsl(160_84%_45%/0.08),transparent_60%)]" />
      </div>

      <div className="container relative z-10 text-center px-4">
        {/* Header Text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto mb-12 md:mb-16"
        >
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black font-display leading-[1.1] md:leading-[0.95] mb-6 md:mb-8 tracking-tighter text-white">
            PulseNote: <br />
            <span className="text-gradient">Turn Talks into Action.</span>
          </h1>
          <p className="text-base md:text-xl text-white/50 max-w-2xl mx-auto mb-8 md:mb-10 leading-relaxed font-medium px-2">
            Automate transcripts, summaries, and action items effortlessly with our premium AI
            tracker.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            {user ? (
              <Button
                size="lg"
                className="w-full sm:w-auto rounded-full bg-emerald hover:bg-emerald/90 text-navy font-bold h-12 md:h-14 px-10 shadow-[0_0_30px_rgba(16,185,129,0.3)] transition-all flex items-center gap-2"
                asChild
              >
                <Link to="/dashboard">
                  Continue to Dashboard <ArrowUpRight className="w-5 h-5" />
                </Link>
              </Button>
            ) : (
              <>
                <Button
                  size="lg"
                  className="w-full sm:w-auto rounded-full bg-emerald hover:bg-emerald/90 text-navy font-bold h-12 md:h-14 px-10 shadow-[0_0_30px_rgba(16,185,129,0.3)] transition-all"
                  asChild
                >
                  <Link to="/signup">Get Started</Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  asChild
                  className="w-full sm:w-auto rounded-full h-12 md:h-14 px-10 text-sm md:text-base font-bold bg-white/5 backdrop-blur-md border-white/10 hover:bg-white/10 transition-all text-white border-2"
                >
                  <a href="#workflow">Watch Demo</a>
                </Button>
              </>
            )}
          </div>
        </motion.div>

        {/* Central Dashboard Graphic */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 40 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative max-w-5xl mx-auto"
        >
          {/* Main Dashboard Window */}
          <div className="relative rounded-2xl md:rounded-[2.5rem] border border-white/10 bg-[#020617]/60 backdrop-blur-3xl shadow-glow-sm md:shadow-[0_0_80px_rgba(16,185,129,0.15)] overflow-hidden">
            {/* Top Bar */}
            <div className="flex items-center justify-between px-4 md:px-8 py-3 md:py-5 border-b border-white/5 bg-white/5">
              <div className="flex items-center gap-2 md:gap-3">
                <div className="w-6 h-6 md:w-8 md:h-8 rounded-lg bg-emerald/20 flex items-center justify-center border border-emerald/20">
                  <Sparkles className="w-3 h-3 md:w-4 md:h-4 text-emerald" />
                </div>
                <span className="text-xs md:text-sm font-display font-bold text-white/90 truncate">
                  PulseNote
                </span>
              </div>
              <div className="flex items-center gap-3 md:gap-5">
                <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-[10px] font-bold text-white/60">
                  <Users className="w-3.5 h-3.5 text-emerald" /> 4
                </div>
                <div className="text-[9px] md:text-[10px] font-mono text-white/30 uppercase tracking-widest whitespace-nowrap">
                  Duration: <span className="text-white font-bold">23:45</span>
                </div>
              </div>
            </div>

            {/* Content Area */}
            <div className="grid grid-cols-1 lg:grid-cols-[80px_1fr] min-h-[300px] md:min-h-[420px]">
              {/* Sidebar Tabs - Hidden on Mobile */}
              <div className="hidden lg:flex flex-col items-center py-10 gap-8 border-r border-white/5">
                {[LayoutGrid, Users, MessageSquare, Settings].map((Icon, i) => (
                  <div
                    key={i}
                    className={`p-2.5 rounded-2xl transition-all cursor-pointer ${i === 0 ? "bg-emerald text-navy shadow-glow-sm" : "text-white/20 hover:text-white/40"}`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                ))}
              </div>

              {/* Main Waveform Section */}
              <div className="relative p-6 md:p-12 flex flex-col items-center justify-center overflow-hidden">
                <div className="absolute top-4 left-6 md:top-8 md:left-10 text-[8px] md:text-[10px] font-bold text-white/20 uppercase tracking-[0.3em]">
                  Meeting dashboard
                </div>

                <div className="w-full max-w-2xl transform scale-90 md:scale-110">
                  <VoiceWave />
                </div>

                {/* Control HUD at bottom */}
                <div className="mt-8 md:mt-16 flex items-center gap-3 md:gap-5 scale-90 md:scale-100">
                  <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/30">
                    <LayoutGrid className="w-3 h-3 md:w-4 md:h-4" />
                  </div>
                  <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/30">
                    <MessageSquare className="w-3 h-3 md:w-4 md:h-4" />
                  </div>
                  <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-white text-navy flex items-center justify-center shadow-xl">
                    <Mic className="w-5 h-5 md:w-6 md:h-6" />
                  </div>
                  <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/30">
                    <Video className="w-3 h-3 md:w-4 md:h-4" />
                  </div>
                  <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-red-500 text-white flex items-center justify-center shadow-xl">
                    <PhoneOff className="w-5 h-5 md:w-6 md:h-6" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT FLOATING CARDS - Desktop Only */}
          <motion.div
            style={{ y: y1 }}
            className="absolute -right-10 top-16 z-20 w-80 hidden xl:block pointer-events-none"
          >
            <div className="glass-dark rounded-[2rem] p-7 border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-emerald/10 flex items-center justify-center">
                    <FileText className="w-4 h-4 text-emerald" />
                  </div>
                  <span className="text-sm font-display font-bold text-white/90">
                    Meeting Summary
                  </span>
                </div>
                <span className="text-[9px] px-2.5 py-1 rounded-full bg-emerald/10 text-emerald font-black uppercase border border-emerald/20">
                  Status
                </span>
              </div>
              <div className="space-y-5">
                <div>
                  <div className="text-[11px] font-bold text-white mb-1.5 flex items-center gap-2">
                    1. Q4 Goals
                  </div>
                  <p className="text-[10px] text-white/40 leading-relaxed font-medium">
                    Prioritizing market growth and user retention strategies across all departments.
                  </p>
                </div>
                <div>
                  <div className="text-[11px] font-bold text-white mb-1.5 flex items-center gap-2">
                    2. Marketing Budget Approval
                  </div>
                  <p className="text-[10px] text-white/40 leading-relaxed font-medium">
                    Marketing budget reviewed and approved for Q3 with focus on digital ads.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            style={{ y: y2 }}
            className="absolute -right-6 bottom-16 z-20 w-80 hidden xl:block pointer-events-none"
          >
            <div className="glass-dark rounded-[2rem] p-7 border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-primary/10 flex items-center justify-center">
                    <ListChecks className="w-4 h-4 text-primary" />
                  </div>
                  <span className="text-sm font-display font-bold text-white/90">Action Items</span>
                </div>
                <span className="text-[9px] px-2.5 py-1 rounded-full bg-primary/10 text-primary font-black uppercase border border-primary/20">
                  Status
                </span>
              </div>
              <div className="space-y-4">
                {[
                  { t: "Finalize Q4 Roadmap", u: "Sarah", c: true },
                  { t: "Confirm Event Venue", u: "Mark", c: false },
                  { t: "Draft Budget Report", u: "Aisha", c: false },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <div
                      className={`w-5 h-5 rounded-lg border-2 flex items-center justify-center shrink-0 ${item.c ? "bg-emerald border-emerald" : "border-white/10 bg-white/5"}`}
                    >
                      {item.c && <CheckCircle2 className="w-3 h-3 text-navy" />}
                    </div>
                    <div className="text-[10px] font-medium text-white/60 text-left">
                      <b className="text-white/90">{item.u}:</b> {item.t}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
