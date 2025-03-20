"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";

export default function Sidebar({ isOpen, closeSidebar }) {
  const router = useRouter();
  const [isAnimating, setIsAnimating] = useState(false);
  const sidebarRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setIsAnimating(true);
    } else {
      setTimeout(() => setIsAnimating(false), 300);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        closeSidebar();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, closeSidebar]);

  const handleNavigation = (path) => {
    closeSidebar();
    if (path === "top") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      setTimeout(() => router.push(path), 300);
    }
  };

  return (
    <>
      <div
        className={`fixed inset-0 bg-black transition-opacity duration-300 
          ${isOpen ? "opacity-50 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
      ></div>

      {isAnimating && (
        <div
          ref={sidebarRef}
          className={`fixed left-0 top-0 h-full w-64 bg-[#001f3f] shadow-lg p-6 flex flex-col space-y-4 
          transform transition-transform duration-300 z-50 
          ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
        >
          <h2 className="text-white text-xl font-bold mb-4">Menu</h2>
          <hr className="border-t border-gray-400 mb-2" />

          <button onClick={() => handleNavigation("/dashboard")} className="text-white hover:text-[#FFA62B] text-lg transition cursor-pointer">
            Dashboard
          </button>
          <button onClick={() => handleNavigation("/")} className="text-white hover:text-[#FFA62B] text-lg transition cursor-pointer">
            Home Page
          </button>
          <button onClick={() => handleNavigation("top")} className="text-white hover:text-[#FFA62B] text-lg transition cursor-pointer">
            To the Top
          </button>
          <button onClick={() => handleNavigation("/contact")} className="text-white hover:text-[#FFA62B] text-lg transition cursor-pointer">
            Contact Page
          </button>

          <button onClick={closeSidebar} className="text-gray-300 hover:text-white mt-6 text-lg transition cursor-pointer">
            Back
          </button>
        </div>
      )}
    </>
  );
}
