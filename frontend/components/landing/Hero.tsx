"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Sparkles, Target } from "lucide-react";

const stats = [
  { value: "10k+", label: "Resumes analyzed" },
  { value: "92%", label: "Avg. ATS lift" },
  { value: "4.9/5", label: "User rating" },
];

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="container-page grid items-center gap-16 py-20 sm:py-28 lg:grid-cols-2">
        {/* Left: copy */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center lg:text-left"
        >
          <span className="badge">
            <Sparkles className="h-3.5 w-3.5 text-cyan-300" />
            AI Resume Analyzer + Interview Coach
          </span>

          <h1 className="mt-6 text-4xl font-bold leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-6xl">
            Land more interviews with{" "}
            <span className="gradient-text">ATSBoost AI</span>
          </h1>

          <p className="mx-auto mt-6 max-w-xl text-base text-slate-400 sm:text-lg lg:mx-0">
            Analyze your resume, beat applicant tracking systems, practice
            interviews, and get a personalized career roadmap — all powered by
            AI.
          </p>

          <div className="mt-9 flex flex-col items-center gap-3 sm:flex-row lg:items-start lg:justify-start">
            <Link href="/sign-up" className="btn-primary w-full px-7 py-3 sm:w-auto">
              Analyze resume free
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="#how-it-works"
              className="btn-secondary w-full px-7 py-3 sm:w-auto"
            >
              See how it works
            </Link>
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-slate-400 lg:justify-start">
            <span className="inline-flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-cyan-300" /> No credit card
            </span>
            <span className="inline-flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-cyan-300" /> PDF & DOCX
            </span>
            <span className="inline-flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-cyan-300" /> Instant results
            </span>
          </div>

          <dl className="mt-10 grid max-w-md grid-cols-3 gap-4 lg:mx-0">
            {stats.map((s) => (
              <div key={s.label} className="text-center lg:text-left">
                <dt className="text-2xl font-bold text-white sm:text-3xl">
                  {s.value}
                </dt>
                <dd className="mt-1 text-xs text-slate-500">{s.label}</dd>
              </div>
            ))}
          </dl>
        </motion.div>

        {/* Right: hero visual */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="relative mx-auto w-full max-w-md"
        >
          <div className="absolute -inset-6 -z-10 rounded-[2rem] bg-gradient-to-br from-cyan-500/20 to-violet-500/20 blur-2xl" />
          <div className="card p-6 shadow-2xl shadow-cyan-500/5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-400 to-violet-500 text-slate-950">
                  <Target className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-sm font-semibold text-white">
                    ATS Score Report
                  </p>
                  <p className="text-xs text-slate-500">resume_v3.pdf</p>
                </div>
              </div>
              <span className="rounded-full bg-emerald-400/10 px-3 py-1 text-xs font-semibold text-emerald-300">
                Strong
              </span>
            </div>

            <div className="mt-6 flex items-end gap-4">
              <p className="text-5xl font-bold text-white">88</p>
              <p className="pb-2 text-sm text-slate-400">/ 100 overall</p>
            </div>

            <div className="mt-6 space-y-4">
              {[
                { label: "Formatting", value: 90 },
                { label: "Keywords", value: 84 },
                { label: "Skills match", value: 86 },
                { label: "Experience", value: 92 },
              ].map((bar) => (
                <div key={bar.label}>
                  <div className="mb-1.5 flex justify-between text-xs">
                    <span className="text-slate-300">{bar.label}</span>
                    <span className="text-slate-400">{bar.value}%</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-white/10">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-violet-500"
                      style={{ width: `${bar.value}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
