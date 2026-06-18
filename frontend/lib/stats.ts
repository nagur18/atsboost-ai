import { API_BASE } from "./api";

export type RecentReport = { id: number; total_score: number | null };

export type DashboardStats = {
  resumes_analyzed: number;
  best_ats_score: number | null;
  average_ats_score: number | null;
  interview_sessions: number;
  recent_reports: RecentReport[];
};

export const EMPTY_STATS: DashboardStats = {
  resumes_analyzed: 0,
  best_ats_score: null,
  average_ats_score: null,
  interview_sessions: 0,
  recent_reports: [],
};

/** Server-safe fetch of dashboard stats; never throws (returns zeros on error). */
export async function fetchDashboardStats(
  clerkId: string | null | undefined
): Promise<DashboardStats> {
  if (!clerkId) return EMPTY_STATS;
  try {
    const res = await fetch(
      `${API_BASE}/dashboard/stats?clerk_id=${encodeURIComponent(clerkId)}`,
      { cache: "no-store" }
    );
    if (!res.ok) return EMPTY_STATS;
    return (await res.json()) as DashboardStats;
  } catch {
    return EMPTY_STATS;
  }
}
