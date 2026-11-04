import type { Metadata, Viewport } from "next";
import { Poppins } from "next/font/google";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: {
    default: "SocialMediaFetch — Download public social media content from one link",
    template: "%s · SocialMediaFetch",
  },
  description:
    "Paste one link from Instagram, TikTok, YouTube, X, Reddit, Vimeo and 30+ more platforms. SocialMediaFetch detects the platform and fetches thumbnails, images, captions, and post details where the platform allows it.",
  openGraph: { siteName: "SocialMediaFetch", type: "website" },
};

export const viewport: Viewport = { themeColor: "#1a8fe3" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={poppins.variable}>
      <body className="font-sans text-ink min-h-screen flex flex-col">
        <Header />
        <div className="flex-1">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
