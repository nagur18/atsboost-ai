import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

import DashboardShell from "@/components/dashboard/DashboardShell";
import StatsCards from "@/components/dashboard/StatsCards";
import QuickActions from "@/components/dashboard/QuickActions";
import RecentActivity from "@/components/dashboard/RecentActivity";
import RecentReports from "@/components/dashboard/RecentReports";
import { fetchDashboardStats } from "@/lib/stats";

export default async function DashboardPage() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const stats = await fetchDashboardStats(userId);

  return (
    <DashboardShell title="Dashboard" subtitle="Welcome back 👋">
      <div className="space-y-8">
        <StatsCards stats={stats} />

        <QuickActions />

        <div className="grid gap-6 lg:grid-cols-2">
          <RecentReports reports={stats.recent_reports} />
          <RecentActivity />
        </div>
      </div>
    </DashboardShell>
  );
}
