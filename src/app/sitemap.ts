import type { MetadataRoute } from "next";
import { categories, categoryHref, platformHref, platforms } from "@/lib/platforms";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  const paths = [
    "/",
    "/platforms",
    "/youtube-thumbnail-downloader",
    "/guides",
    "/about",
    "/privacy",
    "/terms",
    ...platforms.map(platformHref),
    ...categories.map(categoryHref),
  ];
  return paths.map((p) => ({ url: `${base}${p}` }));
}
