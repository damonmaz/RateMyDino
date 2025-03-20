"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Information from "@/components/Information";
import FeatureCard from "@/components/FeatureCard";
import Slider from "@/components/SliderComponents/HomeSlider";
import { FaRocket, FaShieldAlt, FaUsers } from "react-icons/fa";
import Loading from "./loading";

export default function Home() {
  const { data: session } = useSession();
  const router = useRouter();

  const handleRedirect = (path) => {
    if (!session) {
      router.push("/auth/signin");
    } else {
      router.push(path);
    }
  };

  const [isSticky, setIsSticky] = useState(false);
  const [navbarOriginalTop, setNavbarOriginalTop] = useState(0);

  useEffect(() => {
    const navbar = document.getElementById("navbar");
    const gradientDiv = document.getElementById("gradient");
    const spacerDiv = document.getElementById("spacer");

    if (navbar && gradientDiv) {
      setNavbarOriginalTop(gradientDiv.offsetTop + gradientDiv.offsetHeight);
    }

    const handleScroll = () => {
      if (window.scrollY >= navbarOriginalTop + 50) {
        setIsSticky(true);
        if (spacerDiv) spacerDiv.style.display = "block";
      } else if (window.scrollY <= navbarOriginalTop - 50) {
        setIsSticky(false);
        if (spacerDiv) spacerDiv.style.display = "none";
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [navbarOriginalTop]);

  return (
    <div className="relative min-h-screen text-white">
      
      <div className="h-[90vh] flex flex-col items-center justify-center bg-[#001f3f]">
        <Image
          src="/Logo.png"
          alt="RateMyDino Logo"
          width={320}
          height={320}
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

      <div id="gradient" className="h-[10vh] bg-gradient-to-b from-[#001f3f] via-black to-[#001f3f]"></div>

      <div id="navbar" className={`w-full transition-all duration-300 ${isSticky ? "fixed top-0 z-50 shadow-lg" : "relative"}`}>
        <Navbar />
      </div>

      <div id="spacer" className="hidden h-16 bg-gradient-to-b from-black to-white"></div>

      <div className="relative w-full h-[70vh]">
        <Image
          src="/UniversityOfCalgary.jpg"
          alt="RateMyDino Background"
          layout="fill"
          objectFit="cover"
          className="z-0"
        />
        <Information />
      </div>

      <div className="flex flex-col items-center justify-center flex-grow p-12 bg-blue-600 text-gray-100 py-24">
        <h2 className="text-4xl font-semibold mb-6 text-white">Why Join RateMyDino?</h2>
        <p className="max-w-3xl text-center mb-12 text-xl text-gray-200">
          Rate professors, read reviews, and become part of the ultimate dino community.
        </p>
    
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 max-w-5xl">
          <FeatureCard icon={<FaRocket />} title="Fast & Fun" description="Rate professors instantly with an intuitive UI." />
          <FeatureCard icon={<FaShieldAlt />} title="Trusted Reviews" description="Read AI generated reviews created from real UofC students." />
          <FeatureCard icon={<FaUsers />} title="Community" description="Join a network of enthusiasts from around the university." />
        </div>
      </div>

      <Slider />
    </div>
  );
}
