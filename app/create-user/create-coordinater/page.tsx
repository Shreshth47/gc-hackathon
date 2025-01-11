"use client";

import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../firebaseConfig";
import { doc, setDoc } from "firebase/firestore";

export default function CreateCoordinator() {
  const [name, setName] = useState("");
  const [event, setEvent] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");

    // Generate email from the event input
    const email = `${event}-gc-coordinator@iitrpr.ac.in`;

    try {
      // Create Coordinator in Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      console.log("Firebase user created:", user);

      // Store Coordinator data in Firestore "coordinator" collection
      await setDoc(doc(db, "coordinator", user.uid), {
        name,
        email,
        event,
        role: "coordinator",
      });

      setMessage("Coordinator created successfully and stored in the 'coordinator' collection.");
    } catch (err: any) {
      console.error("Error creating Coordinator or storing data:", err.message);
      setMessage(`Error: ${err.message}`);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">Create Coordinator</h1>
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
          <label className="block text-sm font-medium text-gray-700">Event</label>
          <input
            type="text"
            value={event}
            onChange={(e) => setEvent(e.target.value)}
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
            value={`${event}-gc-coordinator@iitrpr.ac.in`} // Generated dynamically
            disabled
            className="w-full mt-1 px-3 py-2 border bg-gray-100 rounded-md"
          />
        </div>
        <button
          type="submit"
          className="w-full px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
        >
          Create Coordinator
        </button>
        {message && <p className="mt-4 text-sm text-green-500">{message}</p>}
      </form>
    </div>
  );
}
