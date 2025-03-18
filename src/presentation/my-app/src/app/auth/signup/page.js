"use client";

import { useRouter } from "next/navigation";

export default function SignUp() {
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    alert("Signup logic goes here!");
    router.push("/auth/signin"); // Redirect to login after sign-up
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white text-black">
      <div className="w-full max-w-md bg-gray-100 p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center mb-6">Sign Up</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input className="border p-2 w-full rounded" type="email" placeholder="Email" required />
          <input className="border p-2 w-full rounded" type="password" placeholder="Password" required />
          <button className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700 transition cursor-pointer">
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}
