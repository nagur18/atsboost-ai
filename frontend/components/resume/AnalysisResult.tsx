"use client";

import Link from "next/link";
import {
  CheckCircle2,
  Lightbulb,
  Sparkles,
  AlertTriangle,
  RefreshCw,
  Loader2,
  MessagesSquare,
  Download,
} from "lucide-react";
import { API_BASE } from "@/lib/api";

export type AtsReport = {
  formatting_score: number;
  keyword_score: number;
  skills_score: number;
  experience_score: number;
  projects_score: number;
  total_score: number;
};

export type Tips = {
  summary?: string;
  strengths?: string[];
  improvements?: { issue: string; suggestion: string }[];
  keyword_suggestions?: string[];
  formatting_tips?: string[];
};

export type AnalyzeResult = {
  resume_id: number | null;
  report_id: number | null;
  file_name: string;
  resume_data: Record<string, unknown>;
  ats_report: AtsReport;
  missing_skills: string[];
  tips: Tips;
};

const SECTIONS: { key: keyof AtsReport; label: string; max: number }[] = [
  { key: "formatting_score", label: "Formatting", max: 20 },
  { key: "keyword_score", label: "Keywords", max: 30 },
  { key: "skills_score", label: "Skills", max: 25 },
  { key: "experience_score", label: "Experience", max: 15 },
  { key: "projects_score", label: "Projects", max: 10 },
];

function scoreMeta(total: number) {
  if (total >= 85) return { label: "Strong", color: "text-emerald-300", ring: "#34d399" };
  if (total >= 70) return { label: "Good", color: "text-cyan-300", ring: "#22d3ee" };
  if (total >= 50) return { label: "Fair", color: "text-amber-300", ring: "#fbbf24" };
  return { label: "Needs work", color: "text-rose-300", ring: "#fb7185" };
}

