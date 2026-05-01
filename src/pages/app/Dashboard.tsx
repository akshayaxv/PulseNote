import { Card } from "@/components/ui/card";
import { Counter } from "@/components/dashboard/Counter";
import { Video, Clock, ListTodo, CheckCircle2, TrendingUp, Upload, FileText, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const stats = [
  { label: "Total Meetings", value: 247, icon: Video, color: "from-sky to-cyan" },
  { label: "Hours Processed", value: 1284, suffix: "h", icon: Clock, color: "from-cyan to-primary" },
  { label: "Tasks Pending", value: 38, icon: ListTodo, color: "from-primary to-cyan" },
  { label: "Tasks Completed", value: 162, icon: CheckCircle2, color: "from-emerald to-primary" },
  { label: "Productivity Score", value: 92, suffix: "%", icon: TrendingUp, color: "from-emerald to-cyan" },
];

const recent = [
  { title: "Q4 Product Strategy", date: "Today, 10:00 AM", duration: "48m", participants: 6, status: "Processed" },
  { title: "Customer Discovery — Acme Co.", date: "Today, 2:30 PM", duration: "32m", participants: 3, status: "Processing" },
  { title: "Engineering Standup", date: "Yesterday", duration: "15m", participants: 8, status: "Processed" },
  { title: "Design Review — Onboarding v2", date: "Yesterday", duration: "55m", participants: 4, status: "Processed" },
  { title: "All-Hands · April", date: "2 days ago", duration: "1h 12m", participants: 42, status: "Processed" },
];

const Dashboard = () => (
  <div className="space-y-6">
    {/* Hero greeting */}
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="rounded-3xl bg-navy text-white p-8 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-brand opacity-25" />
      <div className="absolute -right-20 -top-20 w-72 h-72 bg-emerald/30 rounded-full blur-3xl" />
      <div className="relative flex flex-wrap justify-between items-end gap-4">
        <div>
          <div className="text-xs uppercase tracking-widest text-white/60 mb-2">Friday, May 1</div>
          <h2 className="text-3xl font-display font-bold mb-2">Good morning, Sarah 👋</h2>
          <p className="text-white/70">You have <span className="text-emerald font-semibold">3 meetings</span> today and <span className="text-emerald font-semibold">12 action items</span> waiting.</p>
        </div>
        <div className="flex gap-2">
          <Button asChild className="rounded-full bg-emerald hover:bg-emerald/90 border-0 text-white"><Link to="/dashboard/upload"><Upload className="w-4 h-4 mr-1.5" /> Upload</Link></Button>
          <Button asChild variant="outline" className="rounded-full bg-white/10 border-white/20 text-white hover:bg-white/20 hover:text-white"><Link to="/dashboard/chat">Ask AI</Link></Button>
        </div>
      </div>
    </motion.div>

    {/* Stats */}
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
      {stats.map((s, i) => (
        <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
          <Card className="p-5 rounded-2xl border-border/60 bg-gradient-card hover-lift">
            <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${s.color} flex items-center justify-center mb-4 shadow-soft`}>
              <s.icon className="w-5 h-5 text-white" />
            </div>
            <div className="text-2xl font-display font-bold">
              <Counter to={s.value} suffix={s.suffix || ""} />
            </div>
            <div className="text-xs text-muted-foreground mt-1">{s.label}</div>
          </Card>
        </motion.div>
      ))}
    </div>

    <div className="grid lg:grid-cols-3 gap-5">
      {/* Recent meetings */}
      <Card className="lg:col-span-2 p-6 rounded-3xl border-border/60 bg-gradient-card">
        <div className="flex items-center justify-between mb-5">
          <h3 className="font-display font-bold text-lg">Recent Meetings</h3>
          <Link to="/dashboard/meetings" className="text-sm text-primary font-semibold hover:underline flex items-center gap-1">View all <ArrowUpRight className="w-3.5 h-3.5" /></Link>
        </div>
        <div className="space-y-2">
          {recent.map(m => (
            <Link key={m.title} to="/dashboard/meetings/1" className="flex items-center justify-between p-3 rounded-2xl hover:bg-muted/60 transition-colors group">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                  <FileText className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <div className="font-semibold text-sm truncate">{m.title}</div>
                  <div className="text-xs text-muted-foreground">{m.date} · {m.duration} · {m.participants} people</div>
                </div>
              </div>
              <span className={`text-xs px-2.5 py-1 rounded-full font-semibold shrink-0 ${m.status === "Processed" ? "bg-emerald/10 text-emerald" : "bg-amber-100 text-amber-700"}`}>{m.status}</span>
            </Link>
          ))}
        </div>
      </Card>

      {/* Quick upload */}
      <Card className="p-6 rounded-3xl border-border/60 bg-gradient-card">
        <h3 className="font-display font-bold text-lg mb-2">Quick Upload</h3>
        <p className="text-xs text-muted-foreground mb-4">Drop an audio or video file to get started</p>
        <Link to="/dashboard/upload" className="block">
          <div className="border-2 border-dashed border-primary/30 rounded-2xl p-8 text-center hover:border-primary hover:bg-primary/5 transition-colors cursor-pointer">
            <div className="w-12 h-12 rounded-2xl bg-gradient-brand mx-auto flex items-center justify-center mb-3 shadow-soft">
              <Upload className="w-5 h-5 text-white" />
            </div>
            <div className="font-semibold text-sm mb-1">Drop file here</div>
            <div className="text-xs text-muted-foreground">MP3, WAV, MP4 · up to 2GB</div>
          </div>
        </Link>
        <div className="mt-5 pt-5 border-t border-border/60">
          <div className="text-xs font-semibold text-muted-foreground mb-3">RECENT UPLOADS</div>
          {["product-sync.mp3", "discovery-acme.mp4"].map(f => (
            <div key={f} className="flex items-center gap-2 py-2 text-sm">
              <FileText className="w-3.5 h-3.5 text-muted-foreground" />
              <span className="truncate">{f}</span>
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald ml-auto" />
            </div>
          ))}
        </div>
      </Card>
    </div>
  </div>
);

export default Dashboard;
