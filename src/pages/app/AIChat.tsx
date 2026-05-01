import { useState, useRef, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Send, Sparkles, Plus, Brain, FileText, Search, History, Database, Cpu, MessageSquare } from "lucide-react";
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
    { role: "ai", content: "Hi Sarah 👋 I've indexed all 247 of your meetings. Ask me anything — decisions, action items, who said what, or strategic patterns over time." },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => { ref.current?.scrollTo({ top: ref.current.scrollHeight, behavior: "smooth" }); }, [messages, typing]);

  const send = (q: string) => {
    if (!q.trim()) return;
    setMessages(m => [...m, { role: "user", content: q }]);
    setInput(""); setTyping(true);
    setTimeout(() => {
      setTyping(false);
      setMessages(m => [...m, {
        role: "ai",
        content: `Based on your meeting history: **Marcus** committed to the Onboarding v2 spec by **Fri, May 8**, and **Aisha** is preparing the support data report for **Wed, May 6**. Both items came from this week's Q4 Strategy Sync.`,
        source: "Q4 Strategy Sync · May 1, 2024"
      }]);
    }, 1400);
  };

  return (
    <div className="grid lg:grid-cols-[280px_1fr] gap-6 h-[calc(100vh-9rem)]">
      {/* Sidebar */}
      <Card className="rounded-3xl border-border/60 bg-gradient-card p-4 hidden lg:flex flex-col shadow-soft">
        <Button className="rounded-2xl bg-gradient-brand border-0 h-11 mb-6 shadow-float hover:scale-[1.02] transition-transform">
          <Plus className="w-4 h-4 mr-2" /> New chat
        </Button>
        
        <div className="flex items-center gap-2 text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-4 px-2">
          <History className="w-3 h-3" /> Recent Queries
        </div>
        
        <div className="flex-1 space-y-1 overflow-y-auto pr-1 scrollbar-hide">
          {conversations.map(c => (
            <button key={c.title} className={`w-full text-left p-3 rounded-2xl transition-all group ${c.active ? "bg-white shadow-soft ring-1 ring-border/40" : "hover:bg-white/50"}`}>
              <div className={`text-sm font-bold truncate ${c.active ? "text-primary" : "text-foreground/80"}`}>{c.title}</div>
              <div className="text-[10px] text-muted-foreground mt-1 flex items-center justify-between">
                <span>{c.time}</span>
                <MessageSquare className="w-3 h-3 opacity-0 group-hover:opacity-40" />
              </div>
            </button>
          ))}
        </div>

        <div className="mt-4 pt-4 border-t border-border/60">
          <div className="p-3 rounded-2xl bg-navy text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-brand opacity-10" />
            <div className="relative flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
                <Database className="w-4 h-4 text-emerald" />
              </div>
              <div>
                <div className="text-[10px] font-bold text-white/50 uppercase tracking-tighter">Memory Indexed</div>
                <div className="text-xs font-bold">247 Meetings</div>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Main Chat Area */}
      <Card className="rounded-3xl border-border/60 bg-gradient-card flex flex-col overflow-hidden shadow-float relative">
        <div className="absolute top-0 inset-x-0 h-16 bg-gradient-to-b from-white/80 to-transparent backdrop-blur-sm z-10 p-4 px-6 flex items-center justify-between border-b border-white/40">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-8 h-8 rounded-xl bg-gradient-brand flex items-center justify-center shadow-soft">
                <Brain className="w-4 h-4 text-white" />
              </div>
              <div className="absolute -right-0.5 -bottom-0.5 w-2.5 h-2.5 rounded-full bg-emerald border-2 border-white animate-pulse" />
            </div>
            <div>
              <div className="text-xs font-bold">MeetMind AI</div>
              <div className="text-[10px] text-emerald font-bold tracking-tight uppercase">Always Connected</div>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="ghost" size="icon" className="w-8 h-8 rounded-full bg-muted/60"><Search className="w-3.5 h-3.5" /></Button>
            <Button variant="ghost" size="icon" className="w-8 h-8 rounded-full bg-muted/60"><Cpu className="w-3.5 h-3.5" /></Button>
          </div>
        </div>

        <div ref={ref} className="flex-1 overflow-y-auto p-6 pt-20 space-y-6 scrollbar-hide">
          {messages.map((m, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, x: m.role === "ai" ? -20 : 20 }} 
              animate={{ opacity: 1, x: 0 }} 
              className={`flex gap-4 ${m.role === "user" ? "flex-row-reverse" : ""}`}
            >
              <div className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 shadow-soft ${m.role === "ai" ? "bg-gradient-brand text-white" : "bg-navy text-white"}`}>
                {m.role === "ai" ? (
                  <motion.div animate={{ rotate: [0, 10, -10, 0] }} transition={{ repeat: Infinity, duration: 4 }}>
                    <Brain className="w-5 h-5" />
                  </motion.div>
                ) : (
                  <span className="font-bold text-xs">S</span>
                )}
              </div>
              <div className={`max-w-[75%] space-y-2`}>
                <div className={`rounded-2xl px-5 py-3.5 text-sm leading-relaxed shadow-soft ${m.role === "ai" ? "bg-white border border-border/40" : "bg-navy text-white"}`}>
                  <div dangerouslySetInnerHTML={{ __html: m.content.replace(/\*\*(.+?)\*\*/g, "<b class='text-primary font-bold'>$1</b>") }} />
                </div>
                {m.source && (
                  <motion.div 
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/5 border border-primary/10 text-[10px] text-primary font-bold w-fit"
                  >
                    <FileText className="w-3 h-3" /> {m.source.toUpperCase()}
                  </motion.div>
                )}
              </div>
            </motion.div>
          ))}
          <AnimatePresence>
            {typing && (
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }} className="flex gap-4">
                <div className="w-10 h-10 rounded-2xl bg-gradient-brand text-white flex items-center justify-center shadow-soft"><Brain className="w-5 h-5" /></div>
                <div className="bg-white border border-border/40 rounded-2xl px-5 py-4 flex gap-1.5 shadow-soft">
                  {[0,1,2].map(i => <motion.span key={i} className="w-2 h-2 rounded-full bg-primary" animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }} transition={{ repeat: Infinity, duration: 1, delay: i * 0.2 }} />)}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="p-6 bg-white/60 backdrop-blur-md border-t border-border/40">
          {messages.length <= 1 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {suggestions.map(s => (
                <motion.button 
                  whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                  key={s} 
                  onClick={() => send(s)} 
                  className="text-[10px] font-bold px-3 py-1.5 rounded-xl bg-white border border-border/60 hover:border-primary hover:text-primary transition-all flex items-center gap-2 shadow-soft"
                >
                  <Sparkles className="w-3 h-3" /> {s.toUpperCase()}
                </motion.button>
              ))}
            </div>
          )}
          <form onSubmit={(e) => { e.preventDefault(); send(input); }} className="relative group">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your command or question…"
              className="w-full h-14 pl-5 pr-16 rounded-2xl bg-white border border-border/60 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-transparent text-sm transition-all shadow-soft group-hover:shadow-float"
            />
            <Button type="submit" size="icon" className="absolute right-1.5 top-1.5 h-11 w-11 rounded-xl bg-gradient-brand border-0 shadow-float hover:scale-105 transition-transform">
              <Send className="w-4 h-4" />
            </Button>
          </form>
          <div className="mt-3 text-[10px] text-center text-muted-foreground font-medium uppercase tracking-tighter">
            MeetMind AI can search through transcripts, tasks, and meeting recordings.
          </div>
        </div>
      </Card>
    </div>
  );
};
export default AIChat;
