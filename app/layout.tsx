import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { BackgroundEffects } from "@/components/ui/background-effects"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "CoinScope - Advanced Crypto Market Analytics",
  description: "Explore, analyze, and compare cryptocurrencies with advanced market analytics and real-time data.",
    generator: 'v0.dev',
    icons: {
      icon: "/logo.png", // <- this sets your favicon
    },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <div className="min-h-screen relative">
            {/* Dynamic Background */}
            <div className="fixed inset-0 -z-10">
              <div className="absolute inset-0 bg-white dark:bg-gradient-to-br dark:from-slate-900 dark:via-purple-900 dark:to-slate-900" />
              <BackgroundEffects />
            </div>

            <Header />
            <main className="relative z-10">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
