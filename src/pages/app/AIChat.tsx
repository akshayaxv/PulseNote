import { useState, useRef, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Send, Sparkles, Plus, Brain, FileText } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type Msg = { role: "user" | "ai"; content: string };

const suggestions = [
  "What did John commit last sprint?",
  "Show all April deadlines.",
  "Summarize the Acme discovery call.",
  "Top risks from this quarter's meetings.",
];

const conversations = [
  { title: "Q4 strategy questions", time: "Today" },
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
        content: `Based on your meeting history: **Marcus** committed to the Onboarding v2 spec by **Fri, May 8**, and **Aisha** is preparing the support data report for **Wed, May 6**. Both items came from this week's Q4 Strategy Sync — want me to draft a follow-up?`,
      }]);
    }, 1400);
  };

  return (
    <div className="grid lg:grid-cols-[280px_1fr] gap-5 h-[calc(100vh-9rem)]">
      <Card className="rounded-3xl border-border/60 bg-gradient-card p-4 hidden lg:flex flex-col">
        <Button className="rounded-xl bg-gradient-brand border-0 mb-4"><Plus className="w-4 h-4 mr-1.5" /> New chat</Button>
        <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 px-2">History</div>
        <div className="space-y-1 overflow-y-auto">
          {conversations.map(c => (
            <button key={c.title} className="w-full text-left p-3 rounded-xl hover:bg-muted/60 transition-colors">
              <div className="text-sm font-semibold truncate">{c.title}</div>
              <div className="text-xs text-muted-foreground">{c.time}</div>
            </button>
          ))}
        </div>
      </Card>

      <Card className="rounded-3xl border-border/60 bg-gradient-card flex flex-col overflow-hidden">
        <div ref={ref} className="flex-1 overflow-y-auto p-6 space-y-5">
          {messages.map((m, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className={`flex gap-3 ${m.role === "user" ? "flex-row-reverse" : ""}`}>
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${m.role === "ai" ? "bg-gradient-brand text-white" : "bg-navy text-white"}`}>
                {m.role === "ai" ? <Brain className="w-4 h-4" /> : "S"}
              </div>
              <div className={`max-w-[70%] rounded-2xl px-4 py-3 text-sm ${m.role === "ai" ? "bg-white border border-border/60" : "bg-navy text-white"}`}>
                <div dangerouslySetInnerHTML={{ __html: m.content.replace(/\*\*(.+?)\*\*/g, "<b>$1</b>") }} />
                {m.role === "ai" && i > 0 && (
                  <div className="mt-3 pt-3 border-t border-border/60 flex items-center gap-2 text-xs text-muted-foreground">
                    <FileText className="w-3 h-3" /> Sourced from <a className="text-primary font-semibold hover:underline">Q4 Strategy Sync</a>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
          <AnimatePresence>
            {typing && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex gap-3">
                <div className="w-9 h-9 rounded-xl bg-gradient-brand text-white flex items-center justify-center"><Brain className="w-4 h-4" /></div>
                <div className="bg-white border border-border/60 rounded-2xl px-4 py-3 flex gap-1">
                  {[0,1,2].map(i => <motion.span key={i} className="w-2 h-2 rounded-full bg-primary" animate={{ y: [0,-4,0] }} transition={{ repeat: Infinity, duration: 0.8, delay: i * 0.15 }} />)}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="p-5 border-t border-border/60 bg-white/50">
          {messages.length <= 1 && (
            <div className="flex flex-wrap gap-2 mb-3">
              {suggestions.map(s => (
                <button key={s} onClick={() => send(s)} className="text-xs px-3 py-1.5 rounded-full bg-muted hover:bg-primary/10 hover:text-primary transition-colors flex items-center gap-1.5">
                  <Sparkles className="w-3 h-3" /> {s}
                </button>
              ))}
            </div>
          )}
          <form onSubmit={(e) => { e.preventDefault(); send(input); }} className="flex gap-2 items-end">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask anything about your meetings…"
              className="flex-1 h-12 px-4 rounded-2xl bg-white border border-border focus:outline-none focus:ring-2 focus:ring-primary/30 text-sm"
            />
            <Button type="submit" size="icon" className="rounded-2xl h-12 w-12 bg-gradient-brand border-0 shadow-soft">
              <Send className="w-4 h-4" />
            </Button>
          </form>
        </div>
      </Card>
    </div>
  );
};
export default AIChat;
