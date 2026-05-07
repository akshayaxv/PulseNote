import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";
import {
  Search, Filter, FileText, Clock, Users, Calendar,
  ArrowUpRight, Sparkles, Loader2, AlertCircle,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useState } from "react";
import { MeetingSkeleton } from "@/components/dashboard/Skeletons";
import { EmptyState } from "@/components/dashboard/EmptyState";
import { useMeetings } from "@/hooks/useMeetings";
import { useNavigate } from "react-router-dom";

const STATUS_COLORS: Record<string, string> = {
  completed: "text-emerald",
  processing: "text-yellow-400",
  pending: "text-white/30",
  failed: "text-red-400",
};

const CARD_COLORS = [
  "from-blue-500/20 to-purple-500/20",
  "from-emerald-500/20 to-teal-500/20",
  "from-amber-500/20 to-orange-500/20",
  "from-rose-500/20 to-pink-500/20",
  "from-indigo-500/20 to-blue-500/20",
  "from-cyan-500/20 to-blue-500/20",
];

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "Yesterday";
  if (diffDays < 7) return `${diffDays}d ago`;
  return date.toLocaleDateString();
}

const Meetings = () => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const { data: meetings, isLoading, isError } = useMeetings();

  const filtered = (meetings ?? []).filter(
    (m) =>
      m.title.toLowerCase().includes(search.toLowerCase()) ||
      (m.summary ?? "").toLowerCase().includes(search.toLowerCase()) ||
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
          <Button
            onClick={() => navigate("/dashboard/upload")}
            className="flex-1 md:flex-none rounded-xl md:rounded-2xl h-10 md:h-12 px-5 md:px-6 bg-gradient-brand border-0 shadow-emerald hover:scale-105 transition-all text-xs font-bold uppercase tracking-widest"
          >
            <Sparkles className="w-4 h-4 mr-2" /> Upload
          </Button>
        </div>
      </div>

      <div className="relative group">
        <div className="absolute left-5 md:left-6 top-1/2 -translate-y-1/2 z-10 pointer-events-none">
          <Search className="w-4 h-4 md:w-5 md:h-5 text-white/20" />
        </div>
        <Input
          placeholder="Search meetings, decisions, or topics..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-12 md:pl-14 h-12 md:h-16 rounded-2xl md:rounded-[2rem] bg-[#020617]/40 backdrop-blur-xl border-white/5 shadow-glow-sm text-sm md:text-lg focus-visible:ring-primary/20 transition-all placeholder:text-white/10 text-white/80"
        />
      </div>

      {isLoading ? (
        <MeetingSkeleton />
      ) : isError ? (
        <div className="flex flex-col items-center justify-center py-20 gap-4 text-white/40">
          <AlertCircle className="w-10 h-10 text-red-400" />
          <p className="text-sm font-medium">Failed to load meetings. Is the backend running?</p>
        </div>
      ) : filtered.length === 0 ? (
        <EmptyState
          icon="search"
          title={search ? "No results found" : "No meetings yet"}
          description={
            search
              ? `No sessions matching "${search}". Try adjusting your search.`
              : "Upload your first meeting transcript to get started."
          }
          actionText={search ? "Clear search" : "Upload Meeting"}
          onAction={() => (search ? setSearch("") : navigate("/dashboard/upload"))}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 md:gap-6">
          {filtered.map((m, i) => (
            <motion.div
              key={m.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.07 }}
            >
              <Link to={`/dashboard/meetings/${m.id}`}>
                <Card className={`group h-full rounded-[2rem] md:rounded-[2.5rem] bg-[#020617]/40 backdrop-blur-md border-white/5 p-6 hover-lift relative overflow-hidden transition-all duration-500 flex flex-col justify-between shadow-glow-sm`}>
                  <div className={`absolute inset-0 bg-gradient-to-br ${CARD_COLORS[i % CARD_COLORS.length]} opacity-0 group-hover:opacity-10 pointer-events-none transition-opacity duration-500`} />

                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex flex-wrap gap-1.5">
                        {(m.tags.length > 0 ? m.tags : ["General"]).map((t) => (
                          <span key={t} className="text-[9px] font-black uppercase tracking-[0.2em] px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-white/40">
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
                      {m.summary ?? "AI is processing this transcript..."}
                    </p>

                    <div className="grid grid-cols-2 gap-3 md:gap-4 mb-6">
                      <div className="flex items-center gap-2 text-[10px] font-bold text-white/30 uppercase tracking-widest truncate">
                        <Calendar className="w-3 h-3 text-primary/60" /> {formatDate(m.created_at)}
                      </div>
                      <div className="flex items-center gap-2 text-[10px] font-bold text-white/30 uppercase tracking-widest truncate">
                        <Users className="w-3 h-3 text-cyan/60" /> {m.participants.length > 0 ? `${m.participants.length} people` : "—"}
                      </div>
                    </div>
                  </div>

                  <div className="relative z-10 pt-5 border-t border-white/5 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-[10px] font-bold text-white/30 uppercase tracking-widest">
                      <FileText className="w-3 h-3" /> Transcript
                    </div>
                    <span className={`text-[9px] font-black uppercase tracking-[0.2em] flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-white/5 bg-white/5 ${STATUS_COLORS[m.status]}`}>
                      <div className={`w-1 h-1 rounded-full ${m.status === "completed" ? "bg-emerald animate-pulse" : m.status === "processing" ? "bg-yellow-400 animate-pulse" : "bg-white/20"}`} />
                      {m.status}
                    </span>
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
