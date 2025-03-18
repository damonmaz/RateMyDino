"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";

export default function ProfessorPage({ params }) {
  const { id } = params;
  const router = useRouter();
  const [professor, setProfessor] = useState(null);

  useEffect(() => {
    const fetchProfessor = async () => {
      try {
        const response = await fetch(`/api/professors/${id}`);
        const data = await response.json();
        setProfessor(data);
      } catch (error) {
        console.error("Error fetching professor:", error);
      }
    };
    fetchProfessor();
  }, [id]);

  if (!professor) return <p>Loading...</p>;

  return (
    <div className="bg-white text-black min-h-screen">
      <Navbar />
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-3xl font-bold">{professor.name}</h1>
        <p className="text-gray-700">{professor.description}</p>

        {/* Score Bar */}
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

        {/* Reviews */}
        <div className="mt-6">
          <h2 className="text-xl font-semibold">Reviews</h2>
          <div className="space-y-4 mt-2">
            {professor.reviews?.map((review, index) => (
              <div key={index} className="p-4 bg-gray-100 rounded-lg shadow">
                <p>{review}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
