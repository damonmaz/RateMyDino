"use client"; // Mark this as a Client Component

import { Titillium_Web } from "next/font/google";
import { SessionProvider } from "next-auth/react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./globals.css";

// Configure Titillium Web with multiple available weights
const titillium = Titillium_Web({
  subsets: ["latin"],
  weight: ["200", "300", "400", "600", "700"],
  variable: "--font-titillium",
});

export default function Layout({ children }) {
  return (
    <html lang="en" className={titillium.variable}>
      <body>
        <SessionProvider>
          
          {children}
          <Footer />
        </SessionProvider>
      </body>
    </html>
  );
}
