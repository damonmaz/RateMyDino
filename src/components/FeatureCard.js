"use client";

export default function FeatureCard({ icon, title, description }) {
  return (
    <div className="p-8 rounded-lg shadow-lg bg-gradient-to-r from-blue-500 to-purple-500 text-white transform transition-transform hover:scale-105 cursor-pointer">
      <div className="text-4xl mb-4 mx-auto flex justify-center">{icon}</div>
      <h3 className="text-2xl font-semibold mb-3 text-center">{title}</h3>
      <p className="text-lg text-center">{description}</p>
    </div>
  );
}