import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";
import {
  Search,
  Filter,
  FileText,
  Clock,
  Users,
  Calendar,
  ArrowUpRight,
  Sparkles,
  MessageCircle,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const meetings = [
  {
    id: 1,
    title: "Q4 Strategy Sync",
    date: "Today",
    duration: "45m",
    participants: 8,
    tags: ["Strategy"],
    sentiment: "Strategic",
    color: "from-blue-500/20 to-purple-500/20",
    snippet: "Discussed market penetration in APAC and Q4 hiring targets.",
  },
  {
    id: 2,
    title: "Engineering Standup",
    date: "Today",
    duration: "15m",
    participants: 12,
    tags: ["Engineering"],
    sentiment: "High Energy",
    color: "from-emerald-500/20 to-teal-500/20",
    snippet: "Resolved blockers for the v2.4 API deployment. Testing starts tomorrow.",
  },
  {
    id: 3,
    title: "Customer Discovery — Acme",
    date: "Yesterday",
    duration: "60m",
    participants: 4,
    tags: ["Customer"],
    sentiment: "Positive",
    color: "from-amber-500/20 to-orange-500/20",
    snippet: "Acme Corp is looking for tighter SSO integration and audit logs.",
  },
  {
    id: 4,
    title: "Design Review",
    date: "Yesterday",
    duration: "30m",
    participants: 6,
    tags: ["Design"],
    sentiment: "Constructive",
    color: "from-rose-500/20 to-pink-500/20",
    snippet: "Refining the dashboard navigation and mobile responsiveness.",
  },
  {
    id: 5,
    title: "All-Hands April",
    date: "2d ago",
    duration: "90m",
    participants: 48,
    tags: ["General"],
    sentiment: "Inspirational",
    color: "from-indigo-500/20 to-blue-500/20",
    snippet: "Monthly company-wide update on growth, revenue, and culture.",
  },
  {
    id: 6,
    title: "Roadmap Planning",
    date: "3d ago",
    duration: "120m",
    participants: 5,
    tags: ["Strategy"],
    sentiment: "Focused",
    color: "from-cyan-500/20 to-blue-500/20",
    snippet: "Prioritizing Q3 features. AI search is the top priority.",
  },
];

const Meetings = () => (
  <div className="space-y-10 pb-20">
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
      <div>
        <h2 className="text-3xl font-display font-bold tracking-tight">Intelligence Library</h2>
        <p className="text-sm text-muted-foreground mt-1 font-medium">
          Access collective team knowledge across all recorded sessions.
        </p>
      </div>
      <div className="flex gap-3">
        <Button
          variant="outline"
          className="rounded-2xl h-12 px-6 border-border/60 hover:bg-white shadow-soft"
        >
          <Filter className="w-4 h-4 mr-2" /> Filters
        </Button>
        <Button className="rounded-2xl h-12 px-6 bg-gradient-brand border-0 shadow-soft hover:scale-105 transition-transform">
          <Sparkles className="w-4 h-4 mr-2" /> Upload New
        </Button>
      </div>
    </div>

    <div className="relative">
      <div className="absolute left-6 top-1/2 -translate-y-1/2 z-10 pointer-events-none">
        <Search className="w-5 h-5 text-muted-foreground/60" />
      </div>
      <Input
        placeholder="Search for decisions, topics, or speaker mentions..."
        className="pl-14 h-16 rounded-3xl bg-white border-border/60 shadow-soft text-lg focus-visible:ring-primary/20 transition-all placeholder:text-muted-foreground/40"
      />
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {meetings.map((m, i) => (
        <motion.div
          key={m.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
        >
          <Link to={`/dashboard/meetings/${m.id}`}>
            <Card className="group h-full rounded-[2.5rem] bg-gradient-card border-border/60 p-6 hover-lift relative overflow-hidden transition-all duration-500 flex flex-col justify-between">
              <div
                className={`absolute inset-0 bg-gradient-to-br ${m.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
              />

              <div className="relative z-10">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex gap-1.5">
                    {m.tags.map((t) => (
                      <span
                        key={t}
                        className="text-[10px] font-black uppercase tracking-[0.1em] px-3 py-1 rounded-full bg-white/60 border border-border/40 text-foreground/70"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-white/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all translate-x-2 group-hover:translate-x-0">
                    <ArrowUpRight className="w-4 h-4 text-primary" />
                  </div>
                </div>

                <h3 className="text-xl font-display font-bold mb-3 group-hover:text-primary transition-colors tracking-tight">
                  {m.title}
                </h3>

                <p className="text-xs text-muted-foreground font-medium leading-relaxed mb-6 line-clamp-2">
                  {m.snippet}
                </p>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="flex items-center gap-2 text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                    <Calendar className="w-3 h-3 text-primary" /> {m.date}
                  </div>
                  <div className="flex items-center gap-2 text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                    <Clock className="w-3 h-3 text-cyan" /> {m.duration}
                  </div>
                </div>
              </div>

              <div className="relative z-10 pt-4 border-t border-border/40 flex items-center justify-between">
                <div className="flex -space-x-2">
                  {Array.from({ length: Math.min(m.participants, 4) }).map((_, i) => (
                    <div
                      key={i}
                      className="w-8 h-8 rounded-full border-2 border-white bg-gradient-brand flex items-center justify-center text-[10px] font-bold text-white shadow-soft"
                    >
                      {["S", "M", "A", "J"][i]}
                    </div>
                  ))}
                  {m.participants > 4 && (
                    <div className="w-8 h-8 rounded-full border-2 border-white bg-muted flex items-center justify-center text-[10px] font-bold text-muted-foreground">
                      +{m.participants - 4}
                    </div>
                  )}
                </div>
                <div className="relative">
                  <div className="absolute inset-0 bg-emerald/20 blur-md rounded-lg animate-pulse" />
                  <span className="relative z-10 text-[10px] font-black text-emerald uppercase tracking-[0.15em] flex items-center gap-1.5 bg-emerald/10 px-2.5 py-1 rounded-lg border border-emerald/20">
                    <Sparkles className="w-3 h-3 animate-pulse" /> {m.sentiment}
                  </span>
                </div>
              </div>
            </Card>
          </Link>
        </motion.div>
      ))}
    </div>
  </div>
);

export default Meetings;
