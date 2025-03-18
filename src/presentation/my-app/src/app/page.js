"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { FaRocket, FaShieldAlt, FaUsers } from "react-icons/fa";

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const handleRedirect = (path) => {
    if (!session) {
      router.push("/auth/signin"); // Redirect to Sign-In if not logged in
    } else {
      router.push(path); // Navigate normally if logged in
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-white text-black">
      {/* Hero Section */}
      <div className="text-center py-20">
        <h1 className="text-5xl font-bold mb-6">Welcome to RateMyDino 🚀</h1>
        <p className="max-w-lg mx-auto text-lg text-gray-800 mb-8">
          Rate dinosaurs, read reviews, and become part of the ultimate dino community.
        </p>
        <div className="flex justify-center gap-4">
          <button 
            onClick={() => handleRedirect("/auth/signup")} 
            className="rounded-full bg-green-500 hover:bg-green-600 text-white text-sm sm:text-base h-12 px-6 flex items-center justify-center transition shadow-lg cursor-pointer"
          >
            Get Started
          </button>
          <button 
            onClick={() => handleRedirect("/dashboard")} 
            className="rounded-full border border-black text-black hover:bg-black hover:text-white transition text-sm sm:text-base h-12 px-6 flex items-center justify-center shadow-lg cursor-pointer"
          >
            {session ? "Go to Dashboard" : "Login"}
          </button>
        </div>
      </div>

      {/* Features Section */}
      <div className="flex flex-col items-center justify-center p-8 bg-blue-600 text-gray-100 py-16">
        <h2 className="text-3xl font-semibold mb-4 text-white">Why Join RateMyDino?</h2>
        <p className="max-w-2xl text-center mb-8 text-lg text-gray-200">
          Rate dinosaurs, read reviews, and become part of the ultimate dino community.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl">
          <FeatureCard icon={<FaRocket />} title="Fast & Fun" description="Rate dinosaurs instantly with an intuitive UI." />
          <FeatureCard icon={<FaShieldAlt />} title="Trusted Reviews" description="Read honest reviews from real dino lovers." />
          <FeatureCard icon={<FaUsers />} title="Community" description="Join a network of enthusiasts worldwide." />
        </div>
      </div>
    </div>
  );
}

function FeatureCard({ icon, title, description }) {
  return (
    <div className="p-6 rounded-lg shadow-md bg-gradient-to-r from-blue-500 to-purple-500 text-white transform transition-transform hover:scale-105 cursor-pointer">
      <div className="text-3xl mb-3 mx-auto flex justify-center">{icon}</div>
      <h3 className="text-xl font-semibold mb-2 text-center">{title}</h3>
      <p className="text-center">{description}</p>
    </div>
  );
}
