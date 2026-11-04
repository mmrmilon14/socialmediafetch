"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { detectPlatform, getPlatform, platformHref } from "@/lib/platforms";
import type { FetchResult, FetchStatus, MediaItem } from "@/lib/types";
import { Icon, type IconName } from "./Icon";

const tone: Record<FetchStatus, { box: string; icon: IconName; title: string }> = {
  ok: { box: "bg-[#ecfaf2] border-[#bfe9d1] text-[#17603a]", icon: "check", title: "Ready" },
  planned: { box: "bg-[#eaf4fd] border-[#cfe5f8] text-[#155f97]", icon: "clock", title: "Coming soon" },
  needs_config: { box: "bg-[#eaf4fd] border-[#cfe5f8] text-[#155f97]", icon: "shield", title: "Not connected yet" },
  restricted: { box: "bg-[#fff6e8] border-[#f6dfb5] text-[#8a5a0b]", icon: "lock", title: "Private or restricted" },
  not_found: { box: "bg-[#fff6e8] border-[#f6dfb5] text-[#8a5a0b]", icon: "alert", title: "Post not found" },
  invalid: { box: "bg-[#fdeeee] border-[#f5cccc] text-[#9b2c2c]", icon: "alert", title: "Check the link" },
  unsupported: { box: "bg-[#fdeeee] border-[#f5cccc] text-[#9b2c2c]", icon: "alert", title: "Platform not supported" },
  error: { box: "bg-[#fdeeee] border-[#f5cccc] text-[#9b2c2c]", icon: "alert", title: "Something went wrong" },
};

function fileName(result: FetchResult, item: MediaItem) {
  const base = (result.title || result.platform?.name || "media").slice(0, 50);
  return `${base}-${item.label}`.toLowerCase();
}

export function Fetcher({ platformSlug, placeholder }: { platformSlug?: string; placeholder?: string }) {
  const locked = platformSlug ? getPlatform(platformSlug) : undefined;
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<FetchResult | null>(null);

  const detected = url.trim() ? detectPlatform(url) : null;

  const run = useCallback(async (value: string) => {
    if (!value.trim()) return;
    setLoading(true);
    setResult(null);
    try {
      const res = await fetch("/api/fetch", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: value.trim() }),
      });
      setResult((await res.json()) as FetchResult);
    } catch {
      setResult({ status: "error", message: "We couldn't reach SocialMediaFetch. Check your connection and try again." });
    } finally {
      setLoading(false);
    }
  }, []);

  // Support deep links like /youtube-downloader?url=…
  useEffect(() => {
    const initial = new URLSearchParams(window.location.search).get("url");
    if (initial) {
      setUrl(initial);
      run(initial);
    }
  }, [run]);

  const paste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (text) {
        setUrl(text);
        run(text);
      }
    } catch {
      /* clipboard blocked: the user can paste manually */
    }
  };

  return (
    <div className="w-full">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          run(url);
        }}
        className="bg-white rounded-[12px] p-2 shadow-[0_4px_20px_rgba(31,51,64,0.08)] border border-[#e6eef4] flex flex-col sm:flex-row gap-2"
      >
        <label className="flex-1 flex items-center gap-2 px-3 min-h-12">
          <Icon name="link" className="w-5 h-5 text-[#8a9aa6] shrink-0" />
          <span className="sr-only">Social media link</span>
          <input
            type="text"
            inputMode="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder={placeholder ?? "Paste a link from Instagram, TikTok, YouTube, X…"}
            className="flex-1 min-w-0 bg-transparent outline-none text-[15px] placeholder:text-[#8a9aa6]"
            autoComplete="off"
            spellCheck={false}
          />
          {url ? (
            <button type="button" onClick={() => { setUrl(""); setResult(null); }} className="text-[#8a9aa6] hover:text-ink" aria-label="Clear">
              <Icon name="close" className="w-4 h-4" />
            </button>
          ) : (
            <button type="button" onClick={paste} className="hidden sm:flex items-center gap-1.5 text-[13px] font-medium text-brand hover:text-brand-dark">
              <Icon name="clipboard" className="w-4 h-4" /> Paste
            </button>
          )}
        </label>
        <button
          type="submit"
          disabled={loading || !url.trim()}
          className="bg-brand hover:bg-brand-dark disabled:opacity-60 text-white font-semibold rounded-[8px] px-7 min-h-12 flex items-center justify-center gap-2 transition-colors"
        >
          {loading ? (
            <span className="w-4 h-4 rounded-full border-2 border-white/40 border-t-white animate-spin" />
          ) : (
            <Icon name="download" className="w-4 h-4" strokeWidth={2} />
          )}
          {loading ? "Fetching…" : "Fetch"}
        </button>
      </form>

      <div className="min-h-7 mt-3 text-[13px] flex flex-wrap items-center justify-center gap-2">
        {detected ? (
          <>
            <span className="inline-flex items-center gap-1.5 bg-white border border-[#e3eaf0] rounded-full px-3 py-1">
              <Icon name={detected.icon} className="w-3.5 h-3.5 text-brand" />
              Detected <strong className="font-semibold">{detected.name}</strong>
              <span className={detected.live ? "text-[#17603a]" : "text-[#6b7d89]"}>
                · {detected.live ? "Supported" : `Phase ${detected.phase}`}
              </span>
            </span>
            {locked && locked.slug !== detected.slug && (
              <span className="text-[#6b7d89]">
                This is a {detected.name} link —{" "}
                <Link href={`${platformHref(detected)}?url=${encodeURIComponent(url)}`} className="text-brand underline">
                  open the {detected.name} downloader
                </Link>
              </span>
            )}
          </>
        ) : url.trim() ? (
          <span className="text-[#6b7d89]">Platform will be detected from the link.</span>
        ) : (
          <span className="text-[#6b7d89]">Public posts only · Nothing to install · No sign-up</span>
        )}
      </div>

      {result && <Result result={result} />}
    </div>
  );
}

