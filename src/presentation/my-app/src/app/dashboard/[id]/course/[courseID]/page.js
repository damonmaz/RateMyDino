"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Navbar from "@/components/Navbar";
import Loading from "@/app/loading";

export default function CoursePage() {
  const params = useParams();

  const rawProfName = params.id || "";
  const courseId = params.courseID || "";

  const [courseDetails, setCourseDetails] = useState(null);
  const [error, setError] = useState(null);
  const [fadeIn, setFadeIn] = useState(false);

  const profName = decodeURIComponent(rawProfName).replace(/[^a-zA-Z\s]/g, "").trim();

  useEffect(() => {
    if (!profName || !courseId) {
      setError("Invalid professor or course.");
      return;
    }

    const fetchCourseDetails = async () => {
      try {
        const apiUrl = `http://127.0.0.1:5000/professor/${encodeURIComponent(profName)}/course/${encodeURIComponent(courseId.toUpperCase())}/summary`;

        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error("Course details not found");
        }

        const data = await response.json();
        if (!data.Summary) {
          throw new Error("No summary available.");
        }

        setCourseDetails(JSON.parse(data.Summary));
        setFadeIn(true);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchCourseDetails();
  }, [profName, courseId]);

  if (!courseDetails && !error) return <Loading />;

  return (
    <div className="bg-white text-black min-h-screen">
      <Navbar />
      <div className="max-w-4xl mx-auto p-6 pt-28">
        {error ? (
          <h1 className="text-3xl font-bold text-red-500">{error}</h1>
        ) : (
          <>
            <h1 className="text-4xl font-bold mb-6">{courseDetails.Course}</h1>

            <div className="space-y-6">
              {Object.entries(courseDetails)
                .filter(([key]) => key !== "Course")
                .map(([title, content], index) => (
                  <div
                    key={index}
                    className={`bg-gray-100 p-6 rounded-lg shadow-lg transition-all duration-700 ${
                      fadeIn ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
                    }`}
                    style={{ transitionDelay: `${index * 200}ms` }}
                  >
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
