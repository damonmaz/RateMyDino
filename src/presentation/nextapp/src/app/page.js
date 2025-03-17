export default function HomePage() {
  return (
    <section className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-gray-200">
      {/* Hero Section */}
      <div className="text-center p-6 max-w-3xl">
        <h1 className="text-4xl font-bold text-white sm:text-5xl">
          Welcome to My Next.js App 🚀
        </h1>
        <p className="text-lg text-gray-400 mt-4">
          Build fast, modern, and scalable applications with Next.js & TailwindCSS.
        </p>
        <button className="mt-6 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-lg transition-all">
          Get Started
        </button>
      </div>

      {/* Features Section */}
      <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6 px-6 max-w-5xl">
        <div className="p-6 bg-gray-800 rounded-lg shadow-md text-center">
          <h3 className="text-xl font-semibold text-white">🔥 Blazing Fast</h3>
          <p className="text-gray-400 mt-2">Optimized for performance with automatic static generation.</p>
        </div>
        <div className="p-6 bg-gray-800 rounded-lg shadow-md text-center">
          <h3 className="text-xl font-semibold text-white">⚡ Instant Routing</h3>
          <p className="text-gray-400 mt-2">Seamless navigation with Next.js App Router.</p>
        </div>
        <div className="p-6 bg-gray-800 rounded-lg shadow-md text-center">
          <h3 className="text-xl font-semibold text-white">🎨 Styled with Tailwind</h3>
          <p className="text-gray-400 mt-2">Beautiful, responsive UI with utility-first CSS.</p>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-12 p-4 text-center text-gray-500">
        <p>&copy; {new Date().getFullYear()} My Next.js App. All rights reserved.</p>
      </footer>
    </section>
  );
}
