const IMAGE_EXTENSIONS = ["png", "jpg", "jpeg", "webp", "avif", "gif", "svg"];
const VIDEO_EXTENSIONS = ["mp4", "webm"];

function normalize(value?: string): string | undefined {
  const trimmed = value?.trim();
  return trimmed ? trimmed : undefined;
}

function hasExtension(value: string, extensions: string[]): boolean {
  const extension = value.split(".").pop()?.toLowerCase();
  return extension ? extensions.includes(extension) : false;
}

/** Resolve a dictionary image name to a public asset path without changing real extensions. */
export function imageSrc(name?: string): string | undefined {
  const value = normalize(name);
  if (!value) return undefined;
  if (/^(https?:)?\/\//.test(value) || value.startsWith("/")) return value;
  return `/Images/${hasExtension(value, IMAGE_EXTENSIONS) ? value : `${value}.png`}`;
}

/** Resolve a dictionary video name to a public asset path (mp4/webm are preserved). */
export function videoSrc(name?: string): string | undefined {
  const value = normalize(name);
  if (!value) return undefined;
  if (/^(https?:)?\/\//.test(value) || value.startsWith("/")) return value;
  return `/${hasExtension(value, VIDEO_EXTENSIONS) ? value : `${value}.mp4`}`;
}

export function videoMimeType(name?: string): string {
  const value = normalize(name) ?? "";
  return value.toLowerCase().endsWith(".webm") ? "video/webm" : "video/mp4";
}

export function assetHost(url?: string): string {
  const value = normalize(url);
  if (!value) return "";
  try {
    return new URL(value, "https://example.com").hostname.replace(/^www\./, "");
  } catch {
    return value;
  }
}
