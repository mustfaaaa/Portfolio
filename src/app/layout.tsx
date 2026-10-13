import type { Metadata } from "next";
import localFont from "next/font/local";
import { ImmersiveBackgroundLoader } from "@/components/webgl/immersive-background-loader";
import { portfolio } from "@/data/portfolio";
import "./globals.css";

const geistSans = localFont({
  src: "../assets/fonts/geist-latin.woff2",
  variable: "--font-geist-sans",
  display: "swap",
});

const geistMono = localFont({
  src: "../assets/fonts/geist-mono-latin.woff2",
  variable: "--font-geist-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(portfolio.site.url),
  title: portfolio.site.title,
  description: portfolio.site.description,
  alternates: { canonical: "/" },
  icons: { icon: "/favicon.svg" },
  openGraph: { type: "website", url: "/", title: portfolio.site.title, description: portfolio.site.description, siteName: portfolio.identity.name },
  twitter: { card: "summary", title: portfolio.site.title, description: portfolio.site.description },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: portfolio.identity.name,
  url: portfolio.site.url,
  jobTitle: portfolio.identity.role,
  email: `mailto:${portfolio.identity.email}`,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Peshawar",
    addressCountry: "PK",
  },
  sameAs: [portfolio.links.github, portfolio.links.linkedin],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" data-scroll-behavior="smooth" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>
        <ImmersiveBackgroundLoader />
        <div className="site-content-layer">{children}</div>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      </body>
    </html>
  );
}
