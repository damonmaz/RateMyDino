"use client";

import { useRouter } from "next/navigation";

export default function DashboardLink() {
  const router = useRouter();

  return (
    <div className="text-center pointer-events-auto" onClick={() => router.push("/dashboard")}>
      <h2 className="text-3xl font-bold text-white mb-3">Go to Dashboard</h2>
      <p className="text-lg text-gray-300 mb-5">Click to access your dashboard!</p>
    </div>
  );
}
