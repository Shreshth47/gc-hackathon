'use client';
import { useEffect, useState } from 'react';
import { db } from '../firebaseConfig'; // Adjust the path if needed
import { collection, getDocs } from 'firebase/firestore';
import Link from 'next/link';

export default function HallRep() {
  const [hallReps, setHallReps] = useState([]);

  useEffect(() => {
    const fetchHallReps = async () => {
      try {
        // Fetch documents from the 'HR' collection
        const querySnapshot = await getDocs(collection(db, 'HR'));
        const repsData = querySnapshot.docs.map((doc) => doc.data());

        // Update the state with the hall reps data
        setHallReps(repsData);
      } catch (error) {
        console.error('Error fetching hall reps: ', error);
      }
    };

    fetchHallReps();
  }, []);

  return (
    <div className="flex flex-col h-screen bg-gray-900 text-white">
      {/* Header */}
      <header className="flex justify-between items-center bg-gray-800 p-4">
        <h1 className="text-2xl font-bold">GC Hub</h1>
        <nav>
          <ul className="flex space-x-6 text-sm font-medium">
            <li className="hover:text-blue-400">
              <Link href="../publicPage">Home</Link>
            </li>
            <li className="hover:text-blue-400">
              <Link href="../leaderboard">Leaderboard</Link>
            </li>
            <li className="hover:text-blue-400">
              <Link href="../events">Event</Link>
            </li>
            <li className="hover:text-blue-400">
              <Link href="../participation">Participate</Link>
            </li>
            <li className="hover:text-blue-400">
              <Link href="../faq">FAQ</Link>
            </li>
            <li className="hover:text-blue-400">
              <Link href="../hallRep">Hall Reps</Link>
            </li>
          </ul>
        </nav>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-6 bg-gray-900">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-semibold mb-6 text-blue-400">Hall Representatives</h2>
          {hallReps.length === 0 ? (
            <p className="text-gray-300 text-center">No hall representatives available.</p>
          ) : (
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {hallReps.map((rep, index) => (
                <li
                  key={index}
                  className="bg-gray-800 p-4 border border-gray-700 rounded-lg shadow-md hover:shadow-lg transition-shadow"
                >
                  <h3 className="text-xl font-semibold text-blue-300">{rep.name}</h3>
                  <p className="text-gray-400 mt-2">
                    <span className="font-medium text-gray-300">Hostel:</span> {rep.hostel}
                  </p>
                  <p className="text-gray-400">
                    <span className="font-medium text-gray-300">Email:</span> {rep.email}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </main>
    </div>
  );
}
