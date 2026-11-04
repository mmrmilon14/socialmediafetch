import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Fetcher } from "@/components/Fetcher";
import { Icon } from "@/components/Icon";
import { PhaseBadge } from "@/components/PhaseBadge";
import { CardGrid, ItemCard } from "@/components/PlatformCard";
import { SectionHeader } from "@/components/Section";
import { Shell } from "@/components/Shell";
import {
  categoryHref,
  contentTypeLabels,
  getCategory,
  getPlatform,
  platformHref,
  platforms,
  platformsIn,
  slugFromHref,
} from "@/lib/platforms";

export const dynamicParams = false;

export function generateStaticParams() {
  return platforms.map((p) => ({ page: platformHref(p).slice(1) }));
}

function load(param: string) {
  const slug = slugFromHref(param);
  return slug ? getPlatform(slug) : undefined;
}

export async function generateMetadata({ params }: { params: Promise<{ page: string }> }): Promise<Metadata> {
  const p = load((await params).page);
  if (!p) return {};
  return {
    title: `${p.name} Downloader — ${p.supports.map((s) => contentTypeLabels[s]).slice(0, 3).join(", ")}`,
    description: `Free ${p.name} downloader. ${p.mainUse} Paste a public ${p.name} link — no app, no sign-up.`,
    alternates: { canonical: platformHref(p) },
  };
}

export default async function PlatformPage({ params }: { params: Promise<{ page: string }> }) {
  const p = load((await params).page);
  if (!p) notFound();
  const category = getCategory(p.category)!;
  const related = platformsIn(p.category).filter((x) => x.slug !== p.slug).slice(0, 3);

  const faqs = [
    {
      q: `Is the ${p.name} downloader free?`,
      a: `Yes. There's nothing to install and no account to create. Paste a public ${p.name} link and fetch what's available.`,
    },
    {
      q: `Can I download from private ${p.name} accounts?`,
      a: `No. SocialMediaFetch only works with public content. If a post is private, age-restricted, or removed, you'll see a clear explanation instead of a result.`,
    },
    {
      q: `What can I get from a ${p.name} link?`,
      a: `${p.mainUse} Exactly what's offered depends on what ${p.name} makes available for each post.`,
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
        <span className="text-ink">{p.name}</span>
      </nav>

      <section className="text-center max-w-[720px] mx-auto">
        <div className="w-14 h-14 mx-auto mb-4 flex items-center justify-center bg-brand rounded-[8px]">
          <Icon name={p.icon} className="w-7 h-7 text-white" />
        </div>
        <div className="mb-3"><PhaseBadge platform={p} /></div>
        <h1 className="font-bold text-[30px] sm:text-[38px] leading-tight tracking-tight mb-3">{p.name} Downloader</h1>
        <p className="text-[16px] leading-relaxed mb-7 max-w-[560px] mx-auto">{p.mainUse}</p>
        <Fetcher platformSlug={p.slug} placeholder={`Paste a public ${p.name} link…`} />
        {p.slug === "youtube" && (
          <p className="mt-4 text-[14px]">
            Only need the image?{" "}
            <Link href="/youtube-thumbnail-downloader" className="text-brand font-medium hover:underline">
              Try the instant YouTube Thumbnail Downloader →
            </Link>
          </p>
        )}
      </section>

      <section className="mt-14 grid md:grid-cols-2 gap-3">
        <div className="bg-white rounded-[10px] p-6 shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
          <h2 className="font-bold text-[18px] mb-3">Supported content</h2>
          <div className="flex flex-wrap gap-2">
            {p.supports.map((s) => (
              <span key={s} className="text-[13px] bg-page border border-[#e3eaf0] rounded-full px-3 py-1">{contentTypeLabels[s]}</span>
            ))}
          </div>
          <p className="text-[13px] text-[#6b7d89] mt-4">
            Accepted links: {p.domains.slice(0, 4).join(", ")}
            {p.domains.length > 4 ? " and more" : ""}
          </p>
        </div>
        <div className="bg-white rounded-[10px] p-6 shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
          <h2 className="font-bold text-[18px] mb-3">Availability</h2>
          <p className="text-[14px] leading-relaxed">
            {p.live
              ? `${p.name} links work today. Results come from ${p.name}'s official public embed data.`
              : `${p.name} is on the roadmap for Phase ${p.phase}. You can already paste ${p.name} links — we'll detect them and tell you when fetching is available.`}
          </p>
          {p.note && (
            <p className="text-[13px] text-[#6b7d89] mt-3 flex gap-2">
              <Icon name="shield" className="w-4 h-4 shrink-0 mt-0.5" /> {p.note}
            </p>
          )}
        </div>
      </section>

      <section className="mt-14">
        <h2 className="font-bold text-[22px] mb-4">How to use the {p.name} downloader</h2>
        <ol className="grid sm:grid-cols-3 gap-3">
          {[
            `Open ${p.name} and find the public post you want.`,
            "Tap Share → Copy link, then paste it in the box above.",
            "Press Fetch and choose the files or details you need.",
          ].map((s, i) => (
            <li key={s} className="bg-white rounded-[10px] p-5 shadow-[0_2px_8px_rgba(0,0,0,0.04)] text-[14px] leading-relaxed">
              <span className="w-7 h-7 rounded-full bg-[#e8f3fc] text-brand font-semibold text-sm flex items-center justify-center mb-2">{i + 1}</span>
              {s}
            </li>
          ))}
        </ol>
      </section>

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
