import type { Metadata } from "next";
import Link from "next/link";
import { ProsePage } from "@/components/Prose";

export const metadata: Metadata = {
  title: "Guides",
  description: "How SocialMediaFetch works, what each result means, and why some posts can't be fetched.",
};

export default function GuidesPage() {
  return (
    <ProsePage title="Guides" intro="How SocialMediaFetch works and what each message means.">
      <section>
        <h2>How to fetch from any link</h2>
        <ul>
          <li>Open the post on the platform and use <strong>Share → Copy link</strong>.</li>
          <li>Paste it into the box on the <Link href="/">home page</Link> or any downloader page.</li>
          <li>The platform is detected as you paste. Press <strong>Fetch</strong> to see what&apos;s available.</li>
        </ul>
      </section>
      <section>
        <h2>What the results mean</h2>
        <ul>
          <li><strong>Ready</strong> — the post is public and the files or details listed are available.</li>
          <li><strong>Private or restricted</strong> — the post is private, age-restricted, or sharing is turned off. Only the owner can see it, so we can&apos;t either.</li>
          <li><strong>Post not found</strong> — the post was deleted or the link is incomplete. Copy the link again from the Share button.</li>
          <li><strong>Coming soon</strong> — we recognise the platform, but its downloader isn&apos;t live yet.</li>
          <li><strong>Not connected yet</strong> — the platform needs an approved developer app, which this site hasn&apos;t set up yet.</li>
        </ul>
      </section>
      <section>
        <h2>Why some platforms only show details</h2>
        <p>
          Every platform decides what it shares. YouTube&apos;s terms don&apos;t allow video downloads without
          permission, so we provide thumbnails and video information. TikTok&apos;s developer APIs focus on
          authorised display, and Vimeo only gives file links when the owner allows downloads. SocialMediaFetch
          follows those rules rather than working around them.
        </p>
      </section>
      <section>
        <h2>Using downloaded content responsibly</h2>
        <p>
          Content belongs to its creators. Save things for personal use, and ask for permission before you re-post,
          edit, or use anything commercially.
        </p>
      </section>
    </ProsePage>
  );
}
