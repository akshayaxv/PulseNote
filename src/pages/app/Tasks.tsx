import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Calendar, Flag } from "lucide-react";
import { motion, Reorder } from "framer-motion";

type Task = { id: string; title: string; owner: string; due: string; priority: "High" | "Medium" | "Low" };
const initial: Record<string, Task[]> = {
  "To Do": [
    { id: "1", title: "Draft Onboarding v2 spec", owner: "Marcus", due: "May 8", priority: "High" },
    { id: "2", title: "Compile support data report", owner: "Aisha", due: "May 6", priority: "Medium" },
    { id: "3", title: "Investor sync agenda", owner: "Sarah", due: "May 11", priority: "Medium" },
  ],
  "In Progress": [
    { id: "4", title: "Review pricing experiment", owner: "Team", due: "May 15", priority: "Low" },
    { id: "5", title: "Implement waveform component", owner: "Eng", due: "May 5", priority: "High" },
  ],
  "Completed": [
    { id: "6", title: "Q3 retro write-up", owner: "Sarah", due: "Apr 30", priority: "Medium" },
    { id: "7", title: "Hire senior PM", owner: "Aisha", due: "Apr 28", priority: "High" },
  ],
};

const priColor = { High: "bg-rose-100 text-rose-700", Medium: "bg-amber-100 text-amber-700", Low: "bg-sky-100 text-sky-700" };

const Tasks = () => {
  const [board, setBoard] = useState(initial);
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <p className="text-sm text-muted-foreground">Drag to reorder. Click a card to view source meeting.</p>
        <Button className="rounded-full bg-gradient-brand border-0"><Plus className="w-4 h-4 mr-1.5" /> New task</Button>
      </div>
      <div className="grid md:grid-cols-3 gap-5">
        {Object.entries(board).map(([col, items]) => (
          <div key={col}>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className={`w-2.5 h-2.5 rounded-full ${col === "To Do" ? "bg-sky-400" : col === "In Progress" ? "bg-amber-400" : "bg-emerald"}`} />
                <h3 className="font-display font-bold">{col}</h3>
                <span className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground font-semibold">{items.length}</span>
              </div>
              <button className="text-muted-foreground hover:text-foreground"><Plus className="w-4 h-4" /></button>
            </div>
            <Reorder.Group axis="y" values={items} onReorder={(v) => setBoard({ ...board, [col]: v })} className="space-y-3 min-h-[200px]">
              {items.map(t => (
                <Reorder.Item key={t.id} value={t}>
                  <motion.div whileHover={{ y: -3 }}>
                    <Card className="p-4 rounded-2xl border-border/60 bg-white cursor-grab active:cursor-grabbing shadow-soft hover:shadow-float transition-shadow">
                      <div className="flex justify-between items-start gap-2 mb-2">
                        <div className="font-semibold text-sm">{t.title}</div>
                        <Flag className={`w-3.5 h-3.5 shrink-0 ${t.priority === "High" ? "text-rose-500" : t.priority === "Medium" ? "text-amber-500" : "text-sky-500"}`} />
                      </div>
                      <div className="flex justify-between items-center mt-3">
                        <div className="flex items-center gap-1.5">
                          <div className="w-6 h-6 rounded-full bg-gradient-brand text-white text-[10px] font-bold flex items-center justify-center">{t.owner[0]}</div>
                          <span className="text-xs text-muted-foreground">{t.owner}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${priColor[t.priority]}`}>{t.priority}</span>
                          <div className="text-xs text-muted-foreground flex items-center gap-1"><Calendar className="w-3 h-3" />{t.due}</div>
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
