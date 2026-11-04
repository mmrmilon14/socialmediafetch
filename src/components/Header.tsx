import Link from "next/link";
import { Logo } from "./Logo";
import { Search } from "./Search";
import { MobileMenu } from "./MobileMenu";

export function Header() {
  return (
    <header className="bg-white border-b border-[#edf2f6] lg:border-0 sticky top-0 z-40 lg:static">
      <div className="max-w-[1180px] mx-auto px-4 h-16 flex items-center gap-4 lg:grid lg:grid-cols-[220px_1fr_auto] lg:gap-6">
        <Logo />
        <div className="hidden md:block flex-1 max-w-[440px]">
          <Search />
        </div>
        <nav className="ml-auto flex items-center gap-5 text-[15px]">
          <Link href="/platforms" className="hidden sm:inline hover:text-brand transition-colors">Platforms</Link>
          <Link href="/guides" className="hidden sm:inline hover:text-brand transition-colors">Guides</Link>
          <MobileMenu />
        </nav>
      </div>
    </header>
  );
}
