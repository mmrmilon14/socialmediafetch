"use client";

import { useState } from "react";
import { parseUrl } from "@/lib/platforms";
import { youtubeId, youtubeThumbnails } from "@/lib/youtube";
import { Icon } from "./Icon";

/** Works fully in the browser: YouTube thumbnails live at predictable public URLs. */
export function ThumbnailGrabber() {
  const [input, setInput] = useState("");
  const [id, setId] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [broken, setBroken] = useState<Set<string>>(new Set());

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const raw = input.trim();
    const url = parseUrl(raw);
    const found = /^[\w-]{11}$/.test(raw) ? raw : url ? youtubeId(url) : null;
    setBroken(new Set());
    if (!found) {
      setId(null);
      setError("Paste a YouTube video, Shorts, or youtu.be link — or an 11-character video ID.");
      return;
    }
    setError("");
    setId(found);
  };

  const thumbs = id ? youtubeThumbnails(id).filter((t) => !broken.has(t.url)) : [];

  return (
    <div>
      <form onSubmit={submit} className="bg-white rounded-[12px] p-2 shadow-[0_4px_20px_rgba(31,51,64,0.08)] border border-[#e6eef4] flex flex-col sm:flex-row gap-2">
        <label className="flex-1 flex items-center gap-2 px-3 min-h-12">
          <Icon name="play" className="w-5 h-5 text-[#8a9aa6]" />
          <span className="sr-only">YouTube link</span>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="https://www.youtube.com/watch?v=…"
            className="flex-1 min-w-0 bg-transparent outline-none text-[15px] placeholder:text-[#8a9aa6]"
            spellCheck={false}
          />
        </label>
        <button type="submit" className="bg-brand hover:bg-brand-dark text-white font-semibold rounded-[8px] px-7 min-h-12 transition-colors">
          Get thumbnails
        </button>
      </form>
      {error && <p className="mt-3 text-[14px] text-[#9b2c2c]">{error}</p>}
      {thumbs.length > 0 && (
        <div className="mt-6 grid sm:grid-cols-2 gap-3 text-left">
          {thumbs.map((t, i) => (
            <div key={t.url} className={`bg-white rounded-[10px] overflow-hidden shadow-[0_2px_8px_rgba(0,0,0,0.04)] ${i === 0 ? "sm:col-span-2" : ""}`}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={t.url}
                alt={`${t.label} thumbnail`}
                className="w-full aspect-video object-cover bg-[#eef4f8]"
                referrerPolicy="no-referrer"
                onLoad={(e) => {
                  // YouTube serves a 120×90 grey placeholder when a size doesn't exist.
                  if ((t.width ?? 0) > 120 && e.currentTarget.naturalWidth === 120) setBroken((s) => new Set(s).add(t.url));
                }}
                onError={() => setBroken((s) => new Set(s).add(t.url))}
              />
              <div className="flex items-center justify-between gap-3 p-4">
                <div>
                  <p className="font-semibold">{t.label}</p>
                  <p className="text-[13px] text-[#6b7d89]">{t.width}×{t.height} · JPG</p>
                </div>
                <a
                  href={`/api/download?url=${encodeURIComponent(t.url)}&name=${encodeURIComponent(`youtube-${id}-${t.width}x${t.height}`)}`}
                  className="bg-brand hover:bg-brand-dark text-white text-[13px] font-semibold rounded-[5px] px-3.5 py-2 inline-flex items-center gap-1.5"
                >
                  <Icon name="download" className="w-4 h-4" strokeWidth={2} /> Download
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
