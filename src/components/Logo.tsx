import Link from "next/link";

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2 shrink-0" aria-label="SocialMediaFetch home">
      <span className="w-8 h-8 rounded-[8px] bg-brand flex items-center justify-center">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="w-[18px] h-[18px] text-white" aria-hidden="true">
          <path d="M12 3v11" />
          <path d="m7.5 9.5 4.5 4.5 4.5-4.5" />
          <path d="M5 20h14" />
        </svg>
      </span>
      <span className="font-bold text-[17px] tracking-tight">
        SocialMedia<span className="text-brand">Fetch</span>
      </span>
    </Link>
  );
}
