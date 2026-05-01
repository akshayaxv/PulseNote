import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

const apps = [
  { name: "Notion", desc: "Sync summaries to Notion pages", color: "bg-white/10 text-white", letter: "N", connected: true },

  { name: "Jira", desc: "Push action items as Jira issues", color: "bg-blue-600 text-white", letter: "J", connected: true },
  { name: "Slack", desc: "Send recaps to your channels", color: "bg-purple-600 text-white", letter: "S", connected: false },
  { name: "Zoom", desc: "Auto-import Zoom recordings", color: "bg-sky-500 text-white", letter: "Z", connected: true },
  { name: "Google Meet", desc: "Capture Meet conversations live", color: "bg-emerald text-white", letter: "G", connected: false },
  { name: "Google Calendar", desc: "Sync deadlines to your calendar", color: "bg-rose-500 text-white", letter: "C", connected: false },
];

const Integrations = () => (
  <div className="space-y-6">
    <p className="text-sm text-muted-foreground max-w-xl">Connect MeetMind to the tools your team already uses. Action items and summaries flow automatically.</p>
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
      {apps.map(a => (
        <Card key={a.name} className="p-6 rounded-3xl bg-gradient-card border-border/60 hover-lift">
          <div className="flex items-start justify-between mb-4">
            <div className={`w-12 h-12 rounded-2xl ${a.color} flex items-center justify-center font-display font-black text-lg shadow-soft`}>{a.letter}</div>
            {a.connected && <span className="text-xs px-2.5 py-1 rounded-full bg-emerald/10 text-emerald font-semibold flex items-center gap-1"><Check className="w-3 h-3" /> Connected</span>}
          </div>
          <h3 className="font-display font-bold mb-1">{a.name}</h3>
          <p className="text-sm text-muted-foreground mb-5">{a.desc}</p>
          <Button variant={a.connected ? "outline" : "default"} className={`w-full rounded-full ${a.connected ? "" : "bg-gradient-brand border-0"}`}>
            {a.connected ? "Configure" : "Connect"}
          </Button>
        </Card>
      ))}
    </div>
  </div>
);
export default Integrations;
