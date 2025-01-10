"use client";

import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { useRouter } from "next/navigation";
import "../styles/globals.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Extract the role from the email
      if (email === "gc-admin@iitrpr.ac.in") {
        router.push("/admin/dashboard");
      } else if (email.endsWith("gc-coordinator@iitrpr.ac.in")) {
        router.push("/coordinator/dashboard");
      } else if (email.endsWith("gc-hr@iitrpr.ac.in")) {
        router.push("/hr/dashboard");
      } else if (/\d{4}[a-z]{3}\d{4}@iitrpr.ac.in/.test(email)) {
        // Regex matches student email format: e.g., 2023csb1108@iitrpr.ac.in
        router.push("/student/dashboard");
      } else {
        throw new Error("Unrecognized role");
      }
    } catch (err: any) {
      console.error("Error during login:", err.message);
      setError("Invalid credentials or unauthorized access.");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center mb-4">Login</h1>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Login
          </button>
          {error && <p className="mt-4 text-sm text-red-500">{error}</p>}
        </form>
      </div>
    </div>
  );
}
