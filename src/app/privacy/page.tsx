import type { Metadata } from "next";
import { ProsePage } from "@/components/Prose";

export const metadata: Metadata = { title: "Privacy Policy" };

export default function PrivacyPage() {
  return (
    <ProsePage title="Privacy Policy">
      <section>
        <h2>What we process</h2>
        <p>
          When you press Fetch, the link you pasted is sent to our server, which asks the platform&apos;s official
          public embed service for that post&apos;s details. The link is used only to answer that request.
        </p>
      </section>
      <section>
        <h2>What we don&apos;t do</h2>
        <ul>
          <li>We don&apos;t require an account or collect your name or email.</li>
          <li>We don&apos;t store the links you paste or the files you download.</li>
          <li>We never ask for your social media passwords.</li>
        </ul>
      </section>
      <section>
        <h2>Third parties</h2>
        <p>
          Previews and files load from the platform&apos;s own servers (for example YouTube&apos;s image servers),
          which may log the request as they normally would.
        </p>
      </section>
    </ProsePage>
  );
}
