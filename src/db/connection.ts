export function getNeonHttpConnectionString(rawUrl: string): string {
  const url = new URL(rawUrl);

  // neon-http should use the direct Neon hostname, not the pooled hostname.
  if (url.hostname.includes("-pooler.")) {
    url.hostname = url.hostname.replace("-pooler.", ".");
  }

  // channel_binding is relevant for Postgres protocol clients, not neon-http fetch.
  url.searchParams.delete("channel_binding");

  return url.toString();
}

