import Link from "next/link";
import { Shell } from "@/components/Shell";

export default function NotFound() {
  return (
    <Shell>
      <div className="text-center py-16">
        <p className="text-[13px] font-semibold uppercase tracking-wide mb-2">404</p>
        <h1 className="font-bold text-[30px] mb-3">Page not found</h1>
        <p className="mb-6">That page doesn&apos;t exist. Try the search, or start from the home page.</p>
        <Link href="/" className="bg-brand hover:bg-brand-dark text-white font-semibold rounded-[5px] px-5 py-2.5">Go home</Link>
      </div>
    </Shell>
  );
}
