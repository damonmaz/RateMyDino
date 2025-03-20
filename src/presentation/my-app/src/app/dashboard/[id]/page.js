"use client";

import { useEffect, useState, useRef } from "react";
import { useParams } from "next/navigation";
import { FaArrowLeft } from "react-icons/fa";
import Navbar from "@/components/Navbar";
import Loading from "@/app/loading";
import CourseDetails from "@/components/CourseDetails";
import Image from "next/image";

export default function ProfessorPage() {
  const { id: rawProfName } = useParams();
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [fadeInStep, setFadeInStep] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [professorSummary, setProfessorSummary] = useState(null);
  const [overallScore, setOverallScore] = useState(null);
  const [professorCourses, setProfessorCourses] = useState([]);
  const profName = decodeURIComponent(rawProfName).replace(/[^a-zA-Z\s]/g, "").trim();

  const coursesRef = useRef([]);
  const tagsRef = useRef([]);
  const difficultyRef = useRef(null);

  useEffect(() => {
    const fetchProfessorData = async () => {
      try {
        if (coursesRef.current.length > 0) {
          setProfessorCourses(coursesRef.current);
          setLoading(false);
          return;
        }

        const [summaryRes, coursesRes, tagsRes, difficultyRes, overallScoreRes] = await Promise.all([
          fetch(`http://127.0.0.1:5000/professor/${encodeURIComponent(profName)}/summary`),
          fetch(`http://127.0.0.1:5000/professor/${encodeURIComponent(profName)}/courses`),
          fetch(`http://127.0.0.1:5000/professor/${encodeURIComponent(profName)}/tags`),
          fetch(`http://127.0.0.1:5000/professor/${encodeURIComponent(profName)}/DifficultyScore`),
          fetch(`http://127.0.0.1:5000/professor/${encodeURIComponent(profName)}/OverallScore`)
        ]);

        if (![summaryRes, coursesRes, tagsRes, difficultyRes, overallScoreRes].every((res) => res.ok)) {
          throw new Error("Failed to fetch professor data");
        }

        const [summaryData, coursesData, tagsData, difficultyData, overallScoreData] = await Promise.all([
          summaryRes.json(),
          coursesRes.json(),
          tagsRes.json(),
          difficultyRes.json(),
          overallScoreRes.json()
        ]);

        setProfessorSummary(summaryData.Summary || "No summary available.");
        setOverallScore(overallScoreData["Overall Score"] || "N/A");

        const uniqueCourses = Array.isArray(coursesData.Courses) ? [...new Set(coursesData.Courses)] : [];
        coursesRef.current = uniqueCourses;
        setProfessorCourses(uniqueCourses);
        tagsRef.current = tagsData.Tags || [];
        difficultyRef.current = difficultyData["Difficulty Score"];

        let delay = 300;
        const fadeSteps = [
          setTimeout(() => setFadeInStep(1), delay),
          setTimeout(() => setFadeInStep(2), delay + 300),
          setTimeout(() => setFadeInStep(3), delay + 600),
          setTimeout(() => setFadeInStep(4), delay + 900)
        ];

        return () => fadeSteps.forEach(clearTimeout);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfessorData();
  }, [profName]);

  if (loading) return <Loading />;

  return (
    <div className="bg-white text-black min-h-screen flex flex-col">
      <Navbar />
      <div className="max-w-4xl mx-auto p-6 pt-[7rem] transition-all duration-700">
        {selectedCourse ? (
          <CourseDetails
            profName={profName}
            courseId={selectedCourse}
            onClose={() => setSelectedCourse(null)}
          />
        ) : (
          <>
            <button
              onClick={() => window.history.back()}
              className="flex items-center gap-2 bg-gray-200 px-4 py-2 rounded-md hover:bg-gray-300 transition mb-4 cursor-pointer"
            >
              <FaArrowLeft className="text-lg" /> Back
            </button>

            {error ? (
              <h1 className="text-3xl font-bold text-red-500">{error}</h1>
            ) : (
              <>
                <div className={`transition-all duration-700 ${fadeInStep >= 1 ? "opacity-100" : "opacity-0"}`}>
                  <div className="flex justify-between items-center border-b-2 pb-4">
                    <h1 className="text-4xl font-bold">{profName}</h1>
                  </div>
                </div>

                <div className={`flex flex-wrap gap-2 mt-4 transition-all duration-700 ${fadeInStep >= 2 ? "opacity-100" : "opacity-0"}`}>
                  {tagsRef.current.length > 0 ? (
                    tagsRef.current.map((tag, index) => (
                      <span key={index} className="px-3 py-1 bg-gray-200 rounded-full text-sm">
                        {tag}
                      </span>
                    ))
                  ) : (
                    <p className="text-gray-600">No tags available</p>
                  )}
                </div>

                <div className={`mt-4 transition-all duration-700 ${fadeInStep >= 3 ? "opacity-100" : "opacity-0"}`}>
                  <h2 className="text-xl font-semibold text-gray-900">Overall Score:</h2>
                  <p className="text-4xl font-bold text-blue-600">
                    {overallScore} / 5
                  </p>
                </div>

                <div className={`mt-2 transition-all duration-700 ${fadeInStep >= 3 ? "opacity-100" : "opacity-0"}`}>
                  <h2 className="text-lg font-semibold text-gray-800">Difficulty Score:</h2>
                  <p className="text-xl font-semibold text-gray-800">
                    {difficultyRef.current} / 5
                  </p>
                </div>

                <div className={`mt-6 bg-gray-100 p-6 rounded-lg shadow transition-all duration-700 ${fadeInStep >= 4 ? "opacity-100" : "opacity-0"}`}>
                  <h2 className="text-2xl font-semibold border-b-2 pb-2 mb-4">Overall Summary</h2>
                  <p className="text-gray-700 whitespace-pre-line">{professorSummary}</p>
                </div>

                <div className={`mt-6 border-b pb-4 flex flex-col sm:flex-row gap-2 transition-all duration-700 ${fadeInStep >= 4 ? "opacity-100" : "opacity-0"}`}>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search for a course..."
                    className="w-full p-3 border rounded-lg"
                  />
                </div>

                <div className="mt-6 space-y-4">
                  {Array.isArray(professorCourses) && professorCourses.length > 0 ? (
                    professorCourses
                      .filter((course) =>
                        course.toLowerCase().includes(searchQuery.toLowerCase())
                      )
                      .map((course, index) => (
                        <div
                          key={index}
                          onClick={() => setSelectedCourse(course)}
                          className="p-4 bg-gray-100 rounded-lg shadow cursor-pointer hover:bg-gray-200 transition"
                        >
                          <h2 className="text-xl font-semibold">{course}</h2>
                        </div>
                      ))
                  ) : (
                    <div className="flex flex-col items-center justify-center">
                      <Image className="animate-spin" src="/Logo.png" alt="No courses available" width={100} height={100} />
                      <p className="text-gray-600 mt-2">No courses found. Retrying...</p>
                    </div>
                  )}
                </div>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}
