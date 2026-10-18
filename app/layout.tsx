import {
    Geist_Mono,
    Nunito_Sans,
    Roboto,
} from "next/font/google"

import { ThemeProvider } from "@/lib/next-themes/theme-provider"
import { Toaster } from "@/components/ui/toast"
import { TanstackQueryProvider } from "@/lib/tanstack-query/tanstack-query-provider"
import { cn } from "@/lib/utils"
import "./globals.css"
import { Metadata } from "next"

const nunitoSansHeading = Nunito_Sans({
    subsets: ["latin"],
    variable: "--font-heading",
})

const roboto = Roboto({
    subsets: ["latin"],
    variable: "--font-sans",
})

const fontMono = Geist_Mono({
    subsets: ["latin"],
    variable: "--font-mono",
})

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html
            lang="en"
            suppressHydrationWarning
            className={cn(
                "antialiased",
                fontMono.variable,
                "font-sans",
                roboto.variable,
                nunitoSansHeading.variable,
            )}
        >
            <body>
                <TanstackQueryProvider>
                    <ThemeProvider>
                        {children}
                    </ThemeProvider>
                </TanstackQueryProvider>

                <Toaster />
            </body>
        </html>
    )
}
