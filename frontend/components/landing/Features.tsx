import { FileText, Target, Brain, Briefcase } from "lucide-react";

const features = [
  {
    icon: FileText,
    title: "Resume Analysis",
    description:
      "Upload your resume and receive detailed, AI-powered insights in seconds.",
  },
  {
    icon: Target,
    title: "ATS Optimization",
    description:
      "Improve ATS compatibility with concrete keyword and formatting fixes.",
  },
  {
    icon: Brain,
    title: "Interview Coach",
    description:
      "Practice tailored technical, behavioral, and HR interview questions.",
  },
  {
    icon: Briefcase,
    title: "Career Roadmap",
    description:
      "Discover missing skills and follow a personalized week-by-week plan.",
  },
];

export default function Features() {
  return (
    <section id="features" className="section">
      <div className="container-page">
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <span className="badge mb-4">Features</span>
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Everything you need to get hired
          </h2>
          <p className="mt-4 text-slate-400">
            ATSBoost helps students, freshers, and professionals become
            interview-ready faster.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div key={feature.title} className="card card-hover p-7">
                <span className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-400/20 to-violet-500/20 text-cyan-300 ring-1 ring-white/10">
                  <Icon className="h-6 w-6" />
                </span>
                <h3 className="mb-2 text-lg font-semibold text-white">
                  {feature.title}
                </h3>
                <p className="text-sm leading-relaxed text-slate-400">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
