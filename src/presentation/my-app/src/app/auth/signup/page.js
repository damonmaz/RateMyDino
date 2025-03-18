"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";

export default function SignUp() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/dashboard");
    }
  }, [status, router]);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    alert(`Signup logic goes here for ${formData.firstName} ${formData.lastName}!`);
    localStorage.setItem("userName", `${formData.firstName} ${formData.lastName}`);
    router.push("/auth/signin");
  };

  return (
    <div className="bg-white text-black min-h-screen">
      <Navbar />
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-full max-w-md bg-gray-100 p-8 rounded-lg shadow-md">
          <h1 className="text-2xl font-bold text-center mb-6">Sign Up</h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input className="border p-2 w-full mb-4 rounded" type="text" name="firstName" placeholder="First Name" required onChange={handleChange} />
            <input className="border p-2 w-full mb-4 rounded" type="text" name="lastName" placeholder="Last Name" required onChange={handleChange} />
            <input className="border p-2 w-full mb-4 rounded" type="email" name="email" placeholder="Email" required onChange={handleChange} />
            <input className="border p-2 w-full mb-4 rounded" type="password" name="password" placeholder="Password" required onChange={handleChange} />
            <button className="w-full bg-green-600 text-white p-2 rounded mb-4 hover:bg-green-700 transition cursor-pointer">
              Sign Up
            </button>
          </form>
          <p className="text-center mt-4 text-gray-700">
            Already have an account?{" "}
            <span onClick={() => router.push("/auth/signin")} className="text-blue-500 cursor-pointer hover:underline">
              Sign in
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
