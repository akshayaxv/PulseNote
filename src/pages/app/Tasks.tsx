import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Calendar, Flag } from "lucide-react";
import { motion, Reorder } from "framer-motion";

type Task = {
  id: string;
  title: string;
  owner: string;
  due: string;
  priority: "High" | "Medium" | "Low";
};
const initial: Record<string, Task[]> = {
  "To Do": [
    { id: "1", title: "Draft Onboarding v2 spec", owner: "Marcus", due: "May 8", priority: "High" },
    {
      id: "2",
      title: "Compile support data report",
      owner: "Aisha",
      due: "May 6",
      priority: "Medium",
    },
    { id: "3", title: "Investor sync agenda", owner: "Sarah", due: "May 11", priority: "Medium" },
  ],
  "In Progress": [
    { id: "4", title: "Review pricing experiment", owner: "Team", due: "May 15", priority: "Low" },
    {
      id: "5",
      title: "Implement waveform component",
      owner: "Eng",
      due: "May 5",
      priority: "High",
    },
  ],
  Completed: [
    { id: "6", title: "Q3 retro write-up", owner: "Sarah", due: "Apr 30", priority: "Medium" },
    { id: "7", title: "Hire senior PM", owner: "Aisha", due: "Apr 28", priority: "High" },
  ],
};

const priColor = {
  High: "bg-rose-500/10 text-rose-400",
  Medium: "bg-amber-500/10 text-amber-400",
  Low: "bg-sky-500/10 text-sky-400",
};

const Tasks = () => {
  const [board, setBoard] = useState(initial);
  return (
    <div className="space-y-8 md:space-y-12 pb-20">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl md:text-3xl font-display font-bold tracking-tight text-white/90 uppercase">Action Registry</h2>
          <p className="text-[10px] md:text-xs text-white/30 font-black uppercase tracking-[0.2em] mt-1">
            Drag to prioritize · Click to view source meeting
          </p>
        </div>
        <Button className="rounded-xl md:rounded-2xl h-10 md:h-12 px-6 bg-gradient-brand border-0 shadow-emerald hover:scale-105 transition-all text-xs font-bold uppercase tracking-widest self-start sm:self-auto">
          <Plus className="w-4 h-4 mr-2" /> New Task
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
        {Object.entries(board).map(([col, items]) => (
          <div key={col} className="space-y-5">
            <div className="flex items-center justify-between px-2">
              <div className="flex items-center gap-3">
                <div
                  className={`w-2 h-2 rounded-full ${col === "To Do" ? "bg-cyan shadow-[0_0_8px_rgba(6,182,212,0.4)]" : col === "In Progress" ? "bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.4)]" : "bg-emerald shadow-[0_0_8px_rgba(16,185,129,0.4)]"}`}
                />
                <h3 className="font-display font-bold text-sm uppercase tracking-widest text-white/80">{col}</h3>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-white/30 font-black">
                  {items.length}
                </span>
              </div>
              <button className="w-8 h-8 rounded-lg hover:bg-white/5 flex items-center justify-center text-white/20 hover:text-white transition-colors">
                <Plus className="w-4 h-4" />
              </button>
            </div>
            <Reorder.Group
              axis="y"
              values={items}
              onReorder={(v) => setBoard({ ...board, [col]: v })}
              className="space-y-3 min-h-[100px]"
            >
              {items.map((t) => (
                <Reorder.Item key={t.id} value={t}>
                  <motion.div whileHover={{ y: -2 }} className="px-0.5">
                    <Card className="p-4 rounded-2xl border-white/5 bg-[#020617]/40 backdrop-blur-md cursor-grab active:cursor-grabbing shadow-glow-sm hover:border-white/10 transition-all group">
                      <div className="flex justify-between items-start gap-3 mb-4">
                        <div className="font-bold text-sm text-white/80 leading-snug group-hover:text-primary transition-colors">{t.title}</div>
                        <Flag
                          className={`w-3.5 h-3.5 shrink-0 ${t.priority === "High" ? "text-rose-500" : t.priority === "Medium" ? "text-amber-500" : "text-cyan"}`}
                        />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-lg bg-gradient-brand text-white text-[10px] font-black flex items-center justify-center shadow-soft">
                            {t.owner[0]}
                          </div>
                          <span className="text-[10px] font-bold text-white/40 uppercase tracking-tight">{t.owner}</span>
                        </div>
                        
                        <div className="flex items-center gap-3">
                          <span
                            className={`text-[9px] px-2 py-0.5 rounded-lg font-black uppercase tracking-tighter border ${t.priority === "High" ? "bg-rose-500/10 border-rose-500/20 text-rose-500" : t.priority === "Medium" ? "bg-amber-500/10 border-amber-500/20 text-amber-500" : "bg-cyan/10 border-cyan/20 text-cyan"}`}
                          >
                            {t.priority}
                          </span>
                          <div className="text-[10px] text-white/20 font-bold flex items-center gap-1.5 uppercase">
                            <Calendar className="w-3 h-3" />
                            {t.due}
                          </div>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                </Reorder.Item>
              ))}
            </Reorder.Group>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Tasks;
