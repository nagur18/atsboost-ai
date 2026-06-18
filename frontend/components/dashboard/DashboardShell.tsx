"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { UserButton } from "@clerk/nextjs";
import {
  LayoutDashboard,
  FileText,
  Brain,
  GraduationCap,
  Sparkles,
  Menu,
  X,
  ArrowLeft,
} from "lucide-react";
import { cn } from "@/lib/utils";

const menu = [
  { name: "Dashboard", icon: LayoutDashboard, href: "/dashboard" },
  { name: "Resume Upload", icon: FileText, href: "/upload" },
  { name: "Interview Coach", icon: Brain, href: "/interview" },
  { name: "Roadmap", icon: GraduationCap, href: "/roadmap" },
];

function NavLinks({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();
  return (
    <nav className="space-y-1.5">
      {menu.map((item) => {
        const Icon = item.icon;
        const active =
          pathname === item.href || pathname.startsWith(item.href + "/");
        return (
          <Link
            key={item.name}
            href={item.href}
            onClick={onNavigate}
            className={cn(
              "flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition",
              active
                ? "bg-gradient-to-r from-cyan-400/15 to-violet-500/15 text-white ring-1 ring-cyan-400/30"
                : "text-slate-400 hover:bg-white/5 hover:text-white"
            )}
          >
            <Icon
              className={cn(
                "h-5 w-5",
                active ? "text-cyan-300" : "text-slate-500"
              )}
            />
            {item.name}
          </Link>
        );
      })}
    </nav>
  );
}

function SidebarContent({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <div className="flex h-full flex-col">
      <Link href="/" className="flex items-center gap-3 px-2 py-1">
        <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-400 via-sky-500 to-violet-500 text-slate-950">
          <Sparkles className="h-5 w-5" />
        </span>
        <span className="text-lg font-semibold text-white">ATSBoost AI</span>
      </Link>

      <div className="mt-8 flex-1">
        <NavLinks onNavigate={onNavigate} />
      </div>

      <Link
        href="/"
        onClick={onNavigate}
        className="mt-4 flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-slate-400 transition hover:bg-white/5 hover:text-white"
      >
        <ArrowLeft className="h-5 w-5 text-slate-500" />
        Back to site
      </Link>
    </div>
  );
}

export default function DashboardShell({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex min-h-screen">
      {/* Desktop sidebar */}
      <aside className="sticky top-0 hidden h-screen w-64 shrink-0 border-r border-white/10 bg-[#070a12]/80 p-5 backdrop-blur-xl lg:flex lg:flex-col">
        <SidebarContent />
      </aside>

      {/* Mobile drawer */}
      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setOpen(false)}
            aria-hidden
          />
          <aside className="absolute left-0 top-0 h-full w-72 max-w-[80%] border-r border-white/10 bg-[#070a12] p-5">
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close menu"
              className="absolute right-4 top-4 inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-200"
            >
              <X className="h-5 w-5" />
            </button>
            <SidebarContent onNavigate={() => setOpen(false)} />
          </aside>
        </div>
      )}

      {/* Main column */}
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-40 flex items-center justify-between gap-4 border-b border-white/10 bg-[#05070d]/80 px-4 py-4 backdrop-blur-xl sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-100 lg:hidden"
            >
              <Menu className="h-5 w-5" />
            </button>
            <div className="min-w-0">
              <h1 className="truncate text-lg font-bold text-white sm:text-xl">
                {title}
              </h1>
              {subtitle && (
                <p className="truncate text-xs text-slate-400 sm:text-sm">
                  {subtitle}
                </p>
              )}
            </div>
          </div>
          <UserButton />
        </header>

        <main className="flex-1 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
          {children}
        </main>
      </div>
    </div>
  );
}
