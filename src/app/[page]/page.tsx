import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Fetcher } from "@/components/Fetcher";
import { Icon } from "@/components/Icon";
import { PhaseBadge } from "@/components/PhaseBadge";
import { CardGrid, ItemCard } from "@/components/PlatformCard";
import { SectionHeader } from "@/components/Section";
import { Shell } from "@/components/Shell";
import { ThumbnailGrabber } from "@/components/ThumbnailGrabber";
import { allTools, getDetail, getTool, kindIcon, type Tool } from "@/lib/details";
import {
  categoryHref,
  contentTypeLabels,
  getCategory,
  getPlatform,
  platformHref,
  platforms,
  platformsIn,
  slugFromHref,
  type ContentType,
  type Platform,
} from "@/lib/platforms";

export const dynamicParams = false;


export function generateStaticParams() {
  return [
    ...platforms.map((p) => ({ page: platformHref(p).slice(1) })),
    ...allTools.map((t) => ({ page: t.slug })),
  ];
}

function load(param: string): { platform: Platform; tool?: Tool } | null {
  const tool = getTool(param);
  if (tool) return { platform: getPlatform(tool.platform)!, tool };
  const slug = slugFromHref(param);
  const platform = slug ? getPlatform(slug) : undefined;
  return platform ? { platform } : null;
}

type Status = "works" | "details" | "planned" | "setup";

/** Meta platforms only work once the site owner adds Meta app keys. */
const needsMeta = (p: Platform) =>
  (p.slug === "instagram" || p.slug === "facebook") && !(process.env.META_APP_ID && process.env.META_CLIENT_TOKEN);

function statusOf(p: Platform, kind: ContentType): Status {
  if (!p.live) return "planned";
  if (needsMeta(p)) return "setup";
  return getDetail(p.slug).available.includes(kind) ? "works" : "details";
}

const statusText: Record<Status, string> = {
  works: "Works now",
  details: "Details only for now",
  planned: "Planned",
  setup: "Needs Meta setup",
};

const statusStyle: Record<Status, string> = {
  works: "text-[#17603a] bg-[#ecfaf2] border-[#bfe9d1]",
  details: "text-[#8a5a0b] bg-[#fff6e8] border-[#f6dfb5]",
  planned: "text-[#155f97] bg-[#eaf4fd] border-[#cfe5f8]",
  setup: "text-[#155f97] bg-[#eaf4fd] border-[#cfe5f8]",
};

function StatusPill({ status }: { status: Status }) {
  return (
    <span className={`inline-block text-[12px] font-medium border rounded-full px-2.5 py-0.5 ${statusStyle[status]}`}>
      {statusText[status]}
    </span>
  );
}

export async function generateMetadata({ params }: { params: Promise<{ page: string }> }): Promise<Metadata> {
  const hit = load((await params).page);
  if (!hit) return {};
  const { platform: p, tool } = hit;
  if (tool) {
    return {
      title: tool.name,
      description: `${tool.summary} Free ${p.name} tool — paste a public link, no app or sign-up.`,
      alternates: { canonical: `/${tool.slug}` },
    };
  }
  return {
    title: `${p.name} Downloader — ${p.supports.map((s) => contentTypeLabels[s]).slice(0, 3).join(", ")}`,
    description: `Free ${p.name} downloader. ${p.mainUse} Paste a public ${p.name} link — no app, no sign-up.`,
    alternates: { canonical: platformHref(p) },
  };
}

const card = "bg-white rounded-[10px] p-6 shadow-[0_2px_8px_rgba(0,0,0,0.04)]";

