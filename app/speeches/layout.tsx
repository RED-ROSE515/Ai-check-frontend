import { Metadata } from "next";
import Nerdbunny from "@/public/nerdbunny-white.jpg";

export async function generateMetadata(): Promise<Metadata> {
  // Await the params object

  const DOMAIN = process.env.NEXT_PUBLIC_DOMAIN;
  const title = "Research Paper Analysis";
  const description = `NerdBunny AI analysis results for "${title}". View detected errors, improvements, and insights. 🧬🐇`;
  const url = `${DOMAIN}/speeches`;

  return {
    title: `Speeches - Research Paper Analysis by NerdBunny`,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: `Speeches -  Research Paper Analysis by NerdBunny`,
      description,
      url,
      siteName: "NerdBunny",
      images: [
        {
          url: Nerdbunny.src,
          width: 1200,
          height: 630,
          alt: "NerdBunny Analysis Results",
        },
      ],
      locale: "en_US",
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: `Speeches  -  Research Paper Analysis by NerdBunny`,
      description,
      images: [Nerdbunny.src],
    },
  };
  // } catch (error) {
  //   return {
  //     title: "Research Paper Analysis | NerdBunny",
  //     description:
  //       "View AI-powered analysis results for research papers. Detect errors, get improvements, and gain insights with NerdBunny. 🧬🐇",
  //     alternates: {
  //       canonical: `https://nerdbunny.com/results/discrepancies/${resolvedParams.id}`,
  //     },
  //   };
  // }
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
