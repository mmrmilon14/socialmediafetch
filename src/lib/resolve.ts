import { detectPlatform, parseUrl, type Platform } from "./platforms";
import type { FetchResult, MediaItem } from "./types";
import { youtubeId, youtubeThumbnails } from "./youtube";

/**
 * Image hosts /api/download may proxy. Only platform CDNs are listed so the
 * proxy can't be used to fetch arbitrary URLs.
 */
const DOWNLOAD_HOSTS = [
  "ytimg.com",
  "img.youtube.com",
  "vimeocdn.com",
  "tiktokcdn.com",
  "tiktokcdn-us.com",
  "tiktokcdn-eu.com",
  "ibyteimg.com",
  "dmcdn.net",
  "sndcdn.com",
  "staticflickr.com",
  "redd.it",
  "redditmedia.com",
  "media.tumblr.com",
  "cdn.bsky.app",
  "thumbnailer.mixcloud.com",
  "streamable.com",
  "fbcdn.net",
  "cdninstagram.com",
];

export function isDownloadHost(raw: string) {
  let host: string;
  try {
    const url = new URL(raw);
    if (url.protocol !== "https:") return false;
    host = url.hostname.toLowerCase();
  } catch {
    return false;
  }
  return DOWNLOAD_HOSTS.some((d) => host === d || host.endsWith(`.${d}`));
}

type OEmbed = {
  title?: string;
  author_name?: string;
  author_url?: string;
  provider_name?: string;
  thumbnail_url?: string;
  thumbnail_width?: number;
  thumbnail_height?: number;
  type?: string;
  url?: string;
  width?: number | string;
  height?: number | string;
  duration?: number;
  html?: string;
  description?: string;
  upload_date?: string;
};

const enc = encodeURIComponent;

function metaToken() {
  const id = process.env.META_APP_ID;
  const token = process.env.META_CLIENT_TOKEN;
  return id && token ? `${id}|${token}` : null;
}

/** Official oEmbed endpoints. Only these hosts are ever requested server-side. */
const endpoints: Record<string, (url: string) => string | null> = {
  youtube: (u) => `https://www.youtube.com/oembed?format=json&url=${enc(u)}`,
  vimeo: (u) => `https://vimeo.com/api/oembed.json?url=${enc(u)}`,
  tiktok: (u) => `https://www.tiktok.com/oembed?url=${enc(u)}`,
  dailymotion: (u) => `https://www.dailymotion.com/services/oembed?format=json&url=${enc(u)}`,
  soundcloud: (u) => `https://soundcloud.com/oembed?format=json&url=${enc(u)}`,
  reddit: (u) => `https://www.reddit.com/oembed?url=${enc(u)}`,
  flickr: (u) => `https://www.flickr.com/services/oembed/?format=json&url=${enc(u)}`,
  tumblr: (u) => `https://www.tumblr.com/oembed/1.0?url=${enc(u)}`,
  bluesky: (u) => `https://embed.bsky.app/oembed?format=json&url=${enc(u)}`,
  "x-twitter": (u) => `https://publish.twitter.com/oembed?omit_script=1&dnt=true&url=${enc(u)}`,
  mixcloud: (u) => `https://app.mixcloud.com/oembed/?format=json&url=${enc(u)}`,
  streamable: (u) => `https://api.streamable.com/oembed.json?url=${enc(u)}`,
  instagram: (u) => {
    const t = metaToken();
    return t
      ? `https://graph.facebook.com/v21.0/instagram_oembed?omitscript=true&url=${enc(u)}&access_token=${enc(t)}`
      : null;
  },
  facebook: (u) => {
    const t = metaToken();
    if (!t) return null;
    const kind = /\/(videos|reel|watch)\b|fb\.watch/.test(u) ? "oembed_video" : "oembed_post";
    return `https://graph.facebook.com/v21.0/${kind}?omitscript=true&url=${enc(u)}&access_token=${enc(t)}`;
  },
};

function decodeEntities(s: string) {
  return s
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#0?39;|&apos;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&mdash;/g, "—")
    .replace(/&nbsp;/g, " ")
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)));
}

/** Pulls readable post text out of an embed's HTML. */
function textFromHtml(html?: string) {
  if (!html) return undefined;
  const p = html.match(/<p[^>]*>([\s\S]*?)<\/p>/i)?.[1];
  if (!p) return undefined;
  const text = decodeEntities(p.replace(/<br\s*\/?>/gi, "\n").replace(/<[^>]+>/g, "")).trim();
  return text || undefined;
}

