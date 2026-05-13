import { useState, useRef, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Send,
  Sparkles,
  Plus,
  Brain,
  Search,
  History,
  Database,
  Cpu,
  MessageSquare,
  Loader2,
  AlertCircle,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useChat } from "@/hooks/useChat";

const suggestions = [
  "What were the key decisions made?",
  "List all action items from meetings.",
  "Summarize the latest strategy meeting.",
  "What blockers were mentioned?",
];

const AIChat = () => {
  const [input, setInput] = useState("");
  const ref = useRef<HTMLDivElement>(null);
  const { messages, loading, error, sendMessage, clearMessages } = useChat();

  useEffect(() => {
    ref.current?.scrollTo({ top: ref.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading]);

  const send = (q: string) => {
    if (!q.trim() || loading) return;
    setInput("");
    sendMessage(q);
  };

  return (
    <div className="grid lg:grid-cols-[260px_1fr] gap-5 md:gap-6 h-[calc(100vh-10rem)] md:h-[calc(100vh-9rem)]">
      {/* Sidebar */}
      <Card className="rounded-[2rem] border-white/5 bg-[#020617]/40 backdrop-blur-xl p-4 hidden lg:flex flex-col shadow-glow-sm">
        <Button
          onClick={clearMessages}
          className="rounded-xl bg-gradient-brand border-0 h-11 mb-6 shadow-emerald hover:scale-[1.02] transition-transform text-xs font-bold uppercase tracking-widest"
        >
          <Plus className="w-4 h-4 mr-2" /> NEW SESSION
        </Button>

        <div className="flex items-center gap-2 text-[10px] font-black text-primary uppercase tracking-[0.2em] mb-6 px-2">
          <History className="w-3.5 h-3.5" /> RECENT QUERIES
        </div>

        <div className="flex-1 space-y-2 overflow-y-auto pr-1 scrollbar-hide">
          {messages
            .filter((m) => m.role === "user")
            .slice(-5)
            .map((m, i) => (
              <button
                key={i}
                onClick={() => sendMessage(m.content)}
                className="w-full text-left p-3.5 rounded-2xl transition-all group border bg-white/[0.02] border-white/5 hover:bg-white/5"
              >
                <div className="text-xs font-bold truncate text-white/60">{m.content}</div>
                <div className="text-[10px] text-white/20 mt-1.5 flex items-center justify-between font-mono font-bold">
                  <span>This session</span>
                  <MessageSquare className="w-3 h-3 opacity-0 group-hover:opacity-40" />
                </div>
              </button>
            ))}
          {messages.filter((m) => m.role === "user").length === 0 && (
            <p className="text-[10px] text-white/20 px-2 font-medium">
              No queries yet this session.
            </p>
          )}
        </div>
      </Card>

      {/* Main Chat Area */}
      <Card className="rounded-3xl md:rounded-[2rem] border-white/5 bg-[#020617]/40 backdrop-blur-xl flex flex-col overflow-hidden shadow-glow relative">
        {/* Header */}
        <div className="absolute top-0 inset-x-0 h-16 md:h-20 bg-[#020617]/40 backdrop-blur-xl z-20 px-5 md:px-10 flex items-center justify-between border-b border-white/5">
          <div className="flex items-center gap-4 md:gap-6">
            <div className="relative">
              <div className="w-9 h-9 md:w-11 md:h-11 rounded-xl md:rounded-2xl bg-gradient-brand flex items-center justify-center shadow-emerald border border-white/10 relative overflow-hidden group">
                <div className="absolute inset-0 bg-white/20 blur-lg opacity-0 group-hover:opacity-100 transition-opacity" />
                <Brain className="w-5 h-5 md:w-6 md:h-6 text-white relative z-10" />
              </div>
              <div className="absolute -right-0.5 -bottom-0.5 w-2.5 h-2.5 rounded-full bg-emerald border-2 border-[#020617] shadow-glow" />
            </div>
            <div className="min-w-0">
              <div className="text-[10px] md:text-xs font-black font-display tracking-tight uppercase text-white/90 truncate">
                MeetMind AI Assistant
              </div>
              <div className="text-[8px] md:text-[9px] text-emerald font-black tracking-[0.2em] uppercase flex items-center gap-2 mt-0.5">
                <span className="w-1 h-1 rounded-full bg-emerald animate-pulse shadow-glow" />
                {loading ? "Thinking..." : "AI Ready"}
              </div>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="w-9 h-9 md:w-11 md:h-11 rounded-xl md:rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-all"
          >
            <Search className="w-4 h-4 text-white/40" />
          </Button>
        </div>

        {/* Messages */}
        <div
          ref={ref}
          className="flex-1 overflow-y-auto p-4 md:p-8 pt-20 md:pt-24 space-y-6 md:space-y-8 scrollbar-hide"
        >
          {messages.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex gap-3 md:gap-5"
            >
              <div className="w-9 h-9 md:w-11 md:h-11 rounded-xl md:rounded-2xl bg-gradient-brand flex items-center justify-center border border-white/10 shrink-0">
                <Brain className="w-5 h-5 md:w-6 md:h-6 text-white" />
              </div>
              <div className="max-w-[80%] rounded-2xl md:rounded-3xl px-4 md:px-6 py-3 md:py-4 bg-white/[0.03] border border-white/10 text-white/70 font-medium text-sm leading-relaxed shadow-glow-sm">
                Hi! 👋 I'm your MeetMind AI Assistant. Ask me anything about your uploaded meetings
                — decisions, action items, or strategic patterns.
              </div>
            </motion.div>
          )}

          {messages.map((m, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex gap-3 md:gap-5 ${m.role === "user" ? "flex-row-reverse" : ""}`}
            >
              <div
                className={`w-9 h-9 md:w-11 md:h-11 rounded-xl md:rounded-2xl flex items-center justify-center shadow-glow-sm border border-white/10 shrink-0 ${m.role === "assistant" ? "bg-gradient-brand text-white" : "bg-white/5 text-white/40"}`}
              >
                {m.role === "assistant" ? (
                  <Brain className="w-5 h-5 md:w-6 md:h-6" />
                ) : (
                  <span className="font-black text-[10px]">YOU</span>
                )}
              </div>
              <div className={`max-w-[85%] md:max-w-[80%] space-y-2`}>
                <div
                  className={`rounded-2xl md:rounded-3xl px-4 md:px-6 py-3 md:py-4 text-sm leading-relaxed shadow-glow-sm border ${m.role === "assistant" ? "bg-white/[0.03] border-white/10 text-white/70 font-medium" : "bg-primary/10 border-primary/20 text-white/90 font-bold"}`}
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
                {m.role === "assistant" && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-primary/5 border border-primary/10 text-[9px] text-primary font-black w-fit uppercase tracking-widest"
                  >
                    <Database className="w-3 h-3" /> Powered by RAG · Nemotron
                  </motion.div>
                )}
              </div>
            </motion.div>
          ))}

          {loading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex gap-3 md:gap-5"
            >
              <div className="w-9 h-9 md:w-11 md:h-11 rounded-xl md:rounded-2xl bg-gradient-brand flex items-center justify-center border border-white/10 shrink-0">
                <Cpu className="w-5 h-5 md:w-6 md:h-6 animate-pulse" />
              </div>
              <div className="bg-white/[0.03] border border-white/10 rounded-2xl md:rounded-3xl px-5 py-4 flex flex-col gap-2 shadow-glow-sm">
                <div className="text-[9px] font-black text-primary uppercase tracking-widest animate-pulse">
                  Searching meetings...
                </div>
                <div className="flex gap-1.5">
                  {[0, 1, 2].map((i) => (
                    <div
                      key={i}
                      className="w-1.5 h-1.5 rounded-full bg-primary/40 animate-bounce"
                      style={{ animationDelay: `${i * 0.2}s` }}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {error && (
            <div className="flex items-center gap-2 text-red-400 text-xs font-medium px-2">
              <AlertCircle className="w-4 h-4" /> {error}
            </div>
          )}
        </div>

        {/* Input */}
        <div className="p-4 md:p-6 lg:p-8 bg-[#020617]/80 backdrop-blur-2xl border-t border-white/5">
          {messages.length === 0 && (
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
              disabled={loading}
              placeholder="Ask about your meetings..."
              className="flex-1 h-12 md:h-14 pl-5 pr-4 rounded-xl md:rounded-2xl bg-white/5 border border-white/10 focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm font-medium text-white/80 placeholder:text-white/20 disabled:opacity-50"
            />
            <Button
              type="submit"
              size="icon"
              disabled={loading}
              className="h-12 w-12 md:h-14 md:w-14 rounded-xl md:rounded-2xl bg-gradient-brand border-0 shadow-emerald shrink-0 disabled:opacity-50"
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <Send className="w-5 h-5" />
              )}
            </Button>
          </form>
        </div>
      </Card>
    </div>
  );
};
export default AIChat;
