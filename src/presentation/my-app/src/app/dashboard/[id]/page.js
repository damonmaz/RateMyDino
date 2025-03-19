"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Loading from "@/app/loading";

export default function ProfessorPage() {
  const { id: profName } = useParams();
  const router = useRouter();
  const [professor, setProfessor] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfessor = async () => {
      if (!profName) {
        setError("Professor not found");
        return;
      }

      try {
        const response = await fetch(`http://127.0.0.1:5000/professor/${encodeURIComponent(profName)}/summary`);
        if (!response.ok) {
          throw new Error("Professor not found");
        }
        const data = await response.json();
        setProfessor(data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchProfessor();
  }, [profName]);

  if (!professor && !error) return <Loading />;

  return (
    <div className="bg-white text-black min-h-screen">
      <Navbar />
      <div className="max-w-4xl mx-auto p-6">
        {error ? (
          <h1 className="text-3xl font-bold text-red-500">{error}</h1>
        ) : (
          <>
            <h1 className="text-4xl font-bold mb-2">{professor.name}</h1>
            <p className="text-gray-700 text-lg mb-4">{professor.description}</p>

            <div className="mt-6">
              <h2 className="text-xl font-semibold">Overall Rating</h2>
              <div className="w-full bg-gray-300 rounded-full h-6 mt-2">
                <div
                  className="bg-blue-500 h-6 rounded-full transition-all"
                  style={{ width: `${(professor.score / 5) * 100}%` }}
                ></div>
              </div>
              <p className="mt-2 text-lg font-semibold">{professor.score} / 5</p>
            </div>

            <div className="mt-6">
              <h2 className="text-xl font-semibold">Courses Taught</h2>
              <ul className="list-disc list-inside mt-2">
                {professor.Courses?.map((course, index) => (
                  <li key={index} className="text-gray-700">{course}</li>
                ))}
              </ul>
            </div>

            <div className="mt-6">
              <h2 className="text-xl font-semibold">Teaching Tags</h2>
              <div className="flex flex-wrap gap-2 mt-2">
                {professor.Tags?.map((tag, index) => (
                  <span key={index} className="px-3 py-1 bg-gray-200 rounded-full text-sm">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-6">
              <h2 className="text-xl font-semibold">Reviews</h2>
              <div className="space-y-4 mt-2">
                {professor.reviews?.length > 0 ? (
                  professor.reviews.map((review, index) => (
                    <div key={index} className="p-4 bg-gray-100 rounded-lg shadow">
                      <p>{review}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500">No reviews available.</p>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
