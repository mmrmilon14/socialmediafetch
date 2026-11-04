import type { MediaItem } from "./types";

export function youtubeId(url: URL): string | null {
  const host = url.hostname.replace(/^www\.|^m\./, "");
  let id: string | null = null;
  if (host === "youtu.be") id = url.pathname.slice(1).split("/")[0];
  else if (url.searchParams.get("v")) id = url.searchParams.get("v");
  else {
    const m = url.pathname.match(/^\/(shorts|embed|live|v)\/([\w-]+)/);
    if (m) id = m[2];
  }
  return id && /^[\w-]{11}$/.test(id) ? id : null;
}

export function youtubeThumbnails(id: string): MediaItem[] {
  const sizes = [
    ["maxresdefault", "Max resolution", 1280, 720],
    ["sddefault", "Standard", 640, 480],
    ["hqdefault", "High quality", 480, 360],
    ["mqdefault", "Medium quality", 320, 180],
    ["default", "Default", 120, 90],
  ] as const;
  return sizes.map(([file, label, width, height]) => ({
    kind: "thumbnail",
    label,
    url: `https://i.ytimg.com/vi/${id}/${file}.jpg`,
    width,
    height,
    downloadable: true,
  }));
}
