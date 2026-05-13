import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Download,
  Share2,
  Sparkles,
  ListChecks,
  FileText,
  ArrowLeft,
  Loader2,
  AlertCircle,
  CheckCircle2,
  Clock,
} from "lucide-react";
import { useParams, Link } from "react-router-dom";
import { useMeeting } from "@/hooks/useMeetings";
import { motion } from "framer-motion";

const SPEAKER_COLORS = [
  "bg-primary",
  "bg-emerald",
  "bg-amber-500",
  "bg-rose-500",
  "bg-cyan-500",
  "bg-purple-500",
];

function parseTranscriptLines(transcript: string) {
  return transcript
    .split("\n")
    .filter((line) => line.trim())
    .map((line, i) => ({
      t: `${String(Math.floor(i * 0.5)).padStart(2, "0")}:${String((i * 30) % 60).padStart(2, "0")}`,
      text: line.trim(),
      color: SPEAKER_COLORS[i % SPEAKER_COLORS.length],
    }));
}

const StatusBadge = ({ status }: { status: string }) => {
  const map: Record<string, { icon: React.ReactNode; color: string; label: string }> = {
    completed: {
      icon: <CheckCircle2 className="w-3.5 h-3.5" />,
      color: "text-emerald border-emerald/20 bg-emerald/10",
      label: "Completed",
    },
    processing: {
      icon: <Loader2 className="w-3.5 h-3.5 animate-spin" />,
      color: "text-yellow-400 border-yellow-400/20 bg-yellow-400/10",
      label: "Processing...",
    },
    pending: {
      icon: <Clock className="w-3.5 h-3.5" />,
      color: "text-white/40 border-white/10 bg-white/5",
      label: "Pending",
    },
    failed: {
      icon: <AlertCircle className="w-3.5 h-3.5" />,
      color: "text-red-400 border-red-400/20 bg-red-400/10",
      label: "Failed",
    },
  };
  const s = map[status] ?? map.pending;
  return (
    <span
      className={`inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-lg border ${s.color}`}
    >
      {s.icon} {s.label}
    </span>
  );
};

const MeetingDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { data: meeting, isLoading, isError } = useMeeting(id ?? "");

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-32 gap-3 text-white/40">
        <Loader2 className="w-6 h-6 animate-spin text-primary" />
        <span className="text-sm font-medium">Loading meeting...</span>
      </div>
    );
  }

  if (isError || !meeting) {
    return (
      <div className="flex flex-col items-center justify-center py-32 gap-4 text-white/40">
        <AlertCircle className="w-10 h-10 text-red-400" />
        <p className="text-sm font-medium">Meeting not found or failed to load.</p>
        <Link to="/dashboard/meetings">
          <Button variant="outline" className="rounded-xl border-white/10 bg-white/5">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to meetings
          </Button>
        </Link>
      </div>
    );
  }

  const transcriptLines = parseTranscriptLines(meeting.transcript);
  const formattedDate = new Date(meeting.created_at).toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="space-y-4 pb-10">
      {/* Back */}
      <Link
        to="/dashboard/meetings"
        className="inline-flex items-center gap-2 text-xs font-bold text-white/40 hover:text-white transition-colors uppercase tracking-widest"
      >
        <ArrowLeft className="w-3.5 h-3.5" /> Back to meetings
      </Link>

      <div className="grid lg:grid-cols-[1.4fr_1fr] gap-6">
        {/* LEFT */}
        <div className="space-y-5">
          <Card className="rounded-[2rem] border-white/5 bg-[#020617]/40 backdrop-blur-xl p-6 shadow-glow-sm">
            <div className="flex justify-between items-start mb-5">
              <div>
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {(meeting.tags.length > 0 ? meeting.tags : ["General"]).map((t) => (
                    <span
                      key={t}
                      className="text-[9px] font-black uppercase tracking-[0.2em] px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-white/40"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <h1 className="text-2xl font-display font-bold text-white/90 mb-2 uppercase">
                  {meeting.title}
                </h1>
                <div className="flex items-center gap-3 text-sm text-white/40 font-medium">
                  <span>{formattedDate}</span>
                  {meeting.participants.length > 0 && (
                    <span>
                      · {meeting.participants.length} participant
                      {meeting.participants.length !== 1 ? "s" : ""}
                    </span>
                  )}
                </div>
              </div>
              <div className="flex gap-2 shrink-0">
                <StatusBadge status={meeting.status} />
              </div>
            </div>

            {meeting.participants.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-2">
                {meeting.participants.map((p, i) => (
                  <span
                    key={p}
                    className={`inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-lg ${SPEAKER_COLORS[i % SPEAKER_COLORS.length]}/10 border border-white/10 text-white/60`}
                  >
                    {p}
                  </span>
                ))}
              </div>
            )}
          </Card>

          {/* Transcript */}
          <Card className="rounded-[2rem] border-white/5 bg-[#020617]/40 backdrop-blur-xl p-6 shadow-glow-sm">
            <h3 className="font-display font-bold mb-4 flex items-center gap-2 text-white/90 uppercase text-sm">
              <FileText className="w-4 h-4 text-primary" /> Transcript
            </h3>
            <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2 scrollbar-hide">
              {transcriptLines.map((line, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.02 }}
                  className="flex gap-3"
                >
                  <span className="text-xs font-mono text-white/20 pt-1 w-10 shrink-0">
                    {line.t}
                  </span>
                  <div
                    className={`w-7 h-7 rounded-lg ${line.color} text-white flex items-center justify-center text-xs font-bold shrink-0`}
                  >
                    T
                  </div>
                  <p className="text-sm leading-relaxed text-white/60 flex-1">{line.text}</p>
                </motion.div>
              ))}
            </div>
          </Card>
        </div>

        {/* RIGHT */}
        <div className="space-y-5">
          {/* AI Summary */}
          <Card className="rounded-[2rem] border-white/5 bg-[#020617]/40 backdrop-blur-xl p-6 shadow-glow-sm">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-4 h-4 text-primary" />
              <h3 className="font-display font-bold text-white/90 uppercase text-sm">AI Summary</h3>
            </div>
            {meeting.status === "completed" && meeting.summary ? (
              <p className="text-sm leading-relaxed text-white/60">{meeting.summary}</p>
            ) : meeting.status === "processing" || meeting.status === "pending" ? (
              <div className="flex items-center gap-2 text-yellow-400 text-sm font-medium">
                <Loader2 className="w-4 h-4 animate-spin" /> AI is analyzing this transcript...
              </div>
            ) : (
              <p className="text-sm text-white/30">Summary unavailable.</p>
            )}
          </Card>

          {/* Key Decisions */}
          {meeting.key_decisions.length > 0 && (
            <Card className="rounded-[2rem] border-white/5 bg-[#020617]/40 backdrop-blur-xl p-6 shadow-glow-sm">
              <h3 className="font-display font-bold mb-4 text-white/90 uppercase text-sm">
                Key Decisions
              </h3>
              <ul className="space-y-2.5">
                {meeting.key_decisions.map((d, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-white/60">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" /> {d}
                  </li>
                ))}
              </ul>
            </Card>
          )}

          {/* Action Items */}
          {meeting.action_items.length > 0 && (
            <Card className="rounded-[2rem] border-white/5 bg-[#020617]/40 backdrop-blur-xl p-6 shadow-glow-sm">
              <h3 className="font-display font-bold mb-4 flex items-center gap-2 text-white/90 uppercase text-sm">
                <ListChecks className="w-4 h-4 text-emerald" /> Action Items
              </h3>
              <div className="space-y-2.5">
                {meeting.action_items.map((item, i) => (
                  <div
                    key={i}
                    className="p-3.5 rounded-2xl bg-white/5 border border-white/10 hover:border-primary/20 transition-colors"
                  >
                    <div className="flex items-start gap-2 text-sm text-white/70">
                      <div className="w-5 h-5 rounded-md bg-emerald/10 border border-emerald/20 flex items-center justify-center shrink-0 mt-0.5">
                        <CheckCircle2 className="w-3 h-3 text-emerald" />
                      </div>
                      {item}
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {/* Ask AI about this meeting */}
          <Card className="rounded-[2rem] border-primary/20 bg-primary/5 backdrop-blur-xl p-6 shadow-glow-sm">
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="w-4 h-4 text-primary" />
              <h3 className="font-display font-bold text-white/90 uppercase text-sm">Ask AI</h3>
            </div>
            <p className="text-xs text-white/40 mb-4 font-medium leading-relaxed">
              Have questions about this meeting? Ask the AI assistant!
            </p>
            <Link to="/dashboard/chat">
              <Button className="w-full h-10 rounded-xl bg-gradient-brand border-0 text-xs font-bold uppercase tracking-widest shadow-float hover:scale-[1.02] transition-all">
                Open AI Chat
              </Button>
            </Link>
          </Card>
        </div>
      </div>
    </div>
  );
};
export default MeetingDetail;
