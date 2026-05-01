import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

const apps = [
  {
    name: "Notion",
    desc: "Sync summaries to Notion pages",
    color: "bg-white/10 text-white",
    letter: "N",
    connected: true,
  },

  {
    name: "Jira",
    desc: "Push action items as Jira issues",
    color: "bg-blue-600 text-white",
    letter: "J",
    connected: true,
  },
  {
    name: "Slack",
    desc: "Send recaps to your channels",
    color: "bg-purple-600 text-white",
    letter: "S",
    connected: false,
  },
  {
    name: "Zoom",
    desc: "Auto-import Zoom recordings",
    color: "bg-sky-500 text-white",
    letter: "Z",
    connected: true,
  },
  {
    name: "Google Meet",
    desc: "Capture Meet conversations live",
    color: "bg-emerald text-white",
    letter: "G",
    connected: false,
  },
  {
    name: "Google Calendar",
    desc: "Sync deadlines to your calendar",
    color: "bg-rose-500 text-white",
    letter: "C",
    connected: false,
  },
];

const Integrations = () => (
  <div className="space-y-6 md:space-y-8 pb-20">
    <div className="max-w-xl">
      <h2 className="text-2xl md:text-3xl font-display font-bold tracking-tight text-white/90 uppercase">Neural Ecosystem</h2>
      <p className="text-xs md:text-sm text-white/40 mt-1 font-medium leading-relaxed">
        Seamlessly synchronize intelligence across your existing stack. Action items and synthesis flow automatically.
      </p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 md:gap-6">
      {apps.map((a) => (
        <Card key={a.name} className="p-6 md:p-8 rounded-[2rem] bg-[#020617]/40 backdrop-blur-md border-white/5 hover-lift shadow-glow-sm relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-brand opacity-0 group-hover:opacity-5 transition-opacity" />
          
          <div className="flex items-start justify-between mb-6 relative z-10">
            <div
              className={`w-12 h-12 rounded-xl md:rounded-2xl ${a.color} flex items-center justify-center font-display font-black text-xl shadow-soft border border-white/10`}
            >
              {a.letter}
            </div>
            {a.connected && (
              <span className="text-[10px] px-2.5 py-1.5 rounded-lg bg-emerald/5 text-emerald font-black uppercase tracking-widest border border-emerald/10 flex items-center gap-1.5">
                <Check className="w-3 h-3" /> CONNECTED
              </span>
            )}
          </div>
          
          <div className="relative z-10">
            <h3 className="text-lg font-display font-bold mb-1 text-white/90 uppercase tracking-tight">{a.name}</h3>
            <p className="text-xs text-white/30 font-medium mb-8 leading-relaxed">{a.desc}</p>
            
            <Button
              variant={a.connected ? "outline" : "default"}
              className={`w-full rounded-xl md:rounded-2xl h-11 md:h-12 text-[10px] font-black uppercase tracking-[0.2em] transition-all ${a.connected ? "border-white/10 bg-white/5 text-white/60 hover:bg-white/10" : "bg-gradient-brand border-0 shadow-emerald hover:scale-[1.02]"}`}
            >
              {a.connected ? "CONFIGURE" : "CONNECT SYNC"}
            </Button>
          </div>
        </Card>
      ))}
    </div>
  </div>
);
export default Integrations;
