"use client";

import {
  SignInButton,
  SignUpButton,
  UserButton,
  useAuth,
} from "@clerk/nextjs";
import Link from "next/link";
import { Menu, Sparkles, X } from "lucide-react";
import { useState } from "react";

const links = [
  { label: "Features", href: "#features" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Benefits", href: "#benefits" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { isLoaded, isSignedIn } = useAuth();

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#05070d]/80 backdrop-blur-xl">
      <div className="container-page flex items-center justify-between gap-4 py-4">
        <Link href="/" className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-400 via-sky-500 to-violet-500 text-slate-950 shadow-lg shadow-cyan-500/20">
            <Sparkles className="h-5 w-5" />
          </span>
          <span>
            <span className="block text-lg font-semibold tracking-tight text-white">
              ATSBoost AI
            </span>
            <span className="hidden text-xs text-slate-400 sm:block">
              Resume intelligence for faster hiring
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-slate-300 transition hover:text-cyan-300"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          {!isLoaded ? (
            <div className="h-10 w-28 animate-pulse rounded-full bg-white/10" />
          ) : isSignedIn ? (
            <>
              <Link href="/dashboard" className="btn-secondary">
                Dashboard
              </Link>
              <UserButton />
            </>
          ) : (
            <>
              <SignInButton mode="modal">
                <button className="btn-ghost">Sign in</button>
              </SignInButton>
              <SignUpButton mode="modal">
                <button className="btn-primary">Start free</button>
              </SignUpButton>
            </>
          )}
        </div>

        <button
          type="button"
          onClick={() => setOpen((prev) => !prev)}
          aria-label="Toggle navigation menu"
          aria-expanded={open}
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-100 transition hover:border-white/20 hover:bg-white/10 md:hidden"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-white/10 bg-[#05070d]/95 px-5 py-5 backdrop-blur-xl md:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-3">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-slate-100 transition hover:border-cyan-400/40 hover:bg-cyan-400/10"
              >
                {link.label}
              </Link>
            ))}

            <div className="flex flex-col gap-3 border-t border-white/10 pt-4">
              {isSignedIn ? (
                <>
                  <Link
                    href="/dashboard"
                    onClick={() => setOpen(false)}
                    className="btn-primary w-full"
                  >
                    Go to Dashboard
                  </Link>
                  <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-100">
                    <span>Account</span>
                    <UserButton />
                  </div>
                </>
              ) : (
                <>
                  <SignInButton mode="modal">
                    <button className="btn-secondary w-full">Sign in</button>
                  </SignInButton>
                  <SignUpButton mode="modal">
                    <button className="btn-primary w-full">Start free</button>
                  </SignUpButton>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
