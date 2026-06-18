import { FileText, Target, Brain, TrendingUp } from "lucide-react";
import type { DashboardStats } from "@/lib/stats";

export default function StatsCards({ stats }: { stats: DashboardStats }) {
  const cards = [
    {
      label: "Resumes Analyzed",
      value: String(stats.resumes_analyzed ?? 0),
      icon: FileText,
      hint:
        stats.resumes_analyzed > 0
          ? "Total analyzed"
          : "Upload one to begin",
    },
    {
      label: "Best ATS Score",
      value: stats.best_ats_score != null ? `${stats.best_ats_score}` : "—",
      icon: Target,
      hint: stats.best_ats_score != null ? "Your top result" : "No reports yet",
    },
    {
      label: "Average Score",
      value:
        stats.average_ats_score != null ? `${stats.average_ats_score}` : "—",
      icon: TrendingUp,
      hint: "Across all reports",
    },
    {
      label: "Interview Sessions",
      value: String(stats.interview_sessions ?? 0),
      icon: Brain,
      hint: "Practice anytime",
    },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {cards.map((stat) => {
        const Icon = stat.icon;
        return (
          <div key={stat.label} className="card card-hover p-5">
            <div className="flex items-center justify-between">
              <p className="text-sm text-slate-400">{stat.label}</p>
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-400/20 to-violet-500/20 text-cyan-300 ring-1 ring-white/10">
                <Icon className="h-4 w-4" />
              </span>
            </div>
            <p className="mt-3 text-3xl font-bold text-white">{stat.value}</p>
            <p className="mt-1 text-xs text-slate-500">{stat.hint}</p>
          </div>
        );
      })}
    </div>
  );
}
