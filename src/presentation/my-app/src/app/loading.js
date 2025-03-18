"use client";

import Image from "next/image";

export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <div className="relative w-32 h-32">
        <Image
          src="/Logo.png"
          alt="Loading Logo"
          width={428}
          height={428}
          className="animate-coin-spin"
        />
      </div>
    </div>
  );
}
