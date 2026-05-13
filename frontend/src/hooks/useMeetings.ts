import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";

export interface Meeting {
  id: string;
  title: string;
  transcript: string;
  participants: string[];
  meeting_date: string | null;
  tags: string[];
  status: "pending" | "processing" | "completed" | "failed";
  summary: string | null;
  action_items: string[];
  key_decisions: string[];
  owner_id: string;
  created_at: string;
}

export interface MeetingListItem {
  id: string;
  title: string;
  participants: string[];
  meeting_date: string | null;
  tags: string[];
  status: "pending" | "processing" | "completed" | "failed";
  summary: string | null;
  created_at: string;
}

export interface UploadMeetingPayload {
  title: string;
  transcript: string;
  participants?: string[];
  meeting_date?: string;
  tags?: string[];
}

// ─── Hooks ────────────────────────────────────────────────────────────────────

export function useMeetings() {
  return useQuery<MeetingListItem[]>({
    queryKey: ["meetings"],
    queryFn: () => api.get<MeetingListItem[]>("/meetings/"),
  });
}

export function useMeeting(id: string) {
  return useQuery<Meeting>({
    queryKey: ["meeting", id],
    queryFn: () => api.get<Meeting>(`/meetings/${id}`),
    enabled: !!id,
    refetchInterval: (query) => {
      const status = query.state.data?.status;
      return status === "pending" || status === "processing" ? 3000 : false;
    },
  });
}

export function useUploadMeeting() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: UploadMeetingPayload) => api.post<Meeting>("/meetings/upload", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["meetings"] });
    },
  });
}

export function useDeleteMeeting() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => api.delete(`/meetings/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["meetings"] });
    },
  });
}
