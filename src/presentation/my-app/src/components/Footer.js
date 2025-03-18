"use client";

import { useRouter } from "next/navigation";

export default function Footer() {
  const router = useRouter();

  return (
    <footer className="bg-[#001f3f] text-white py-16">
      <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center">

        <div className="text-xl font-semibold mb-6 md:mb-0 cursor-pointer">
          © {new Date().getFullYear()} RateMyDino
        </div>

        <div className="flex flex-wrap justify-center space-x-8 text-lg">
          <button onClick={() => router.push("/about")} className="hover:underline cursor-pointer">
            About Us
          </button>
          <button onClick={() => router.push("/contact")} className="hover:underline cursor-pointer">
            Contact Us
          </button>
          <button onClick={() => router.push("/dashboard")} className="hover:underline cursor-pointer">
            Dashboard
          </button>
          <button onClick={() => router.push("/reviews")} className="hover:underline cursor-pointer">
            Review Us
          </button>
          <button onClick={() => router.push("/auth/signup")} className="hover:underline cursor-pointer">
            Sign Up
          </button>
          <button onClick={() => router.push("/auth/signin")} className="hover:underline cursor-pointer">
            Sign In
          </button>
        </div>
      </div>
    </footer>
  );
}
