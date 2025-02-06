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

const siteIconUrl = SiteIcon.src;
export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: siteIconUrl,
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
        <Providers themeProps={{ attribute: "class", defaultTheme: "dark" }}>
          <ProgressProvider>
            <SpeechProvider>
              <AnalyzeProvider>
                <PaginationProvider>
                  <div className="relative flex flex-col h-screen">
                    <Navbar />
                    <main className="w-screen overflow-x-hidden p-2 pt-4 flex-grow">
                      {children}
                    </main>
                    <Toaster />
                    <footer className="w-full flex items-center justify-center py-3">
                      <Footer />
                    </footer>
                  </div>
                </PaginationProvider>
              </AnalyzeProvider>
            </SpeechProvider>
          </ProgressProvider>
        </Providers>
      </body>
    </html>
  );
}
