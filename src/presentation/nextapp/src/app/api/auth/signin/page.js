"use client";

import { getProviders, signIn } from "next-auth/react";
import { useEffect, useState } from "react";

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
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-4 text-black">Sign in to Your Account</h1>
      {providers &&
        Object.values(providers).map((provider) => (
          <button
            key={provider.id}
            onClick={() => signIn(provider.id)}
            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700"
          >
            Sign in with {provider.name}
          </button>
        ))}
    </div>
  );
}
