"use client";

import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 text-white p-4">
      <div className="text-center">
        {/* Animated 404 text */}
        <h1 className="text-8xl md:text-9xl font-extrabold mb-4 animate-fadeIn">
          404
        </h1>
        <p className="text-3xl md:text-4xl font-semibold mb-2 animate-slideInUp">
          Oops! Page Not Found
        </p>
        <p className="text-lg md:text-xl mb-8 opacity-90 animate-slideInUp animation-delay-200">
          It looks like the page you are looking for has taken a little detour.
        </p>
        <Link
          href="/"
          className="inline-block bg-white text-blue-600 font-bold py-3 px-8 rounded-full shadow-lg hover:bg-gray-100 transition duration-300 transform hover:scale-105 animate-bounceIn"
        >
          Go Home
        </Link>
      </div>

      {/* Tailwind CSS Keyframe Animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes bounceIn {
          0% {
            opacity: 0;
            transform: scale(0.3);
          }
          50% {
            opacity: 1;
            transform: scale(1.05);
          }
          70% {
            transform: scale(0.9);
          }
          100% {
            transform: scale(1);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.8s ease-out forwards;
        }

        .animate-slideInUp {
          animation: slideInUp 0.8s ease-out forwards;
        }

        .animation-delay-200 {
          animation-delay: 0.2s;
        }

        .animate-bounceIn {
          animation: bounceIn 0.8s ease-out forwards;
        }
      `}</style>
    </div>
  );
}