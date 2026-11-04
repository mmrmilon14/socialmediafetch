# SocialMediaFetch

A social media link fetcher built with **Next.js 16 (App Router)**, **React 19**, and **Tailwind CSS 4**.
Paste one public link, and the site detects the platform and shows the thumbnails, images, captions, and
post details that the platform makes available.

## Run it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start
```

## What's inside

| Path | What it is |
| --- | --- |
| `src/lib/platforms.ts` | All 35 platforms: category, phase, domains, supported content, live status. Edit this to add or change platforms. |
| `src/lib/resolve.ts` | Server-side fetcher. Calls each platform's **official oEmbed endpoint** and maps errors to clear messages (private, removed, not supported yet). |
| `src/app/api/fetch` | `POST { url }` or `GET ?url=` → JSON result. |
| `src/app/api/download` | Streams images from an allowlist of platform CDNs, with a download filename. Any other host is refused. |
| `src/app/[page]` | One downloader page per platform, e.g. `/instagram-downloader`. |
| `src/app/category/[slug]` | Category pages grouped by phase. |
| `src/app/youtube-thumbnail-downloader` | Instant, browser-only YouTube thumbnail tool. |
| `src/components/PlatformCard.tsx` | The shared item card. |

**Design tokens** (in `src/app/globals.css`): font Poppins, text `#1f3340` (`text-ink`), panel background
`#F7FBFE` (`bg-page`), brand blue `#1a8fe3`.

## Platform support

Live now (public oEmbed): YouTube, TikTok, X, Reddit, Vimeo, Dailymotion, SoundCloud, Tumblr, Bluesky, Flickr,
Mixcloud, Streamable. The other platforms are detected and show a "coming in Phase N" message.

Instagram and Facebook need an approved Meta app. Set these env vars to turn them on:

```
META_APP_ID=...
META_CLIENT_TOKEN=...
NEXT_PUBLIC_SITE_URL=https://your-domain.com   # used for sitemap and metadata
```

To make a platform live, add an endpoint in `endpoints` in `src/lib/resolve.ts`, set `live: true` in
`platforms.ts`, and add its image CDN to `DOWNLOAD_HOSTS` if users should be able to download its images.
