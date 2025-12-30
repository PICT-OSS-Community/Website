import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "OSS Community 2025 Wrapped",
  description: "OSS year in review - OSS Community 2025 Wrapped. Discover the stats, milestones, and moments that made 2025 special.",
  openGraph: {
    title: "OSS Community 2025 Wrapped",
    description: "OSS year in review - OSS Community 2025 Wrapped. Discover the stats, milestones, and moments that made 2025 special.",
    images: [
      {
        url: "/wrapped-og-image.png",
        width: 1200,
        height: 630,
        alt: "OSS Community 2025 Wrapped",
      },
    ],
    type: "website",
    url: "https://oss-community.social/wrapped",
    siteName: "OSS community",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "OSS Community 2025 Wrapped",
    description: "OSS year in review - OSS Community 2025 Wrapped. Discover the stats, milestones, and moments that made 2025 special.",
    images: ["/wrapped-og-image.png"],
    site: "@oss_community",
    creator: "@oss_community",
  },
  alternates: {
    canonical: "https://oss-community.social/wrapped",
  },
};

export default function WrappedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}


