"use client";

import { useRouter } from "next/navigation";

export default function ReviewUs() {
  const router = useRouter();

  return (
    <div className="text-center pointer-events-auto" onClick={() => router.push("/reviews")}>
      <h2 className="text-3xl font-bold text-white mb-3">Write a Review</h2>
      <p className="text-lg text-gray-300 mb-5">Click to leave a review for RateMyDino!</p>
    </div>
  );
}
