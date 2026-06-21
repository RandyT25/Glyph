import type { Metadata } from "next";
import { DM_Sans, Inter } from "next/font/google";
import "./globals.css";
import Nav from "@/components/layout/nav";
import Footer from "@/components/layout/footer";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["300", "400", "500"],
});

export const metadata: Metadata = {
  title: "Glyph — NFC Loyalty Platform",
  description:
    "Replace paper stamp cards with beautiful NFC-powered digital rewards. Turn every customer visit into lasting loyalty.",
  openGraph: {
    title: "Glyph — NFC Loyalty Platform",
    description:
      "Replace paper stamp cards with beautiful NFC-powered digital rewards.",
    type: "website",
    siteName: "Glyph",
  },
  twitter: {
    card: "summary_large_image",
    title: "Glyph — NFC Loyalty Platform",
    description:
      "Replace paper stamp cards with beautiful NFC-powered digital rewards.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`dark ${dmSans.variable} ${inter.variable} h-full`}
    >
      <body className="min-h-full flex flex-col bg-[#09090B] text-[#F4F4F5]">
        <Nav />
        <div className="flex-1">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
