"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { allTools, kindIcon } from "@/lib/details";
import { detectPlatform, getPlatform, platformHref, platforms } from "@/lib/platforms";
import type { IconName } from "./Icon";

type Entry = { href: string; name: string; sub: string; icon: IconName; text: string };

const entries: Entry[] = [
  ...platforms.map((p) => ({ href: platformHref(p), name: `${p.name} Downloader`, sub: p.mainUse, icon: p.icon, text: `${p.name} ${p.slug} ${p.mainUse}`.toLowerCase() })),
  ...allTools.map((t) => ({ href: `/${t.slug}`, name: t.name, sub: t.summary, icon: kindIcon[t.kind], text: `${t.name} ${getPlatform(t.platform)?.name} ${t.summary}`.toLowerCase() })),
];
import { Icon } from "./Icon";

export function Search({ autoFocus = false, onNavigate }: { autoFocus?: boolean; onNavigate?: () => void }) {
  const router = useRouter();
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const boxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        inputRef.current?.focus();
        setOpen(true);
      }
    };
    const onClick = (e: MouseEvent) => {
      if (!boxRef.current?.contains(e.target as Node)) setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("mousedown", onClick);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("mousedown", onClick);
    };
  }, []);

  const looksLikeUrl = /^(https?:\/\/)?[\w-]+(\.[\w-]+)+\//i.test(q.trim());
  const detected = looksLikeUrl ? detectPlatform(q) : null;

  const results = useMemo(() => {
    const term = q.trim().toLowerCase();
    if (!term || looksLikeUrl) return [];
    const words = term.split(/\s+/);
    return entries.filter((e) => words.every((w) => e.text.includes(w))).slice(0, 8);
  }, [q, looksLikeUrl]);

  const go = (href: string) => {
    setOpen(false);
    setQ("");
    onNavigate?.();
    router.push(href);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") return setOpen(false);
    if (looksLikeUrl && e.key === "Enter") {
      e.preventDefault();
      const target = detected ? platformHref(detected) : "/";
      return go(`${target}?url=${encodeURIComponent(q.trim())}`);
    }
    if (!results.length) return;
    if (e.key === "ArrowDown") { e.preventDefault(); setActive((a) => (a + 1) % results.length); }
    if (e.key === "ArrowUp") { e.preventDefault(); setActive((a) => (a - 1 + results.length) % results.length); }
    if (e.key === "Enter") { e.preventDefault(); go(results[active].href); }
  };

  return (
    <div ref={boxRef} className="relative">
      <label className="flex items-center gap-2 h-10 px-3 rounded-[8px] border border-[#e3eaf0] bg-[#fbfcfd] focus-within:border-brand focus-within:bg-white transition-colors">
        <Icon name="search" className="w-4 h-4 text-[#8a9aa6]" />
        <span className="sr-only">Search platforms</span>
        <input
          ref={inputRef}
          autoFocus={autoFocus}
          value={q}
          onChange={(e) => { setQ(e.target.value); setOpen(true); setActive(0); }}
          onFocus={() => setOpen(true)}
          onKeyDown={onKeyDown}
          placeholder="Search platforms or paste a link…"
          className="flex-1 min-w-0 bg-transparent outline-none text-sm placeholder:text-[#8a9aa6]"
        />
        <kbd className="hidden md:inline text-[11px] text-[#8a9aa6] border border-[#e3eaf0] rounded px-1.5 py-0.5 font-sans">⌘K</kbd>
      </label>

      {open && (results.length > 0 || looksLikeUrl || q.trim()) && (
        <div className="absolute left-0 right-0 top-12 bg-white rounded-[10px] shadow-[0_8px_30px_rgba(31,51,64,0.12)] border border-[#edf2f6] py-2 z-50">
          {looksLikeUrl ? (
            <button
              type="button"
              onClick={() => go(`${detected ? platformHref(detected) : "/"}?url=${encodeURIComponent(q.trim())}`)}
              className="w-full text-left px-4 py-2.5 text-sm hover:bg-page flex items-center gap-2"
            >
              <Icon name="link" className="w-4 h-4 text-brand" />
              {detected ? <>Fetch this <strong className="font-semibold">{detected.name}</strong> link</> : "Fetch this link"}
            </button>
          ) : results.length ? (
            results.map((p, i) => (
              <Link
                key={p.href}
                href={p.href}
                onClick={() => { setOpen(false); setQ(""); onNavigate?.(); }}
                onMouseEnter={() => setActive(i)}
                className={`flex items-center gap-3 px-4 py-2 text-sm ${i === active ? "bg-page" : ""}`}
              >
                <span className="w-7 h-7 rounded-[5px] bg-brand flex items-center justify-center shrink-0">
                  <Icon name={p.icon} className="w-4 h-4 text-white" />
                </span>
                <span className="flex-1">
                  <span className="font-medium">{p.name}</span>
                  <span className="block text-xs text-[#6b7d89] truncate">{p.sub}</span>
                </span>
              </Link>
            ))
          ) : (
            <p className="px-4 py-2.5 text-sm text-[#6b7d89]">No platforms match “{q}”.</p>
          )}
        </div>
      )}
    </div>
  );
}
