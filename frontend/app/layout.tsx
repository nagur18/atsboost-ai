import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "react-hot-toast";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "ATSBoost AI — Land More Interviews",
    template: "%s · ATSBoost AI",
  },
  description:
    "AI-powered resume analyzer and interview coach. Improve your ATS score, practice interviews, and get a personalized career roadmap.",
  keywords: [
    "ATS",
    "resume analyzer",
    "interview coach",
    "AI resume",
    "career roadmap",
  ],
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#05070d",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en" className={inter.variable}>
        <body className="antialiased">
          {children}
          <Toaster
            position="top-center"
            toastOptions={{
              style: {
                background: "#0a0e1a",
                color: "#e2e8f0",
                border: "1px solid rgba(255,255,255,0.1)",
              },
            }}
          />
        </body>
      </html>
    </ClerkProvider>
  );
}
