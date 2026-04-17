export const API_BASE =
  (typeof process !== "undefined" &&
    process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "")) ||
  "http://localhost:3001";

/** Blog `image` from API: relative path under API origin, or absolute URL — for `<img>` / `next/image`. */
export function blogImageUrlFromApi(
  imageField: unknown,
  fallback = "/assets/recentpost2.jpg",
): string {
  if (imageField == null) return fallback;
  const s = String(imageField).trim();
  if (!s) return fallback;
  if (/^https?:\/\//i.test(s)) return s;
  return `${API_BASE}/${s.replace(/^\/+/, "")}`;
}

/** Career resume path in DB e.g. `uploads/resume/<file>` (older rows may use `uploads/resumes/...`). */
export async function downloadCareerResumeFromPath(
  relativePath: string | undefined | null,
): Promise<void> {
  if (!relativePath || typeof relativePath !== "string") return;
  const normalized = relativePath.replace(/^\/+/, "");
  const url = `${API_BASE}/${normalized}`;
  const res = await fetch(url);
  if (!res.ok) return;
  const blob = await res.blob();
  const baseName = normalized.split("/").pop() || "resume";
  const objectUrl = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = objectUrl;
  a.download = baseName;
  a.rel = "noopener";
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(objectUrl);
}

export async function parseJson(res: Response) {
  const ct = res.headers.get("content-type");
  if (ct?.includes("application/json")) {
    return res.json() as Promise<Record<string, unknown>>;
  }
  const text = await res.text();
  throw new Error(text.slice(0, 160) || `HTTP ${res.status}`);
}
