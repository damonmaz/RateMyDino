"use client";

import { useRouter } from "next/navigation";

export default function JoinUs() {
  const router = useRouter();

  return (
    <div className="text-center pointer-events-auto" onClick={() => router.push("/auth/signin")}>
      <h2 className="text-3xl font-bold text-white mb-3">Join Us</h2>
      <p className="text-lg text-gray-300 mb-5">Click to sign up and get started!</p>
    </div>
  );
}
