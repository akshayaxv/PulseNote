import { useState, useCallback, useEffect } from "react";
import { api } from "@/lib/api";

export interface ChatMessage {
  id?: string;
  role: "user" | "assistant";
  content: string;
}

export interface ChatSessionSummary {
  id: string;
  user_id: string;
  meeting_id: string | null;
  title: string;
  created_at: string;
  updated_at: string;
}

export interface ChatSessionResponse extends ChatSessionSummary {
  messages: ChatMessage[];
}

interface ChatResponse {
  answer: string;
  question: string;
  sources_count: number;
  meeting_id: string | null;
  session_id: string;
  message_id: string;
}

export function useChat(meetingId?: string) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const [sessions, setSessions] = useState<ChatSessionSummary[]>([]);
  const [currentSessionId, setCurrentSessionId] = useState<string | null>(null);

  const fetchSessions = useCallback(async () => {
    try {
      const res = await api.get<ChatSessionSummary[]>("/chat/sessions");
      setSessions(res);
    } catch (err: unknown) {
      console.error("Failed to fetch sessions", err);
    }
  }, []);

  const loadSession = useCallback(async (sessionId: string) => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.get<ChatSessionResponse>(`/chat/sessions/${sessionId}`);
      setMessages(res.messages);
      setCurrentSessionId(res.id);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to load session");
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteSession = useCallback(async (sessionId: string) => {
    try {
      await api.delete(`/chat/sessions/${sessionId}`);
      setSessions((prev) => prev.filter((s) => s.id !== sessionId));
      if (currentSessionId === sessionId) {
        setMessages([]);
        setCurrentSessionId(null);
      }
    } catch (err: unknown) {
      console.error("Failed to delete session", err);
    }
  }, [currentSessionId]);

  const deleteMessage = useCallback(async (messageId: string) => {
    if (!currentSessionId) return;
    try {
      await api.delete(`/chat/sessions/${currentSessionId}/messages/${messageId}`);
      setMessages((prev) => prev.filter((m) => m.id !== messageId));
    } catch (err: unknown) {
      console.error("Failed to delete message", err);
    }
  }, [currentSessionId]);

  const sendMessage = useCallback(
    async (question: string) => {
      setLoading(true);
      setError(null);

      // Optimistically add user message
      setMessages((prev) => [...prev, { role: "user", content: question }]);

      try {
        const res = await api.post<ChatResponse>("/chat/", {
          question,
          meeting_id: meetingId || null,
          session_id: currentSessionId || null,
        });

        if (!currentSessionId && res.session_id) {
          setCurrentSessionId(res.session_id);
          fetchSessions(); // Refresh sidebar sessions list
        }

        setMessages((prev) => [
          ...prev, 
          { id: res.message_id, role: "assistant", content: res.answer }
        ]);
        
        // Fetch session to get proper IDs for all messages including the user one
        if (res.session_id) {
            const session = await api.get<ChatSessionResponse>(`/chat/sessions/${res.session_id}`);
            setMessages(session.messages);
        }
        
      } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : "Failed to get answer";
        setError(msg);
        setMessages((prev) => [...prev, { role: "assistant", content: `Error: ${msg}` }]);
      } finally {
        setLoading(false);
      }
    },
    [meetingId, currentSessionId, fetchSessions]
  );

  const clearMessages = useCallback(() => {
    setMessages([]);
    setCurrentSessionId(null);
    setError(null);
  }, []);

  useEffect(() => {
    fetchSessions();
  }, [fetchSessions]);

  return { 
    messages, loading, error, sendMessage, clearMessages, 
    sessions, currentSessionId, loadSession, deleteSession, deleteMessage 
  };
}
