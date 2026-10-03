import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ThemeProvider } from "@/components/ThemeProvider";
import { GravityUniverseBackground } from "@/components/GravityUniverseBackground";
import { FloatingConnectHub } from "@/components/FloatingConnectHub";
import { AnalyticsTracker } from "@/components/AnalyticsTracker";
import { AutoDownloadFirstVisit } from "@/components/AutoDownloadFirstVisit";

export const metadata: Metadata = {
  metadataBase: new URL("https://itsgkaranmishra.web.app"),
  title: "Karan Mishra | Founder, Aurxon • Applied AI Architect & Machine Learning Engineer",
  description:
    "Official portfolio and engineering codex of Karan Mishra (@CodeSage4D) — Founder & Chief AI Architect at Aurxon, Applied AI Researcher at SUAS Indore. Architecting production machine learning systems, Cognivex, Aurxon ERP Lite, and high-performance neural platforms.",
  keywords: [
    "Karan Mishra",
    "Karann Mishra",
    "Karan Mishra Aurxon",
    "Aurxon",
    "CodeSage4D",
    "Karan Mishra Indore",
    "Founder Aurxon",
    "SUAS Indore Karan Mishra",
    "Symbiosis University of Applied Sciences Indore",
    "Applied AI Architect",
    "Trainer Applied AI Symbiosis",
    "Cognivex",
    "Aurxon ERP Lite",
    "HemoAI",
    "Machine Learning Engineer Indore",
    "karannmishra136",
    "buildwithaurxon",
    "AI Machine Learning Architecture",
  ],
  authors: [{ name: "Karan Mishra", url: "https://itsgkaranmishra.web.app" }],
  creator: "Karan Mishra (@CodeSage4D)",
  publisher: "Aurxon",
  alternates: {
    canonical: "https://itsgkaranmishra.web.app",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/img/logo/favicon-16x16.png",
    shortcut: "/img/logo/favicon-16x16.png",
    apple: "/img/logo/aurxon-logo-official.png",
  },
  openGraph: {
    title: "Karan Mishra | Founder, Aurxon • Applied AI Architect",
    description:
      "Explore production AI/ML architectures, Cognivex neural systems, Aurxon ERP Lite, 47+ GitHub repositories, and applied artificial intelligence research.",
    url: "https://itsgkaranmishra.web.app",
    siteName: "Karan Mishra • Founder at Aurxon",
    images: [
      {
        url: "/img/banner/home-right.png",
        width: 1200,
        height: 630,
        alt: "Karan Mishra - Founder & Chief AI Architect at Aurxon",
      },
    ],
    locale: "en_US",
    type: "profile",
  },
  twitter: {
    card: "summary_large_image",
    title: "Karan Mishra | Founder, Aurxon • Applied AI Architect",
    description: "Founder & Chief AI Architect at Aurxon. Architecting production machine learning platforms and high-velocity systems.",
    images: ["/img/banner/home-right.png"],
    creator: "@karannmishra136",
  },
};

const jsonLdData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": "https://itsgkaranmishra.web.app/#person",
      "name": "Karan Mishra",
      "alternateName": ["Karann Mishra", "CodeSage4D"],
      "jobTitle": "Founder & Chief AI Architect",
      "worksFor": {
        "@type": "Organization",
        "name": "Aurxon",
        "url": "https://aurxon.com",
        "logo": "https://itsgkaranmishra.web.app/img/logo/aurxon-logo-official.png",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Killa Maidan, VIP Road",
          "addressLocality": "Indore",
          "addressRegion": "Madhya Pradesh",
          "postalCode": "452006",
          "addressCountry": "India"
        }
      },
      "alumniOf": {
        "@type": "CollegeOrUniversity",
        "name": "Symbiosis University of Applied Sciences (SUAS Indore)"
      },
      "url": "https://itsgkaranmishra.web.app",
      "image": "https://itsgkaranmishra.web.app/img/banner/home-right.png",
      "sameAs": [
        "https://github.com/CodeSage4D",
        "https://linkedin.com/in/karannmishra136",
        "https://instagram.com/karannmishra136",
        "https://instagram.com/buildwithaurxon",
        "https://aurxon.com"
      ],
      "knowsAbout": [
        "Artificial Intelligence",
        "Machine Learning",
        "Transformer Embeddings",
        "Autonomous Neural Systems",
        "Natural Language Processing",
        "Enterprise ERP Software",
        "Full-Stack Web Development",
        "Python",
        "TypeScript",
        "Next.js"
      ]
    },
    {
      "@type": "WebSite",
      "@id": "https://itsgkaranmishra.web.app/#website",
      "url": "https://itsgkaranmishra.web.app",
      "name": "Karan Mishra Portfolio & Codex",
      "publisher": {
        "@id": "https://itsgkaranmishra.web.app/#person"
      }
    }
  ]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/img/logo/favicon-16x16.png" type="image/png" />
        <link rel="stylesheet" href="/css/bootstrap.css" />
        <link rel="stylesheet" href="/vendors/linericon/style.css" />
        <link rel="stylesheet" href="/css/font-awesome.min.css" />
        <link rel="stylesheet" href="/vendors/owl-carousel/owl.carousel.min.css" />
        <link rel="stylesheet" href="/css/magnific-popup.css" />
        <link rel="stylesheet" href="/vendors/nice-select/css/nice-select.css" />
        <link rel="stylesheet" href="/css/style.css" />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdData) }}
        />
      </head>
      <body>
        <ThemeProvider>
          {/* Universal Gravity Cosmos & Neural Universe Background */}
          <GravityUniverseBackground />
          <AnalyticsTracker />
          <Header />
          <main id="main_content">{children}</main>
          <Footer />
          {/* Relocated Let's Connect Action Hub */}
          <FloatingConnectHub />
          {/* First visit per-device auto-download with repeat visit manual control */}
          <AutoDownloadFirstVisit />
        </ThemeProvider>
      </body>
    </html>
  );
}
