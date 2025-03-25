import { Metadata } from "next";
import Nerdbunny from "@/public/nerdbunny-dark.jpg";
const DOMAIN = process.env.NEXT_PUBLIC_DOMAIN;

export const defaultMetadata: Metadata = {
  metadataBase: new URL(DOMAIN || "https://nerdbunny.com"),
  title: {
    default: "NerdBunny - AI Discrepancies Detection for Research Papers",
    template: "%s | NerdBunny",
  },
  description:
    "NerdBunny uses AI to detect errors in research papers, simplifying complex studies and adding a fun meme culture to science. 🧬🐇",
  keywords: [
    "AI discrepancies detector",
    "research paper analysis",
    "academic writing",
    "paper review",
    "AI writing assistant",
    "DeSci",
  ],
  authors: [{ name: "NerdBunny" }],
  creator: "NerdBunny",
  publisher: "NerdBunny",
  openGraph: {
    type: "website",
    siteName: "NerdBunny",
    title: "NerdBunny - AI Discrepancies Detection for Research Papers",
    description:
      "NerdBunny uses AI to detect errors in research papers, simplifying complex studies and adding a fun meme culture to science. 🧬🐇",
    images: [
      {
        url: Nerdbunny.src,
        width: 1200,
        height: 630,
        alt: "NerdBunny AI Discrepancies Detector",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "NerdBunny - AI Discrepancies Detection for Research Papers",
    description:
      "NerdBunny uses AI to detect errors in research papers, simplifying complex studies and adding a fun meme culture to science. 🧬🐇",
    images: [Nerdbunny.src],
    creator: "@nerdbunny",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
    },
  },
  verification: {
    google: "your-google-site-verification",
    other: {
      me: ["your-domain-verification"],
    },
  },
};
