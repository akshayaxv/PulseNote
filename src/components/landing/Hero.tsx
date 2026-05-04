import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
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
} from "lucide-react";
import { VoiceWave } from "./VoiceWave";

export const Hero = () => {
  const { scrollY } = useScroll();

  // Subtle parallax for floating elements
  const y1 = useTransform(scrollY, [0, 500], [0, -50]);
  const y2 = useTransform(scrollY, [0, 500], [0, -100]);

  return (
    <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-[#020617]">
      {/* Background Creative Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-emerald/10 blur-[120px] animate-pulse-glow" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-primary/10 blur-[120px] animate-pulse-glow" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_50%_50%,hsl(160_84%_45%/0.1),transparent_70%)]" />

        {/* Abstract Glowing Lines (Simulated with div gradients) */}
        <div className="absolute top-1/4 -left-20 w-[150%] h-[1px] bg-gradient-to-r from-transparent via-emerald/20 to-transparent rotate-[15deg] blur-sm" />
        <div className="absolute bottom-1/4 -right-20 w-[150%] h-[1px] bg-gradient-to-r from-transparent via-primary/20 to-transparent -rotate-[15deg] blur-sm" />
      </div>

      <div className="container relative z-10 text-center">
        {/* Header Text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto mb-16"
        >
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black font-display leading-[0.95] mb-8 tracking-tighter text-white">
            MeetMind AI: <br />
            <span className="text-gradient">Meetings, Mastered.</span>
          </h1>
          <p className="text-lg md:text-xl text-white/50 max-w-2xl mx-auto mb-10 leading-relaxed font-medium">
            Automate transcripts, summaries, and action items effortlessly with our premium AI
            tracker. Turn every conversation into collective intelligence.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Button
              size="lg"
              className="rounded-full bg-emerald hover:bg-emerald/90 text-navy font-bold h-14 px-10 shadow-[0_0_20px_rgba(16,185,129,0.3)] transition-all hover:scale-105"
              asChild
            >
              <Link to="/dashboard">Get Started</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="rounded-full h-14 px-10 text-base font-bold bg-white/5 backdrop-blur-md border-white/10 hover:bg-white/10 transition-all text-white"
            >
              Watch Demo
            </Button>
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
          <div className="relative rounded-[2.5rem] border border-white/10 bg-[#020617]/80 backdrop-blur-2xl shadow-[0_0_50px_rgba(16,185,129,0.15)] overflow-hidden">
            {/* Window Header */}
            <div className="flex items-center justify-between px-8 py-5 border-b border-white/5">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-gradient-brand flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
                <span className="text-sm font-display font-bold text-white/90">
                  MeetMind <span className="text-emerald">AI</span>
                </span>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-[10px] font-bold text-white/60">
                  <Users className="w-3 h-3 text-emerald" /> 4 participants
                </div>
                <div className="text-[10px] font-mono text-white/40">
                  Duration: <span className="text-white">23:45</span>
                </div>
              </div>
            </div>

            {/* Dashboard Content */}
            <div className="grid lg:grid-cols-[80px_1fr] min-h-[400px]">
              {/* Mini Sidebar */}
              <div className="hidden lg:flex flex-col items-center py-8 gap-6 border-r border-white/5">
                {[LayoutGrid, Users, FileText, MessageSquare, Settings].map((Icon, i) => (
                  <div
                    key={i}
                    className={`p-2.5 rounded-xl transition-all ${i === 0 ? "bg-emerald/10 text-emerald" : "text-white/20 hover:text-white/40"}`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                ))}
              </div>

              {/* Centered Voice Wave */}
              <div className="relative p-10 flex flex-col items-center justify-center text-center">
                <div className="text-[10px] font-black text-emerald uppercase tracking-[0.3em] mb-4">
                  Meeting Dashboard
                </div>
                <div className="w-full max-w-2xl">
                  <VoiceWave />
                </div>

                {/* Bottom Controls */}
                <div className="mt-12 flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/40">
                    <LayoutGrid className="w-4 h-4" />
                  </div>
                  <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/40">
                    <MessageSquare className="w-4 h-4" />
                  </div>
                  <div className="w-12 h-12 rounded-full bg-white text-navy flex items-center justify-center shadow-lg">
                    <Mic className="w-5 h-5" />
                  </div>
                  <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/40">
                    <Video className="w-4 h-4" />
                  </div>
                  <div className="w-12 h-12 rounded-full bg-red-500 flex items-center justify-center text-white shadow-lg">
                    <PhoneOff className="w-5 h-5" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Overlapping Floating Cards - RIGHT */}
          <motion.div
            style={{ y: y1 }}
            className="absolute -right-8 top-12 z-20 w-72 hidden md:block"
          >
            <div className="glass-dark rounded-3xl p-6 border-white/10 shadow-glow animate-float-slow">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-emerald" />
                  <span className="text-xs font-bold text-white/90">Meeting Summary</span>
                </div>
                <span className="text-[8px] px-2 py-1 rounded bg-emerald/10 text-emerald font-black uppercase">
                  Status
                </span>
              </div>
              <div className="space-y-4">
                <div>
                  <div className="text-[10px] font-bold text-white/80 mb-1">1. Q4 Goals</div>
                  <div className="text-[9px] text-white/40 leading-relaxed">
                    Prioritizing market growth and user retention strategies.
                  </div>
                </div>
                <div>
                  <div className="text-[10px] font-bold text-white/80 mb-1">2. Budget Approval</div>
                  <div className="text-[9px] text-white/40 leading-relaxed">
                    Marketing budget reviewed and approved for Q3.
                  </div>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-white/5">
                <div className="inline-flex items-center px-2 py-1 rounded bg-white/5 text-[8px] font-bold text-white/40 uppercase tracking-widest">
                  Features
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            style={{ y: y2 }}
            className="absolute -right-12 bottom-12 z-20 w-72 hidden md:block"
          >
            <div
              className="glass-dark rounded-3xl p-6 border-white/10 shadow-glow animate-float-slow"
              style={{ animationDelay: "1s" }}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <ListChecks className="w-4 h-4 text-primary" />
                  <span className="text-xs font-bold text-white/90">Action Items</span>
                </div>
                <span className="text-[8px] px-2 py-1 rounded bg-primary/10 text-primary font-black uppercase">
                  Status
                </span>
              </div>
              <div className="space-y-3">
                {[
                  { t: "Finalize Roadmap", u: "Sarah" },
                  { t: "Confirm Venue", u: "Mark" },
                  { t: "Draft Report", u: "Aisha" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-4 h-4 rounded border border-white/10 flex items-center justify-center shrink-0">
                      {i === 1 && <div className="w-2 h-2 rounded-sm bg-primary" />}
                    </div>
                    <div className="text-[10px] text-white/60">
                      <b className="text-white/90">{item.u}:</b> {item.t}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Small Floating Orbs */}
          <div className="absolute -left-12 top-1/4 w-4 h-4 rounded-full bg-emerald blur-sm opacity-40 animate-pulse" />
          <div
            className="absolute right-1/4 bottom-[-20px] w-6 h-6 rounded-full bg-primary blur-md opacity-30 animate-pulse"
            style={{ animationDelay: "2s" }}
          />
        </motion.div>

        {/* Brand Logos (Product Hunt / G2) */}
        <div className="mt-24 flex items-center justify-center gap-12 opacity-30 grayscale hover:grayscale-0 transition-all">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center text-navy font-black text-[10px]">
              P
            </div>
            <span className="text-xs font-bold uppercase tracking-widest text-white">
              ProductHunt
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center text-navy font-black text-[10px]">
              G
            </div>
            <span className="text-xs font-bold uppercase tracking-widest text-white">G2 Crowd</span>
          </div>
        </div>
      </div>
    </section>
  );
};

import { Sparkles, Settings } from "lucide-react";
