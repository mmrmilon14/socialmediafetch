import Link from "next/link";

export function SectionHeader({
  title,
  count,
  countLabel,
  extra,
  href,
  hrefLabel,
}: {
  title: string;
  count?: number;
  countLabel?: string;
  extra?: string;
  href?: string;
  hrefLabel?: string;
}) {
  return (
    <div className="flex items-center justify-between gap-3 mb-4">
      <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 min-w-0">
        <h2 className="font-bold text-[22px] leading-tight">{title}</h2>
        {count !== undefined && (
          <span className="text-[12px] text-brand bg-[#e8f3fc] border border-[#d3e8f8] rounded-full px-2.5 py-0.5">
            {count} {countLabel}
          </span>
        )}
        {extra && <span className="text-[13px]">{extra}</span>}
      </div>
      {href && (
        <Link
          href={href}
          className="shrink-0 bg-brand hover:bg-brand-dark text-white text-[13px] font-semibold rounded-[5px] px-4 py-2 transition-colors"
        >
          {hrefLabel} →
        </Link>
      )}
    </div>
  );
}

export function SectionIntro({ eyebrow, title, text }: { eyebrow: string; title: string; text?: string }) {
  return (
    <div className="text-center mb-6">
      <p className="text-[12px] font-semibold tracking-wide uppercase mb-2">{eyebrow}</p>
      <h2 className="font-bold text-[26px] sm:text-[30px] leading-tight mb-2">{title}</h2>
      {text && <p className="text-[15px]">{text}</p>}
    </div>
  );
}
