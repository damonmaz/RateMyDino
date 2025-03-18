"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function Navbar() {
  const { data: session, status } = useSession();
  const router = useRouter();

  // Navigate based on authentication status
  const handleLogoClick = () => {
    if (session) {
      router.push("/dashboard");
    } else {
      router.push("/");
    }
  };

  return (
    <nav className="bg-[#001f3f] text-white p-4 flex justify-between items-center">
      {/* Logo + Name Link (Navigates based on session) */}
      <button onClick={handleLogoClick} className="flex items-center space-x-2 cursor-pointer">
        <Image src="/Logo.png" alt="RateMyDino Logo" width={50} height={50} />
        <span className="text-lg font-semibold tracking-wide">RateMyDino</span>
      </button>

      {/* Right-side Buttons */}
      <div>
        {status === "loading" ? (
          <span className="text-gray-300">Loading...</span>
        ) : session ? (
          <>
            <button
              onClick={() => router.push("/dashboard")}
              className="mr-4 hover:underline cursor-pointer"
            >
              Dashboard
            </button>
            <button
              onClick={() => signOut()}
              className="bg-red-500 px-4 py-2 rounded hover:bg-red-600 transition cursor-pointer"
            >
              Sign Out
            </button>
          </>
        ) : (
          <button
            onClick={() => signIn()}
            className="bg-blue-500 px-4 py-2 rounded hover:bg-blue-600 transition cursor-pointer"
          >
            Sign In
          </button>
        )}
      </div>
    </nav>
  );
}
