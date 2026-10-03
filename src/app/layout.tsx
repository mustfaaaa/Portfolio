import type { Metadata } from "next";
import localFont from "next/font/local";
import { ThemeProvider } from "@/components/theme-provider";
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
    <html lang="en" suppressHydrationWarning className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>
        <ThemeProvider>{children}</ThemeProvider>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      </body>
    </html>
  );
}
