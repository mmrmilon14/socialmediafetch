export type MediaKind = "video" | "audio" | "image" | "thumbnail";

export type MediaItem = {
  kind: MediaKind;
  label: string;
  url: string;
  width?: number;
  height?: number;
  /** True when the file can be routed through /api/download. */
  downloadable: boolean;
};

export type FetchStatus =
  | "ok"
  | "unsupported" // URL is not from a known platform
  | "invalid" // not a URL at all
  | "planned" // known platform, resolver not built yet
  | "restricted" // private, login-only, or blocked by the platform
  | "not_found" // removed or never existed
  | "needs_config" // resolver exists but needs credentials
  | "error";

export type FetchResult = {
  status: FetchStatus;
  message: string;
  platform?: { slug: string; name: string; phase: number };
  title?: string;
  author?: string;
  authorUrl?: string;
  caption?: string;
  sourceUrl?: string;
  media?: MediaItem[];
  metadata?: { label: string; value: string }[];
  /** Note on what this platform allows, shown under results. */
  note?: string;
};
