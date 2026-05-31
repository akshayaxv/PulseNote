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
  Loader2,
  AlertCircle,
  Trash2,
  MessageSquareText,
} from "lucide-react";
import { motion } from "framer-motion";
import { useChat } from "@/hooks/useChat";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import TextareaAutosize from "react-textarea-autosize";

const suggestions = [
  "What were the key decisions made?",
  "List all action items from meetings.",
  "Summarize the latest strategy meeting.",
  "What blockers were mentioned?",
];

const AIChat = () => {
  const [input, setInput] = useState("");
  const ref = useRef<HTMLDivElement>(null);
  const {
    messages,
    loading,
    error,
    sendMessage,
    clearMessages,
    sessions,
    currentSessionId,
    loadSession,
    deleteSession,
    deleteMessage,
  } = useChat();

  useEffect(() => {
    ref.current?.scrollTo({ top: ref.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading]);

  const send = (q: string) => {
    if (!q.trim() || loading) return;
    setInput("");
    sendMessage(q);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      send(input);
    }
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
          <History className="w-3.5 h-3.5" /> SAVED SESSIONS
        </div>

        <div className="flex-1 space-y-2 overflow-y-auto pr-1 scrollbar-hide">
          {sessions.map((s) => (
            <div key={s.id} className="relative group">
              <button
                onClick={() => loadSession(s.id)}
                className={`w-full text-left p-3.5 rounded-2xl transition-all border ${
                  currentSessionId === s.id
                    ? "bg-white/10 border-primary/40"
                    : "bg-white/[0.02] border-white/5 hover:bg-white/5"
                }`}
              >
                <div className="text-xs font-bold truncate text-white/80 pr-6">{s.title}</div>
                <div className="text-[10px] text-white/40 mt-1.5 flex items-center gap-1.5 font-mono font-medium">
                  <MessageSquareText className="w-3 h-3" />
                  {new Date(s.updated_at).toLocaleDateString()}
                </div>
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  deleteSession(s.id);
                }}
                className="absolute right-3 top-4 p-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity bg-red-500/20 text-red-400 hover:bg-red-500/40 hover:text-red-300"
                title="Delete Session"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}

          {sessions.length === 0 && (
            <p className="text-[10px] text-white/20 px-2 font-medium">No saved sessions yet.</p>
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
        </div>

        {/* Messages */}
        <div
          ref={ref}
          className="flex-1 overflow-y-auto p-4 md:p-8 pt-20 md:pt-24 space-y-6 md:space-y-8 scrollbar-hide flex flex-col"
        >
          {messages.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex-1 flex flex-col items-center justify-center max-w-2xl mx-auto w-full text-center space-y-8"
            >
              <div className="w-20 h-20 md:w-24 md:h-24 rounded-3xl bg-gradient-brand flex items-center justify-center border border-white/10 shadow-glow mb-2">
                <Brain className="w-10 h-10 md:w-12 md:h-12 text-white" />
              </div>
              <div className="space-y-3">
                <h2 className="text-2xl md:text-3xl font-black font-display text-white">How can I help you today?</h2>
                <p className="text-sm text-white/50 max-w-md mx-auto">
                  I can summarize your uploaded meetings, find key decisions, list action items, or analyze strategic patterns.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 w-full max-w-lg mt-4">
                {suggestions.map((s) => (
                  <button
                    key={s}
                    onClick={() => send(s)}
                    className="text-left p-4 rounded-2xl bg-white/5 border border-white/10 text-white/70 hover:bg-white/10 hover:border-primary/40 hover:text-white transition-all group"
                  >
                    <Sparkles className="w-4 h-4 mb-2 text-primary/70 group-hover:text-primary" />
                    <div className="text-sm font-medium">{s}</div>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {messages.map((m, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex gap-3 md:gap-5 group w-full ${m.role === "user" ? "flex-row-reverse" : ""}`}
            >
              <div
                className={`w-9 h-9 md:w-10 md:h-10 rounded-xl md:rounded-2xl flex items-center justify-center shadow-glow-sm border border-white/10 shrink-0 ${m.role === "assistant" ? "bg-gradient-brand text-white" : "bg-white/10 text-white/60"}`}
              >
                {m.role === "assistant" ? (
                  <Brain className="w-5 h-5 md:w-5 md:h-5" />
                ) : (
                  <span className="font-black text-[10px]">YOU</span>
                )}
              </div>
              <div className={`max-w-[85%] md:max-w-[75%] space-y-2 relative group flex flex-col ${m.role === "user" ? "items-end" : "items-start"}`}>
                {m.id && (
                  <button
                    onClick={() => deleteMessage(m.id!)}
                    className={`absolute ${m.role === "user" ? "-left-10" : "-right-10"} top-3 p-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity bg-red-500/10 text-red-400 hover:bg-red-500/20`}
                    title="Delete Message"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}

                <div
                  className={`rounded-2xl md:rounded-3xl px-5 py-4 text-[15px] leading-relaxed shadow-glow-sm border ${
                    m.role === "assistant" 
                      ? "bg-[#0f172a]/80 border-white/10 text-white/80 w-full" 
                      : "bg-primary text-primary-foreground border-primary/20 font-medium"
                  }`}
                >
                  {m.role === "assistant" ? (
                    <ReactMarkdown 
                      remarkPlugins={[remarkGfm]} 
                      className="prose prose-invert prose-sm max-w-none text-white/90 prose-p:leading-relaxed prose-pre:bg-white/5 prose-pre:border prose-pre:border-white/10 prose-pre:rounded-xl"
                    >
                      {m.content}
                    </ReactMarkdown>
                  ) : (
                    <div className="whitespace-pre-wrap">{m.content}</div>
                  )}
                </div>
                
                {m.role === "assistant" && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/5 text-[9px] text-white/40 font-bold w-fit uppercase tracking-widest mt-1"
                  >
                    <Database className="w-3 h-3" /> Powered by RAG
                  </motion.div>
                )}
              </div>
            </motion.div>
          ))}

          {loading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex gap-3 md:gap-5 w-full"
            >
              <div className="w-9 h-9 md:w-10 md:h-10 rounded-xl md:rounded-2xl bg-gradient-brand flex items-center justify-center border border-white/10 shrink-0">
                <Cpu className="w-5 h-5 md:w-5 md:h-5 animate-pulse" />
              </div>
              <div className="bg-[#0f172a]/80 border border-white/10 rounded-2xl md:rounded-3xl px-5 py-4 flex flex-col gap-2 shadow-glow-sm">
                <div className="text-[10px] font-black text-primary uppercase tracking-widest animate-pulse">
                  Analyzing meetings...
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
            <div className="flex items-center justify-center w-full py-4">
              <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-medium px-4 py-3 rounded-xl shadow-glow-sm">
                <AlertCircle className="w-4 h-4" /> {error}
              </div>
            </div>
          )}
        </div>

        {/* Input */}
        <div className="p-4 md:p-6 lg:p-8 bg-[#020617]/80 backdrop-blur-2xl border-t border-white/5">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              send(input);
            }}
            className="relative flex items-end gap-2 max-w-4xl mx-auto"
          >
            <div className="relative flex-1">
              <TextareaAutosize
                minRows={1}
                maxRows={6}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={loading}
                placeholder="Ask about your meetings... (Shift+Enter for new line)"
                className="w-full resize-none py-4 md:py-4 pl-5 pr-4 rounded-2xl bg-white/5 border border-white/10 focus:outline-none focus:ring-2 focus:ring-primary/40 text-[15px] font-medium text-white placeholder:text-white/30 disabled:opacity-50 transition-all leading-relaxed shadow-glow-sm scrollbar-hide"
              />
            </div>
            <Button
              type="submit"
              size="icon"
              disabled={loading || !input.trim()}
              className="h-14 w-14 rounded-2xl bg-gradient-brand hover:scale-[1.02] transition-transform border-0 shadow-emerald shrink-0 disabled:opacity-50 disabled:hover:scale-100"
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
