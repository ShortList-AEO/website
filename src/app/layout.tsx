import type { Metadata, Viewport } from "next";
import { IBM_Plex_Mono, IBM_Plex_Sans, IBM_Plex_Sans_Devanagari, Schibsted_Grotesk } from "next/font/google";
import { site } from "@/content/site";
import { siteUrl } from "@/lib/site-url";
import { Providers } from "@/components/providers/Providers";
import "./globals.css";

const display = Schibsted_Grotesk({ subsets: ["latin"], weight: ["700", "800"], variable: "--ff-display", display: "swap" });
const body = IBM_Plex_Sans({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--ff-body", display: "swap" });
const mono = IBM_Plex_Mono({ subsets: ["latin"], weight: ["400", "500"], variable: "--ff-mono", display: "swap" });
const deva = IBM_Plex_Sans_Devanagari({
  subsets: ["devanagari"],
  weight: ["400", "600"],
  variable: "--ff-deva",
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  metadataBase: siteUrl(),
  title: site.meta.title,
  description: site.meta.description,
  applicationName: site.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: site.name,
    title: site.meta.title,
    description: site.meta.description,
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "AI is shortlisting products for your customers. You're not on the list." }],
  },
  twitter: {
    card: "summary_large_image",
    title: site.meta.title,
    description: site.meta.description,
    images: ["/og.png"],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f6f7f7" },
    { media: "(prefers-color-scheme: dark)", color: "#0d1216" },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en-IN"
      suppressHydrationWarning
      className={`${display.variable} ${body.variable} ${mono.variable} ${deva.variable}`}
    >
      <body>
        <a href="#main" className="sr-only-focusable fixed left-4 top-4 z-[70] rounded-[3px] bg-ink px-4 py-2 text-bg">
          Skip to content
        </a>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
