import { Metadata } from "next";
import Nerdbunny from "@/public/nerdbunny-dark.jpg";
import axios from "axios";

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  // Await the params object
  const resolvedParams = await params;

  if (!resolvedParams.id) {
    return {
      title: "Research Paper Analysis | NerdBunny",
      description: "View AI-powered analysis results for research papers.",
    };
  }

  const newId = resolvedParams.id;
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

  const DOMAIN = process.env.NEXT_PUBLIC_DOMAIN;
  const response = await axios.get(`${API_BASE_URL}/post/${newId}`);
  const analysisData = response.data;
  const title = analysisData?.title || "Research Paper Analysis";
  const description = `NerdBunny AI analysis results for "${title}". View detected errors, improvements, and insights. 🧬🐇`;
  const url = `${DOMAIN}/results/${resolvedParams.id}`;
  const poster = analysisData?.user?.first_name;

  return {
    title: `${poster}  -  Research Paper Analysis by NerdBunny`,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: `${poster}  -  Research Paper Analysis by NerdBunny`,
      description,
      url,
      siteName: "NerdBunny",
      images: [
        {
          url: analysisData?.user.avatar || Nerdbunny.src,
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
      title: `${poster}  -  Research Paper Analysis by NerdBunny`,
      description,
      images: [analysisData?.user.avatar || Nerdbunny.src],
    },
  };
  // } catch (error) {
  //   return {
  //     title: "Research Paper Analysis | NerdBunny",
  //     description:
  //       "View AI-powered analysis results for research papers. Detect errors, get improvements, and gain insights with NerdBunny. 🧬🐇",
  //     alternates: {
  //       canonical: `https://nerdbunny.com/results/${resolvedParams.id}`,
  //     },
  //   };
  // }
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
