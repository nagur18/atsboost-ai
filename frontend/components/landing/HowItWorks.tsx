import { Upload, ScanSearch, Gauge, MessagesSquare, Map } from "lucide-react";

const steps = [
  { title: "Upload Resume", desc: "PDF or DOCX, drag & drop.", icon: Upload },
  { title: "AI Analysis", desc: "Deep parse of your content.", icon: ScanSearch },
  { title: "ATS Score", desc: "Section-by-section breakdown.", icon: Gauge },
  {
    title: "Interview Prep",
    desc: "Tailored practice questions.",
    icon: MessagesSquare,
  },
  { title: "Roadmap", desc: "A plan to close skill gaps.", icon: Map },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="section">
      <div className="container-page">
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <span className="badge mb-4">How it works</span>
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Five simple steps to job-ready
          </h2>
          <p className="mt-4 text-slate-400">
            From upload to a clear action plan in minutes.
          </p>
        </div>

        <div className="relative grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {/* connecting line on large screens */}
          <div className="absolute left-0 right-0 top-7 hidden h-px bg-gradient-to-r from-transparent via-white/15 to-transparent lg:block" />

          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div
                key={step.title}
                className="relative flex flex-col items-center text-center"
              >
                <span className="relative z-10 flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-[#0a0e1a] text-cyan-300 shadow-lg shadow-black/40">
                  <Icon className="h-6 w-6" />
                  <span className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-cyan-400 to-violet-500 text-xs font-bold text-slate-950">
                    {index + 1}
                  </span>
                </span>
                <h3 className="mt-4 font-semibold text-white">{step.title}</h3>
                <p className="mt-1 text-sm text-slate-400">{step.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
