export type InterviewQuestion = { category: string; text: string };

const LABELS: Record<string, string> = {
  technical: "Technical",
  behavioral: "Behavioral",
  hr: "HR",
  project: "Project",
  projects: "Project",
  questions: "General",
  system_design: "System Design",
};

function label(key: string): string {
  const normalized = key.toLowerCase().replace(/\s*questions?\s*/g, "").trim();
  if (LABELS[normalized]) return LABELS[normalized];
  // Title-case fallback for unknown keys
  return key
    .replace(/_/g, " ")
    .replace(/questions?/gi, "")
    .trim()
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

/**
 * Normalize an AI question payload (shape varies by model) into a flat,
 * categorized list. Handles objects of string arrays and arrays of
 * {question} objects.
 */
export function normalizeQuestions(raw: unknown): InterviewQuestion[] {
  const out: InterviewQuestion[] = [];
  if (!raw || typeof raw !== "object") return out;

  const pushItems = (cat: string, items: unknown[]) => {
    for (const item of items) {
      if (typeof item === "string" && item.trim()) {
        out.push({ category: cat, text: item.trim() });
      } else if (item && typeof item === "object") {
        const q = (item as Record<string, unknown>).question;
        if (typeof q === "string" && q.trim()) {
          out.push({ category: cat, text: q.trim() });
        }
      }
    }
  };

  // Top-level array of questions
  if (Array.isArray(raw)) {
    pushItems("General", raw);
    return out;
  }

  for (const [key, val] of Object.entries(raw as Record<string, unknown>)) {
    if (key === "note") continue;
    if (Array.isArray(val)) {
      pushItems(label(key), val);
    }
  }
  return out;
}