export default async function DownloaderPage({ params }: { params: Promise<{ page: string }> }) {
  const hit = load((await params).page);
  if (!hit) notFound();
  const { platform: p, tool } = hit;
  const d = getDetail(p.slug);
  const category = getCategory(p.category)!;
  const related = platformsIn(p.category).filter((x) => x.slug !== p.slug).slice(0, 3);
  const siblings = d.tools.filter((t) => t.slug !== tool?.slug);
  const isYtThumbs = tool?.slug === "youtube-thumbnail-downloader";

  const title = tool ? tool.name : `${p.name} Downloader`;
  const status = tool ? statusOf(p, tool.kind) : null;

  const faqs = [
    ...(tool ? [toolFaq(p, tool, status!)] : []),
    ...d.faqs,
    {
      q: `Is the ${p.name} downloader free?`,
      a: `Yes. There's nothing to install and no account to create. Paste a public ${p.name} link and fetch what's available.`,
    },
    {
      q: "Do you store the links or files?",
      a: "No. Links are processed when you press Fetch and aren't saved. Files are streamed straight from the platform to your device.",
    },
  ];

  return (
    <Shell active={p.category}>
      <nav className="text-[13px] mb-6 text-[#6b7d89]" aria-label="Breadcrumb">
        <Link href="/" className="hover:text-brand">Home</Link>
        <span className="mx-1.5">/</span>
        <Link href={categoryHref(category)} className="hover:text-brand">{category.name}</Link>
        <span className="mx-1.5">/</span>
        {tool ? (
          <>
            <Link href={platformHref(p)} className="hover:text-brand">{p.name}</Link>
            <span className="mx-1.5">/</span>
            <span className="text-ink">{tool.name}</span>
          </>
        ) : (
          <span className="text-ink">{p.name}</span>
        )}
      </nav>

      {/* Hero */}
      <section className="text-center max-w-[720px] mx-auto">
        <div className="w-14 h-14 mx-auto mb-4 flex items-center justify-center bg-brand rounded-[8px]">
          <Icon name={tool ? kindIcon[tool.kind] : p.icon} className="w-7 h-7 text-white" />
        </div>
        <div className="mb-3 flex justify-center gap-2">
          {status ? <StatusPill status={status} /> : <PhaseBadge platform={p} />}
        </div>
        <h1 className="font-bold text-[30px] sm:text-[38px] leading-tight tracking-tight mb-3">{title}</h1>
        <p className="text-[16px] leading-relaxed mb-7 max-w-[600px] mx-auto">{tool ? `${tool.summary} ${toolIntro(p, tool, status!)}` : d.intro}</p>
        {isYtThumbs ? <ThumbnailGrabber /> : <Fetcher platformSlug={p.slug} placeholder={`Paste a public ${p.name} link…`} />}
        {p.slug === "youtube" && !isYtThumbs && (
          <p className="mt-4 text-[14px]">
            Only need the image?{" "}
            <Link href="/youtube-thumbnail-downloader" className="text-brand font-medium hover:underline">
              Try the instant YouTube Thumbnail Downloader →
            </Link>
          </p>
        )}
      </section>

      {/* Tools for this platform */}
      {siblings.length > 0 && (
        <section className="mt-14">
          <SectionHeader
            title={tool ? `More ${p.name} tools` : `${p.name} tools`}
            count={d.tools.length}
            countLabel={d.tools.length === 1 ? "tool" : "tools"}
          />
          <CardGrid>
            {siblings.map((t) => (
              <ItemCard key={t.slug} href={`/${t.slug}`} icon={kindIcon[t.kind]} title={t.name} text={t.summary} />
            ))}
          </CardGrid>
        </section>
      )}

      {/* What works today */}
      <section className="mt-14 grid md:grid-cols-2 gap-3">
        <div className={card}>
          <h2 className="font-bold text-[18px] mb-4">What you can get from {p.name}</h2>
          <ul className="divide-y divide-[#edf2f6]">
            {p.supports.map((s) => (
              <li key={s} className="flex items-center justify-between gap-3 py-2.5 text-[14px]">
                <span className="flex items-center gap-2.5">
                  <Icon name={kindIcon[s]} className="w-4 h-4 text-brand" />
                  {contentTypeLabels[s]}
                </span>
                <StatusPill status={statusOf(p, s)} />
              </li>
            ))}
          </ul>
        </div>
        <div className={card}>
          <h2 className="font-bold text-[18px] mb-3">Accepted link formats</h2>
          <ul className="space-y-2 mb-4">
            {d.examples.map((e) => (
              <li key={e} className="text-[13px] font-mono bg-page border border-[#e3eaf0] rounded-[6px] px-3 py-2 break-all">{e}</li>
            ))}
          </ul>
          {p.note && (
            <p className="text-[13px] text-[#6b7d89] flex gap-2">
              <Icon name="shield" className="w-4 h-4 shrink-0 mt-0.5" /> {p.note}
            </p>
          )}
        </div>
      </section>

      {/* How to */}
      <section className="mt-14">
        <h2 className="font-bold text-[22px] mb-4">How to use the {title}</h2>
        <ol className="grid sm:grid-cols-3 gap-3">
          {d.steps.map((s, i) => (
            <li key={s} className="bg-white rounded-[10px] p-5 shadow-[0_2px_8px_rgba(0,0,0,0.04)] text-[14px] leading-relaxed">
              <span className="w-7 h-7 rounded-full bg-[#e8f3fc] text-brand font-semibold text-sm flex items-center justify-center mb-2">{i + 1}</span>
              {s}
            </li>
          ))}
        </ol>
      </section>

      {/* FAQ */}
      <section className="mt-14">
        <h2 className="font-bold text-[22px] mb-4">Frequently asked questions</h2>
        <div className="space-y-2">
          {faqs.map((f) => (
            <details key={f.q} className="group bg-white rounded-[10px] shadow-[0_2px_8px_rgba(0,0,0,0.04)] px-5 py-4">
              <summary className="font-semibold cursor-pointer list-none flex justify-between gap-4">
                {f.q}
                <span className="text-brand transition-transform group-open:rotate-45 text-xl leading-none">+</span>
              </summary>
              <p className="text-[14px] leading-relaxed mt-2">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* Related platforms */}
      {related.length > 0 && (
        <section className="mt-14">
          <SectionHeader title={`More in ${category.name}`} href={categoryHref(category)} hrefLabel="View all" />
          <CardGrid>
            {related.map((r) => (
              <ItemCard key={r.slug} href={platformHref(r)} icon={r.icon} title={r.name} text={r.summary} />
            ))}
          </CardGrid>
        </section>
      )}
    </Shell>
  );
}

const kindNoun: Record<ContentType, string> = {
  video: "video files",
  audio: "audio files",
  image: "full-size images",
  gif: "GIF files",
  thumbnail: "thumbnails",
  caption: "captions and post text",
  metadata: "post details",
};

function toolIntro(p: Platform, t: Tool, s: Status) {
  if (s === "setup") return `${p.name} needs an approved Meta developer app, which this site hasn't connected yet. Links are already recognised.`;
  if (s === "works") return `Paste a public ${p.name} link to get ${kindNoun[t.kind]} right away.`;
  if (s === "details")
    return `${p.name} doesn't share ${kindNoun[t.kind]} through its public data yet, so you'll get the post's thumbnail and details instead.`;
  return `${p.name} is planned for Phase ${p.phase}. Links are already recognised, and fetching will switch on here when it's ready.`;
}

function toolFaq(p: Platform, t: Tool, s: Status) {
  return {
    q: `Can I get ${kindNoun[t.kind]} from ${p.name} today?`,
    a:
      s === "setup"
        ? `Not yet. ${p.name} data comes from Meta's oEmbed service, which needs an approved Meta app. It switches on once the site is connected.`
        : s === "works"
        ? `Yes, for public ${p.name} posts. Private, removed, or restricted posts show an explanation instead.`
        : s === "details"
          ? `Not yet. ${p.name}'s public data doesn't include ${kindNoun[t.kind]}, so the tool returns what is available: ${getDetail(p.slug).available.map((k) => contentTypeLabels[k].toLowerCase()).join(", ")}.`
          : `Not yet. ${p.name} support is planned for Phase ${p.phase}.`,
  };
}
