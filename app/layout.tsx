import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AppbarClient } from "./components/AppbarClient";
import { Providers } from "./provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Inksream",
  description: "Medium like website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Providers>
      <body className={inter.className}>
        
        <div className="min-w-screen min-h-screen bg-[#ebe6e6]">
        <AppbarClient />
          {children}
        </div>
      </body>
      </Providers>
    </html>
  );
}
