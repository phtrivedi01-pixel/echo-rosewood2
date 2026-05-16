import type { Metadata, Viewport } from "next";
import { DM_Sans, Cormorant_Garamond } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500"],
});

const cormorantGaramond = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-serif",
  weight: ["300", "400", "500"],
});

export const metadata: Metadata = {
  title: "Écho · Rosewood Sand Hill",
  description: "Staff Intelligence Platform for Rosewood Hotels",
};

export const viewport: Viewport = {
  themeColor: "#FAF8F5",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${dmSans.variable} ${cormorantGaramond.variable} bg-background`}>
      <body className="font-sans antialiased text-foreground" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
