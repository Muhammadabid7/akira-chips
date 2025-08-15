import type React from "react"
import type { Metadata } from "next"
import { Poppins, Nunito } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import "./globals.css"

const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poppins",
  weight: ["400", "500", "600", "700"],
})

const nunito = Nunito({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-nunito",
  weight: ["400", "500", "600", "700"],
})

export const metadata: Metadata = {
  title: "AKIRA CHIPS - Keripik Pisang Premium Aneka Rasa",
  description:
    "Keripik pisang istimewa dengan sentuhan rasa yang belum pernah Anda bayangkan. Cokelat, tiramisu, matcha, stroberi, dan taro.",
    generator: 'Bidzz Official'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="id" className={`${poppins.variable} ${nunito.variable} scroll-smooth dark`} suppressHydrationWarning>
      <body className="antialiased">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} disableTransitionOnChange={false}>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
