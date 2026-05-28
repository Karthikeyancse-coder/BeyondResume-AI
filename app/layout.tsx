import type { Metadata } from "next";
import { Syne, DM_Sans } from "next/font/google";
import ThemeProvider from "@/components/shared/ThemeProvider";
import Navbar from "@/components/layout/Navbar";
import MobileHeader from "@/components/layout/MobileHeader";
import MobileNav from "@/components/layout/MobileNav";
import "./globals.css";

const syne = Syne({ 
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-display",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  title: "BeyondResume AI",
  description: "Proof of Thinking > Proof of Resume",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="light">
      <body className={`${syne.variable} ${dmSans.variable} font-body bg-bg-primary text-text-primary antialiased overflow-x-hidden`}>
        <ThemeProvider>
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <MobileHeader />
            <main className="flex-grow pb-16 lg:pb-0 relative">
              {children}
            </main>
            <MobileNav />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
