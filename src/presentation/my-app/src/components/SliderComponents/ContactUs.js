"use client";

import { useRouter } from "next/navigation";

export default function ContactUs() {
  const router = useRouter();

  return (
    <div className="text-center pointer-events-auto" onClick={() => router.push("/contact")}>
      <h2 className="text-3xl font-bold text-white mb-3">Contact Us</h2>
      <p className="text-lg text-gray-300 mb-5">Click to get in touch with our team!</p>
    </div>
  );
}
