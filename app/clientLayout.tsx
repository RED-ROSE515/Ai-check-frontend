"use client"

import "@/styles/globals.css"
import clsx from "clsx"

import { Providers } from "./providers"
import { PaginationProvider } from "@/contexts/PaginationContext"
import { SpeechProvider } from "@/contexts/SpeechContext"
import { ProgressProvider } from "@/contexts/ProgressContext"
import { fontSans } from "@/config/fonts"
import { Navbar } from "@/components/navbar"
import { Toaster } from "@/components/ui/toaster"
import Footer from "./footer"
import { AnalyzeProvider } from "@/contexts/AnalyzeContext"
import { GoogleOAuthProvider } from "@react-oauth/google"
import { AuthProvider } from "@/contexts/AuthContext"
import { SearchProvider } from "@/contexts/SearchContext"
import { CircularProgressBar } from "@/components/CircularProgressBar"
import { ErrorBoundary } from "@/components/ErrorBoundary"
import type React from "react"

export default function ClientRootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const clientId =
    process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ||
    "386932037035-k8v833noqjk7m4***********.apps.googleusercontent.com"

  return (
    <html suppressHydrationWarning lang="en">
      <head />
      <body
        className={clsx(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <GoogleOAuthProvider clientId={clientId}>
          <Providers themeProps={{ attribute: "class", defaultTheme: "dark" }}>
            <ErrorBoundary
              fallback={
                <div className="p-8 text-center">
                  <h2 className="text-2xl font-bold mb-4">
                    Something went wrong
                  </h2>
                  <p className="mb-4">
                    We're sorry, but there was an error loading the application.
                  </p>
                  <button
                    className="px-4 py-2 bg-primary text-white rounded-md"
                    onClick={() => window.location.reload()}
                  >
                    Refresh the page
                  </button>
                </div>
              }
            >
              <ProgressProvider>
                <SpeechProvider>
                  <AnalyzeProvider>
                    <PaginationProvider>
                      <AuthProvider>
                        <SearchProvider>
                          <div className="relative flex flex-col w-full overflow-x-hidden h-screen md:h-full">
                            <Navbar />
                            <main className="w-screen flex-grow" id="main">
                              <ErrorBoundary>{children}</ErrorBoundary>
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
                        </SearchProvider>
                      </AuthProvider>
                    </PaginationProvider>
                  </AnalyzeProvider>
                </SpeechProvider>
              </ProgressProvider>
            </ErrorBoundary>
          </Providers>
        </GoogleOAuthProvider>
      </body>
    </html>
  )
}
