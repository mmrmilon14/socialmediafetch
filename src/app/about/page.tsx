import type { Metadata } from "next";
import Link from "next/link";
import { ProsePage } from "@/components/Prose";
import { stats } from "@/lib/platforms";

export const metadata: Metadata = { title: "About" };

export default function AboutPage() {
  return (
    <ProsePage title="About SocialMediaFetch" intro="A focused tool for public social media links and content extraction.">
      <p>
        SocialMediaFetch does one thing: you paste a link from a social platform and it shows you the public files
        and details available for that post. One input works for all {stats.platforms} platforms on our{" "}
        <Link href="/platforms">platform list</Link>, with the platform detected automatically.
      </p>
      <p>
        We only work with public content, follow each platform&apos;s rules, and explain clearly when a post is
        private, restricted, or unavailable. Nothing to install, no account needed.
      </p>
    </ProsePage>
  );
}