export default function AnalysisResult({
  result,
  onReset,
  onPrepareInterview,
  preparingInterview,
}: {
  result: AnalyzeResult;
  onReset: () => void;
  onPrepareInterview: () => void;
  preparingInterview: boolean;
}) {
  const { ats_report: ats, tips, missing_skills } = result;
  const meta = scoreMeta(ats.total_score);
  const circumference = 2 * Math.PI * 52;
  const dash = (ats.total_score / 100) * circumference;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 text-emerald-300">
        <CheckCircle2 className="h-5 w-5" />
        <h3 className="text-base font-semibold">
          Analysis complete — {result.file_name}
        </h3>
      </div>

      {/* Score + section breakdown */}
      <div className="grid gap-6 lg:grid-cols-[260px_1fr]">
        <div className="card flex flex-col items-center justify-center p-6">
          <div className="relative h-36 w-36">
            <svg className="h-full w-full -rotate-90" viewBox="0 0 120 120">
              <circle
                cx="60"
                cy="60"
                r="52"
                fill="none"
                stroke="rgba(255,255,255,0.08)"
                strokeWidth="10"
              />
              <circle
                cx="60"
                cy="60"
                r="52"
                fill="none"
                stroke={meta.ring}
                strokeWidth="10"
                strokeLinecap="round"
                strokeDasharray={`${dash} ${circumference}`}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-4xl font-bold text-white">
                {ats.total_score}
              </span>
              <span className="text-xs text-slate-500">/ 100</span>
            </div>
          </div>
          <span className={`mt-4 text-sm font-semibold ${meta.color}`}>
            {meta.label}
          </span>
          <span className="text-xs text-slate-500">Overall ATS score</span>
        </div>

        <div className="card p-6">
          <h4 className="mb-4 text-sm font-semibold text-white">
            Section breakdown
          </h4>
          <div className="space-y-4">
            {SECTIONS.map((s) => {
              const value = ats[s.key] ?? 0;
              const pct = Math.min(100, (value / s.max) * 100);
              return (
                <div key={s.key}>
                  <div className="mb-1.5 flex justify-between text-xs">
                    <span className="text-slate-300">{s.label}</span>
                    <span className="text-slate-400">
                      {value}/{s.max}
                    </span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-white/10">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-violet-500"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* AI summary */}
      {tips?.summary && (
        <div className="card p-6">
          <div className="mb-2 flex items-center gap-2 text-cyan-300">
            <Sparkles className="h-4 w-4" />
            <h4 className="text-sm font-semibold">AI assessment</h4>
          </div>
          <p className="text-sm leading-relaxed text-slate-300">
            {tips.summary}
          </p>
        </div>
      )}

      {/* Strengths + improvements */}
      <div className="grid gap-6 lg:grid-cols-2">
        {tips?.strengths && tips.strengths.length > 0 && (
          <div className="card p-6">
            <h4 className="mb-4 flex items-center gap-2 text-sm font-semibold text-white">
              <CheckCircle2 className="h-4 w-4 text-emerald-300" /> Strengths
            </h4>
            <ul className="space-y-3">
              {tips.strengths.map((s, i) => (
                <li key={i} className="flex gap-3 text-sm text-slate-300">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-400" />
                  {s}
                </li>
              ))}
            </ul>
          </div>
        )}

        {missing_skills && missing_skills.length > 0 && (
          <div className="card p-6">
            <h4 className="mb-4 flex items-center gap-2 text-sm font-semibold text-white">
              <AlertTriangle className="h-4 w-4 text-amber-300" /> Missing skills
            </h4>
            <div className="flex flex-wrap gap-2">
              {missing_skills.map((skill) => (
                <span
                  key={skill}
                  className="rounded-full border border-amber-400/20 bg-amber-400/10 px-3 py-1 text-xs font-medium text-amber-200"
                >
                  {skill}
                </span>
              ))}
            </div>
            {tips?.keyword_suggestions &&
              tips.keyword_suggestions.length > 0 && (
                <>
                  <p className="mt-5 mb-2 text-xs font-medium text-slate-400">
                    Suggested keywords to add
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {tips.keyword_suggestions.map((k) => (
                      <span
                        key={k}
                        className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-300"
                      >
                        {k}
                      </span>
                    ))}
                  </div>
                </>
              )}
          </div>
        )}
      </div>

      {/* Improvements */}
      {tips?.improvements && tips.improvements.length > 0 && (
        <div className="card p-6">
          <h4 className="mb-4 flex items-center gap-2 text-sm font-semibold text-white">
            <Lightbulb className="h-4 w-4 text-cyan-300" /> Recommended
            modifications
          </h4>
          <div className="space-y-4">
            {tips.improvements.map((imp, i) => (
              <div
                key={i}
                className="rounded-xl border border-white/10 bg-white/[0.02] p-4"
              >
                <p className="text-sm font-medium text-white">{imp.issue}</p>
                <p className="mt-1.5 text-sm text-slate-400">
                  {imp.suggestion}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Formatting tips */}
      {tips?.formatting_tips && tips.formatting_tips.length > 0 && (
        <div className="card p-6">
          <h4 className="mb-4 text-sm font-semibold text-white">
            Formatting tips
          </h4>
          <ul className="space-y-3">
            {tips.formatting_tips.map((t, i) => (
              <li key={i} className="flex gap-3 text-sm text-slate-300">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-400" />
                {t}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Next steps */}
      <div className="card flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-semibold text-white">Ready for the next step?</p>
          <p className="text-sm text-slate-400">
            Generate tailored interview questions from this resume — only if you
            want to.
          </p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          {result.report_id != null && (
            <a
              href={`${API_BASE}/reports/export/${result.report_id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary"
            >
              <Download className="h-4 w-4" /> Export PDF
            </a>
          )}
          <button
            onClick={onPrepareInterview}
            disabled={preparingInterview}
            className="btn-primary"
          >
            {preparingInterview ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" /> Preparing…
              </>
            ) : (
              <>
                <MessagesSquare className="h-4 w-4" /> Prepare for interview
              </>
            )}
          </button>
        </div>
      </div>

      <button onClick={onReset} className="btn-ghost">
        <RefreshCw className="h-4 w-4" /> Analyze another resume
      </button>
    </div>
  );
}
