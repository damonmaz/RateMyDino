"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function SlideBox({ image, children, link }) {
  const [isHovered, setIsHovered] = useState(false);
  const router = useRouter();

  const handleClick = () => {
    if (link.startsWith("mailto:")) {
      window.location.href = link; // Open email client for sharing
    } else {
      router.push(link); // Navigate to specified page
    }
  };

  return (
    <div
      className="relative w-80 h-60 flex-shrink-0 rounded-lg overflow-hidden cursor-pointer transition-transform hover:scale-105"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick} // Click anywhere on the SlideBox to navigate
    >
      {/* Background Image - Always Visible */}
      <Image
        src={image}
        alt="Slide Background"
        width={320}
        height={240}
        className="w-full h-full object-cover rounded-lg transition-opacity"
        style={{
          filter: isHovered ? "brightness(50%)" : "brightness(100%)", // Darken slightly on hover
        }}
      />

      {/* Hover Content - Now Clickable */}
      <div
        className={`absolute inset-0 flex flex-col items-center justify-center text-center p-4 rounded-lg transition-opacity ${
          isHovered ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        {children}
      </div>

      {/* Border Animation - Only on Hover */}
      <div
        className={`absolute inset-0 border-4 border-white rounded-lg transition-transform ${
          isHovered ? "scale-90 opacity-100" : "opacity-0"
        }`}
      ></div>
    </div>
  );
}
