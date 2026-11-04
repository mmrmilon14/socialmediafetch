import type { Metadata } from "next";
import { Icon } from "@/components/Icon";
import { Shell } from "@/components/Shell";
import { ThumbnailGrabber } from "@/components/ThumbnailGrabber";

export const metadata: Metadata = {
  title: "YouTube Thumbnail Downloader — HD, SD & Max Resolution",
  description: "Grab every YouTube thumbnail size from any video or Shorts link. Max resolution 1280×720, standard, high, and medium quality.",
};

export default function Page() {
  return (
    <Shell active="major-social">
      <section className="text-center max-w-[720px] mx-auto">
        <div className="w-14 h-14 mx-auto mb-4 flex items-center justify-center bg-brand rounded-[8px]">
          <Icon name="image" className="w-7 h-7 text-white" />
        </div>
        <h1 className="font-bold text-[30px] sm:text-[38px] leading-tight tracking-tight mb-3">YouTube Thumbnail Downloader</h1>
        <p className="text-[16px] leading-relaxed mb-7">
          Paste any YouTube video or Shorts link to get every thumbnail size, from 1280×720 max resolution down to the 120×90 default.
        </p>
        <ThumbnailGrabber />
      </section>
      <section className="mt-14 bg-white rounded-[10px] p-6 shadow-[0_2px_8px_rgba(0,0,0,0.04)] text-[14px] leading-relaxed">
        <h2 className="font-bold text-[18px] mb-2">Good to know</h2>
        <ul className="list-disc pl-5 space-y-1">
          <li>Max resolution (1280×720) only exists for videos uploaded in HD. If it's missing, it's hidden automatically.</li>
          <li>Thumbnails belong to the video's creator. Ask for permission before reusing them commercially.</li>
          <li>Works with youtube.com/watch, youtu.be, /shorts/, /embed/ and /live/ links.</li>
        </ul>
      </section>
    </Shell>
  );
}