function Result({ result }: { result: FetchResult }) {
  const t = tone[result.status];
  const [broken, setBroken] = useState<Set<string>>(new Set());
  const media = (result.media ?? []).filter((m) => !broken.has(m.url));
  const preview = media[0];
  const hide = (u: string) => setBroken((s) => new Set(s).add(u));

  return (
    <div className="mt-4 text-left" aria-live="polite">
      <div className={`flex gap-3 items-start border rounded-[10px] px-4 py-3 ${t.box}`}>
        <Icon name={t.icon} className="w-5 h-5 shrink-0 mt-0.5" strokeWidth={2} />
        <div className="text-[14px] leading-relaxed">
          <p className="font-semibold">{t.title}</p>
          <p>{result.message}</p>
          {result.platform && result.status !== "ok" && (
            <Link href={platformHref(result.platform)} className="underline mt-1 inline-block">
              What {result.platform.name} supports
            </Link>
          )}
        </div>
      </div>

      {result.status === "ok" && (
        <div className="mt-3 bg-white rounded-[10px] shadow-[0_2px_8px_rgba(0,0,0,0.04)] overflow-hidden">
          <div className="grid md:grid-cols-[minmax(0,280px)_1fr]">
            <div className="bg-[#eef4f8] aspect-video md:aspect-auto md:min-h-[200px] flex items-center justify-center">
              {preview ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={preview.url} alt={result.title ?? "Preview"} className="w-full h-full object-cover" onError={() => hide(preview.url)} referrerPolicy="no-referrer" />
              ) : (
                <Icon name="image" className="w-10 h-10 text-[#a9bac6]" />
              )}
            </div>
            <div className="p-5 min-w-0">
              {result.title && <h3 className="font-semibold text-lg leading-snug mb-1 break-words">{result.title}</h3>}
              {result.author && (
                <p className="text-[14px] mb-3">
                  by{" "}
                  {result.authorUrl ? (
                    <a href={result.authorUrl} target="_blank" rel="noopener noreferrer" className="text-brand hover:underline">{result.author}</a>
                  ) : (
                    result.author
                  )}
                </p>
              )}
              {result.metadata && (
                <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 text-[13px]">
                  {result.metadata.map((m) => (
                    <div key={m.label} className="contents">
                      <dt className="text-[#6b7d89]">{m.label}</dt>
                      <dd className="break-all">{m.value}</dd>
                    </div>
                  ))}
                </dl>
              )}
              {result.sourceUrl && (
                <a href={result.sourceUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-[13px] text-brand mt-3 hover:underline">
                  View original post ↗
                </a>
              )}
            </div>
          </div>

          {result.caption && <Caption text={result.caption} />}

          {media.length > 0 && (
            <div className="border-t border-[#edf2f6] p-5">
              <p className="font-semibold mb-3">Available files</p>
              <ul className="space-y-2">
                {media.map((m) => (
                  <li key={m.url} className="flex items-center gap-3 rounded-[8px] border border-[#edf2f6] p-2 pr-3">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={m.url} alt="" className="w-16 h-10 object-cover rounded-[4px] bg-[#eef4f8]" onError={() => hide(m.url)} referrerPolicy="no-referrer" loading="lazy" />
                    <div className="flex-1 min-w-0 text-[14px]">
                      <p className="font-medium">{m.label}</p>
                      <p className="text-[12px] text-[#6b7d89] capitalize">
                        {m.kind}
                        {m.width && m.height ? ` · ${m.width}×${m.height}` : ""}
                      </p>
                    </div>
                    {m.downloadable ? (
                      <a
                        href={`/api/download?url=${encodeURIComponent(m.url)}&name=${encodeURIComponent(fileName(result, m))}`}
                        className="bg-brand hover:bg-brand-dark text-white text-[13px] font-semibold rounded-[5px] px-3.5 py-2 inline-flex items-center gap-1.5 transition-colors"
                      >
                        <Icon name="download" className="w-4 h-4" strokeWidth={2} /> Download
                      </a>
                    ) : (
                      <a href={m.url} target="_blank" rel="noopener noreferrer" className="border border-brand text-brand text-[13px] font-semibold rounded-[5px] px-3.5 py-2">
                        Open
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {result.note && (
        <p className="mt-3 text-[13px] text-[#6b7d89] flex gap-2">
          <Icon name="shield" className="w-4 h-4 shrink-0 mt-0.5" /> {result.note}
        </p>
      )}
    </div>
  );
}

function Caption({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <div className="border-t border-[#edf2f6] p-5">
      <div className="flex items-center justify-between mb-2">
        <p className="font-semibold">Caption</p>
        <button
          type="button"
          onClick={async () => {
            await navigator.clipboard.writeText(text).catch(() => {});
            setCopied(true);
            setTimeout(() => setCopied(false), 1500);
          }}
          className="text-[13px] text-brand inline-flex items-center gap-1"
        >
          <Icon name={copied ? "check" : "copy"} className="w-4 h-4" /> {copied ? "Copied" : "Copy"}
        </button>
      </div>
      <p className="text-[14px] whitespace-pre-line leading-relaxed">{text}</p>
    </div>
  );
}
