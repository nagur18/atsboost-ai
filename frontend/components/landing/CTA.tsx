import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function CTA() {
  return (
    <section className="section">
      <div className="container-page">
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-cyan-500/10 via-[#0a0e1a] to-violet-500/10 p-10 text-center sm:p-16">
          <div className="absolute -top-24 left-1/2 -z-10 h-64 w-64 -translate-x-1/2 rounded-full bg-cyan-500/20 blur-3xl" />
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">
            Ready to boost your career?
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-slate-400">
            Upload your resume and discover exactly what recruiters and ATS
            systems think — in minutes, for free.
          </p>
          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link href="/sign-up" className="btn-primary w-full px-8 py-3.5 sm:w-auto">
              Analyze resume free
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="#features"
              className="btn-secondary w-full px-8 py-3.5 sm:w-auto"
            >
              Explore features
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
