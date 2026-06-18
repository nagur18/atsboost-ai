import { TrendingUp, MessagesSquare, Check } from "lucide-react";

const benefits = [
  {
    icon: TrendingUp,
    title: "Increase your ATS score",
    description:
      "Get actionable recommendations that help your resume sail through automated screening systems.",
    points: [
      "Keyword gap detection",
      "Formatting & parsing checks",
      "Section-level scoring",
    ],
  },
  {
    icon: MessagesSquare,
    title: "Practice real interviews",
    description:
      "Generate technical, behavioral, and HR interview questions tailored to your exact profile.",
    points: [
      "Role-specific questions",
      "Instant answer feedback",
      "Recruiter simulation",
    ],
  },
];

export default function Benefits() {
  return (
    <section id="benefits" className="section">
      <div className="container-page">
        <div className="grid gap-6 lg:grid-cols-2">
          {benefits.map((b) => {
            const Icon = b.icon;
            return (
              <div key={b.title} className="card card-hover p-8 sm:p-10">
                <span className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-400/20 to-violet-500/20 text-cyan-300 ring-1 ring-white/10">
                  <Icon className="h-6 w-6" />
                </span>
                <h3 className="text-2xl font-bold text-white">{b.title}</h3>
                <p className="mt-3 text-slate-400">{b.description}</p>
                <ul className="mt-6 space-y-3">
                  {b.points.map((p) => (
                    <li
                      key={p}
                      className="flex items-center gap-3 text-sm text-slate-300"
                    >
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-cyan-400/15 text-cyan-300">
                        <Check className="h-3 w-3" />
                      </span>
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
