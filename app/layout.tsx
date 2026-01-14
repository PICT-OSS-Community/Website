import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./components/theme-provider";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    metadataBase: new URL("https://oss-community.social"),
    title: "OSS community",
    description: "Official website of the OSS community",
    icons: {
        icon: [
            { url: "/oss-favicon.png", sizes: "32x32", type: "image/png" },
            { url: "/oss-favicon.png", sizes: "16x16", type: "image/png" },
        ],
        shortcut: "/oss-favicon.png",
        apple: "/oss-favicon.png",
        other: [
            {
                rel: "icon",
                url: "/oss-favicon.png",
            },
        ],
    },
    openGraph: {
        images: "/og-image.png",
        type: "website",
        url: "https://oss-community.social",
        siteName: "OSS community",
        locale: "en_US",
        title: "OSS community",
        description: "Official website of the OSS community",
    },
    twitter: {
        images: "/og-image.png",
        title: "OSS community",
        card: "summary_large_image",
        site: "@oss_community",
        siteId: "1460295494530066432",
        creator: "@oss_community",
        creatorId: "1460295494530066432",
        description: "Official website of the OSS community",
    },
    alternates: {
        canonical: "https://oss-community.social",
    },
    applicationName: "OSS community",
    robots: {
        index: true,
        follow: true,
        nocache: false,
        googleBot: {
            index: true,
            follow: true,
            noimageindex: false,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
        },
    },
    manifest: "/manifest.json",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                >
                    {children}
                </ThemeProvider>
            </body>
        </html>
    );
}
