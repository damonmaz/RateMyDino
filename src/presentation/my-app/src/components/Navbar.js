"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter, usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import Image from "next/image";
import Sidebar from "./Sidebar";
import { FaBars } from "react-icons/fa";
import Loading from "@/app/loading";

export default function Navbar() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const isDashboard = pathname.startsWith("/dashboard");

  // Sidebar state
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    if (!isDashboard) {
      const handleScroll = () => {
        const navbar = document.getElementById("navbar");
        const navbarOffset = navbar?.offsetTop || 0;

        if (window.scrollY >= navbarOffset) {
          setIsSticky(true);
        } else {
          setIsSticky(false);
        }
      };

      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, [isDashboard]);

  return (
    <>
      {/* Placeholder to prevent content shift when navbar becomes sticky */}
      {!isDashboard && isSticky && <div className="h-16 bg-gradient-to-b from-black to-transparent"></div>}

      <nav
        id="navbar"
        className={`bg-[#001f3f] text-white p-4 flex justify-between items-center w-full shadow-lg z-50 transition-all duration-300
        ${isDashboard ? "fixed top-0" : isSticky ? "fixed top-0" : "relative"}`}
      >
        {/* Sidebar Toggle Button */}
        <button onClick={() => setIsSidebarOpen(true)} className="text-white text-2xl p-2 cursor-pointer">
          <FaBars />
        </button>

        {/* Logo + Name Link */}
        <button onClick={() => router.push("/")} className="flex items-center space-x-2 cursor-pointer">
          <Image src="/Logo.png" alt="RateMyDino Logo" width={50} height={50} />
          <span className="text-lg font-semibold tracking-wide">RateMyDino</span>
        </button>

        {/* Sign-In / Sign-Out Button */}
        <div>
          {status === "loading" ? (
            <Loading />
          ) : session ? (
            <button onClick={() => signOut()} className="bg-red-500 px-4 py-2 rounded hover:bg-red-600 transition cursor-pointer">
              Sign Out
            </button>
          ) : (
            <button onClick={() => signIn()} className="bg-blue-500 px-4 py-2 rounded hover:bg-blue-600 transition cursor-pointer">
              Sign In
            </button>
          )}
        </div>
      </nav>

      {/* Sidebar Component */}
      <Sidebar isOpen={isSidebarOpen} closeSidebar={() => setIsSidebarOpen(false)} />
    </>
  );
}
