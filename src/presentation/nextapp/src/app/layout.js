"use client";

import Navbar from "@/components/Navbar";
import { Titillium_Web } from "next/font/google";
import { SessionProvider } from "next-auth/react";
import "./globals.css";

const titillium = Titillium_Web({
  subsets: ["latin"],
  weight: ["200", "300", "400", "600", "700"],
  variable: "--font-titillium",
});

export default function Layout({ children }) {
  return (
    <html lang="en" className={titillium.variable}>
      <body className="bg-white text-black">
        <SessionProvider>
          <Navbar />
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}
