"use client";

import { Titillium_Web } from "next/font/google";
import { SessionProvider } from "next-auth/react";
import "./globals.css";

const titillium = Titillium_Web({
  subsets: ["latin"],
  weight: ["200", "300", "400", "600", "700"],
});

export default function Layout({ children }) {
  return (
    <html lang="en" className={titillium.className}>
      <body>
        <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  );
}