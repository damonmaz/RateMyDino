"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import Navbar from "@/components/Navbar";
import Loading from "../loading";

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [userName, setUserName] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [professors, setProfessors] = useState([]);
  const [fadeInStep, setFadeInStep] = useState(0);
  const resultsRef = useRef(null);
  const [showScrollIndicator, setShowScrollIndicator] = useState(false);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

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

    let delay = 500;
    const fadeSequence = [
      setTimeout(() => setFadeInStep(1), delay),
      setTimeout(() => setFadeInStep(2), delay + 500),
      setTimeout(() => setFadeInStep(3), delay + 1000),
      setTimeout(() => setFadeInStep(4), delay + 1500),
    ];

    return () => fadeSequence.forEach(clearTimeout);
  }, [status, router, session]);

  const handleSearch = async () => {
    if (!searchQuery) return;

    setLoading(true);
    setSearched(true);
    setShowScrollIndicator(false);

    try {
      const response = await fetch(`/api/professors?search=${searchQuery}`);
      const data = await response.json();
      setProfessors(data);

      setTimeout(() => {
        if (resultsRef.current) {
          setShowScrollIndicator(resultsRef.current.scrollHeight > resultsRef.current.clientHeight);
        }
      }, 100);
    } catch (error) {
      console.error("Error fetching professors:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleProfessorClick = (prof) => {
    router.push(`/dashboard/${prof.name}`);
  };

  if (status === "loading") return <Loading />;

  return (
    <div className="bg-white text-black min-h-screen flex flex-col">
      <Navbar />

      <div className="max-w-4xl mx-auto pt-20 p-6">
        <h1
          className={`text-5xl font-bold mb-6 px-8 py-4 bg-gray-100 rounded-lg transition-all ${
            fadeInStep >= 1 ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
          }`}
        >
          Welcome, {userName}!
        </h1>

        <p
          className={`text-lg text-gray-700 mb-6 px-6 py-4 bg-gray-100 rounded-lg transition-all ${
            fadeInStep >= 2 ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
          }`}
        >
          🔍 Search for a professor at the <b>University of Calgary</b> <br />
          📌 Click on their name to <b>view their details</b> <br />
          🤖 Let <b>AI generate a summarized review</b> for you!
        </p>

        <div
          className={`flex flex-col sm:flex-row items-start gap-4 mb-6 transition-all ${
            fadeInStep >= 3 ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
          }`}
        >
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for a professor..."
            onKeyDown={handleKeyPress}
            className="p-3 border rounded-lg w-full sm:w-96 text-lg"
          />
          <button
            onClick={handleSearch}
            className="border border-black px-6 py-3 rounded-lg transition-all hover:bg-blue-500 hover:text-white text-lg cursor-pointer"
          >
            Search
          </button>
        </div>

        {loading ? (
          <Loading />
        ) : (
          <div
            ref={resultsRef}
            className={`relative flex-grow transition-all bg-gray-200 p-4 rounded-lg shadow-md ${
              fadeInStep >= 4 ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
            }`}
            style={{
              maxHeight: "450px",
              overflowY: professors.length > 0 ? "auto" : "hidden",
            }}
          >
            {showScrollIndicator && (
              <div className="absolute bottom-0 left-0 w-full h-10 bg-gradient-to-t from-gray-200 to-transparent pointer-events-none"></div>
            )}

            {searched && professors.length === 0 ? (
              <div className="text-center text-gray-600 py-4">
                No Professors With That Name, Make Sure Spelling Is Correct
              </div>
            ) : professors.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-300 p-2">
                {professors.map((prof, index) => (
                  <div
                    key={prof.id}
                    onClick={() => handleProfessorClick(prof)}
                    className={`p-4 bg-gray-100 border-2 border-gray-500 rounded-lg shadow cursor-pointer hover:bg-gray-200 transition transform ${
                      fadeInStep >= 4 ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
                    } delay-${index * 200}`}
                  >
                    <h2 className="text-xl font-semibold">{prof.name}</h2>
                    <p className="text-gray-600">Click to view details</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center text-gray-500 py-4">No Professors Found</div>
            )}
          </div>
        )}
      </div>

      <div className="h-24"></div>
    </div>
  );
}
