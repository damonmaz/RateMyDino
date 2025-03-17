"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";

export default function Navbar() {
  const { data: session } = useSession();

  return (
    <nav className="bg-gray-800 text-white p-4 flex justify-between">
      <Link href="/" className="text-xl font-bold">
        MyApp
      </Link>
      <div>
        {session ? (
          <>
            <Link href="/dashboard" className="mr-4">
              Dashboard
            </Link>
            <button onClick={() => signOut()} className="bg-red-500 px-4 py-2 rounded">
              Sign Out
            </button>
          </>
        ) : (
          <button onClick={() => signIn()} className="bg-blue-500 px-4 py-2 rounded">
            Sign In
          </button>
        )}
      </div>
    </nav>
  );
}
