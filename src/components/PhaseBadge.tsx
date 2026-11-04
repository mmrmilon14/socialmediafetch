import type { Platform } from "@/lib/platforms";

export function PhaseBadge({ platform }: { platform: Platform }) {
  return platform.live ? (
    <span className="inline-flex items-center gap-1.5 text-[12px] font-medium text-[#17603a] bg-[#ecfaf2] border border-[#bfe9d1] rounded-full px-2.5 py-0.5">
      <span className="w-1.5 h-1.5 rounded-full bg-[#22a35a]" /> Live
    </span>
  ) : (
    <span className="inline-flex items-center gap-1.5 text-[12px] font-medium text-[#155f97] bg-[#eaf4fd] border border-[#cfe5f8] rounded-full px-2.5 py-0.5">
      Phase {platform.phase} · Coming soon
    </span>
  );
}
