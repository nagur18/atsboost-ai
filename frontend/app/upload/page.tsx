import DashboardShell from "@/components/dashboard/DashboardShell";
import ResumeUploader from "@/components/resume/ResumeUploader";

export const metadata = { title: "Resume Upload" };

export default function UploadPage() {
  return (
    <DashboardShell
      title="Resume Upload"
      subtitle="Upload a resume to get an instant AI analysis"
    >
      <div className="mx-auto max-w-3xl">
        <ResumeUploader />
      </div>
    </DashboardShell>
  );
}
