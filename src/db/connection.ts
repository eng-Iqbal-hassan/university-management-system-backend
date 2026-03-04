export function getNeonHttpConnectionString(rawUrl: string): string {
  const url = new URL(rawUrl);

  // Keep the original Neon host by default.
  // Some projects only have a working pooler hostname configured.
  // If you explicitly want direct host conversion, set:
  // NEON_USE_DIRECT_HOST=true
  if (
    process.env.NEON_USE_DIRECT_HOST === "true" &&
    url.hostname.includes("-pooler.")
  ) {
    url.hostname = url.hostname.replace("-pooler.", ".");
  }

  // Avoid pg warning about `sslmode=require` alias behavior by using explicit verify-full.
  if (url.searchParams.get("sslmode") === "require") {
    url.searchParams.set("sslmode", "verify-full");
  }

  // channel_binding is relevant for Postgres protocol clients, not Neon HTTP/WS drivers.
  url.searchParams.delete("channel_binding");

  return url.toString();
}
