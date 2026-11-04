import type { IconName } from "@/components/Icon";

export type Phase = 1 | 2 | 3;

export type ContentType =
  | "video"
  | "audio"
  | "image"
  | "gif"
  | "thumbnail"
  | "caption"
  | "metadata";

export type CategorySlug =
  | "major-social"
  | "video-platforms"
  | "short-video"
  | "live-streaming"
  | "music-audio"
  | "images-gifs"
  | "communities";

export type Category = {
  slug: CategorySlug;
  name: string;
  description: string;
};

export type Platform = {
  slug: string;
  name: string;
  phase: Phase;
  category: CategorySlug;
  /** Short line used on cards. */
  summary: string;
  /** Longer "main use" line from the platform plan. */
  mainUse: string;
  supports: ContentType[];
  /** Hostnames this platform owns. Subdomains match too. */
  domains: string[];
  icon: IconName;
  /** True when /api/fetch has a working resolver for this platform. */
  live: boolean;
  /** Extra note shown on the platform page about access limits. */
  note?: string;
};

export const categories: Category[] = [
  {
    slug: "major-social",
    name: "Major Social",
    description:
      "The biggest social networks: Reels, Shorts, posts, Pins, and threads.",
  },
  {
    slug: "video-platforms",
    name: "Video Platforms",
    description: "Long-form and creator video hosts with public video pages.",
  },
  {
    slug: "short-video",
    name: "Short Video",
    description: "Short-form vertical video apps and Spotlight-style feeds.",
  },
  {
    slug: "live-streaming",
    name: "Live Streaming",
    description: "Stream clips, VODs, and channel information.",
  },
  {
    slug: "music-audio",
    name: "Music & Audio",
    description: "Track, album, and show information from audio platforms.",
  },
  {
    slug: "images-gifs",
    name: "Images & GIFs",
    description: "Photo hosts, GIF galleries, and visual blogging platforms.",
  },
  {
    slug: "communities",
    name: "Communities & Messaging",
    description:
      "Professional networks, open social networks, and public channels.",
  },
];

