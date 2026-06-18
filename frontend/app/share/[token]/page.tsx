"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Sparkles, Target, AlertCircle, Loader2, ArrowRight } from "lucide-react";
import { API_BASE } from "@/lib/api";

type State =
  | { status: "loading" }
  | { status: "error"; message: string }
  | { status: "ready"; score: number };

export default function SharedReportPage() {
  const params = useParams();
  const token = String(params.token);
  const [state, setState] = useState<State>({ status: "loading" });

  useEffect(() => {
    let active = true;
    (async () => {
      try {
        const res = await fetch(`${API_BASE}/share/view/${token}`);
        if (res.status === 404) throw new Error("This report could not be found.");
        if (!res.ok) throw new Error("Unable to load this report.");
        const data = await res.json();
        if (active)
          setState({ status: "ready", score: Number(data.ats_score) || 0 });
      } catch (err) {
        if (active)
          setState({
            status: "error",
            message:
              err instanceof Error ? err.message : "Something went wrong.",
          });
      }
    })();
    return () => {
      active = false;
    };
  }, [token]);

  return (
    <main className="flex min-h-screen flex-col">
      <header className="border-b border-white/10">
        <div className="container-page flex items-center justify-between py-4">
          <Link href="/" className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-400 via-sky-500 to-violet-500 text-slate-950">
              <Sparkles className="h-5 w-5" />
            </span>
            <span className="text-lg font-semibold text-white">
              ATSBoost AI
            </span>
          </Link>
          <Link href="/sign-up" className="btn-primary hidden sm:inline-flex">
            Try it free
          </Link>
        </div>
      </header>

      <div className="container-page flex flex-1 items-center justify-center py-16">
        <div className="w-full max-w-lg text-center">
          {state.status === "loading" && (
            <div className="flex flex-col items-center text-slate-400">
              <Loader2 className="h-8 w-8 animate-spin text-cyan-300" />
              <p className="mt-4 text-sm">Loading shared report…</p>
            </div>
          )}

          {state.status === "error" && (
            <div className="card p-10">
              <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-400/10 text-amber-300">
                <AlertCircle className="h-7 w-7" />
              </span>
              <h1 className="mt-5 text-xl font-semibold text-white">
                Report unavailable
              </h1>
              <p className="mt-2 text-sm text-slate-400">{state.message}</p>
              <Link href="/" className="btn-secondary mt-6">
                Go home
              </Link>
            </div>
          )}

          {state.status === "ready" && (
            <div className="card p-10">
              <span className="badge mx-auto">
                <Target className="h-3.5 w-3.5 text-cyan-300" /> Shared ATS
                Report
              </span>

              <div className="mx-auto mt-8 flex h-44 w-44 items-center justify-center rounded-full bg-gradient-to-br from-cyan-400/20 to-violet-500/20 ring-1 ring-white/10">
                <div className="flex h-36 w-36 flex-col items-center justify-center rounded-full bg-[#05070d]">
                  <span className="text-5xl font-bold text-white">
                    {state.score}
                  </span>
                  <span className="text-xs text-slate-500">out of 100</span>
                </div>
              </div>

              <h1 className="mt-8 text-2xl font-bold text-white">
                ATS Score: <span className="gradient-text">{state.score}</span>
              </h1>
              <p className="mx-auto mt-3 max-w-sm text-sm text-slate-400">
                This resume was analyzed by ATSBoost AI. Want to see how yours
                stacks up?
              </p>

              <Link href="/sign-up" className="btn-primary mt-7">
                Analyze my resume <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
