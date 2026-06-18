import { SignUp } from "@clerk/nextjs";
import Link from "next/link";
import { Sparkles } from "lucide-react";

export const metadata = { title: "Sign up" };

export default function Page() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-5 py-12">
      <Link href="/" className="mb-8 flex items-center gap-3">
        <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-400 via-sky-500 to-violet-500 text-slate-950">
          <Sparkles className="h-5 w-5" />
        </span>
        <span className="text-xl font-semibold text-white">ATSBoost AI</span>
      </Link>

      <h1 className="mb-1 text-2xl font-bold text-white">Create your account</h1>
      <p className="mb-8 text-sm text-slate-400">
        Start analyzing your resume in minutes — free
      </p>

      <SignUp
        forceRedirectUrl="/dashboard"
        appearance={{ variables: { colorPrimary: "#22d3ee" } }}
      />
    </main>
  );
}
