import type React from "react"
import type { Viewport } from "next"
import { defaultMetadata } from "./shared-metadata"
import ClientRootLayout from "./clientLayout"

export const metadata = defaultMetadata

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <ClientRootLayout>{children}</ClientRootLayout>
}

import "./globals.css"
