import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";

export interface AnalyticsData {
  overview: {
    total_hours: number;
    participation_score: number;
    completed: number;
    productivity: number;
  };
  velocity: Array<{
    d: string;
    done: number;
    pending: number;
  }>;
  trend: Array<{ m: string; v: number }>;
  participation: Array<{ name: string; v: number }>;
  keywords: string[];
}

export function useAnalytics() {
  return useQuery<AnalyticsData>({
    queryKey: ["analytics"],
    queryFn: () => api.get<AnalyticsData>("/analytics/"),
  });
}
