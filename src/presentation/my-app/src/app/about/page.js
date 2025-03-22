"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Image from "next/image";

export default function AboutUs() {
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    setTimeout(() => setFadeIn(true), 200);
  }, []);

  return (
    <div className="relative w-full h-screen">
      <Navbar />

      <Image
        src="/About.jpg"
        alt="About Us Background"
        layout="fill"
        objectFit="cover"
        priority
      />

      <div
        className={`absolute inset-0 bg-gradient-to-r from-black via-black/80 to-black/50 transition-all duration-700 ${
          fadeIn ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
        }`}
      ></div>

      <div className="absolute inset-0 top-[80px] flex flex-col items-center justify-center text-white px-6 text-center">
        <h1
          className={`text-5xl font-bold mb-6 transition-all duration-700 ${
            fadeIn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          About Us
        </h1>
        <p
          className={`text-lg max-w-3xl transition-all duration-700 ${
            fadeIn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          We are a team of <b>aspiring software developers</b> passionate about <b>building solutions</b> that 
          make life easier for everyone. Our mission is to <b>innovate, simplify, and empower</b> through 
          technology—ensuring seamless digital experiences that leave a positive impact.
        </p>

        <div
          className={`mt-6 flex flex-wrap justify-center gap-4 transition-all duration-700 ${
            fadeIn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <a
            href="https://www.linkedin.com/in/damonmazurek/"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 transition rounded-lg text-white font-semibold"
          >
            Damon Mazurek
          </a>
          <a
            href="https://www.linkedin.com/in/aleksander-berezowski/"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 transition rounded-lg text-white font-semibold"
          >
            Aleksander Berezowski
          </a>
          <a
            href="https://www.linkedin.com/in/muhammad-bilal-955a12295"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 transition rounded-lg text-white font-semibold"
          >
            Muhammad Bilal
          </a>
          <a
            href="https://www.linkedin.com/in/césar-garcía-4b90b32aa/"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 transition rounded-lg text-white font-semibold"
          >
            César García
          </a>
          <a
            href="https://www.linkedin.com/in/aadi-chauhan/"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 transition rounded-lg text-white font-semibold"
          >
            Aadi Chauhan
          </a>
          <a
            href="https://www.linkedin.com/in/jaisumer-sandhu-3399b4248/"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 transition rounded-lg text-white font-semibold"
          >
            Jaisumer Sandhu
          </a>
        </div>

        <div
          className={`mt-10 bg-gray-800/70 p-6 rounded-lg transition-all duration-700 ${
            fadeIn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <h2 className="text-2xl font-semibold mb-3">Connect With Us</h2>
          <p className="text-gray-300">
            Want to <b>learn more</b> about our projects and <b>explore opportunities</b> in software development?
            Let&apos;s <b>connect and collaborate</b> to make innovative ideas come to life!
          </p>
        </div>
      </div>
    </div>
  );
}
