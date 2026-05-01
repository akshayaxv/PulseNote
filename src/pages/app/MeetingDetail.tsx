import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Download,
  Share2,
  Sparkles,
  AlertTriangle,
  ListChecks,
  FileText,
} from "lucide-react";
import { useState } from "react";

const transcript = [
  {
    t: "00:01",
    speaker: "Sarah",
    color: "bg-primary",
    text: "Welcome everyone — let's kick off with the Q4 roadmap. I want us to align on the top three bets for the quarter.",
  },
  {
    t: "00:18",
    speaker: "Marcus",
    color: "bg-emerald",
    text: "From engineering, we have capacity for two big initiatives plus maintenance. Onboarding v2 is the biggest unlock based on the latest activation data.",
  },
  {
    t: "00:42",
    speaker: "Aisha",
    color: "bg-amber-500",
    text: "Customer support is also flagging that the upload flow has the highest drop-off. Could be related.",
  },
  {
    t: "01:05",
    speaker: "Sarah",
    color: "bg-primary",
    text: "Agreed. Let's commit to onboarding v2 as P0. Marcus, can your team have a spec by next Friday?",
  },
  {
    t: "01:18",
    speaker: "Marcus",
    color: "bg-emerald",
    text: "Yes — I'll own the spec and circulate by Friday EOD.",
  },
  {
    t: "01:32",
    speaker: "Aisha",
    color: "bg-amber-500",
    text: "I'll pull together the support data and share in the channel by Wednesday.",
  },
];

const actions = [
  { who: "Marcus", what: "Draft Onboarding v2 spec", due: "Fri, May 8", priority: "High" },
  { who: "Aisha", what: "Compile support data report", due: "Wed, May 6", priority: "Medium" },
  { who: "Sarah", what: "Schedule investor sync", due: "Mon, May 11", priority: "Medium" },
  { who: "Team", what: "Review pricing experiment results", due: "Fri, May 15", priority: "Low" },
];

const MeetingDetail = () => {
  const [playing, setPlaying] = useState(false);
  return (
    <div className="grid lg:grid-cols-[1.4fr_1fr] gap-6">
      <div className="space-y-5">
        <Card className="rounded-3xl border-border/60 bg-gradient-card p-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <div className="text-xs font-semibold text-muted-foreground mb-1">
                PRODUCT · STRATEGY
              </div>
              <h1 className="text-2xl font-display font-bold mb-1">Q4 Product Strategy Sync</h1>
              <div className="text-sm text-muted-foreground">
                Friday, May 1 · 48 minutes · 6 participants
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="rounded-full">
                <Share2 className="w-3.5 h-3.5 mr-1.5" /> Share
              </Button>
              <Button variant="outline" size="sm" className="rounded-full">
                <Download className="w-3.5 h-3.5 mr-1.5" /> Export
              </Button>
            </div>
          </div>

          {/* Audio player */}
          <div className="rounded-2xl bg-navy text-white p-5">
            <div className="flex items-center gap-3 mb-4">
              <Button
                onClick={() => setPlaying(!playing)}
                size="icon"
                className="rounded-full w-12 h-12 bg-emerald hover:bg-emerald/90 border-0 shadow-emerald"
              >
                {playing ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
              </Button>
              <Button
                size="icon"
                variant="ghost"
                className="text-white hover:bg-white/10 rounded-full"
              >
                <SkipBack className="w-4 h-4" />
              </Button>
              <Button
                size="icon"
                variant="ghost"
                className="text-white hover:bg-white/10 rounded-full"
              >
                <SkipForward className="w-4 h-4" />
              </Button>
              <div className="ml-auto text-xs font-mono text-white/70">12:48 / 48:21</div>
            </div>
            <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
              <div className="h-full w-[26%] bg-gradient-brand rounded-full" />
            </div>
          </div>
        </Card>

        <Card className="rounded-3xl border-border/60 bg-gradient-card p-6">
          <h3 className="font-display font-bold mb-4 flex items-center gap-2">
            <FileText className="w-4 h-4" /> Transcript
          </h3>
          <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
            {transcript.map((line, i) => (
              <div key={i} className="flex gap-3">
                <span className="text-xs font-mono text-muted-foreground pt-1 w-12 shrink-0">
                  {line.t}
                </span>
                <div
                  className={`w-7 h-7 rounded-lg ${line.color} text-white flex items-center justify-center text-xs font-bold shrink-0`}
                >
                  {line.speaker[0]}
                </div>
                <div className="flex-1">
                  <div className="text-xs font-semibold mb-0.5">{line.speaker}</div>
                  <p className="text-sm leading-relaxed text-foreground/80">{line.text}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Right */}
      <div className="space-y-5">
        <Card className="rounded-3xl border-border/60 bg-gradient-card p-6">
          <div className="flex items-center gap-2 mb-3">
            <Sparkles className="w-4 h-4 text-primary" />
            <h3 className="font-display font-bold">AI Summary</h3>
          </div>
          <p className="text-sm leading-relaxed text-foreground/80">
            The team aligned on Q4 priorities, committing to <b>Onboarding v2</b> as the top
            initiative based on activation data. Engineering has capacity for two major bets plus
            maintenance. Support data shows upload flow is the largest drop-off point.
          </p>
        </Card>

        <Card className="rounded-3xl border-border/60 bg-gradient-card p-6">
          <h3 className="font-display font-bold mb-3">Decisions</h3>
          <ul className="space-y-2.5">
            {[
              "Commit to Onboarding v2 as P0 for Q4",
              "Defer mobile redesign to Q1 next year",
              "Investor sync to be scheduled monthly",
            ].map((d) => (
              <li key={d} className="flex items-start gap-2 text-sm">
                <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" /> {d}
              </li>
            ))}
          </ul>
        </Card>

        <Card className="rounded-3xl border-border/60 bg-gradient-card p-6">
          <h3 className="font-display font-bold mb-3 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-500" /> Risks
          </h3>
          <ul className="space-y-2.5 text-sm">
            <li className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0" /> Onboarding
              v2 spec may slip past Friday if support data is delayed.
            </li>
            <li className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0" /> Engineering
              capacity is tight if any P0 bug emerges.
            </li>
          </ul>
        </Card>

        <Card className="rounded-3xl border-border/60 bg-gradient-card p-6">
          <h3 className="font-display font-bold mb-3 flex items-center gap-2">
            <ListChecks className="w-4 h-4 text-emerald" /> Action Items
          </h3>
          <div className="space-y-2.5">
            {actions.map((a, i) => (
              <div key={i} className="p-3 rounded-2xl bg-white border border-border/60">
                <div className="flex justify-between items-start gap-2 mb-1">
                  <div className="font-semibold text-sm">{a.what}</div>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald text-white font-bold uppercase tracking-wider shrink-0">
                    {a.priority}
                  </span>
                </div>
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>@{a.who}</span>
                  <span>{a.due}</span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};
export default MeetingDetail;
