"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@clerk/nextjs";
import { UploadCloud, FileText, X, Loader2, Check } from "lucide-react";
import toast from "react-hot-toast";
import { API_BASE } from "@/lib/api";
import { normalizeQuestions } from "@/lib/interview";
import AnalysisResult, { type AnalyzeResult } from "./AnalysisResult";

const VALID_TYPES = [
  "application/pdf",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

const STEPS = [
  "Uploading resume",
  "Parsing & formatting",
  "Scoring keywords & skills",
  "Generating AI tips",
];

type Phase = "idle" | "analyzing" | "done";

export default function ResumeUploader() {
  const router = useRouter();
  const { userId } = useAuth();

  const [file, setFile] = useState<File | null>(null);
  const [dragging, setDragging] = useState(false);
  const [phase, setPhase] = useState<Phase>("idle");
  const [step, setStep] = useState(0);
  const [result, setResult] = useState<AnalyzeResult | null>(null);
  const [preparing, setPreparing] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const validateAndSet = (selected: File | undefined) => {
    if (!selected) return;
    const okExt = /\.(pdf|docx)$/i.test(selected.name);
    if (!VALID_TYPES.includes(selected.type) && !okExt) {
      toast.error("Only PDF and DOCX files are allowed");
      return;
    }
    setResult(null);
    setFile(selected);
  };

  const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(false);
    validateAndSet(e.dataTransfer.files?.[0]);
  };

  const reset = () => {
    setFile(null);
    setResult(null);
    setStep(0);
    setPhase("idle");
  };

  const analyze = async () => {
    if (!file) return;
    setPhase("analyzing");
    setStep(0);
    setResult(null);

    // Advance the visual stepper while the request is in flight.
    const timer = setInterval(() => {
      setStep((s) => Math.min(STEPS.length - 1, s + 1));
    }, 1100);

    try {
      const form = new FormData();
      form.append("file", file);
      if (userId) form.append("clerk_id", userId);

      const res = await fetch(`${API_BASE}/api/resume/analyze`, {
        method: "POST",
        body: form,
      });
      if (!res.ok) throw new Error(`Analysis failed (${res.status})`);
      const data: AnalyzeResult = await res.json();

      clearInterval(timer);
      setStep(STEPS.length - 1);
      setResult(data);
      setPhase("done");
      toast.success("Resume analyzed successfully");
    } catch (err) {
      clearInterval(timer);
      console.error(err);
      toast.error(err instanceof Error ? err.message : "Something went wrong");
      setPhase("idle");
    }
  };

  const prepareInterview = async () => {
    if (!result) return;
    setPreparing(true);
    try {
      const resumeText = JSON.stringify(result.resume_data ?? {});
      const res = await fetch(`${API_BASE}/interview/questions`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ resume_text: resumeText }),
      });
      if (!res.ok) throw new Error(`Could not generate questions (${res.status})`);
      const raw = await res.json();
      const questions = normalizeQuestions(raw);

      if (questions.length === 0) {
        toast.error("No questions generated. Try again.");
        return;
      }

      sessionStorage.setItem(
        "atsboost_interview",
        JSON.stringify({ questions, fileName: result.file_name })
      );
      toast.success("Interview questions ready");
      router.push("/interview");
    } catch (err) {
      console.error(err);
      toast.error(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setPreparing(false);
    }
  };

  // -------- Analyzing view --------
  if (phase === "analyzing") {
    return (
      <div className="card p-8">
        <div className="flex flex-col items-center text-center">
          <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-400/20 to-violet-500/20 text-cyan-300 ring-1 ring-white/10">
            <Loader2 className="h-8 w-8 animate-spin" />
          </span>
          <h2 className="mt-5 text-xl font-semibold text-white">
            Analyzing your resume
          </h2>
          <p className="mt-2 text-sm text-slate-400">
            This usually takes a few seconds.
          </p>
        </div>

        <ol className="mx-auto mt-8 max-w-md space-y-3">
          {STEPS.map((label, i) => {
            const done = i < step;
            const active = i === step;
            return (
              <li
                key={label}
                className={`flex items-center gap-3 rounded-xl border px-4 py-3 text-sm transition ${
                  active
                    ? "border-cyan-400/40 bg-cyan-400/5 text-white"
                    : done
                    ? "border-white/10 bg-white/[0.02] text-slate-300"
                    : "border-white/10 bg-transparent text-slate-500"
                }`}
              >
                <span
                  className={`flex h-6 w-6 items-center justify-center rounded-full text-xs ${
                    done
                      ? "bg-emerald-400/20 text-emerald-300"
                      : active
                      ? "bg-cyan-400/20 text-cyan-300"
                      : "bg-white/5 text-slate-500"
                  }`}
                >
                  {done ? (
                    <Check className="h-3.5 w-3.5" />
                  ) : active ? (
                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  ) : (
                    i + 1
                  )}
                </span>
                {label}
              </li>
            );
          })}
        </ol>
      </div>
    );
  }

  // -------- Result view --------
  if (phase === "done" && result) {
    return (
      <AnalysisResult
        result={result}
        onReset={reset}
        onPrepareInterview={prepareInterview}
        preparingInterview={preparing}
      />
    );
  }

  // -------- Idle / upload view --------
  return (
    <div className="space-y-6">
      <div
        role="button"
        tabIndex={0}
        onClick={() => inputRef.current?.click()}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") inputRef.current?.click();
        }}
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={onDrop}
        className={`card flex cursor-pointer flex-col items-center justify-center px-6 py-14 text-center transition ${
          dragging
            ? "border-cyan-400/60 bg-cyan-400/5"
            : "hover:border-white/25 hover:bg-white/[0.05]"
        }`}
      >
        <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-400/20 to-violet-500/20 text-cyan-300 ring-1 ring-white/10">
          <UploadCloud className="h-8 w-8" />
        </span>
        <h2 className="mt-5 text-xl font-semibold text-white">
          Drag & drop your resume
        </h2>
        <p className="mt-2 text-sm text-slate-400">
          or <span className="font-medium text-cyan-300">browse files</span> —
          PDF or DOCX, up to 10MB
        </p>
        <input
          ref={inputRef}
          type="file"
          accept=".pdf,.docx"
          onChange={(e) => validateAndSet(e.target.files?.[0])}
          className="hidden"
        />
      </div>

      {file && (
        <div className="card flex items-center justify-between gap-4 p-4">
          <div className="flex min-w-0 items-center gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white/5 text-cyan-300">
              <FileText className="h-5 w-5" />
            </span>
            <div className="min-w-0">
              <p className="truncate text-sm font-medium text-white">
                {file.name}
              </p>
              <p className="text-xs text-slate-500">
                {(file.size / 1024).toFixed(1)} KB
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setFile(null)}
            aria-label="Remove file"
            className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-400 hover:text-white"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      )}

      <button
        onClick={analyze}
        disabled={!file}
        className="btn-primary w-full py-3 sm:w-auto"
      >
        Analyze resume
      </button>
    </div>
  );
}
