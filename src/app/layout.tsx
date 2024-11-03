import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { AI } from "./actions";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Crypto AI - Your AI-Powered Crypto Assistant",
  description: "Your AI-Powered Crypto Assistant helps you with cryptocurrency prices,stats and analysis and personalized trading strategies.",
  keywords: ["crypto","ai","trading","analysis","ai-chatbot","crypto-chatbot","crypto-assistant","crypto-trading","crypto-analysis"],
  openGraph: {
    type: "website",
    url: "https://crypto-ai.com",
    title: "Crypto AI - Your AI-Powered Crypto Assistant",
    description:
      "Your AI-Powered Crypto Assistant helps you with cryptocurrency prices, stats and analysis and personalized trading strategies.",
    images: [
      "/images/og-image.png",
    ],
    siteName: "Crypto AI",
    locale: "en_US",
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
        <AI>
          {children}
        </AI>
      </body>
    </html>
  );
}
