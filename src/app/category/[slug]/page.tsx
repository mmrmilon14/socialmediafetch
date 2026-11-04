import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CardGrid, ItemCard } from "@/components/PlatformCard";
import { Shell } from "@/components/Shell";
import { categories, getCategory, platformHref, platformsIn } from "@/lib/platforms";

export const dynamicParams = false;

export function generateStaticParams() {
  return categories.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const c = getCategory((await params).slug);
  return c ? { title: `${c.name} Downloaders`, description: c.description } : {};
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const c = getCategory((await params).slug);
  if (!c) notFound();
  const list = platformsIn(c.slug);

  return (
    <Shell active={c.slug}>
      <nav className="text-[13px] mb-6 text-[#6b7d89]" aria-label="Breadcrumb">
        <Link href="/" className="hover:text-brand">Home</Link>
        <span className="mx-1.5">/</span>
        <span className="text-ink">{c.name}</span>
      </nav>
      <h1 className="font-bold text-[30px] sm:text-[36px] leading-tight mb-2">{c.name}</h1>
      <p className="text-[16px] mb-8">
        {c.description} {list.length} platforms · {list.filter((p) => p.live).length} live now.
      </p>
      {[1, 2, 3].map((phase) => {
        const items = list.filter((p) => p.phase === phase);
        if (!items.length) return null;
        return (
          <section key={phase} className="mb-10">
            <h2 className="font-semibold text-[15px] uppercase tracking-wide mb-3">
              Phase {phase} <span className="normal-case font-normal text-[#6b7d89] tracking-normal">· {phase === 1 ? "launch" : phase === 2 ? "expanding next" : "advanced & specialised"}</span>
            </h2>
            <CardGrid>
              {items.map((p) => (
                <ItemCard key={p.slug} href={platformHref(p)} icon={p.icon} title={p.name} text={p.summary} />
              ))}
            </CardGrid>
          </section>
        );
      })}
    </Shell>
  );
}
