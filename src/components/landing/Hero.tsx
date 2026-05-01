import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Play, Sparkles, FileText, ListChecks, MessageSquare, BarChart3, CheckCircle2 } from "lucide-react";
import { VoiceWave } from "./VoiceWave";

export const Hero = () => {
  return (
    <section className="relative pt-36 pb-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-hero pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,hsl(217_91%_85%/0.4),transparent_60%)] pointer-events-none" />

      {/* Floating clouds */}
      <div className="absolute top-32 left-10 w-72 h-72 rounded-full bg-primary/10 blur-3xl animate-float-slow" />
      <div className="absolute top-80 right-10 w-96 h-96 rounded-full bg-emerald/10 blur-3xl animate-float-slow" style={{ animationDelay: "2s" }} />

      <div className="container relative">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass mb-6 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-primary" />
              <span className="text-foreground/80">New · GPT-powered meeting intelligence</span>
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black font-display leading-[1.05] mb-6">
              Turn Every <br />
              Meeting Into <br />
              <span className="text-gradient">Action.</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-xl mb-8 leading-relaxed">
              Upload meetings. Generate summaries. Extract tasks. Search conversations with AI — all in one beautifully crafted workspace.
            </p>
            <div className="flex flex-wrap items-center gap-3 mb-10">
              <Button size="lg" className="rounded-full bg-gradient-brand border-0 shadow-float hover:scale-[1.03] transition-transform h-12 px-7 text-base">
                Start Free <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
              <Button size="lg" variant="outline" className="rounded-full h-12 px-7 text-base bg-white/60 backdrop-blur-md border-white/60 hover:bg-white">
                <Play className="mr-2 w-4 h-4" /> Watch Demo
              </Button>
            </div>
            <div className="flex flex-wrap gap-5 text-sm text-muted-foreground">
              {["Free 14-day trial", "No credit card", "Cancel anytime"].map(t => (
                <div key={t} className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald" /> {t}</div>
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
            <FloatingCard icon={<FileText className="w-4 h-4" />} title="Meeting Summary" sub="3 key decisions" className="absolute -top-4 -left-4 z-20" delay={0.6} />
            <FloatingCard icon={<ListChecks className="w-4 h-4" />} title="Action Items" sub="7 tasks extracted" className="absolute top-1/3 -right-4 z-20" delay={0.8} accent />
            <FloatingCard icon={<MessageSquare className="w-4 h-4" />} title="AI Chat" sub='"What did Sarah commit?"' className="absolute -bottom-2 -left-6 z-20" delay={1} />
            <FloatingCard icon={<BarChart3 className="w-4 h-4" />} title="Analytics" sub="+24% productivity" className="absolute bottom-10 -right-2 z-20" delay={1.2} />

            {/* Mock dashboard */}
            <div className="relative rounded-3xl overflow-hidden shadow-float bg-gradient-card border border-white/60 p-6 backdrop-blur-xl">
              <div className="flex items-center gap-2 mb-5">
                <div className="w-3 h-3 rounded-full bg-red-400" />
                <div className="w-3 h-3 rounded-full bg-yellow-400" />
                <div className="w-3 h-3 rounded-full bg-emerald" />
                <div className="ml-3 text-xs text-muted-foreground font-mono">meetmind.ai/dashboard</div>
              </div>
              <div className="mb-5">
                <div className="text-xs font-semibold text-muted-foreground mb-1">LIVE TRANSCRIPTION</div>
                <h3 className="font-display font-bold text-lg">Q4 Product Strategy Sync</h3>
              </div>
              <VoiceWave />
              <div className="grid grid-cols-3 gap-3 mt-5">
                {[
                  { label: "Speakers", value: "5" },
                  { label: "Words", value: "8.2k" },
                  { label: "Actions", value: "12" },
                ].map(s => (
                  <div key={s.label} className="rounded-2xl bg-muted/40 p-3 text-center">
                    <div className="text-xl font-bold font-display">{s.value}</div>
                    <div className="text-[10px] text-muted-foreground uppercase tracking-wider">{s.label}</div>
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

const FloatingCard = ({ icon, title, sub, className, delay = 0, accent = false }: any) => (
  <motion.div
    initial={{ opacity: 0, y: 20, scale: 0.9 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    transition={{ duration: 0.6, delay }}
    className={`glass rounded-2xl p-3 pr-4 shadow-float flex items-center gap-3 ${className}`}
    style={{ animation: `float-slow ${5 + delay}s ease-in-out infinite`, animationDelay: `${delay}s` }}
  >
    <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${accent ? "bg-emerald text-white" : "bg-gradient-brand text-white"}`}>
      {icon}
    </div>
    <div>
      <div className="text-xs font-semibold">{title}</div>
      <div className="text-[10px] text-muted-foreground">{sub}</div>
    </div>
  </motion.div>
);
