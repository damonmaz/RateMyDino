"use client";

import { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import Loading from "@/app/loading";

export default function CourseDetails({ profName, courseId, onClose }) {
  const [courseDetails, setCourseDetails] = useState(null);
  const [error, setError] = useState(null);
  const [fadeIn, setFadeIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!profName || !courseId) {
      setError("Invalid professor or course.");
      setLoading(false);
      return;
    }

    document.body.classList.add("overflow-hidden");

    const fetchCourseDetails = async () => {
      try {
        const apiUrl = `https://render-ratemydino-726348.onrender.com/professor/${encodeURIComponent(profName)}/course/${encodeURIComponent(courseId.toUpperCase())}/summary`;

        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error("Course details not found");
        }

        const data = await response.json();
        if (!data.Summary) {
          throw new Error("No summary available.");
        }

        setCourseDetails(JSON.parse(data.Summary));
        setTimeout(() => setFadeIn(true), 100);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCourseDetails();

    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [profName, courseId]);

  if (loading) return <Loading />;

  return (
    <div className="fixed inset-0 bg-white z-50 p-6 pt-[4rem] transition-all duration-700 flex flex-col overflow-y-auto max-h-screen">
      <button
        onClick={onClose}
        className="sticky top-0 left-0 flex items-center gap-2 bg-gray-200 px-4 py-2 rounded-md hover:bg-gray-300 transition cursor-pointer z-50"
      >
        <FaArrowLeft className="text-lg" /> Back
      </button>

      <div
        className={`mt-6 transition-all duration-700 ${
          fadeIn ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
        }`}
      >
        {error ? (
          <h1 className="text-3xl font-bold text-red-500">{error}</h1>
        ) : (
          <>
            <h1 className="text-4xl font-bold mb-6">{courseDetails.Course}</h1>

            <div className="space-y-6">
              {Object.entries(courseDetails)
                .filter(([key]) => key !== "Course")
                .map(([title, content], index) => (
                  <div key={index} className="bg-gray-100 p-6 rounded-lg shadow-lg">
                    <h2 className="text-2xl font-semibold border-b-2 pb-2 mb-4">{title}</h2>
                    <p className="text-gray-700">{content}</p>
                  </div>
                ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
