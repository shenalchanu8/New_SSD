// components/dashboards/imageSafety.ts
export const toSafeImageUrl = (raw: unknown) => {
  const PLACEHOLDER = "/placeholder.svg";
  const s = String(raw ?? "").trim();
  if (!s) return PLACEHOLDER;

  // Block dangerous schemes
  if (/^(javascript|data):/i.test(s)) return PLACEHOLDER;

  try {
    // Allow http/https absolute, and same-origin relative via base URL
    const u = new URL(s, window.location.origin);
    if (u.protocol === "http:" || u.protocol === "https:" || u.origin === window.location.origin) {
      return u.href;
    }
    return PLACEHOLDER;
  } catch {
    // Allow simple relative paths
    if (s.startsWith("/") || s.startsWith("./") || s.startsWith("../")) return s;
    return PLACEHOLDER;
  }
};
