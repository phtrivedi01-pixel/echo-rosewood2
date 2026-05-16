import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Echo — Rosewood Hospitality Intelligence",
  description: "Staff-facing guest intelligence dashboard for Rosewood Hotels",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
