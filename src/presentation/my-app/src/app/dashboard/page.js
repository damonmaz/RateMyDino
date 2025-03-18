"use client";

import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/signin");
    }
  }, [status, router]);

  if (status === "loading") return <p>Loading...</p>;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold">Welcome, {session?.user?.name}!</h1>
      <button
        onClick={() => signOut()}
        className="bg-red-500 text-white p-2 rounded hover:bg-red-600 transition"
      >
        Sign Out
      </button>
    </div>
  );
}
