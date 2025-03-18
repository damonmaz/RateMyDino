"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [userName, setUserName] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [professors, setProfessors] = useState([]);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/signin");
    }

    const storedName = localStorage.getItem("userName");
    if (storedName) {
      setUserName(storedName);
    } else if (session?.user?.name) {
      setUserName(session.user.name);
    }
  }, [status, router, session]);

  const handleSearch = async () => {
    if (!searchQuery) return;
    
    try {
      const response = await fetch(`/api/professors?search=${searchQuery}`);
      const data = await response.json();
      setProfessors(data);
    } catch (error) {
      console.error("Error fetching professors:", error);
    }
  };

  if (status === "loading") return <p>Loading...</p>;

  return (
    <div className="bg-white text-black min-h-screen">
      <Navbar />
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-2xl font-bold text-center mb-6">Welcome, {userName}!</h1>

        {/* Search Bar */}
        <div className="flex gap-4 mb-6">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for a professor..."
            className="flex-grow p-2 border rounded-lg"
          />
          <button
            onClick={handleSearch}
            className="border border-black px-4 py-2 rounded-lg transition-all hover:bg-blue-500 hover:text-white"
          >
            Search
          </button>
        </div>

        {/* Display Professors */}
        <div className="space-y-4">
          {professors.map((prof) => (
            <div
              key={prof.id}
              onClick={() => router.push(`/dashboard/${prof.id}`)}
              className="p-4 bg-gray-100 rounded-lg shadow cursor-pointer hover:bg-gray-200 transition"
            >
              <h2 className="text-xl font-semibold">{prof.name}</h2>
              <p className="text-gray-600">{prof.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
