import { ListChecks, CalendarDays, FolderGit2, BookOpen, Lightbulb } from "lucide-react";
import DashboardShell from "@/components/dashboard/DashboardShell";
import RoadmapCard from "@/components/roadmap/RoadmapCard";

export const metadata = { title: "Learning Roadmap" };

export default function RoadmapPage() {
  const roadmap = {
    skill_priority: ["Docker", "AWS", "CI/CD"],
    weekly_plan: [
      "Week 1 — Docker fundamentals",
      "Week 2 — AWS core services",
      "Week 3 — CI/CD pipelines",
      "Week 4 — Capstone project",
    ],
    projects: ["Deploy a FastAPI app", "Dockerized portfolio site"],
    resources: ["Docker official docs", "AWS Skill Builder"],
    career_advice: "Ship one real deployment project end-to-end and write about it.",
  };

  return (
    <DashboardShell
      title="Learning Roadmap"
      subtitle="A personalized plan to close your skill gaps"
    >
      <div className="space-y-6">
        <div className="grid gap-6 lg:grid-cols-2">
          <RoadmapCard
            title="Skill Priority"
            items={roadmap.skill_priority}
            icon={ListChecks}
          />
          <RoadmapCard
            title="Weekly Plan"
            items={roadmap.weekly_plan}
            icon={CalendarDays}
          />
          <RoadmapCard
            title="Projects"
            items={roadmap.projects}
            icon={FolderGit2}
          />
          <RoadmapCard
            title="Resources"
            items={roadmap.resources}
            icon={BookOpen}
          />
        </div>

        <div className="card p-6">
          <div className="mb-3 flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-400/20 to-violet-500/20 text-cyan-300 ring-1 ring-white/10">
              <Lightbulb className="h-4 w-4" />
            </span>
            <h2 className="text-base font-semibold text-white">Career Advice</h2>
          </div>
          <p className="text-sm leading-relaxed text-slate-300">
            {roadmap.career_advice}
          </p>
        </div>
      </div>
    </DashboardShell>
  );
}
