import Link from "next/link";
import { BackToTop } from "./BackToTop";

export function Footer() {
  return (
    <footer className="bg-white">
      <div className="max-w-[1180px] mx-auto px-4 py-6 flex flex-col sm:flex-row gap-3 items-center justify-between text-[14px]">
        <p>© {new Date().getFullYear()} SocialMediaFetch. All rights reserved.</p>
        <nav className="flex flex-wrap justify-center gap-x-5 gap-y-1">
          <Link href="/about" className="hover:text-brand">About</Link>
          <Link href="/guides" className="hover:text-brand">Guides</Link>
          <Link href="/privacy" className="hover:text-brand">Privacy Policy</Link>
          <Link href="/terms" className="hover:text-brand">Terms of Service</Link>
        </nav>
      </div>
      <BackToTop />
    </footer>
  );
}
