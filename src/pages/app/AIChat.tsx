import { useState, useRef, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Send,
  Sparkles,
  Plus,
  Brain,
  FileText,
  Search,
  History,
  Database,
  Cpu,
  MessageSquare,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type Msg = { role: "user" | "ai"; content: string; source?: string };

const suggestions = [
  "What did John commit last sprint?",
  "Show all April deadlines.",
  "Summarize the Acme discovery call.",
  "Top risks from this quarter.",
];

const conversations = [
  { title: "Q4 strategy questions", time: "Today", active: true },
  { title: "Acme account history", time: "Yesterday" },
  { title: "Engineering velocity", time: "2d ago" },
  { title: "Sales pipeline review", time: "1w ago" },
];

const AIChat = () => {
  const [messages, setMessages] = useState<Msg[]>([
    {
      role: "ai",
      content:
        "Hi Sarah 👋 I've indexed all 247 of your sessions. Ask me anything — decisions, action items, or strategic patterns over time.",
    },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    ref.current?.scrollTo({ top: ref.current.scrollHeight, behavior: "smooth" });
  }, [messages, typing]);

  const send = (q: string) => {
    if (!q.trim()) return;
    setMessages((m) => [...m, { role: "user", content: q }]);
    setInput("");
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      setMessages((m) => [
        ...m,
        {
          role: "ai",
          content: `Based on your meeting history: **Marcus** committed to the Onboarding v2 spec by **Fri, May 8**, and **Aisha** is preparing the support data report for **Wed, May 6**.`,
          source: "Strategy Sync · May 1",
        },
      ]);
    }, 1400);
  };

  return (
    <div className="grid lg:grid-cols-[260px_1fr] gap-5 md:gap-6 h-[calc(100vh-10rem)] md:h-[calc(100vh-9rem)]">
      {/* Sidebar - Desktop Only */}
      <Card className="rounded-[2rem] border-white/5 bg-[#020617]/40 backdrop-blur-xl p-4 hidden lg:flex flex-col shadow-glow-sm">
        <Button className="rounded-xl bg-gradient-brand border-0 h-11 mb-6 shadow-emerald hover:scale-[1.02] transition-transform text-xs font-bold uppercase tracking-widest">
          <Plus className="w-4 h-4 mr-2" /> NEW SESSION
        </Button>

        <div className="flex items-center gap-2 text-[10px] font-black text-primary uppercase tracking-[0.2em] mb-6 px-2">
          <History className="w-3.5 h-3.5" /> RECENT QUERIES
        </div>

        <div className="flex-1 space-y-2 overflow-y-auto pr-1 scrollbar-hide">
          {conversations.map((c) => (
            <button
              key={c.title}
              className={`w-full text-left p-3.5 rounded-2xl transition-all group border ${c.active ? "bg-white/10 border-white/10 shadow-glow-sm ring-1 ring-primary/20" : "bg-white/[0.02] border-white/5 hover:bg-white/5"}`}
            >
              <div
                className={`text-xs font-bold truncate ${c.active ? "text-primary" : "text-white/60"}`}
              >
                {c.title}
              </div>
              <div className="text-[10px] text-white/20 mt-1.5 flex items-center justify-between font-mono font-bold">
                <span>{c.time}</span>
                <MessageSquare className="w-3 h-3 opacity-0 group-hover:opacity-40" />
              </div>
            </button>
          ))}
        </div>
      </Card>

      {/* Main Chat Area */}
      <Card className="rounded-3xl md:rounded-[2rem] border-white/5 bg-[#020617]/40 backdrop-blur-xl flex flex-col overflow-hidden shadow-glow relative">
        <div className="absolute top-0 inset-x-0 h-16 md:h-20 bg-[#020617]/60 backdrop-blur-2xl z-10 px-4 md:px-8 flex items-center justify-between border-b border-white/5">
          <div className="flex items-center gap-3 md:gap-4">
            <div className="relative">
              <div className="w-9 h-9 md:w-10 md:h-10 rounded-xl bg-gradient-brand flex items-center justify-center shadow-emerald border border-white/10">
                <Brain className="w-5 h-5 text-white" />
              </div>
              <div className="absolute -right-0.5 -bottom-0.5 w-2.5 h-2.5 rounded-full bg-emerald border-2 border-[#020617]" />
            </div>
            <div>
              <div className="text-xs md:text-sm font-bold font-display tracking-tight uppercase text-white/90">NEURAL AI v4.0</div>
              <div className="text-[9px] md:text-[10px] text-emerald font-black tracking-[0.2em] uppercase flex items-center gap-1.5">
                <span className="w-1 h-1 rounded-full bg-emerald animate-pulse" />
                SYSTEM ACTIVE
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="ghost" size="icon" className="w-9 h-9 md:w-10 md:h-10 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-all">
              <History className="w-4 h-4 text-white/40 lg:hidden" />
              <Search className="w-4 h-4 text-white/40 hidden lg:block" />
            </Button>
          </div>
        </div>

        <div ref={ref} className="flex-1 overflow-y-auto p-4 md:p-8 pt-20 md:pt-24 space-y-6 md:space-y-8 scrollbar-hide">
          {messages.map((m, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex gap-3 md:gap-5 ${m.role === "user" ? "flex-row-reverse" : ""}`}
            >
              <div className={`relative shrink-0`}>
                <div
                  className={`w-9 h-9 md:w-11 md:h-11 rounded-xl md:rounded-2xl flex items-center justify-center shadow-glow-sm relative z-10 border border-white/10 ${m.role === "ai" ? "bg-gradient-brand text-white" : "bg-white/5 text-white/40"}`}
                >
                  {m.role === "ai" ? <Brain className="w-5 h-5 md:w-6 md:h-6" /> : <span className="font-black text-[10px]">US</span>}
                </div>
              </div>
              <div className={`max-w-[85%] md:max-w-[80%] space-y-2`}>
                <div
                  className={`rounded-2xl md:rounded-3xl px-4 md:px-6 py-3 md:py-4 text-sm leading-relaxed shadow-glow-sm border ${m.role === "ai" ? "bg-white/[0.03] border-white/10 text-white/70 font-medium" : "bg-primary/10 border-primary/20 text-white/90 font-bold"}`}
                >
                  <div
                    dangerouslySetInnerHTML={{
                      __html: m.content.replace(
                        /\*\*(.+?)\*\*/g,
                        "<b class='text-primary font-bold'>$1</b>"
                      ),
                    }}
                  />
                </div>
                {m.source && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-primary/5 border border-primary/10 text-[9px] text-primary font-black w-fit uppercase tracking-widest"
                  >
                    <Database className="w-3 h-3" /> SOURCE: {m.source}
                  </motion.div>
                )}
              </div>
            </motion.div>
          ))}
          {typing && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-3 md:gap-5">
              <div className="w-9 h-9 md:w-11 md:h-11 rounded-xl md:rounded-2xl bg-gradient-brand flex items-center justify-center border border-white/10">
                <Cpu className="w-5 h-5 md:w-6 md:h-6 animate-pulse" />
              </div>
              <div className="bg-white/[0.03] border border-white/10 rounded-2xl md:rounded-3xl px-5 py-4 flex flex-col gap-2 shadow-glow-sm">
                <div className="text-[9px] font-black text-primary uppercase tracking-widest animate-pulse">Scanning meetings...</div>
                <div className="flex gap-1.5">
                  {[0, 1, 2].map((i) => (
                    <div key={i} className="w-1.5 h-1.5 rounded-full bg-primary/40 animate-bounce" style={{ animationDelay: `${i * 0.2}s` }} />
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </div>

        <div className="p-4 md:p-6 lg:p-8 bg-[#020617]/80 backdrop-blur-2xl border-t border-white/5">
          {messages.length <= 1 && (
            <div className="flex overflow-x-auto pb-4 gap-2 scrollbar-hide -mx-2 px-2">
              {suggestions.map((s) => (
                <button
                  key={s}
                  onClick={() => send(s)}
                  className="whitespace-nowrap text-[10px] font-bold px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white/40 hover:text-white hover:border-primary/40 transition-all flex items-center gap-2 uppercase tracking-widest"
                >
                  <Sparkles className="w-3 h-3" /> {s}
                </button>
              ))}
            </div>
          )}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              send(input);
            }}
            className="relative flex gap-2"
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="ASK AI..."
              className="flex-1 h-12 md:h-14 pl-5 pr-4 rounded-xl md:rounded-2xl bg-white/5 border border-white/10 focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm font-medium text-white/80 placeholder:text-white/20"
            />
            <Button
              type="submit"
              size="icon"
              className="h-12 w-12 md:h-14 md:w-14 rounded-xl md:rounded-2xl bg-gradient-brand border-0 shadow-emerald shrink-0"
            >
              <Send className="w-5 h-5" />
            </Button>
          </form>
        </div>
      </Card>
    </div>
  );
};
export default AIChat;
