import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/contexts/AuthContext";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "New Year Party 2025 | Foxtrot Farmhouse, Jaipur",
  description: "Join us for an unforgettable New Year celebration at Foxtrot Farmhouse, Karolan Ka Barh, Jaipur. RSVP now for live music, delicious food, cocktails, and amazing party vibes!",
  keywords: ["New Year Party", "Jaipur", "Foxtrot Farmhouse", "New Year Celebration", "Party Event"],
  authors: [{ name: "New Year Party Organizers" }],
  openGraph: {
    title: "New Year Party 2025 | Foxtrot Farmhouse, Jaipur",
    description: "Join us for an unforgettable New Year celebration with live music, delicious food, cocktails, and amazing party vibes!",
    type: "website",
    locale: "en_IN",
    siteName: "New Year Party",
  },
  twitter: {
    card: "summary_large_image",
    title: "New Year Party 2025 | Foxtrot Farmhouse, Jaipur",
    description: "Join us for an unforgettable New Year celebration!",
  },
  viewport: "width=device-width, initial-scale=1",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
  // Icons are automatically detected from icon.tsx and apple-icon.tsx files
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
        <AuthProvider>
          <div className="flex min-h-screen flex-col">
            <Navigation />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
