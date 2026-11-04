import type { Metadata } from "next";
import Link from "next/link";
import { PhaseBadge } from "@/components/PhaseBadge";
import { Shell } from "@/components/Shell";
import { getDetail } from "@/lib/details";
import { categories, contentTypeLabels, platformHref, platformsIn, stats } from "@/lib/platforms";

export const metadata: Metadata = {
  title: "All supported platforms",
  description: `The complete list of ${stats.platforms} social media platforms SocialMediaFetch supports or plans to support, by phase.`,
};

export default function PlatformsPage() {
  return (
    <Shell>
      <h1 className="font-bold text-[30px] sm:text-[36px] leading-tight mb-2">All platforms</h1>
      <p className="text-[16px] mb-3 max-w-[640px]">
        {stats.platforms} platforms across {stats.categories} categories. {stats.live} are live today; the rest are
        rolling out in phases.
      </p>
      <p className="text-[13px] text-[#6b7d89] mb-8 max-w-[640px]">
        These are candidate integrations, not a promise that every platform allows unrestricted downloading. What&apos;s
        offered depends on each platform&apos;s technical limits and terms.
      </p>
      {categories.map((c) => (
        <section key={c.slug} className="mb-10">
          <h2 className="font-bold text-[20px] mb-3">{c.name}</h2>
          <div className="bg-white rounded-[10px] shadow-[0_2px_8px_rgba(0,0,0,0.04)] divide-y divide-[#edf2f6]">
            {platformsIn(c.slug).map((p) => (
              <div key={p.slug} className="px-5 py-3.5">
                <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4">
                  <Link href={platformHref(p)} className="font-semibold sm:w-36 shrink-0 hover:text-brand">{p.name}</Link>
                  <span className="text-[14px] flex-1">{p.mainUse}</span>
                  <span className="hidden md:block text-[12px] text-[#6b7d89] w-40 shrink-0">
                    {p.supports.map((s) => contentTypeLabels[s]).join(", ")}
                  </span>
                  <span className="shrink-0"><PhaseBadge platform={p} /></span>
                </div>
                <div className="mt-1.5 sm:pl-40 flex flex-wrap gap-x-3 gap-y-1 text-[13px]">
                  {getDetail(p.slug).tools.map((t) => (
                    <Link key={t.slug} href={`/${t.slug}`} className="text-brand hover:underline">{t.name}</Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      ))}
    </Shell>
  );
}
