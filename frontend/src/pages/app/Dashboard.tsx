import { Card } from "@/components/ui/card";
import { Counter } from "@/components/dashboard/Counter";
import {
  Video,
  Clock,
  ListTodo,
  CheckCircle2,
  TrendingUp,
  Upload,
  FileText,
  ArrowUpRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const stats = [
  { label: "Meeting Library", value: 247, icon: Video, color: "from-sky to-cyan" },
  {
    label: "Processing Time",
    value: 1284,
    suffix: "h",
    icon: Clock,
    color: "from-cyan to-primary",
  },
  { label: "Pending Tasks", value: 38, icon: ListTodo, color: "from-primary to-cyan" },
  { label: "Tasks Completed", value: 162, icon: CheckCircle2, color: "from-emerald to-primary" },
  {
    label: "Efficiency Score",
    value: 92,
    suffix: "%",
    icon: TrendingUp,
    color: "from-emerald to-cyan",
  },
];

const recent = [
  {
    title: "Q4 Product Strategy",
    date: "Today, 10:00 AM",
    duration: "48m",
    participants: 6,
    status: "Processed",
  },
  {
    title: "Customer Discovery — Acme Co.",
    date: "Today, 2:30 PM",
    duration: "32m",
    participants: 3,
    status: "Processing",
  },
  {
    title: "Engineering Standup",
    date: "Yesterday",
    duration: "15m",
    participants: 8,
    status: "Processed",
  },
  {
    title: "Design Review — Onboarding v2",
    date: "Yesterday",
    duration: "55m",
    participants: 4,
    status: "Processed",
  },
  {
    title: "All-Hands · April",
    date: "2 days ago",
    duration: "1h 12m",
    participants: 42,
    status: "Processed",
  },
];

const Dashboard = () => (
  <div className="space-y-6 md:space-y-10 pb-20">
    {/* Hero greeting */}
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-[2rem] md:rounded-[3rem] bg-[#020617]/40 backdrop-blur-2xl border border-white/5 p-6 md:p-10 relative overflow-hidden shadow-glow"
    >
      <div className="absolute inset-0 bg-gradient-brand opacity-5 md:opacity-10" />
      <div className="absolute -right-20 -top-20 w-72 h-72 bg-emerald/10 rounded-full blur-3xl animate-pulse" />
      <div className="relative flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div className="max-w-2xl">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald animate-pulse shadow-glow" />
            <div className="text-[10px] md:text-[11px] uppercase tracking-[0.4em] text-white/30 font-black">
              SYSTEM READY · MAIN WORKSPACE
            </div>
          </div>
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-3 text-white/90 tracking-tight">
            Good morning, Sarah 👋
          </h2>
          <p className="text-white/40 text-sm md:text-base leading-relaxed font-medium">
            AI has analyzed <span className="text-emerald font-black">3 NEW MEETINGS</span> since
            your last visit.
            <span className="hidden sm:inline">
              {" "}
              You have <span className="text-primary font-black">12 ACTION ITEMS</span> requiring
              attention.
            </span>
          </p>
        </div>
        <div className="flex flex-wrap gap-3 w-full md:w-auto">
          <Button
            asChild
            className="rounded-xl md:rounded-2xl bg-gradient-brand hover:scale-[1.03] border-0 text-white shadow-emerald px-6 h-12 md:h-14 transition-all flex-1 md:flex-none text-[11px] font-black uppercase tracking-widest"
          >
            <Link to="/dashboard/upload">
              <Upload className="w-4 h-4 mr-2" /> UPLOAD MEETING
            </Link>
          </Button>
          <Button
            asChild
            variant="outline"
            className="rounded-xl md:rounded-2xl bg-white/5 border-white/10 text-white/70 hover:bg-white/10 hover:text-white px-6 h-12 md:h-14 transition-all flex-1 md:flex-none text-[11px] font-black uppercase tracking-widest"
          >
            <Link to="/dashboard/chat">AI ASSISTANT</Link>
          </Button>
        </div>
      </div>
    </motion.div>

    {/* Stats */}
    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4 md:gap-5">
      {stats.map((s, i) => (
        <motion.div
          key={s.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.05 }}
        >
          <Card className="p-5 md:p-6 rounded-[2rem] border-white/5 bg-[#020617]/40 backdrop-blur-md hover-lift shadow-glow-sm group relative overflow-hidden">
            <div className="absolute -right-2 -top-2 opacity-0 group-hover:opacity-5 transition-opacity">
              <s.icon className="w-16 h-16 text-white" />
            </div>
            <div
              className={`w-10 h-10 rounded-xl bg-gradient-to-br ${s.color} flex items-center justify-center mb-4 shadow-glow-sm relative z-10`}
            >
              <s.icon className="w-5 h-5 text-white" />
            </div>
            <div className="text-2xl md:text-3xl font-display font-bold text-white/90 mb-1 relative z-10">
              <Counter to={s.value} suffix={s.suffix || ""} />
            </div>
            <div className="text-[9px] md:text-[10px] text-white/20 uppercase tracking-[0.2em] font-black relative z-10">
              {s.label}
            </div>
          </Card>
        </motion.div>
      ))}
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Recent meetings */}
      <Card className="lg:col-span-2 p-6 md:p-10 rounded-[2.5rem] md:rounded-[3rem] border-white/5 bg-[#020617]/40 backdrop-blur-xl shadow-glow">
        <div className="flex items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-primary shadow-glow animate-pulse" />
            <h3 className="font-display font-bold text-lg md:text-xl uppercase tracking-tight text-white/90">
              Recent Meetings
            </h3>
          </div>
          <Link
            to="/dashboard/meetings"
            className="text-[10px] text-primary font-black uppercase tracking-widest hover:text-primary/80 flex items-center gap-2 transition-all hover:gap-3"
          >
            VIEW ALL <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="space-y-3">
          {recent.map((m) => (
            <Link
              key={m.title}
              to="/dashboard/meetings/1"
              className="flex flex-col sm:flex-row sm:items-center justify-between p-5 rounded-2xl md:rounded-3xl bg-white/[0.02] border border-white/5 hover:bg-white/5 hover:border-white/10 transition-all group gap-4 shadow-glow-sm"
            >
              <div className="flex items-center gap-4 md:gap-5 min-w-0">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl bg-white/5 text-primary flex items-center justify-center shrink-0 border border-white/10 group-hover:bg-primary/10 transition-all">
                  <FileText className="w-5 h-5 md:w-6 md:h-6" />
                </div>
                <div className="min-w-0">
                  <div className="font-bold text-sm md:text-base text-white/80 group-hover:text-primary transition-colors truncate uppercase tracking-tight">
                    {m.title}
                  </div>
                  <div className="text-[10px] text-white/20 font-black mt-1.5 uppercase tracking-widest">
                    {m.date} · {m.duration} · {m.participants} PARTICIPANTS
                  </div>
                </div>
              </div>
              <span
                className={`text-[9px] md:text-[10px] px-3.5 py-2 rounded-xl font-black uppercase tracking-widest self-start sm:self-center border transition-all ${m.status === "Processed" ? "bg-emerald/5 border-emerald/10 text-emerald shadow-glow-sm" : "bg-amber-500/5 border-amber-500/10 text-amber-500 animate-pulse"}`}
              >
                {m.status}
              </span>
            </Link>
          ))}
        </div>
      </Card>

      {/* Quick upload */}
      <Card className="p-6 md:p-8 rounded-[2.5rem] md:rounded-[3rem] border-white/5 bg-[#020617]/40 backdrop-blur-xl shadow-glow flex flex-col">
        <h3 className="font-display font-bold text-lg mb-2 text-white/90 uppercase tracking-tight">
          Quick Upload
        </h3>
        <p className="text-[9px] md:text-[10px] text-white/20 font-black uppercase tracking-[0.2em] mb-8">
          DROP FILE TO START AI ANALYSIS
        </p>
        <Link to="/dashboard/upload" className="block flex-1 group">
          <div className="h-full border-2 border-dashed border-white/5 rounded-3xl p-8 text-center group-hover:border-primary/40 group-hover:bg-primary/5 transition-all cursor-pointer flex flex-col justify-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-brand opacity-0 group-hover:opacity-5 transition-opacity" />
            <div className="w-14 h-14 rounded-2xl bg-gradient-brand mx-auto flex items-center justify-center mb-5 shadow-emerald group-hover:scale-110 transition-transform relative z-10">
              <Upload className="w-6 h-6 text-white" />
            </div>
            <div className="font-black text-sm text-white/70 mb-1 group-hover:text-white transition-colors uppercase tracking-tight relative z-10">
              Upload New File
            </div>
            <div className="text-[9px] text-white/20 font-black uppercase tracking-tighter relative z-10">
              MP3, WAV, MP4 · UP TO 2GB
            </div>
          </div>
        </Link>
        <div className="mt-8 pt-8 border-t border-white/5">
          <div className="text-[10px] font-black text-white/20 mb-5 uppercase tracking-[0.2em] ml-1">
            RECENT UPLOADS
          </div>
          <div className="space-y-4">
            {["product-sync.mp3", "discovery-acme.mp4"].map((f) => (
              <div key={f} className="flex items-center gap-4 py-1 text-xs group cursor-pointer">
                <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center shrink-0 border border-white/10 group-hover:border-primary/20 transition-all">
                  <FileText className="w-3.5 h-3.5 text-white/20 group-hover:text-primary transition-colors" />
                </div>
                <span className="truncate text-white/50 font-bold uppercase tracking-tight text-[10px]">
                  {f}
                </span>
                <CheckCircle2 className="w-4 h-4 text-emerald ml-auto shrink-0 shadow-glow" />
              </div>
            ))}
          </div>
        </div>
      </Card>
    </div>
  </div>
);

export default Dashboard;
