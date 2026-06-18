import Link from "next/link";
import { Sparkles } from "lucide-react";

const columns = [
  {
    title: "Product",
    links: [
      { label: "Features", href: "#features" },
      { label: "How it works", href: "#how-it-works" },
      { label: "Benefits", href: "#benefits" },
    ],
  },
  {
    title: "App",
    links: [
      { label: "Dashboard", href: "/dashboard" },
      { label: "Upload Resume", href: "/upload" },
      { label: "Interview Coach", href: "/interview" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "#" },
      { label: "Contact", href: "#" },
      { label: "Privacy", href: "#" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-white/10">
      <div className="container-page py-14">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link href="/" className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-400 via-sky-500 to-violet-500 text-slate-950">
                <Sparkles className="h-5 w-5" />
              </span>
              <span className="text-lg font-semibold text-white">
                ATSBoost AI
              </span>
            </Link>
            <p className="mt-4 max-w-xs text-sm text-slate-400">
              AI resume analyzer & interview coach that helps you land more
              interviews.
            </p>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <h4 className="text-sm font-semibold text-white">{col.title}</h4>
              <ul className="mt-4 space-y-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-slate-400 transition hover:text-cyan-300"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 text-sm text-slate-500 sm:flex-row">
          <p>© {new Date().getFullYear()} ATSBoost AI. All rights reserved.</p>
          <p>Built for job seekers, powered by AI.</p>
        </div>
      </div>
    </footer>
  );
}
