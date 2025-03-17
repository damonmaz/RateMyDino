"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";
import Image from "next/image"; // Import Next.js Image component

export default function Navbar() {
  const { data: session } = useSession();

  return (
    <nav className="bg-gray-800 text-white p-4 flex justify-between items-center">
      {/* Logo and Brand Name */}
      <Link href="/" className="flex items-center space-x-2">
        <Image
          src="/Logo.png"
          alt="RateMyDino Logo"
          width={50}
          height={50}
        />
        <span className="text-xl font-bold">RateMyDino</span>
      </Link>

      {/* Authentication Links */}
      <div>
        {session ? (
          <>
            <Link href="/dashboard" className="mr-4">
              Dashboard
            </Link>
            <button
              onClick={() => signOut()}
              className="bg-red-500 px-4 py-2 rounded hover:bg-red-600 transition"
            >
              Sign Out
            </button>
          </>
        ) : (
          <button
            onClick={() => signIn()}
            className="bg-blue-500 px-4 py-2 rounded hover:bg-blue-600 transition"
          >
            Sign In
          </button>
        )}
      </div>
    </nav>
  );
}
