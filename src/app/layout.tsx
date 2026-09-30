import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ThemeProvider } from "@/components/ThemeProvider";
import { GravityUniverseBackground } from "@/components/GravityUniverseBackground";
import { FloatingConnectHub } from "@/components/FloatingConnectHub";
import { AnalyticsTracker } from "@/components/AnalyticsTracker";

export const metadata: Metadata = {
  metadataBase: new URL("https://itsgkaranmishra.web.app"),
  title: "Karan Mishra | Founder, Aurxon - AI & Machine Learning Engineer",
  description:
    "Official portfolio of Karan Mishra - Founder at Aurxon, Machine Learning & Python Engineer. Explore AI/ML architectures, Factory Central OS (FCOS), ALAMS agentic networks, Neural ERPs, and edge computer vision.",
  icons: {
    icon: "/img/png/logo-no-background.png",
    shortcut: "/img/png/logo-no-background.png",
    apple: "/img/png/logo-color.png",
  },
  openGraph: {
    title: "Karan Mishra | Founder, Aurxon - AI & Machine Learning Engineer",
    description:
      "Explore AI/ML architectures, FCOS intelligent factory operating systems, ALAMS agentic networks, Neural ERPs, and computer vision platforms.",
    url: "https://itsgkaranmishra.web.app",
    siteName: "Aurxon &bull; Karan Mishra Portfolio",
    images: [
      {
        url: "/img/png/logo-color.png",
        width: 1200,
        height: 630,
        alt: "Aurxon Official Logo - Karan Mishra Portfolio",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Karan Mishra | Founder, Aurxon - AI & Machine Learning Engineer",
    description: "Official portfolio of Karan Mishra - AI systems, FCOS, ALAMS, and neural architectures.",
    images: ["/img/png/logo-color.png"],
    creator: "@itsgkaranmishra",
  },
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
        </ThemeProvider>
      </body>
    </html>
  );
}