function formatDuration(sec: number) {
  const h = Math.floor(sec / 3600);
  const m = Math.floor((sec % 3600) / 60);
  const s = Math.floor(sec % 60);
  const mm = h ? String(m).padStart(2, "0") : String(m);
  return `${h ? `${h}:` : ""}${mm}:${String(s).padStart(2, "0")}`;
}

function base(p: Platform) {
  return { platform: { slug: p.slug, name: p.name, phase: p.phase }, note: p.note };
}

export async function resolve(input: string): Promise<FetchResult> {
  const url = parseUrl(input);
  if (!url) {
    return {
      status: "invalid",
      message: "That doesn't look like a link. Paste the full URL of a public post, e.g. https://www.youtube.com/watch?v=…",
    };
  }
  const platform = detectPlatform(url.href);
  if (!platform) {
    return {
      status: "unsupported",
      message: `We don't recognise ${url.hostname} yet. Check the list of supported platforms below.`,
    };
  }

  const endpoint = endpoints[platform.slug];
  if (!platform.live || !endpoint) {
    return {
      ...base(platform),
      status: "planned",
      message: `${platform.name} support is planned for Phase ${platform.phase}. We detected the link, but fetching from ${platform.name} isn't available yet.`,
      sourceUrl: url.href,
    };
  }

  const ytId = platform.slug === "youtube" ? youtubeId(url) : null;
  if (platform.slug === "youtube" && !ytId) {
    return {
      ...base(platform),
      status: "invalid",
      message: "This YouTube link doesn't point to a single video. Paste a video, Shorts, or youtu.be link.",
    };
  }

  const api = endpoint(url.href);
  if (!api) {
    return {
      ...base(platform),
      status: "needs_config",
      message: `${platform.name} requires an approved Meta developer app. This site hasn't been connected to Meta yet, so ${platform.name} links can't be fetched right now.`,
      sourceUrl: url.href,
    };
  }

  let data: OEmbed;
  try {
    const res = await fetch(api, {
      headers: { Accept: "application/json", "User-Agent": "SocialMediaFetch/1.0 (+oEmbed client)" },
      signal: AbortSignal.timeout(8000),
      cache: "no-store",
    });
    if (res.status === 401 || res.status === 403) {
      return {
        ...base(platform),
        status: "restricted",
        message: `This ${platform.name} post is private, age-restricted, or its owner has turned off sharing. Only public posts can be fetched.`,
        sourceUrl: url.href,
      };
    }
    if (res.status === 404 || res.status === 400) {
      return {
        ...base(platform),
        status: "not_found",
        message: `We couldn't find a public ${platform.name} post at this link. It may have been deleted, or the link may be incomplete.`,
        sourceUrl: url.href,
      };
    }
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    data = (await res.json()) as OEmbed;
  } catch {
    return {
      ...base(platform),
      status: "error",
      message: `${platform.name} didn't respond in time. Please try again in a moment.`,
      sourceUrl: url.href,
    };
  }

  const media: MediaItem[] = [];
  if (ytId) {
    media.push(...youtubeThumbnails(ytId));
  } else {
    if (data.type === "photo" && data.url) {
      media.push({
        kind: "image",
        label: "Full-size photo",
        url: data.url,
        width: Number(data.width) || undefined,
        height: Number(data.height) || undefined,
        downloadable: isDownloadHost(data.url),
      });
    }
    if (data.thumbnail_url) {
      media.push({
        kind: "thumbnail",
        label: "Thumbnail",
        url: data.thumbnail_url,
        width: data.thumbnail_width,
        height: data.thumbnail_height,
        downloadable: isDownloadHost(data.thumbnail_url),
      });
    }
  }

  const metadata: { label: string; value: string }[] = [
    { label: "Platform", value: platform.name },
  ];
  if (data.author_name) metadata.push({ label: "Creator", value: data.author_name });
  if (data.duration) metadata.push({ label: "Duration", value: formatDuration(data.duration) });
  if (data.upload_date) metadata.push({ label: "Uploaded", value: data.upload_date.slice(0, 10) });
  if (ytId) metadata.push({ label: "Video ID", value: ytId });
  if (data.type) metadata.push({ label: "Content type", value: data.type });

  const caption = data.description?.trim() || textFromHtml(data.html);

  return {
    ...base(platform),
    status: "ok",
    message: media.length
      ? `Found ${media.length} file${media.length > 1 ? "s" : ""} for this ${platform.name} post.`
      : `Found this ${platform.name} post. ${platform.name} doesn't share media files for it, but the details are below.`,
    title: data.title ? decodeEntities(data.title) : undefined,
    author: data.author_name,
    authorUrl: data.author_url,
    caption,
    sourceUrl: url.href,
    media,
    metadata,
  };
}
