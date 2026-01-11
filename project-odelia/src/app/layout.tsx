import type { Metadata } from "next";
import { Inter, Tangerine, Cinzel } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const tangerine = Tangerine({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-tangerine",
  display: "swap",
});

const cinzel = Cinzel({
  subsets: ["latin"],
  variable: "--font-cinzel",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Will You Be My Valentine? | Odelia",
  description: "A special Valentine's message inspired by water's eternal flow and harmony",
  keywords: ["valentine", "love", "romance", "water", "harmony"],
  authors: [{ name: "Your Secret Admirer" }],
  openGraph: {
    title: "Will You Be My Valentine?",
    description: "Like water finds its way, my love flows to you",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${tangerine.variable} ${cinzel.variable}`}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
