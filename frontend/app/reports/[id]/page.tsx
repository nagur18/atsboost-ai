"use client";

import { useParams } from "next/navigation";
import { useState } from "react";
import { Download, Share2, Copy, Check, Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import DashboardShell from "@/components/dashboard/DashboardShell";
import { API_BASE, APP_BASE } from "@/lib/api";

export default function ReportPage() {
  const params = useParams();
  const reportId = String(params.id);

  const [shareUrl, setShareUrl] = useState<string | null>(null);
  const [generating, setGenerating] = useState(false);
  const [copied, setCopied] = useState(false);

  const exportPDF = () => {
    window.open(`${API_BASE}/reports/export/${reportId}`, "_blank");
  };

  const generateShareLink = async () => {
    setGenerating(true);
    try {
      const res = await fetch(`${API_BASE}/share/${reportId}`, {
        method: "POST",
      });
      if (!res.ok) throw new Error(`Could not create link (${res.status})`);
      const data = await res.json();
      // Backend returns its own view URL; extract the token and build a
      // frontend share URL so visitors land on our styled public page.
      const token = String(data.share_url).split("/").pop();
      const url = `${APP_BASE || ""}/share/${token}`;
      setShareUrl(url);
      toast.success("Shareable link created");
    } catch (err) {
      console.error(err);
      toast.error(err instanceof Error ? err.message : "Failed to create link");
    } finally {
      setGenerating(false);
    }
  };

  const copyLink = async () => {
    if (!shareUrl) return;
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      toast.success("Link copied");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Could not copy link");
    }
  };

  return (
    <DashboardShell title="ATS Report" subtitle={`Report #${reportId}`}>
      <div className="mx-auto max-w-3xl space-y-6">
        <div className="card p-6 sm:p-8">
          <h2 className="text-lg font-semibold text-white">
            Export & Share
          </h2>
          <p className="mt-2 text-sm text-slate-400">
            Download a polished PDF of this report, or create a public link to
            share your ATS score with recruiters.
          </p>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <button onClick={exportPDF} className="btn-primary">
              <Download className="h-4 w-4" /> Export PDF
            </button>
            <button
              onClick={generateShareLink}
              disabled={generating}
              className="btn-secondary"
            >
              {generating ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" /> Creating…
                </>
              ) : (
                <>
                  <Share2 className="h-4 w-4" /> Create share link
                </>
              )}
            </button>
          </div>

          {shareUrl && (
            <div className="mt-6 flex items-center gap-2 rounded-xl border border-white/10 bg-black/30 p-2 pl-4">
              <span className="min-w-0 flex-1 truncate text-sm text-slate-300">
                {shareUrl}
              </span>
              <button
                onClick={copyLink}
                className="inline-flex items-center gap-1.5 rounded-lg bg-white/5 px-3 py-2 text-xs font-medium text-slate-200 hover:bg-white/10"
              >
                {copied ? (
                  <>
                    <Check className="h-3.5 w-3.5 text-emerald-300" /> Copied
                  </>
                ) : (
                  <>
                    <Copy className="h-3.5 w-3.5" /> Copy
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    </DashboardShell>
  );
}
