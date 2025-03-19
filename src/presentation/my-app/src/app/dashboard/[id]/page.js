"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Loading from "@/app/loading";

export default function ProfessorPage() {
  const { id: rawProfName } = useParams();
  const router = useRouter();
  const [professor, setProfessor] = useState([]);
  const [courses, setCourses] = useState([]);
  const [tags, setTags] = useState([]);
  const [difficulty, setDifficulty] = useState(null);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const profName = decodeURIComponent(rawProfName).replace(/[^a-zA-Z\s]/g, "").trim();

  useEffect(() => {
    const fetchProfessorData = async () => {
      try {
        const summaryRes = await fetch(`http://127.0.0.1:5000/professor/${encodeURIComponent(profName)}/summary`);
        const coursesRes = await fetch(`http://127.0.0.1:5000/professor/${encodeURIComponent(profName)}/courses`);
        const tagsRes = await fetch(`http://127.0.0.1:5000/professor/${encodeURIComponent(profName)}/tags`);
        const difficultyRes = await fetch(`http://127.0.0.1:5000/professor/${encodeURIComponent(profName)}/DifficultyScore`);

        if (!summaryRes.ok || !coursesRes.ok || !tagsRes.ok || !difficultyRes.ok) {
          throw new Error("Failed to fetch professor data");
        }

        const summaryData = await summaryRes.json();
        const coursesData = await coursesRes.json();
        const tagsData = await tagsRes.json();
        const difficultyData = await difficultyRes.json();

        const parsedSummary = JSON.parse(summaryData.Summary).courses;
        setProfessor(parsedSummary);
        setCourses([...new Set(coursesData.Courses)]);
        setTags(tagsData.Tags || []);
        setDifficulty(difficultyData["Difficulty Score"]);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchProfessorData();
  }, [profName]);

  const handleSearch = () => {
    setSearchQuery(searchQuery.trim());
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  if (!professor.length && !error) return <Loading />;

  return (
    <div className="bg-white text-black min-h-screen">
      <Navbar />
      <div className="max-w-4xl mx-auto p-6 pt-28">
        {error ? (
          <h1 className="text-3xl font-bold text-red-500">{error}</h1>
        ) : (
          <>
            <div className="flex justify-between items-center border-b-2 pb-4">
              <h1 className="text-4xl font-bold">{profName}</h1>
              <div className="bg-blue-500 text-white px-4 py-2 rounded-full text-xl font-semibold">
                5.0
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mt-4">
              {tags.length > 0 ? (
                tags.map((tag, index) => (
                  <span key={index} className="px-3 py-1 bg-gray-200 rounded-full text-sm">
                    {tag}
                  </span>
                ))
              ) : (
                <p className="text-gray-600">No tags available</p>
              )}
            </div>

            <div className="mt-4">
              <h2 className="text-lg font-semibold">Difficulty Score:</h2>
              <p className="text-xl font-semibold text-gray-800">{difficulty} / 5</p>
            </div>

            <div className="mt-6 border-b pb-4 flex flex-col sm:flex-row gap-2">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for a course..."
                onKeyDown={handleKeyPress}
                className="w-full p-3 border rounded-lg"
              />
              <button
                onClick={handleSearch}
                className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition"
              >
                Search
              </button>
            </div>

            <div className="mt-6 space-y-4">
              {professor
                .filter((course) => course.course.toLowerCase().includes(searchQuery.toLowerCase()))
                .map((course, index) => (
                  <div
                    key={index}
                    onClick={() => router.push(`/dashboard/${profName}/course/${course.course}`)}
                    className="p-4 bg-gray-100 rounded-lg shadow cursor-pointer hover:bg-gray-200 transition"
                  >
                    <h2 className="text-xl font-semibold">{course.course}</h2>
                    <p className="text-gray-600">{course["Teaching Quality"]}</p>
                  </div>
                ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
