import Link from "next/link";
import type { IconName } from "./Icon";
import { Icon } from "./Icon";

/** The single item box used across the site. */
export function ItemCard({ href, icon, title, text }: { href: string; icon: IconName; title: string; text: string }) {
  return (
    <Link
      href={href}
      className="block bg-white rounded-[10px] pt-6 pb-[22px] px-4 text-center transition-transform duration-150 shadow-[0_2px_8px_rgba(0,0,0,0.04)] will-change-transform hover:-translate-y-0.5"
    >
      <div className="w-10 h-10 mx-auto mb-3.5 flex items-center justify-center bg-[#1a8fe3] rounded-[5px]">
        <Icon name={icon} className="w-5 h-5 text-white" />
      </div>
      <h4 className="font-semibold text-lg mb-2 leading-tight">{title}</h4>
      <p className="text-base text-ink leading-relaxed">{text}</p>
    </Link>
  );
}

export function CardGrid({ children }: { children: React.ReactNode }) {
  return <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">{children}</div>;
}
