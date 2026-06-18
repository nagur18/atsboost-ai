import { Activity } from "lucide-react";

export default function RecentActivity() {
  return (
    <div className="card p-6">
      <h2 className="mb-5 text-lg font-semibold text-white">Recent Activity</h2>
      <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-white/10 py-12 text-center">
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white/5 text-slate-400">
          <Activity className="h-6 w-6" />
        </span>
        <p className="mt-4 text-sm font-medium text-slate-300">
          No activity yet
        </p>
        <p className="mt-1 text-xs text-slate-500">
          Your analyses and sessions will appear here.
        </p>
      </div>
    </div>
  );
}
