import type { Metadata } from "next";
import { ProsePage } from "@/components/Prose";

export const metadata: Metadata = { title: "Terms of Service" };

export default function TermsPage() {
  return (
    <ProsePage title="Terms of Service">
      <section>
        <h2>Using SocialMediaFetch</h2>
        <p>
          SocialMediaFetch is provided free of charge, as-is. Use it only with public content and only for purposes
          the content owner and the platform allow.
        </p>
      </section>
      <section>
        <h2>Your responsibility</h2>
        <ul>
          <li>You are responsible for how you use anything you download.</li>
          <li>Respect copyright and creators&apos; rights. Don&apos;t re-publish content without permission.</li>
          <li>Follow the terms of the platform the content came from.</li>
        </ul>
      </section>
      <section>
        <h2>Availability</h2>
        <p>
          Platforms change what they share at any time. Features may stop working, change, or be removed without
          notice.
        </p>
      </section>
    </ProsePage>
  );
}
