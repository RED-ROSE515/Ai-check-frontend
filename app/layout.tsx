import "@/styles/globals.css";
import { Viewport } from "next";
import clsx from "clsx";

import { Providers } from "./providers";
import { PaginationProvider } from "@/contexts/PaginationContext";
import { SpeechProvider } from "@/contexts/SpeechContext";
import { ProgressProvider } from "@/contexts/ProgressContext";
import { fontSans } from "@/config/fonts";
import { Navbar } from "@/components/navbar";
import { Toaster } from "@/components/ui/toaster";
import Footer from "./footer";
import SiteIcon from "@/public/favicon.ico";
import { AnalyzeProvider } from "@/contexts/AnalyzeContext";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { AuthProvider } from "@/contexts/AuthContext";
import { defaultMetadata } from "./shared-metadata";
import { SearchProvider } from "@/contexts/SearchContext";
import { CircularProgressBar } from "@/components/CircularProgressBar";
import { ArticleSearchProvider } from "@/contexts/ArticleSearchContext";

const siteIconUrl = SiteIcon.src;
export const metadata = defaultMetadata;

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
                      <SearchProvider>
                        <ArticleSearchProvider>
                          <div className="relative flex flex-col w-full overflow-x-hidden h-screen md:h-full">
                            <Navbar />
                            <main className="w-screen flex-grow" id="main">
                              {children}
                              <CircularProgressBar className="h-[60px] w-[60px] md:h-[100px] md:w-[100px] text-sm md:text-md" />
                              <footer className="hidden w-full md:flex items-center justify-center">
                                <Footer />
                              </footer>
                            </main>
                            <Toaster />
                            <footer className="w-full flex md:hidden items-center justify-center">
                              <Footer />
                            </footer>
                          </div>
                        </ArticleSearchProvider>
                      </SearchProvider>
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
