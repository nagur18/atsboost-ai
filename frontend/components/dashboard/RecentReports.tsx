import Link from "next/link";
import { FileText } from "lucide-react";
import type { RecentReport } from "@/lib/stats";

function scoreColor(score: number) {
  if (score >= 85) return "text-emerald-300 bg-emerald-400/10";
  if (score >= 70) return "text-cyan-300 bg-cyan-400/10";
  return "text-amber-300 bg-amber-400/10";
}

export default function RecentReports({
  reports,
}: {
  reports: RecentReport[];
}) {
  return (
    <div className="card p-6">
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-white">Recent Reports</h2>
        <Link
          href="/upload"
          className="text-sm font-medium text-cyan-300 hover:text-cyan-200"
        >
          New report
        </Link>
      </div>

      {reports.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-white/10 py-10 text-center">
          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white/5 text-slate-400">
            <FileText className="h-5 w-5" />
          </span>
          <p className="mt-3 text-sm font-medium text-slate-300">
            No reports yet
          </p>
          <p className="mt-1 text-xs text-slate-500">
            Upload a resume to generate your first ATS report.
          </p>
        </div>
      ) : (
        <ul className="divide-y divide-white/5">
          {reports.map((report) => {
            const score = report.total_score ?? 0;
            return (
              <li key={report.id}>
                <Link
                  href={`/reports/${report.id}`}
                  className="flex items-center justify-between gap-3 py-3 transition hover:opacity-80"
                >
                  <span className="flex min-w-0 items-center gap-3">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/5 text-slate-300">
                      <FileText className="h-4 w-4" />
                    </span>
                    <span className="truncate text-sm text-slate-200">
                      ATS Report #{report.id}
                    </span>
                  </span>
                  <span
                    className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold ${scoreColor(
                      score
                    )}`}
                  >
                    {score}/100
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
