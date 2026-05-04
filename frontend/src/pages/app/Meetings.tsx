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
import { useState, useEffect } from "react";
import { MeetingSkeleton } from "@/components/dashboard/Skeletons";
import { EmptyState } from "@/components/dashboard/EmptyState";

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

const Meetings = () => {
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const filteredMeetings = meetings.filter(
    (m) =>
      m.title.toLowerCase().includes(search.toLowerCase()) ||
      m.snippet.toLowerCase().includes(search.toLowerCase()) ||
      m.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="space-y-6 md:space-y-10 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="max-w-xl">
          <h2 className="text-2xl md:text-3xl font-display font-bold tracking-tight text-white/90 uppercase">
            Intelligence Library
          </h2>
          <p className="text-xs md:text-sm text-white/40 mt-1 font-medium leading-relaxed">
            Access collective team knowledge across all recorded sessions.
          </p>
        </div>
        <div className="flex gap-3">
          <Button
            variant="outline"
            className="flex-1 md:flex-none rounded-xl md:rounded-2xl h-10 md:h-12 px-5 md:px-6 border-white/5 bg-white/[0.02] backdrop-blur-md hover:bg-white/5 transition-all text-white/50 text-xs font-bold uppercase tracking-widest"
          >
            <Filter className="w-4 h-4 mr-2" /> Filters
          </Button>
          <Button className="flex-1 md:flex-none rounded-xl md:rounded-2xl h-10 md:h-12 px-5 md:px-6 bg-gradient-brand border-0 shadow-emerald hover:scale-105 transition-all text-xs font-bold uppercase tracking-widest">
            <Sparkles className="w-4 h-4 mr-2" /> Upload
          </Button>
        </div>
      </div>

      <div className="relative group">
        <div className="absolute left-5 md:left-6 top-1/2 -translate-y-1/2 z-10 pointer-events-none group-focus-within:text-primary transition-colors">
          <Search className="w-4 h-4 md:w-5 md:h-5 text-white/20" />
        </div>
        <Input
          placeholder="Search decisions or topics..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-12 md:pl-14 h-12 md:h-16 rounded-2xl md:rounded-[2rem] bg-[#020617]/40 backdrop-blur-xl border-white/5 shadow-glow-sm text-sm md:text-lg focus-visible:ring-primary/20 transition-all placeholder:text-white/10 text-white/80"
        />
      </div>

      {loading ? (
        <MeetingSkeleton />
      ) : filteredMeetings.length === 0 ? (
        <EmptyState
          icon="search"
          title="No results found"
          description={`We couldn't find any sessions matching "${search}". Try adjusting your search query.`}
          actionText="Clear search"
          onAction={() => setSearch("")}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 md:gap-6">
          {filteredMeetings.map((m, i) => (
            <motion.div
              key={m.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Link to={`/dashboard/meetings/${m.id}`}>
                <Card className="group h-full rounded-[2rem] md:rounded-[2.5rem] bg-[#020617]/40 backdrop-blur-md border-white/5 p-6 hover-lift relative overflow-hidden transition-all duration-500 flex flex-col justify-between shadow-glow-sm">
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${m.color} opacity-0 group-hover:opacity-10 pointer-events-none transition-opacity duration-500`}
                  />

                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex flex-wrap gap-1.5">
                        {m.tags.map((t) => (
                          <span
                            key={t}
                            className="text-[9px] font-black uppercase tracking-[0.2em] px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-white/40"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                      <div className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all translate-x-2 group-hover:translate-x-0">
                        <ArrowUpRight className="w-4 h-4 text-primary" />
                      </div>
                    </div>

                    <h3 className="text-xl font-display font-bold mb-3 group-hover:text-primary transition-colors tracking-tight text-white/90 uppercase">
                      {m.title}
                    </h3>

                    <p className="text-xs text-white/40 font-medium leading-relaxed mb-6 line-clamp-2">
                      {m.snippet}
                    </p>

                    <div className="grid grid-cols-2 gap-3 md:gap-4 mb-6">
                      <div className="flex items-center gap-2 text-[10px] font-bold text-white/30 uppercase tracking-widest truncate">
                        <Calendar className="w-3 h-3 text-primary/60" /> {m.date}
                      </div>
                      <div className="flex items-center gap-2 text-[10px] font-bold text-white/30 uppercase tracking-widest truncate">
                        <Clock className="w-3 h-3 text-cyan/60" /> {m.duration}
                      </div>
                    </div>
                  </div>

                  <div className="relative z-10 pt-5 border-t border-white/5 flex items-center justify-between">
                    <div className="flex -space-x-2">
                      {Array.from({ length: Math.min(m.participants, 4) }).map((_, idx) => (
                        <div
                          key={idx}
                          className="w-7 h-7 md:w-8 md:h-8 rounded-full border-2 border-[#020617] bg-gradient-brand flex items-center justify-center text-[10px] font-black text-white shadow-soft"
                        >
                          {["S", "M", "A", "J"][idx]}
                        </div>
                      ))}
                      {m.participants > 4 && (
                        <div className="w-7 h-7 md:w-8 md:h-8 rounded-full border-2 border-[#020617] bg-white/5 backdrop-blur-md flex items-center justify-center text-[10px] font-black text-white/30">
                          +{m.participants - 4}
                        </div>
                      )}
                    </div>
                    <div className="relative">
                      <span className="relative z-10 text-[9px] md:text-[10px] font-black text-emerald uppercase tracking-[0.2em] flex items-center gap-1.5 bg-emerald/5 px-2.5 py-1.5 rounded-lg border border-emerald/10">
                        <div className="w-1 h-1 rounded-full bg-emerald animate-pulse" />
                        {m.sentiment}
                      </span>
                    </div>
                  </div>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Meetings;
