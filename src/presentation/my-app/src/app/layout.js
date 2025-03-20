"use client";

import { Titillium_Web } from "next/font/google";
import { SessionProvider } from "next-auth/react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./globals.css";

const titillium = Titillium_Web({
  subsets: ["latin"],
  weight: ["200", "300", "400", "600", "700"],
  variable: "--font-titillium",
});

export default function Layout({ children }) {
  return (
    <html lang="en" className={titillium.variable}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <title>RateMyDino</title>
        <meta name="description" content="AI generated Reviews for University of Calgary Professors" />
      </head>
      <body>
        <SessionProvider>
          
          {children}
          <Footer />
        </SessionProvider>
      </body>
    </html>
  );
}
