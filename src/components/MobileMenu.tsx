"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { categories, categoryHref, platformsIn } from "@/lib/platforms";
import { Icon } from "./Icon";
import { Search } from "./Search";

export function MobileMenu() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="lg:hidden w-10 h-10 -mr-2 flex items-center justify-center rounded-[8px] hover:bg-page"
        aria-label="Open menu"
      >
        <Icon name="menu" className="w-5 h-5" />
      </button>
      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-ink/30" onClick={() => setOpen(false)} />
          <div className="absolute right-0 top-0 bottom-0 w-[86%] max-w-[340px] bg-white p-5 overflow-y-auto">
            <div className="flex items-center justify-between mb-5">
              <span className="font-semibold">Menu</span>
              <button type="button" onClick={() => setOpen(false)} className="w-9 h-9 flex items-center justify-center rounded-[8px] hover:bg-page" aria-label="Close menu">
                <Icon name="close" className="w-5 h-5" />
              </button>
            </div>
            <Search onNavigate={() => setOpen(false)} />
            <div className="mt-6 flex gap-4 text-[15px]">
              <Link href="/platforms" onClick={() => setOpen(false)} className="hover:text-brand">All platforms</Link>
              <Link href="/guides" onClick={() => setOpen(false)} className="hover:text-brand">Guides</Link>
            </div>
            <p className="mt-6 mb-2 text-[13px] font-semibold tracking-wide uppercase">Categories</p>
            <ul>
              {categories.map((c) => (
                <li key={c.slug}>
                  <Link href={categoryHref(c)} onClick={() => setOpen(false)} className="flex justify-between py-2 text-[15px] hover:text-brand">
                    {c.name}
                    <span className="text-[13px] text-[#6b7d89]">{platformsIn(c.slug).length}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </>
  );
}
