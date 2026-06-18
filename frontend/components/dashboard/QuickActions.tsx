import { FileText, Brain, GraduationCap, Sparkles } from "lucide-react";
import QuickActionCard from "./QuickActionCard";

const actions = [
  {
    title: "Upload Resume",
    description: "Upload and analyze your resume.",
    href: "/upload",
    icon: FileText,
  },
  {
    title: "Interview Coach",
    description: "Practice tailored questions.",
    href: "/interview",
    icon: Brain,
  },
  {
    title: "Learning Roadmap",
    description: "Close your skill gaps.",
    href: "/roadmap",
    icon: GraduationCap,
  },
  {
    title: "New Analysis",
    description: "Start a fresh ATS scan.",
    href: "/upload",
    icon: Sparkles,
  },
];

export default function QuickActions() {
  return (
    <section>
      <h2 className="mb-4 text-lg font-semibold text-white">Quick Actions</h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {actions.map((action) => (
          <QuickActionCard key={action.title} {...action} />
        ))}
      </div>
    </section>
  );
}
