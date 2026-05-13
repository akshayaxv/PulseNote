import { Card } from "@/components/ui/card";
import { Calendar, Flag, Loader2, Sparkles, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import { useMeetings, useMeeting } from "@/hooks/useMeetings";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

type Task = {
  id: string;
  title: string;
  meetingTitle: string;
  meetingId: string;
};

// Fetch action items from completed meetings
function useAllActionItems() {
  const { data: meetings, isLoading } = useMeetings();
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    if (!meetings) return;
    const allTasks: Task[] = [];
    meetings
      .filter((m) => m.status === "completed")
      .forEach((m) => {
        // We only have summary in list view — items come from full meeting detail
        // We'll show a placeholder per meeting and let detail load
      });
    setTasks(allTasks);
  }, [meetings]);

  return { meetings, tasks, isLoading };
}

// Component to load & display action items for a single meeting
const MeetingActionItems = ({
  meetingId,
  meetingTitle,
}: {
  meetingId: string;
  meetingTitle: string;
}) => {
  const { data: meeting } = useMeeting(meetingId);
  if (!meeting?.action_items?.length) return null;

  return (
    <>
      {meeting.action_items.map((item, i) => (
        <motion.div
          key={`${meetingId}-${i}`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.05 }}
        >
          <Card className="p-4 rounded-2xl border-white/5 bg-[#020617]/40 backdrop-blur-md shadow-glow-sm hover:border-white/10 transition-all group">
            <div className="flex items-start gap-3 mb-4">
              <div className="w-5 h-5 rounded-md bg-emerald/10 border border-emerald/20 flex items-center justify-center shrink-0 mt-0.5">
                <CheckCircle2 className="w-3 h-3 text-emerald" />
              </div>
              <div className="font-bold text-sm text-white/80 leading-snug group-hover:text-primary transition-colors flex-1">
                {item}
              </div>
              <Flag className="w-3.5 h-3.5 shrink-0 text-amber-500" />
            </div>
            <div className="flex items-center justify-between">
              <Link
                to={`/dashboard/meetings/${meetingId}`}
                className="text-[10px] font-bold text-primary/60 hover:text-primary transition-colors uppercase tracking-widest flex items-center gap-1.5 truncate max-w-[70%]"
              >
                <Sparkles className="w-3 h-3 shrink-0" />
                <span className="truncate">{meetingTitle}</span>
              </Link>
              <div className="flex items-center gap-1.5 text-[10px] text-white/20 font-bold uppercase">
                <Calendar className="w-3 h-3" /> AI Extracted
              </div>
            </div>
          </Card>
        </motion.div>
      ))}
    </>
  );
};

const Tasks = () => {
  const { data: meetings, isLoading } = useMeetings();
  const completedMeetings = (meetings ?? []).filter((m) => m.status === "completed");

  return (
    <div className="space-y-8 md:space-y-12 pb-20">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl md:text-3xl font-display font-bold tracking-tight text-white/90 uppercase">
            Action Items
          </h2>
          <p className="text-[10px] md:text-xs text-white/30 font-black uppercase tracking-[0.2em] mt-1">
            AI-extracted from your meeting transcripts
          </p>
        </div>
        <Link to="/dashboard/upload">
          <button className="rounded-xl md:rounded-2xl h-10 md:h-12 px-6 bg-gradient-brand border-0 shadow-emerald hover:scale-105 transition-all text-xs font-bold uppercase tracking-widest text-white flex items-center gap-2">
            <Sparkles className="w-4 h-4" /> Upload Meeting
          </button>
        </Link>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-20 gap-3 text-white/40">
          <Loader2 className="w-5 h-5 animate-spin text-primary" />
          <span className="text-sm font-medium">Loading action items...</span>
        </div>
      ) : completedMeetings.length === 0 ? (
        <Card className="rounded-[2rem] border-white/5 bg-[#020617]/40 backdrop-blur-xl p-12 text-center shadow-glow-sm">
          <Sparkles className="w-10 h-10 text-primary/30 mx-auto mb-4" />
          <h3 className="font-display font-bold text-white/60 uppercase mb-2">
            No Action Items Yet
          </h3>
          <p className="text-sm text-white/30 max-w-sm mx-auto mb-6 font-medium leading-relaxed">
            Upload a meeting transcript and AI will automatically extract action items for you.
          </p>
          <Link to="/dashboard/upload">
            <button className="h-10 px-6 rounded-xl bg-gradient-brand border-0 text-xs font-bold uppercase tracking-widest text-white shadow-float hover:scale-[1.02] transition-all">
              Upload Your First Meeting
            </button>
          </Link>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-5">
          {completedMeetings.map((m) => (
            <MeetingActionItems key={m.id} meetingId={m.id} meetingTitle={m.title} />
          ))}
        </div>
      )}
    </div>
  );
};
export default Tasks;
