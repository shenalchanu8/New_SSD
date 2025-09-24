// imageSafety.js
const ALLOWED_ORIGINS = new Set([
  'https://cdn.yourapp.com',
  'https://images.yourapp.com',
  // add more if you truly need them
]);

export function toSafeImageUrl(raw) {
  try {
    if (!raw) return '/placeholder.svg';

    const url = new URL(raw, window.location.origin);

    // Allow only http/https
    if (url.protocol !== 'http:' && url.protocol !== 'https:') {
      return '/placeholder.svg';
    }

    // Strict allowlist: only your image hosts (comment this out if you can't)
    if (!ALLOWED_ORIGINS.has(url.origin)) {
      return '/placeholder.svg';
    }

    // Optional: block SVG entirely to avoid SVG-based tricks
    if (url.pathname.toLowerCase().endsWith('.svg')) {
      return '/placeholder.svg';
    }

    return url.href;
  } catch {
    return '/placeholder.svg';
  }
}
