"use client";

import { useEffect, useState } from "react";
import {
  Brain,
  ChevronLeft,
  ChevronRight,
  Send,
  Loader2,
  Sparkles,
  CheckCircle2,
} from "lucide-react";
import toast from "react-hot-toast";
import DashboardShell from "@/components/dashboard/DashboardShell";
import { API_BASE } from "@/lib/api";
import type { InterviewQuestion } from "@/lib/interview";

const DEFAULT_QUESTIONS: InterviewQuestion[] = [
  {
    category: "Technical",
    text: "Explain the difference between React state and props, and when you'd lift state up.",
  },
  {
    category: "Behavioral",
    text: "Tell me about a time you handled a tight deadline. How did you prioritise?",
  },
  {
    category: "System Design",
    text: "How would you design a URL shortener that scales to millions of links?",
  },
  {
    category: "HR",
    text: "Why do you want to work here, and where do you see yourself in 3 years?",
  },
];

type Feedback = {
  score?: number;
  feedback?: string;
  strengths?: string[];
  improvements?: string[];
  weaknesses?: string[];
};

export default function InterviewPage() {
  const [questions, setQuestions] = useState<InterviewQuestion[]>(
    DEFAULT_QUESTIONS
  );
  const [source, setSource] = useState<string | null>(null);
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [feedback, setFeedback] = useState<Record<number, Feedback>>({});
  const [loading, setLoading] = useState(false);

  // Load tailored questions handed off from the resume analyzer, if any.
  useEffect(() => {
    try {
      const raw = sessionStorage.getItem("atsboost_interview");
      if (!raw) return;
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed?.questions) && parsed.questions.length > 0) {
        setQuestions(parsed.questions);
        setSource(parsed.fileName ?? null);
        setIndex(0);
        setAnswers({});
        setFeedback({});
      }
    } catch {
      /* ignore malformed handoff */
    }
  }, []);

  const current = questions[index];
  const answer = answers[index] ?? "";

  const updateAnswer = (value: string) =>
    setAnswers((prev) => ({ ...prev, [index]: value }));

  const submit = async () => {
    if (!answer.trim()) {
      toast.error("Write an answer first");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/interview/feedback`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: current.text, answer }),
      });
      if (!res.ok) throw new Error(`Feedback failed (${res.status})`);
      const data: Feedback = await res.json();
      setFeedback((prev) => ({ ...prev, [index]: data }));
      toast.success("Feedback ready");
    } catch (err) {
      console.error(err);
      toast.error(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const fb = feedback[index];

  return (
    <DashboardShell
      title="Interview Coach"
      subtitle="Practice tailored questions and sharpen your answers"
    >
      <div className="mx-auto max-w-3xl space-y-6">
        {source && (
          <div className="card flex items-center gap-3 p-4 text-sm text-slate-300">
            <Sparkles className="h-4 w-4 shrink-0 text-cyan-300" />
            Questions tailored from{" "}
            <span className="font-medium text-white">{source}</span>
          </div>
        )}

        {/* Progress */}
        <div className="flex items-center justify-between text-sm text-slate-400">
          <span>
            Question {index + 1} of {questions.length}
          </span>
          <span className="rounded-full bg-white/5 px-3 py-1 text-xs font-medium text-cyan-300">
            {current.category}
          </span>
        </div>
        <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
          <div
            className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-violet-500 transition-all"
            style={{ width: `${((index + 1) / questions.length) * 100}%` }}
          />
        </div>

        {/* Question */}
        <div className="card p-6 sm:p-8">
          <div className="flex items-center gap-2 text-cyan-300">
            <Brain className="h-5 w-5" />
            <h2 className="text-sm font-semibold uppercase tracking-wide">
              Question
            </h2>
          </div>
          <p className="mt-4 text-lg font-medium leading-relaxed text-white">
            {current.text}
          </p>
        </div>

        {/* Answer */}
        <div>
          <label
            htmlFor="answer"
            className="mb-2 block text-sm font-medium text-slate-300"
          >
            Your answer
          </label>
          <textarea
            id="answer"
            rows={7}
            placeholder="Structure your answer here…"
            value={answer}
            onChange={(e) => updateAnswer(e.target.value)}
            className="input resize-y"
          />
        </div>

        {/* Feedback */}
        {fb && (
          <div className="card p-6">
            <div className="mb-3 flex items-center justify-between">
              <h3 className="flex items-center gap-2 text-sm font-semibold text-white">
                <CheckCircle2 className="h-4 w-4 text-emerald-300" /> Coach
                feedback
              </h3>
              {typeof fb.score === "number" && (
                <span className="rounded-full bg-cyan-400/10 px-3 py-1 text-xs font-semibold text-cyan-300">
                  Score: {fb.score}/10
                </span>
              )}
            </div>
            {fb.feedback && (
              <p className="text-sm leading-relaxed text-slate-300">
                {fb.feedback}
              </p>
            )}
            {fb.strengths && fb.strengths.length > 0 && (
              <div className="mt-4">
                <p className="text-xs font-medium text-emerald-300">Strengths</p>
                <ul className="mt-1.5 space-y-1.5">
                  {fb.strengths.map((s, i) => (
                    <li key={i} className="flex gap-2 text-sm text-slate-300">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-400" />
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {(fb.improvements ?? fb.weaknesses) &&
              (fb.improvements ?? fb.weaknesses)!.length > 0 && (
                <div className="mt-4">
                  <p className="text-xs font-medium text-amber-300">
                    Improvements
                  </p>
                  <ul className="mt-1.5 space-y-1.5">
                    {(fb.improvements ?? fb.weaknesses)!.map((s, i) => (
                      <li key={i} className="flex gap-2 text-sm text-slate-300">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-400" />
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
          </div>
        )}

        {/* Controls */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex gap-3">
            <button
              onClick={() => setIndex((i) => Math.max(0, i - 1))}
              disabled={index === 0}
              className="btn-secondary"
            >
              <ChevronLeft className="h-4 w-4" /> Previous
            </button>
            <button
              onClick={() =>
                setIndex((i) => Math.min(questions.length - 1, i + 1))
              }
              disabled={index === questions.length - 1}
              className="btn-secondary"
            >
              Next <ChevronRight className="h-4 w-4" />
            </button>
          </div>
          <button onClick={submit} disabled={loading} className="btn-primary">
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" /> Evaluating…
              </>
            ) : (
              <>
                <Send className="h-4 w-4" /> Submit answer
              </>
            )}
          </button>
        </div>
      </div>
    </DashboardShell>
  );
}
