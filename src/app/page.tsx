import { Fetcher } from "@/components/Fetcher";
import { Icon, type IconName } from "@/components/Icon";
import { CardGrid, ItemCard } from "@/components/PlatformCard";
import { SectionHeader, SectionIntro } from "@/components/Section";
import { Shell } from "@/components/Shell";
import {
  categories,
  categoryHref,
  contentTypeLabels,
  getPlatform,
  platformHref,
  platformsIn,
  popularSlugs,
  stats,
} from "@/lib/platforms";

const steps: { icon: IconName; title: string; text: string }[] = [
  { icon: "link", title: "Copy the link", text: "Open the public post, Reel, video, or Pin and copy its share link." },
  { icon: "search", title: "Paste & detect", text: "Paste it above. SocialMediaFetch detects the platform automatically." },
  { icon: "download", title: "Pick what you need", text: "Choose thumbnails, images, captions, or details — whatever the platform allows." },
];

export default function Home() {
  const popular = popularSlugs.map((s) => getPlatform(s)!);

  return (
    <Shell>
      {/* Hero */}
      <section className="text-center max-w-[720px] mx-auto">
        <h1 className="font-bold text-[32px] sm:text-[42px] leading-[1.12] tracking-tight mb-4">
          One link in, every public file out.
        </h1>
        <p className="text-[16px] leading-relaxed mb-7 max-w-[560px] mx-auto">
          Paste a link from {stats.platforms} social platforms. SocialMediaFetch detects where it&apos;s from and fetches
          thumbnails, images, captions, and post details — where the platform allows it.
        </p>
        <Fetcher />
        <dl className="mt-8 grid grid-cols-2 sm:flex sm:flex-wrap justify-center gap-x-10 gap-y-5">
          {[
            [stats.platforms, "Platforms"],
            [stats.categories, "Categories"],
            [stats.live, "Live now"],
            [0, "Signups required"],
          ].map(([n, label]) => (
            <div key={label}>
              <dt className="sr-only">{label}</dt>
              <dd className="font-bold text-[24px] leading-none">{n}</dd>
              <dd className="text-[11px] uppercase tracking-wide mt-1.5">{label}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* Popular */}
      <section className="mt-20">
        <SectionIntro
          eyebrow="Most popular"
          title="Downloaders people reach for first"
          text="The six Phase 1 platforms most people start with"
        />
        <CardGrid>
          {popular.map((p) => (
            <ItemCard key={p.slug} href={platformHref(p)} icon={p.icon} title={`${p.name} Downloader`} text={p.summary} />
          ))}
        </CardGrid>
      </section>

      {/* Categories */}
      {categories.map((c) => {
        const list = platformsIn(c.slug);
        const live = list.filter((p) => p.live).length;
        return (
          <section key={c.slug} className="mt-14">
            <SectionHeader
              title={c.name}
              count={list.length}
              countLabel={list.length === 1 ? "platform" : "platforms"}
              extra={`${live} live`}
              href={categoryHref(c)}
              hrefLabel={`View all ${list.length}`}
            />
            <CardGrid>
              {list.slice(0, 3).map((p) => (
                <ItemCard key={p.slug} href={platformHref(p)} icon={p.icon} title={p.name} text={p.summary} />
              ))}
            </CardGrid>
          </section>
        );
      })}

      {/* How it works */}
      <section className="mt-20">
        <SectionIntro eyebrow="How it works" title="Three steps, no software" />
        <div className="grid sm:grid-cols-3 gap-3">
          {steps.map((s, i) => (
            <div key={s.title} className="bg-white rounded-[10px] p-5 shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
              <div className="flex items-center gap-3 mb-2">
                <span className="w-8 h-8 rounded-full bg-[#e8f3fc] text-brand font-semibold text-sm flex items-center justify-center">{i + 1}</span>
                <h3 className="font-semibold">{s.title}</h3>
              </div>
              <p className="text-[14px] leading-relaxed">{s.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* What you can fetch */}
      <section className="mt-14 bg-white rounded-[10px] p-6 shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
        <h2 className="font-bold text-[20px] mb-3">What you can fetch</h2>
        <div className="flex flex-wrap gap-2 mb-4">
          {Object.values(contentTypeLabels).map((l) => (
            <span key={l} className="text-[13px] bg-page border border-[#e3eaf0] rounded-full px-3 py-1">{l}</span>
          ))}
        </div>
        <p className="text-[14px] leading-relaxed flex gap-2">
          <Icon name="shield" className="w-5 h-5 shrink-0 text-brand" />
          SocialMediaFetch only works with public content and only offers what each platform allows. Private,
          age-restricted, or removed posts show a clear explanation instead of an error. Always respect creators&apos;
          rights and each platform&apos;s terms.
        </p>
      </section>
    </Shell>
  );
}
