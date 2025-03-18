"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import { FaRocket, FaShieldAlt, FaUsers } from "react-icons/fa";

export default function Home() {
  const { data: session } = useSession();
  const router = useRouter();

  const handleRedirect = (path) => {
    if (!session) {
      router.push("/auth/signin"); // Redirect to Sign-In if not logged in
    } else {
      router.push(path); // Navigate normally if logged in
    }
  };

  const [isSticky, setIsSticky] = useState(false);
  const [navbarOriginalTop, setNavbarOriginalTop] = useState(0);

  useEffect(() => {
    const navbar = document.getElementById("navbar");
    const gradientDiv = document.getElementById("gradient");
    const spacerDiv = document.getElementById("spacer");

    if (navbar && gradientDiv) {
      setNavbarOriginalTop(gradientDiv.offsetTop + gradientDiv.offsetHeight); // Offset when the gradient ends
    }

    const handleScroll = () => {
      if (window.scrollY >= navbarOriginalTop + 50) {
        // Stick the navbar and show the spacer div to prevent shifting
        setIsSticky(true);
        if (spacerDiv) spacerDiv.style.display = "block";
      } else if (window.scrollY <= navbarOriginalTop - 50) {
        // Unstick the navbar and hide the spacer div when scrolling up
        setIsSticky(false);
        if (spacerDiv) spacerDiv.style.display = "none";
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [navbarOriginalTop]);

  return (
    <div className="relative min-h-screen text-white">
      {/* Hero Section */}
      <div className="h-[90vh] flex flex-col items-center justify-center bg-[#001f3f]">
        <Image
          src="/Logo.png"
          alt="RateMyDino Logo"
          width={120}
          height={120}
          className="opacity-0 animate-fadeIn"
        />
        <h1 className="text-5xl font-bold mt-4 opacity-0 animate-fadeInDelay">
          RateMyDino
        </h1>
        <p className="text-lg text-center mt-4 max-w-lg opacity-0 animate-fadeInLater">
          Dino-Mite Reviews – Let AI find You The Right University of Calgary
          Profs!
        </p>
      </div>

      {/* Gradient Transition - Covers Rest of Screen */}
      <div id="gradient" className="h-[10vh] bg-gradient-to-b from-[#001f3f] via-black to-[#001f3f]"></div>

      {/* Sticky Navbar - Appears when scrolling down, disappears when scrolling up past threshold */}
      <div id="navbar" className={`w-full transition-all duration-300 ${isSticky ? "fixed top-0 z-50 shadow-lg" : "relative"}`}>
        <Navbar />
      </div>

      {/* Spacer Div - Prevents content from shifting up when navbar becomes sticky */}
      <div id="spacer" className="hidden h-16 bg-gradient-to-b from-black to-white"></div>

      {/* Welcome Section - Now With White Background */}
      <div className="bg-white text-black py-20 text-center">
        <h1 className="text-6xl font-bold mb-6">Welcome to RateMyDino 🚀</h1>
        <p className="max-w-xl mx-auto text-xl text-gray-800 mb-12">
          Rate dinosaurs, read reviews, and become part of the ultimate dino community.
        </p>
        <div className="flex justify-center gap-6">
          <button 
            onClick={() => handleRedirect("/auth/signup")} 
            className="rounded-full bg-green-500 hover:bg-green-600 text-white text-lg h-14 px-8 flex items-center justify-center transition shadow-lg cursor-pointer"
          >
            {session ? "About Us" : "Get Started"}
          </button>
          <button 
            onClick={() => handleRedirect("/dashboard")} 
            className="rounded-full border-2 border-black text-black hover:bg-black hover:text-white transition text-lg h-14 px-8 flex items-center justify-center shadow-lg cursor-pointer"
          >
            {session ? "Go to Dashboard" : "Login"}
          </button>
        </div>
      </div>

      {/* Features Section */}
      <div className="flex flex-col items-center justify-center flex-grow p-12 bg-blue-600 text-gray-100 py-24">
        <h2 className="text-4xl font-semibold mb-6 text-white">Why Join RateMyDino?</h2>
        <p className="max-w-3xl text-center mb-12 text-xl text-gray-200">
          Rate dinosaurs, read reviews, and become part of the ultimate dino community.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 max-w-5xl">
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
    <div className="p-8 rounded-lg shadow-lg bg-gradient-to-r from-blue-500 to-purple-500 text-white transform transition-transform hover:scale-105 cursor-pointer">
      <div className="text-4xl mb-4 mx-auto flex justify-center">{icon}</div>
      <h3 className="text-2xl font-semibold mb-3 text-center">{title}</h3>
      <p className="text-lg text-center">{description}</p>
    </div>
  );
}
