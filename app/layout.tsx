import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
