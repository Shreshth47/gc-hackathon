"use client";

import { useRouter } from "next/navigation";

export default function CreateUsers() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Admin - Create Users</h1>
      <div className="flex space-x-6 mb-6">
        <button
          onClick={() => router.push("/create-user/create-hr")}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300"
        >
          Create HR
        </button>
        <button
          onClick={() => router.push("/create-user/create-coordinator")}
          className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:outline-none focus:ring focus:ring-green-300"
        >
          Create Coordinator
        </button>
      </div>
      <button
        onClick={() => router.push("/Schedule")}
        className="px-6 py-3 pb-5 bg-gray-800 text-white rounded-lg hover:bg-gray-900 focus:outline-none focus:ring focus:ring-gray-500"
      >
        Generate Schedule
      </button>
      <button
        onClick={() => router.push("/Faq/qanda")}
        className="px-6 py-8 bg-gray-800 text-white rounded-lg hover:bg-gray-900 focus:outline-none focus:ring focus:ring-gray-500"
      >
        Answer FAQ
      </button>
    </div>
  );
}
