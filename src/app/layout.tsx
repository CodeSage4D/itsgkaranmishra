import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { siteConfig } from "@/data/siteConfig";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "Karan Mishra",
    "i AIM LABS",
    "Machine Learning Engineer",
    "Python Developer",
    "Fraud Detection",
    "Data Analytics",
    "Next.js Developer",
    "Indore",
    "Full-Stack Developer",
  ],
  authors: [{ name: "Karan Mishra", url: "https://github.com/CodeSage4D" }],
  creator: "Karan Mishra",
  icons: {
    icon: "/img/logo/favicon-16x16.png",
    shortcut: "/img/logo/favicon-32x32.png",
    apple: "/img/logo/apple-touch-icon.png",
  },
  openGraph: {
    title: siteConfig.title,
    description: siteConfig.description,
    url: "https://itsgkaranmishra.web.app",
    siteName: "Karan Mishra Portfolio",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable} dark scroll-smooth`}>
      <body className="min-h-screen flex flex-col bg-[#080c14] text-slate-100 antialiased selection:bg-primary/30 selection:text-white">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
