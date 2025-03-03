import { Metadata } from "next";
import Nerdbunny from "@/public/nerdbunny-white.jpg";
import axios from "axios";
import { capitalize } from "lodash";

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;

  if (!resolvedParams.id) {
    return {
      title: "Research Paper Analysis | NerdBunny",
      description: "View AI-powered analysis results for research papers.",
    };
  }

  const DOMAIN = process.env.NEXT_PUBLIC_DOMAIN;
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
  const response = await axios.get(
    `${API_BASE_URL}/speech?speech_id=${resolvedParams.id}`
  );
  const speechData = response.data;
  const title =
    (speechData?.post_title || "Research Paper Analysis") +
    " speech by " +
    capitalize(speechData.voice_type);
  const description = `NerdBunny AI analysis results for "${title}". Listen to the audio analysis and view detected errors, improvements, and insights. 🧬🐇`;
  const url = `${DOMAIN}/speeches/${resolvedParams.id}`;
  const audioUrl = speechData?.audio_url;

  return {
    title: `Listen - Research Paper Analysis by NerdBunny`,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: `Listen - Research Paper Analysis by NerdBunny`,
      description,
      url,
      siteName: "NerdBunny",
      images: [
        {
          url: Nerdbunny.src,
          width: 1200,
          height: 630,
          alt: "NerdBunny Audio Analysis",
        },
      ],
      locale: "en_US",
      type: "music.song", // Changed type to music.song for audio content
      audio: audioUrl, // Add audio URL
    },
    twitter: {
      card: "player", // Changed to player for audio content
      title: `Listen - Research Paper Analysis by NerdBunny`,
      description,
      images: [Nerdbunny.src],
    },
  };
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
