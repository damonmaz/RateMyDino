"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FaGoogle } from "react-icons/fa";

export default function SignIn() {
  const router = useRouter();

  const handleSignIn = async () => {
    await signIn("google");
    router.push("/dashboard"); // Redirect after login
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white text-black">
      <div className="w-full max-w-md bg-gray-100 p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center mb-6">Sign In</h1>

        {/* Email & Password Fields */}
        <input className="border p-2 w-full mb-4 rounded" type="email" placeholder="Email" />
        <input className="border p-2 w-full mb-4 rounded" type="password" placeholder="Password" />
        
        {/* Sign In Button */}
        <button className="w-full bg-blue-600 text-white p-2 rounded mb-4 hover:bg-blue-700 transition cursor-pointer">
          Sign In
        </button>

        {/* Sign in with Google */}
        <button onClick={handleSignIn} className="w-full flex items-center justify-center bg-red-500 text-white p-2 rounded hover:bg-red-600 transition cursor-pointer">
          <FaGoogle className="mr-2" />
          Sign in with Google
        </button>

        {/* Sign Up Link */}
        <p className="text-center mt-4 text-gray-700">
          Don't have an account?{" "}
          <span onClick={() => router.push("/auth/signup")} className="text-blue-500 cursor-pointer hover:underline">
            Sign up
          </span>
        </p>
      </div>
    </div>
  );
}
