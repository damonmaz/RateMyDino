"use client";

import { useEffect, useState, useRef } from "react";
import SlideBox from "./SlideBox";
import ShareUs from "./ShareUs";
import ReviewUs from "./ReviewUs";
import JoinUs from "./JoinUs";
import ContactUs from "./ContactUs";
import DashboardLink from "./DashboardLink";

const slides = [
  { id: "share", component: <ShareUs />, image: "/SliderImages/ShareUs.jpg", link: "mailto:?subject=Check%20out%20RateMyDino!&body=Hey!%20Check%20out%20this%20site%20https://ratemydino.com" },
  { id: "review", component: <ReviewUs />, image: "/SliderImages/review.jpg", link: "/reviews" },
  { id: "join", component: <JoinUs />, image: "/SliderImages/SignUp.webp", link: "/auth/signup" },
  { id: "contact", component: <ContactUs />, image: "/SliderImages/ContactUs.jpg", link: "/contact" },
  { id: "dashboard", component: <DashboardLink />, image: "/SliderImages/Dashboard.jpg", link: "/dashboard" },
];

export default function HomeSlider() {
  const [isVisible, setIsVisible] = useState(false);
  const sliderRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 } // 30% visible to trigger
    );

    if (sliderRef.current) {
      observer.observe(sliderRef.current);
    }

    return () => {
      if (sliderRef.current) {
        observer.unobserve(sliderRef.current);
      }
    };
  }, []);

  return (
    <div ref={sliderRef} className="flex flex-col items-center justify-center py-16 bg-gray-900">
      {/* Dark Grey Box with Gradient Border - Animates In */}
      <div className={`relative w-11/12 max-w-6xl rounded-2xl shadow-lg transition-transform duration-1000 ease-in-out 
        ${isVisible ? "animate-fadeInUp opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>

        {/* Gradient Border */}
        <div className="absolute inset-0 rounded-2xl p-[2px] bg-gradient-to-r from-red-500 to-orange-500"></div>

        {/* Inner Dark Grey Box */}
        <div className="relative bg-gray-700 rounded-2xl p-8 m-[2px]">
          <h2 className="text-4xl font-semibold text-white mb-6 text-center">Get Involved</h2>
          <p className="text-lg text-gray-300 mb-6 max-w-2xl text-center mx-auto">
            Explore different ways to engage with RateMyDino!
          </p>

          {/* Slider Container */}
          <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-700 rounded-lg">
            <div className="flex space-x-6 p-4">
              {slides.map((slide, index) => (
                <SlideBox key={index} image={slide.image} link={slide.link}>
                  {slide.component}
                </SlideBox>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
