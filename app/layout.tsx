import "@/styles/globals.css";
import { Metadata, Viewport } from "next";
import clsx from "clsx";

import { Providers } from "./providers";
import { PaginationProvider } from "@/contexts/PaginationContext";
import { SpeechProvider } from "@/contexts/SpeechContext";
import { ProgressProvider } from "@/contexts/ProgressContext";
import { siteConfig } from "@/config/site";
import { fontSans } from "@/config/fonts";
import { Navbar } from "@/components/navbar";
import { Toaster } from "@/components/ui/toaster";
import Footer from "./footer";
import SiteIcon from "@/public/favicon.ico";
import { AnalyzeProvider } from "@/contexts/AnalyzeContext";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { AuthProvider } from "@/contexts/AuthContext";

const siteIconUrl = SiteIcon.src;
export const metadata: Metadata = {
  title: "NerdBunny - AI Error Detection for Research Papers",
  description:
    "NerdBunny is a DeSci AI agent that detects errors in research papers, makes complex studies easier to understand, and adds a fun meme culture to science. 🧬🐇",
  openGraph: {
    title: "NerdBunny - AI Error Detection for Research Papers",
    description:
      "NerdBunny is a DeSci AI agent that detects errors in research papers, makes complex studies easier to understand, and adds a fun meme culture to science. 🧬🐇",
    url: "https://nerdbunny.com",
    siteName: "NerdBunny",
    images: [
      {
        url: "https://nerdbunny.com/social-preview.png",
        width: 1200,
        height: 630,
        alt: "NerdBunny - AI Error Detection Platform",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "NerdBunny - AI Error Detection for Research Papers in DeSci",
    description:
      "NerdBunny is a DeSci AI agent that detects errors in research papers, makes complex studies easier to understand, and adds a fun meme culture to science. 🧬🐇",
    images: ["https://nerdbunny.com/social-preview.png"],
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="en">
      <head />
      <body
        className={clsx(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <GoogleOAuthProvider clientId="386932037035-k8v833noqjk7m4***********.apps.googleusercontent.com">
          <Providers themeProps={{ attribute: "class", defaultTheme: "dark" }}>
            <ProgressProvider>
              <SpeechProvider>
                <AnalyzeProvider>
                  <PaginationProvider>
                    <AuthProvider>
                      <div className="relative flex flex-col h-screen">
                        <Navbar />
                        <main
                          className="w-screen overflow-x-hidden p-2 pt-4 flex-grow"
                          id="main"
                        >
                          {children}
                        </main>
                        <Toaster />
                        <footer className="w-full flex items-center justify-center py-3">
                          <Footer />
                        </footer>
                      </div>
                    </AuthProvider>
                  </PaginationProvider>
                </AnalyzeProvider>
              </SpeechProvider>
            </ProgressProvider>
          </Providers>
        </GoogleOAuthProvider>
      </body>
    </html>
  );
}
