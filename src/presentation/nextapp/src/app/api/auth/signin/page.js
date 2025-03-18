"use client";

import { getProviders, signIn } from "next-auth/react";
import { useEffect, useState } from "react";
import { FaGoogle } from "react-icons/fa";

export default function SignIn() {
  const [providers, setProviders] = useState(null);

  useEffect(() => {
    async function fetchProviders() {
      const res = await getProviders();
      setProviders(res);
    }
    fetchProviders();
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-navy">
      <div className="bg-white border border-black p-8 rounded-lg shadow-lg w-80 sm:w-96 text-center">
        <h1 className="text-xl font-bold mb-6 text-black">Sign in to Your Account</h1>
        
        {providers &&
          Object.values(providers).map((provider) => (
            <button
              key={provider.id}
              onClick={() => signIn(provider.id)}
              className="flex items-center justify-center gap-2 w-full px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-700 transition"
            >
              <FaGoogle className="text-xl" />
              Sign in with {provider.name}
            </button>
          ))}
      </div>
    </div>
  );
}
