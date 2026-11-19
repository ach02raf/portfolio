// Server-rendered JSON-LD. Crawlers read structured data in the initial HTML,
// so this deliberately avoids next/script's afterInteractive injection.
export default function StructuredData({ id, data }: { id: string; data: unknown }) {
  const json = JSON.stringify(data).replace(/</g, "\\u003c");
  return (
    <script id={`ld-${id}`} type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />
  );
}
