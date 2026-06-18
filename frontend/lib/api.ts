/**
 * Base URL for the FastAPI backend. Override per-environment with
 * NEXT_PUBLIC_API_URL (e.g. in production). Falls back to local dev.
 */
export const API_BASE =
  process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "") ??
  "http://localhost:8000";

/** Base URL of this frontend app (used to build shareable links). */
export const APP_BASE =
  process.env.NEXT_PUBLIC_APP_URL?.replace(/\/$/, "") ??
  (typeof window !== "undefined" ? window.location.origin : "");
