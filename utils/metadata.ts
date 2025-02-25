import { Metadata } from "next";
import Nerdbunny from "@/public/nerdbunny.png";

export function generatePageMetadata({
  title,
  description,
  image,
  path,
  type = "website",
}: {
  title: string;
  description: string;
  image?: string;
  path: string;
  type?: "website" | "article";
}): Metadata {
  const finalTitle = `${title} | NerdBunny`;
  const finalDescription = description.slice(0, 160);
  const url = `https://nerdbunny.com${path}`;

  return {
    title: finalTitle,
    description: finalDescription,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: finalTitle,
      description: finalDescription,
      url,
      siteName: "NerdBunny",
      images: [
        {
          url: image || Nerdbunny.src,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      type,
    },
    twitter: {
      card: "summary_large_image",
      title: finalTitle,
      description: finalDescription,
      images: [image || Nerdbunny.src],
    },
  };
}
