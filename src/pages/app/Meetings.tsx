import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Search, Filter, FileText, Clock, Users } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const meetings = Array.from({ length: 12 }, (_, i) => ({
  id: i + 1,
  title: ["Q4 Strategy Sync","Engineering Standup","Customer Discovery — Acme","Design Review","All-Hands April","1:1 Sarah / Marcus","Roadmap Planning","Sales Pipeline Review","Onboarding Workshop","Bug Triage","Retro · Sprint 24","Investor Update"][i],
  date: ["Today","Today","Yesterday","Yesterday","2d ago","3d ago","3d ago","4d ago","5d ago","5d ago","6d ago","1w ago"][i],
  duration: `${20 + i * 4}m`,
  participants: 2 + (i % 8),
  tags: i % 3 === 0 ? ["Strategy"] : i % 3 === 1 ? ["Engineering"] : ["Customer"],
  status: i % 5 === 0 ? "Processing" : "Processed",
}));

const Meetings = () => (
  <div className="space-y-6">
    <div className="flex flex-wrap gap-3 items-center">
      <div className="relative flex-1 min-w-[260px]">
        <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <Input placeholder="Search meetings…" className="pl-10 h-11 rounded-full bg-white" />
      </div>
      <Button variant="outline" className="rounded-full h-11"><Filter className="w-4 h-4 mr-2" /> Filters</Button>
      <Button className="rounded-full h-11 bg-gradient-brand border-0">+ New meeting</Button>
    </div>

    <Card className="rounded-3xl border-border/60 bg-gradient-card overflow-hidden">
      <div className="grid grid-cols-12 px-6 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider border-b border-border/60">
        <div className="col-span-5">Meeting</div>
        <div className="col-span-2">Date</div>
        <div className="col-span-1">Duration</div>
        <div className="col-span-2">Participants</div>
        <div className="col-span-2">Status</div>
      </div>
      {meetings.map(m => (
        <Link key={m.id} to={`/dashboard/meetings/${m.id}`} className="grid grid-cols-12 px-6 py-4 items-center hover:bg-muted/40 transition-colors border-b border-border/40 last:border-0">
          <div className="col-span-5 flex items-center gap-3 min-w-0">
            <div className="w-9 h-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
              <FileText className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <div className="font-semibold text-sm truncate">{m.title}</div>
              <div className="flex gap-1 mt-1">
                {m.tags.map(t => <span key={t} className="text-[10px] px-1.5 py-0.5 rounded-full bg-muted text-muted-foreground font-medium">{t}</span>)}
              </div>
            </div>
          </div>
          <div className="col-span-2 text-sm text-muted-foreground">{m.date}</div>
          <div className="col-span-1 text-sm flex items-center gap-1 text-muted-foreground"><Clock className="w-3.5 h-3.5" />{m.duration}</div>
          <div className="col-span-2 text-sm flex items-center gap-1 text-muted-foreground"><Users className="w-3.5 h-3.5" />{m.participants}</div>
          <div className="col-span-2">
            <span className={`text-xs px-2.5 py-1 rounded-full font-semibold ${m.status === "Processed" ? "bg-emerald/10 text-emerald" : "bg-amber-100 text-amber-700"}`}>{m.status}</span>
          </div>
        </Link>
      ))}
    </Card>
  </div>
);

export default Meetings;
