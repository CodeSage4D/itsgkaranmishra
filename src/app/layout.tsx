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
  title: "Karan Mishra (Karann Mishra) | Founder & Chief AI Architect, Aurxon • G Karan Mishra",
  description:
    "Official portfolio and engineering codex of Karan Mishra (Karann Mishra, G Karan Mishra • @CodeSage4D) — Founder & Chief AI Architect at Aurxon, Applied AI Trainer at SUAS Indore. Architect of FCOS, ALAMS, and 47+ open-source codebases.",
  keywords: [
    "Karann Mishra",
    "Karan Mishra",
    "Aurxon",
    "KArann Mishra AURXON",
    "Karan Mishra Aurxon",
    "Karann Mishra Aurxon",
    "G Karan Mishra",
    "G Karan Msihra",
    "GKaranMishra",
    "itsgkaranmishra",
    "Founder Aurxon",
    "Aurxon Founder",
    "CodeSage4D",
    "Karan Mishra Indore",
    "Karann Mishra Indore",
    "SUAS Indore Karan Mishra",
    "Symbiosis University of Applied Sciences Indore",
    "Applied AI Architect",
    "Trainer Applied AI Symbiosis",
    "Cognivex",
    "Aurxon ERP Lite",
    "FCOS Aurxon",
    "ALAMS Aurxon",
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
    title: "Karan Mishra (Karann Mishra) | Founder, Aurxon • Applied AI Architect",
    description:
      "Official portfolio of Karan Mishra (G Karan Mishra / Karann Mishra) — Founder & Chief AI Architect at Aurxon. Discover neural architectures, FCOS factory operating systems, ALAMS multi-agent swarms, and 47+ open-source GitHub repositories.",
    url: "https://itsgkaranmishra.web.app",
    siteName: "Karan Mishra (Karann Mishra) • Founder at Aurxon",
    images: [
      {
        url: "/img/founder/karan-mishra-founder.jpg",
        width: 1135,
        height: 1388,
        alt: "Karan Mishra (Karann Mishra) - Founder & Chief AI Architect at Aurxon",
      },
    ],
    locale: "en_US",
    type: "profile",
  },
  twitter: {
    card: "summary_large_image",
    title: "Karan Mishra (Karann Mishra) | Founder, Aurxon • G Karan Mishra",
    description: "Founder & Chief AI Architect at Aurxon (@CodeSage4D). Architecting production machine learning systems, FCOS, and ALAMS.",
    images: ["/img/founder/karan-mishra-founder.jpg"],
    creator: "@karannmishra136",
  },
  verification: {
    google: "FR-Ie2tWKzGnBNEMu3JDJH2I42pFzTtm5vqPLQKKGts",
  },
};

const jsonLdData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": "https://itsgkaranmishra.web.app/#person",
      "name": "Karan Mishra",
      "alternateName": [
        "Karann Mishra",
        "G Karan Mishra",
        "G Karan Msihra",
        "GKaranMishra",
        "itsgkaranmishra",
        "CodeSage4D",
        "Karan Mishra Aurxon",
        "Karann Mishra Aurxon",
        "KArann Mishra AURXON"
      ],
      "description": "Karan Mishra (also known as Karann Mishra, G Karan Mishra, and @CodeSage4D) is the Founder & Chief AI Architect at Aurxon and Applied AI Trainer at SCSIT Symbiosis University of Applied Sciences (SUAS Indore).",
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
      "image": "https://itsgkaranmishra.web.app/img/founder/karan-mishra-founder.jpg",
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
      "name": "Karan Mishra (Karann Mishra) Portfolio & Codex • Aurxon",
      "alternateName": ["Aurxon Founder Portfolio", "G Karan Mishra Portfolio", "CodeSage4D"],
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
        <meta name="google-site-verification" content="FR-Ie2tWKzGnBNEMu3JDJH2I42pFzTtm5vqPLQKKGts" />
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