export const platforms: Platform[] = [
  // A. Major social media platforms
  {
    slug: "instagram",
    name: "Instagram",
    phase: 1,
    category: "major-social",
    summary: "Fetch public Reels, photos, carousels, and thumbnails from one link.",
    mainUse:
      "Reels, public videos, photos, carousel posts, thumbnails, and supported public post information.",
    supports: ["video", "image", "thumbnail", "caption", "metadata"],
    domains: ["instagram.com", "instagr.am"],
    icon: "camera",
    live: true,
    note: "Instagram only exposes post details through Meta's oEmbed API, which needs an approved Meta app token. Private accounts are never accessible.",
  },
  {
    slug: "tiktok",
    name: "TikTok",
    phase: 1,
    category: "major-social",
    summary: "Grab public TikTok thumbnails, captions, and creator details.",
    mainUse: "Public videos, thumbnails, captions, and supported metadata.",
    supports: ["video", "thumbnail", "caption", "metadata"],
    domains: ["tiktok.com"],
    icon: "music",
    live: true,
    note: "TikTok's official APIs focus on authorized display and publishing, so video files are only offered where TikTok allows it.",
  },
  {
    slug: "youtube",
    name: "YouTube",
    phase: 1,
    category: "major-social",
    summary: "Get every thumbnail size, title, and channel info for videos and Shorts.",
    mainUse:
      "Video information, thumbnails, captions where available, Shorts, and authorized media access.",
    supports: ["thumbnail", "caption", "metadata"],
    domains: ["youtube.com", "youtu.be", "youtube-nocookie.com"],
    icon: "play",
    live: true,
    note: "YouTube's terms do not allow downloading video files without permission, so SocialMediaFetch provides thumbnails and video information.",
  },
  {
    slug: "facebook",
    name: "Facebook",
    phase: 1,
    category: "major-social",
    summary: "Pull details from public Facebook videos, Reels, and photo posts.",
    mainUse:
      "Public video posts, Reels, photos, thumbnails, and available post information.",
    supports: ["video", "image", "thumbnail", "metadata"],
    domains: ["facebook.com", "fb.watch", "fb.com"],
    icon: "users",
    live: true,
    note: "Facebook post details come from Meta's oEmbed API, which needs an approved Meta app token.",
  },
  {
    slug: "x-twitter",
    name: "X (Twitter)",
    phase: 1,
    category: "major-social",
    summary: "Read public posts, author details, and post text from any X link.",
    mainUse: "Public video posts, images, GIFs, and supported post metadata.",
    supports: ["video", "image", "gif", "caption", "metadata"],
    domains: ["x.com", "twitter.com", "mobile.twitter.com"],
    icon: "hash",
    live: true,
  },
  {
    slug: "pinterest",
    name: "Pinterest",
    phase: 1,
    category: "major-social",
    summary: "Save public image Pins, video Pins, and their thumbnails.",
    mainUse: "Public image Pins, video Pins, thumbnails, and available pin information.",
    supports: ["video", "image", "thumbnail", "metadata"],
    domains: [
      "pinterest.com",
      "pin.it",
      "pinterest.co.uk",
      "pinterest.ca",
      "pinterest.com.au",
      "pinterest.de",
      "pinterest.fr",
    ],
    icon: "pin",
    live: false,
  },
  {
    slug: "reddit",
    name: "Reddit",
    phase: 1,
    category: "major-social",
    summary: "Fetch public post titles, authors, and subreddit details.",
    mainUse: "Public post images, videos, GIFs, and supported post information.",
    supports: ["video", "image", "gif", "metadata"],
    domains: ["reddit.com", "redd.it"],
    icon: "message",
    live: true,
  },
  {
    slug: "threads",
    name: "Threads",
    phase: 2,
    category: "major-social",
    summary: "Read public Threads posts, images, and videos.",
    mainUse: "Public post text, images, videos, and available post metadata.",
    supports: ["video", "image", "caption", "metadata"],
    domains: ["threads.net", "threads.com"],
    icon: "at",
    live: false,
  },

  // B. Additional platforms
  {
    slug: "linkedin",
    name: "LinkedIn",
    phase: 2,
    category: "communities",
    summary: "Public LinkedIn post information and authorized media.",
    mainUse: "Public post information and authorized media.",
    supports: ["video", "image", "metadata"],
    domains: ["linkedin.com", "lnkd.in"],
    icon: "briefcase",
    live: false,
  },
  {
    slug: "snapchat",
    name: "Snapchat",
    phase: 2,
    category: "short-video",
    summary: "Public Spotlight videos and stories where accessible.",
    mainUse: "Public Spotlight content where accessible.",
    supports: ["video", "thumbnail", "metadata"],
    domains: ["snapchat.com"],
    icon: "ghost",
    live: false,
  },
  {
    slug: "vimeo",
    name: "Vimeo",
    phase: 1,
    category: "video-platforms",
    summary: "Get Vimeo titles, thumbnails, duration, and creator info.",
    mainUse: "Public video information and authorized downloads.",
    supports: ["video", "thumbnail", "metadata"],
    domains: ["vimeo.com", "player.vimeo.com"],
    icon: "film",
    live: true,
    note: "Direct Vimeo file links need the video owner's permission through Vimeo's API. Downloads appear only when the owner enables them on Vimeo.",
  },
  {
    slug: "dailymotion",
    name: "Dailymotion",
    phase: 2,
    category: "video-platforms",
    summary: "Public Dailymotion video links, thumbnails, and metadata.",
    mainUse: "Public video links and metadata.",
    supports: ["thumbnail", "metadata"],
    domains: ["dailymotion.com", "dai.ly"],
    icon: "film",
    live: true,
  },
  {
    slug: "twitch",
    name: "Twitch",
    phase: 2,
    category: "live-streaming",
    summary: "Clip and VOD information from public Twitch channels.",
    mainUse: "Stream clips, VOD information, and authorized downloads.",
    supports: ["video", "thumbnail", "metadata"],
    domains: ["twitch.tv", "clips.twitch.tv"],
    icon: "broadcast",
    live: false,
  },
  {
    slug: "soundcloud",
    name: "SoundCloud",
    phase: 2,
    category: "music-audio",
    summary: "Track artwork, titles, and artist info from SoundCloud.",
    mainUse: "Track information and creator-authorized audio downloads.",
    supports: ["audio", "thumbnail", "metadata"],
    domains: ["soundcloud.com", "on.soundcloud.com"],
    icon: "headphones",
    live: true,
  },
  {
    slug: "tumblr",
    name: "Tumblr",
    phase: 2,
    category: "images-gifs",
    summary: "Public Tumblr photos, GIFs, videos, and post details.",
    mainUse: "Public photos, GIFs, videos, and posts.",
    supports: ["image", "gif", "video", "metadata"],
    domains: ["tumblr.com"],
    icon: "type",
    live: true,
  },
  {
    slug: "telegram",
    name: "Telegram",
    phase: 2,
    category: "communities",
    summary: "Posts and media from public Telegram channels.",
    mainUse: "Public channel posts and accessible media.",
    supports: ["image", "video", "caption", "metadata"],
    domains: ["t.me", "telegram.me"],
    icon: "send",
    live: false,
  },
  {
    slug: "bluesky",
    name: "Bluesky",
    phase: 2,
    category: "communities",
    summary: "Public Bluesky posts, images, videos, and metadata.",
    mainUse: "Public posts, images, videos, and metadata.",
    supports: ["image", "video", "caption", "metadata"],
    domains: ["bsky.app"],
    icon: "cloud",
    live: true,
  },
  {
    slug: "mastodon",
    name: "Mastodon",
    phase: 3,
    category: "communities",
    summary: "Public toots, images, videos, and attachments.",
    mainUse: "Public posts, images, videos, and attachments.",
    supports: ["image", "video", "caption", "metadata"],
    domains: [
      "mastodon.social",
      "mastodon.online",
      "mstdn.social",
      "mas.to",
      "fosstodon.org",
      "techhub.social",
    ],
    icon: "globe",
    live: false,
  },
  {
    slug: "flickr",
    name: "Flickr",
    phase: 2,
    category: "images-gifs",
    summary: "Save public Flickr photos and album covers in full size.",
    mainUse: "Public photos and albums where permitted.",
    supports: ["image", "metadata"],
    domains: ["flickr.com", "flic.kr"],
    icon: "aperture",
    live: true,
  },
  {
    slug: "imgur",
    name: "Imgur",
    phase: 2,
    category: "images-gifs",
    summary: "Public Imgur images, GIFs, and albums in one click.",
    mainUse: "Public images, GIFs, and albums.",
    supports: ["image", "gif", "metadata"],
    domains: ["imgur.com"],
    icon: "image",
    live: false,
  },
  {
    slug: "bilibili",
    name: "Bilibili",
    phase: 3,
    category: "video-platforms",
    summary: "Public Bilibili video information and supported downloads.",
    mainUse: "Public video information and supported downloads.",
    supports: ["thumbnail", "metadata"],
    domains: ["bilibili.com", "b23.tv"],
    icon: "tv",
    live: false,
  },
  {
    slug: "likee",
    name: "Likee",
    phase: 3,
    category: "short-video",
    summary: "Public Likee short-video links where accessible.",
    mainUse: "Public short-video links where accessible.",
    supports: ["video", "thumbnail"],
    domains: ["likee.video", "likee.com"],
    icon: "heart",
    live: false,
  },
  {
    slug: "kwai",
    name: "Kwai",
    phase: 3,
    category: "short-video",
    summary: "Public Kwai short videos where accessible.",
    mainUse: "Public short videos where accessible.",
    supports: ["video", "thumbnail"],
    domains: ["kwai.com", "kw.ai"],
    icon: "zap",
    live: false,
  },
  {
    slug: "douyin",
    name: "Douyin",
    phase: 3,
    category: "short-video",
    summary: "Public Douyin short-video links where accessible.",
    mainUse: "Public short-video links where accessible.",
    supports: ["video", "thumbnail"],
    domains: ["douyin.com", "iesdouyin.com"],
    icon: "music",
    live: false,
  },
  {
    slug: "weibo",
    name: "Weibo",
    phase: 3,
    category: "communities",
    summary: "Public Weibo posts, images, and video information.",
    mainUse: "Public posts, images, and video information.",
    supports: ["image", "video", "metadata"],
    domains: ["weibo.com", "weibo.cn"],
    icon: "eye",
    live: false,
  },
  {
    slug: "vk",
    name: "VK",
    phase: 3,
    category: "communities",
    summary: "Public VK posts, photos, and videos.",
    mainUse: "Public posts, photos, and videos.",
    supports: ["image", "video", "metadata"],
    domains: ["vk.com", "vk.ru", "vkvideo.ru"],
    icon: "users",
    live: false,
  },
  {
    slug: "lemon8",
    name: "Lemon8",
    phase: 3,
    category: "images-gifs",
    summary: "Public Lemon8 lifestyle posts and images where accessible.",
    mainUse: "Public lifestyle posts and images where accessible.",
    supports: ["image", "metadata"],
    domains: ["lemon8-app.com"],
    icon: "star",
    live: false,
  },
  {
    slug: "kick",
    name: "Kick",
    phase: 3,
    category: "live-streaming",
    summary: "Public Kick stream and clip information where supported.",
    mainUse: "Public stream and clip information where supported.",
    supports: ["video", "thumbnail", "metadata"],
    domains: ["kick.com"],
    icon: "broadcast",
    live: false,
  },
  {
    slug: "rumble",
    name: "Rumble",
    phase: 3,
    category: "video-platforms",
    summary: "Public Rumble video information and authorized downloads.",
    mainUse: "Public video information and authorized downloads.",
    supports: ["video", "thumbnail", "metadata"],
    domains: ["rumble.com"],
    icon: "film",
    live: false,
  },
  {
    slug: "odysee",
    name: "Odysee",
    phase: 3,
    category: "video-platforms",
    summary: "Public Odysee video information and available media.",
    mainUse: "Public video information and available media.",
    supports: ["video", "thumbnail", "metadata"],
    domains: ["odysee.com"],
    icon: "compass",
    live: false,
  },
  {
    slug: "peertube",
    name: "PeerTube",
    phase: 3,
    category: "video-platforms",
    summary: "Public videos from supported PeerTube instances.",
    mainUse: "Public videos from supported instances.",
    supports: ["video", "thumbnail", "metadata"],
    domains: ["framatube.org", "peertube.tv", "tilvids.com"],
    icon: "share",
    live: false,
  },
  {
    slug: "streamable",
    name: "Streamable",
    phase: 3,
    category: "video-platforms",
    summary: "Public Streamable video links, thumbnails, and metadata.",
    mainUse: "Public video links and metadata.",
    supports: ["thumbnail", "metadata"],
    domains: ["streamable.com"],
    icon: "play",
    live: true,
  },
  {
    slug: "bandcamp",
    name: "Bandcamp",
    phase: 3,
    category: "music-audio",
    summary: "Music and album information plus authorized downloads.",
    mainUse: "Music and album information; authorized downloads.",
    supports: ["audio", "thumbnail", "metadata"],
    domains: ["bandcamp.com"],
    icon: "disc",
    live: false,
  },
  {
    slug: "mixcloud",
    name: "Mixcloud",
    phase: 3,
    category: "music-audio",
    summary: "Public Mixcloud show artwork, titles, and metadata.",
    mainUse: "Public show information and available metadata.",
    supports: ["thumbnail", "metadata"],
    domains: ["mixcloud.com"],
    icon: "radio",
    live: true,
  },
  {
    slug: "audiomack",
    name: "Audiomack",
    phase: 3,
    category: "music-audio",
    summary: "Audiomack track information and permitted downloads.",
    mainUse: "Track information and permitted downloads.",
    supports: ["audio", "thumbnail", "metadata"],
    domains: ["audiomack.com"],
    icon: "headphones",
    live: false,
  },
];

