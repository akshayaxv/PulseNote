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
        "Hi Sarah 👋 I've indexed all 247 of your meetings. Ask me anything — decisions, action items, who said what, or strategic patterns over time.",
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
          content: `Based on your meeting history: **Marcus** committed to the Onboarding v2 spec by **Fri, May 8**, and **Aisha** is preparing the support data report for **Wed, May 6**. Both items came from this week's Q4 Strategy Sync.`,
          source: "Q4 Strategy Sync · May 1, 2024",
        },
      ]);
    }, 1400);
  };

  return (
    <div className="grid lg:grid-cols-[280px_1fr] gap-6 h-[calc(100vh-9rem)]">
      {/* Sidebar */}
      {/* Sidebar */}
      <Card className="rounded-[2rem] border-white/5 bg-[#020617]/40 backdrop-blur-xl p-4 hidden lg:flex flex-col shadow-glow-sm">
        <Button className="rounded-2xl bg-gradient-brand border-0 h-11 mb-6 shadow-emerald hover:scale-[1.02] transition-transform">
          <Plus className="w-4 h-4 mr-2" /> NEW SESSION
        </Button>

        <div className="flex items-center gap-2 text-[10px] font-bold text-primary uppercase tracking-[0.2em] mb-6 px-2">
          <History className="w-3.5 h-3.5" /> RECENT QUERIES
        </div>

        <div className="flex-1 space-y-2 overflow-y-auto pr-1 scrollbar-hide">
          {conversations.map((c) => (
            <button
              key={c.title}
              className={`w-full text-left p-4 rounded-2xl transition-all group border ${c.active ? "bg-white/10 border-white/10 shadow-glow-sm ring-1 ring-primary/20" : "bg-white/[0.02] border-white/5 hover:bg-white/5"}`}
            >
              <div
                className={`text-sm font-bold truncate ${c.active ? "text-primary" : "text-white/60"}`}
              >
                {c.title}
              </div>
              <div className="text-[10px] text-white/30 mt-1.5 flex items-center justify-between font-mono">
                <span>{c.time}</span>
                <MessageSquare className="w-3 h-3 opacity-0 group-hover:opacity-40" />
              </div>
            </button>
          ))}
        </div>

        <div className="mt-4 pt-4 border-t border-white/5">
          <div className="p-4 rounded-2xl bg-primary/5 border border-primary/10 relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-brand opacity-0 group-hover:opacity-10 transition-opacity" />
            <div className="relative flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/10">
                <Database className="w-5 h-5 text-primary" />
              </div>
              <div>
                <div className="text-[9px] font-black text-primary uppercase tracking-widest">
                  NEURAL INDEX
                </div>
                <div className="text-xs font-bold text-white/80 font-mono">247 SESSIONS</div>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Main Chat Area */}
      <Card className="rounded-[2rem] border-white/5 bg-[#020617]/40 backdrop-blur-xl flex flex-col overflow-hidden shadow-glow relative">
        <div className="absolute top-0 inset-x-0 h-20 bg-white/[0.02] backdrop-blur-2xl z-10 p-4 px-8 flex items-center justify-between border-b border-white/10">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-10 h-10 rounded-xl bg-gradient-brand flex items-center justify-center shadow-emerald border border-white/10">
                <Brain className="w-5 h-5 text-white" />
              </div>
              <div className="absolute -right-0.5 -bottom-0.5 w-3 h-3 rounded-full bg-emerald border-2 border-[#020617] animate-pulse" />
            </div>
            <div>
              <div className="text-sm font-bold font-display tracking-tight uppercase text-white/90">MEETMIND OS v4.0</div>
              <div className="text-[10px] text-emerald font-black tracking-[0.2em] uppercase flex items-center gap-1.5">
                <span className="w-1 h-1 rounded-full bg-emerald animate-ping" />
                SYSTEM ACTIVE
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="ghost" size="icon" className="w-10 h-10 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-all">
              <Search className="w-4 h-4 text-white/40" />
            </Button>
            <Button variant="ghost" size="icon" className="w-10 h-10 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-all">
              <Cpu className="w-4 h-4 text-white/40" />
            </Button>
          </div>
        </div>

        <div ref={ref} className="flex-1 overflow-y-auto p-8 pt-24 space-y-8 scrollbar-hide">
          {messages.map((m, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className={`flex gap-5 ${m.role === "user" ? "flex-row-reverse" : ""}`}
            >
              <div className={`relative group shrink-0`}>
                <div
                  className={`w-11 h-11 rounded-2xl flex items-center justify-center shadow-glow-sm relative z-10 transition-transform group-hover:scale-110 border border-white/10 ${m.role === "ai" ? "bg-gradient-brand text-white" : "bg-white/5 text-white/70"}`}
                >
                  {m.role === "ai" ? (
                    <motion.div
                      animate={{ rotate: [0, 10, -10, 0] }}
                      transition={{ repeat: Infinity, duration: 4 }}
                    >
                      <Brain className="w-6 h-6" />
                    </motion.div>
                  ) : (
                    <span className="font-bold text-xs">SA</span>
                  )}
                </div>
                {m.role === "ai" && (
                  <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-full animate-pulse" />
                )}
              </div>
              <div className={`max-w-[80%] space-y-2.5`}>
                <div
                  className={`rounded-3xl px-6 py-4 text-sm leading-relaxed shadow-glow-sm backdrop-blur-xl border ${m.role === "ai" ? "bg-white/[0.03] border-white/10 text-white/80" : "bg-primary/10 border-primary/20 text-white/90"}`}
                >
                  <div
                    className="prose-invert"
                    dangerouslySetInnerHTML={{
                      __html: m.content.replace(
                        /\*\*(.+?)\*\*/g,
                        "<b class='text-primary font-bold tracking-tight'>$1</b>"
                      ),
                    }}
                  />
                </div>
                {m.source && (
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-center gap-2 px-4 py-2 rounded-full bg-primary/5 border border-primary/10 text-[9px] text-primary font-black w-fit uppercase tracking-[0.2em]"
                  >
                    <Database className="w-3.5 h-3.5" /> NEURAL SOURCE: {m.source}
                  </motion.div>
                )}
              </div>
            </motion.div>
          ))}
          <AnimatePresence>
            {typing && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, transition: { duration: 0.2 } }}
                className="flex gap-5"
              >
                <div className="relative shrink-0">
                  <div className="w-11 h-11 rounded-2xl bg-gradient-brand text-white flex items-center justify-center shadow-emerald border border-white/10 relative z-10">
                    <Cpu className="w-6 h-6 animate-spin-slow" />
                  </div>
                  <div className="absolute inset-0 bg-primary/40 blur-2xl rounded-full animate-pulse" />
                </div>
                <div className="bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-3xl px-6 py-5 flex flex-col gap-3 shadow-glow-sm min-w-[240px]">
                  <div className="flex items-center gap-2 text-[10px] font-black text-primary uppercase tracking-[0.3em]">
                    <Sparkles className="w-4 h-4 animate-pulse" /> SCANNING INDEX...
                  </div>
                  <div className="flex gap-2">
                    {[0, 1, 2].map((i) => (
                      <motion.span
                        key={i}
                        className="w-2.5 h-2.5 rounded-full bg-primary/30"
                        animate={{
                          scale: [1, 1.4, 1],
                          backgroundColor: ["#10B981", "#34D399", "#10B981"],
                        }}
                        transition={{ repeat: Infinity, duration: 1, delay: i * 0.2 }}
                      />
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="p-8 bg-white/[0.02] backdrop-blur-2xl border-t border-white/10">
          {messages.length <= 1 && (
            <div className="flex flex-wrap gap-3 mb-6">
              {suggestions.map((s) => (
                <motion.button
                  whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.08)" }}
                  whileTap={{ scale: 0.95 }}
                  key={s}
                  onClick={() => send(s)}
                  className="text-[9px] font-black px-4 py-2 rounded-xl bg-white/[0.03] border border-white/10 text-white/50 hover:text-primary hover:border-primary/40 transition-all flex items-center gap-2 shadow-glow-sm uppercase tracking-widest"
                >
                  <Sparkles className="w-3.5 h-3.5" /> {s}
                </motion.button>
              ))}
            </div>
          )}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              send(input);
            }}
            className="relative group"
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="ENTER COMMAND OR NEURAL QUERY..."
              className="w-full h-16 pl-6 pr-20 rounded-[1.5rem] bg-white/[0.05] border border-white/10 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/30 text-sm transition-all shadow-glow-sm group-hover:shadow-emerald/20 font-mono text-white/80 placeholder:text-white/20"
            />
            <Button
              type="submit"
              size="icon"
              className="absolute right-2 top-2 h-12 w-12 rounded-xl bg-gradient-brand border-0 shadow-emerald hover:scale-105 transition-transform"
            >
              <Send className="w-5 h-5" />
            </Button>
          </form>
          <div className="mt-4 text-[9px] text-center text-white/20 font-black uppercase tracking-[0.2em]">
            NEURAL ENGINE v4.0 · REAL-TIME SEMANTIC ANALYSIS ACTIVE
          </div>
        </div>
      </Card>
    </div>
  );
};
export default AIChat;
