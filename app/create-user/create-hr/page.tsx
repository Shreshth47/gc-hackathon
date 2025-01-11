"use client";

import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../firebaseConfig";
import { doc, setDoc } from "firebase/firestore";

export default function CreateHR() {
  const [name, setName] = useState("");
  const [hostel, setHostel] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");

    // Generate email from the hostel input
    const email = `${hostel}-gc-hr@iitrpr.ac.in`;

    try {
      // Create HR in Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      console.log("Firebase user created:", user);

      // Store HR data in Firestore "HR" collection
      await setDoc(doc(db, "HR", user.uid), {
        name,
        email,
        hostel,
        role: "hr",
      });

      setMessage("HR created successfully and stored in the 'HR' collection.");
    } catch (err: any) {
      console.error("Error creating HR or storing data:", err.message);
      setMessage(`Error: ${err.message}`);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">Create HR</h1>
      <form onSubmit={handleSubmit} className="w-full max-w-md bg-white p-6 rounded-md shadow-md">
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full mt-1 px-3 py-2 border rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Hostel</label>
          <input
            type="text"
            value={hostel}
            onChange={(e) => setHostel(e.target.value)}
            className="w-full mt-1 px-3 py-2 border rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full mt-1 px-3 py-2 border rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Generated Email</label>
          <input
            type="email"
            value={`${hostel}-gc-hr@iitrpr.ac.in`} // Automatically generated
            disabled
            className="w-full mt-1 px-3 py-2 border bg-gray-100 rounded-md"
          />
        </div>
        <button
          type="submit"
          className="w-full px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
        >
          Create HR
        </button>
        {message && <p className="mt-4 text-sm text-green-500">{message}</p>}
      </form>
    </div>
  );
}