export const popularSlugs = [
  "instagram",
  "tiktok",
  "youtube",
  "facebook",
  "x-twitter",
  "pinterest",
];

export const contentTypeLabels: Record<ContentType, string> = {
  video: "Video",
  audio: "Audio",
  image: "Images",
  gif: "GIFs",
  thumbnail: "Thumbnails",
  caption: "Captions",
  metadata: "Metadata",
};

export function getPlatform(slug: string) {
  return platforms.find((p) => p.slug === slug);
}

export function getCategory(slug: string) {
  return categories.find((c) => c.slug === slug);
}

export function platformsIn(category: CategorySlug) {
  return platforms.filter((p) => p.category === category);
}

/** URL path for a platform's downloader page. */
export function platformHref(p: Pick<Platform, "slug">) {
  return `/${p.slug}-downloader`;
}

export function slugFromHref(param: string) {
  return param.endsWith("-downloader") ? param.slice(0, -"-downloader".length) : null;
}

export function categoryHref(c: Pick<Category, "slug">) {
  return `/category/${c.slug}`;
}

/** Matches a URL to a platform by hostname, with path fallbacks for federated networks. */
export function detectPlatform(input: string): Platform | null {
  const url = parseUrl(input);
  if (!url) return null;
  const host = url.hostname.toLowerCase().replace(/^www\./, "");

  for (const p of platforms) {
    if (p.domains.some((d) => host === d || host.endsWith(`.${d}`))) return p;
  }
  // Bandcamp artists use their own subdomain, already covered above.
  // Federated networks run on many hosts, so fall back to their URL shape.
  if (/^\/@[\w.-]+\/\d+\/?$/.test(url.pathname)) return getPlatform("mastodon")!;
  if (/^\/(w|videos\/watch)\/[\w-]{8,}\/?$/.test(url.pathname)) return getPlatform("peertube")!;
  return null;
}

export function parseUrl(input: string): URL | null {
  const trimmed = input.trim();
  if (!trimmed || trimmed.length > 2048) return null;
  const withScheme = /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
  try {
    const url = new URL(withScheme);
    if (url.protocol !== "https:" && url.protocol !== "http:") return null;
    if (!url.hostname.includes(".")) return null;
    return url;
  } catch {
    return null;
  }
}

export const stats = {
  platforms: platforms.length,
  categories: categories.length,
  live: platforms.filter((p) => p.live).length,
};
