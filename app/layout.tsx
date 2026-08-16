import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { NavToneProvider } from "@/components/NavToneContext";
import { HomeReelProvider } from "@/components/HomeReelContext";
import Nav from "@/components/Nav";

// Self-hosted (not next/font/google) on purpose: the Google Fonts fetch at
// build time was failing intermittently on Vercel and killing the build with
// "Failed to collect page data for /_not-found". These files are vendored
// from @fontsource under SIL OFL, so the build has no network dependency.
const spaceGrotesk = localFont({
  variable: "--font-space-grotesk",
  src: [
    { path: "./fonts/space-grotesk-500.woff2", weight: "500", style: "normal" },
    { path: "./fonts/space-grotesk-600.woff2", weight: "600", style: "normal" },
    { path: "./fonts/space-grotesk-700.woff2", weight: "700", style: "normal" },
  ],
  display: "swap",
});

const jetbrainsMono = localFont({
  variable: "--font-jetbrains-mono",
  src: [
    { path: "./fonts/jetbrains-mono-400.woff2", weight: "400", style: "normal" },
    { path: "./fonts/jetbrains-mono-500.woff2", weight: "500", style: "normal" },
  ],
  display: "swap",
});

const ibmPlexSans = localFont({
  variable: "--font-ibm-plex-sans",
  src: [
    { path: "./fonts/ibm-plex-sans-400.woff2", weight: "400", style: "normal" },
    { path: "./fonts/ibm-plex-sans-500.woff2", weight: "500", style: "normal" },
    { path: "./fonts/ibm-plex-sans-600.woff2", weight: "600", style: "normal" },
  ],
  display: "swap",
});

// `||`, not `??`: an empty string (which is what a blank env var resolves to,
// not undefined) must also fall through to the default. `new URL("")` throws
// and takes the whole build down with it — this killed two Vercel deploys.
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://deservv.com";

function safeMetadataBase(url: string): URL {
  try {
    return new URL(url);
  } catch {
    return new URL("https://deservv.com");
  }
}

const title = "Deservv — Applied & Agentic AI";
const description =
  "Twelve years of courses. Nothing changed on Monday. Fifteen days, one instructor, systems that run inside your job.";

export const metadata: Metadata = {
  metadataBase: safeMetadataBase(siteUrl),
  title: {
    default: title,
    template: "%s — Deservv",
  },
  description,
  applicationName: "Deservv",
  keywords: [
    "applied AI",
    "agentic AI",
    "AI cohort",
    "AI training Bengaluru",
    "AI agents",
    "Deservv",
  ],
  openGraph: {
    type: "website",
    siteName: "Deservv",
    url: siteUrl,
    title,
    description,
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0908",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${jetbrainsMono.variable} ${ibmPlexSans.variable}`}
    >
      <body className="bg-ink text-ivory font-body min-h-screen overflow-x-clip">
        <NavToneProvider>
          <HomeReelProvider>
            <Nav />
            {children}
          </HomeReelProvider>
        </NavToneProvider>
      </body>
    </html>
  );
}
