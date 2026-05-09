import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import { Toaster } from "sonner";

import "@/app/globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Système de design Restaurant Dashboard",
  description: "Fondation UI et bibliothèque de composants réutilisables pour un dashboard SaaS restaurant.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className={`${manrope.variable} min-h-screen bg-background font-sans text-foreground antialiased`}>
        {children}
        <Toaster richColors position="top-right" />
      </body>
    </html>
  );
}
