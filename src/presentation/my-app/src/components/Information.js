"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FaArrowRight } from "react-icons/fa";

export default function Information() {
  const { data: session } = useSession();
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const infoSection = document.getElementById("info-section");
      if (infoSection) {
        const rect = infoSection.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.8) {
          setIsVisible(true);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      id="info-section"
      className={`absolute inset-0 flex items-center justify-center transition-opacity duration-1000 px-4 sm:px-12 ${
        isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
      }`}
    >
      <div className="relative w-full h-full p-12 flex flex-col justify-center bg-gradient-to-r from-black/80 via-black/60 to-black/20 text-white">
        <h1 className="font-bold mb-6" style={{ fontSize: "3vh" }}>
          Welcome to RateMyDino
        </h1>
        <p className="leading-relaxed mb-6 max-w-3xl" style={{ fontSize: "1.5vh" }}>
          Finding the right professor at the University of Calgary has never been easier! 
          RateMyDino helps students <b>quickly and efficiently</b> get reviews on professors 
          using AI-powered summarization. Instead of manually reading dozens of reviews, 
          follow these simple steps:
        </p>

        <ul className="space-y-4">
          <li className="flex items-center">
            <FaArrowRight className="text-white mr-3" style={{ fontSize: "1.5vh" }} />
            <span style={{ fontSize: "1.5vh" }}>
              🔑 <b>Login</b>: Sign in with your account to get started.
            </span>
          </li>
          <li className="flex items-center">
            <FaArrowRight className="text-white mr-3" style={{ fontSize: "1.5vh" }} />
            <span style={{ fontSize: "1.5vh" }}>
              🔍 <b>Search</b>: Type in a professor&apos;s name to find reviews.
            </span>
          </li>
          <li className="flex items-center">
            <FaArrowRight className="text-white mr-3" style={{ fontSize: "1.5vh" }} />
            <span style={{ fontSize: "1.5vh" }}>
              🤖 <b>AI Summary</b>: Get an instant, AI-generated overview of the professor&apos;s ratings, teaching style, and tips.
            </span>
          </li>
        </ul>

        <p className="mt-6 max-w-3xl" style={{ fontSize: "1.5vh" }}>
          No more endless scrolling—our chatbot does the work for you!  
          Get started today and find the best professors for your courses.
        </p>

        <div className="flex justify-start gap-6 mt-8">
          <button 
            onClick={() => router.push("/about")} 
            className="rounded-full bg-blue-500 hover:bg-blue-600 text-white h-14 px-8 flex items-center justify-center transition shadow-lg cursor-pointer"
            style={{ fontSize: "1.5vh" }}
          >
            About Us
          </button>
          <button 
            onClick={() => router.push(session ? "/dashboard" : "/auth/signin")} 
            className="rounded-full border-2 border-white text-white hover:bg-white hover:text-black transition h-14 px-8 flex items-center justify-center shadow-lg cursor-pointer"
            style={{ fontSize: "1.5vh" }}
          >
            {session ? "Go to Dashboard" : "Sign In to Get Started"}
          </button>
        </div>
      </div>
    </div>
  );
}
