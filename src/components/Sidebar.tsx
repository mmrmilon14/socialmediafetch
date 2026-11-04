import Link from "next/link";
import { categories, categoryHref, platformsIn, stats } from "@/lib/platforms";

export function Sidebar({ active }: { active?: string }) {
  return (
    <aside className="hidden lg:block">
      <div className="sticky top-6 pt-2">
        <p className="mb-4 text-[13px] font-semibold tracking-wide uppercase">Categories</p>
        <ul className="space-y-1">
          {categories.map((c) => {
            const on = c.slug === active;
            return (
              <li key={c.slug}>
                <Link
                  href={categoryHref(c)}
                  className={`flex items-center justify-between py-1.5 text-[14px] transition-colors hover:text-brand ${on ? "text-brand font-medium" : ""}`}
                >
                  {c.name}
                  <span className={`text-[12px] ${on ? "text-brand" : "text-[#6b7d89]"}`}>{platformsIn(c.slug).length}</span>
                </Link>
              </li>
            );
          })}
        </ul>
        <div className="mt-8 border-t border-[#edf2f6] pt-6">
          <p className="mb-3 text-[13px] font-semibold tracking-wide uppercase">Quick links</p>
          <ul className="space-y-1 text-[14px]">
            <li><Link href="/youtube-thumbnail-downloader" className="block py-1.5 hover:text-brand">YouTube Thumbnails</Link></li>
            <li><Link href="/platforms" className="block py-1.5 hover:text-brand">All {stats.platforms} platforms</Link></li>
            <li><Link href="/guides" className="block py-1.5 hover:text-brand">How it works</Link></li>
          </ul>
        </div>
      </div>
    </aside>
  );
}
