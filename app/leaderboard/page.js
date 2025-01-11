'use client'; // This tells Next.js that the following component is client-side only

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { db, collection, getDocs } from '../firebaseConfig'; // Adjust path if necessary

export default function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);

  // Fetch the data from Firestore when the component mounts
  useEffect(() => {
    const fetchLeaderboardData = async () => {
      const scoresCollection = collection(db, 'Scores');
      const snapshot = await getDocs(scoresCollection);

      const scoresData = await Promise.all(
        snapshot.docs.map(async (docRef) => {
          const docData = docRef.data();
          const hostelName = docRef.id; // Document ID as the hostel name (H1, H2, H3, etc.)
          const score = docData.score; // 'score' field for points

          return { hostel: hostelName, points: score };
        })
      );

      // Sort the scoresData array by points in descending order
      const sortedData = scoresData.sort((a, b) => b.points - a.points);
      setLeaderboard(sortedData);
    };

    fetchLeaderboardData();
  }, []);

  return (
    <div className="bg-gradient-to-r from-blue-500 to-purple-600 min-h-screen flex flex-col">
      {/* Navbar */}
      <header className="flex justify-between items-center bg-gray-900 text-white p-4 shadow-lg">
        <h1 className="text-2xl font-bold">GC Hub</h1>
        <nav>
          <ul className="flex space-x-6">
            <li className="cursor-pointer hover:underline">
              <Link href="../publicPage">Home</Link>
            </li>
            <li className="cursor-pointer hover:underline">
              <Link href="../leaderboard">Leaderboard</Link>
            </li>
            <li className="cursor-pointer hover:underline">
              <Link href="../events">Event</Link>
            </li>
            <li className="cursor-pointer hover:underline">
              <Link href="../participation">Participate</Link>
            </li>
            <li className="cursor-pointer hover:underline">
              <Link href="../faq">FAQ</Link>
            </li>
            <li className="cursor-pointer hover:underline">
              <Link href="../hallRep">Hall Reps</Link>
            </li>
          </ul>
        </nav>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <div className="text-center">
          <h2 className="text-4xl font-extrabold mb-4 text-white drop-shadow-md">
            Leaderboard
          </h2>
          <p className="text-white text-lg mb-6 drop-shadow-md">
            Here are the current rankings of the hostels in the GC tournament:
          </p>
        </div>

        {/* Leaderboard Table */}
        <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
          <table className="min-w-full">
            <thead className="bg-gray-800">
              <tr>
                <th className="py-3 px-6 text-left text-sm font-medium text-white">Ranking</th>
                <th className="py-3 px-6 text-left text-sm font-medium text-white">Hostel Name</th>
                <th className="py-3 px-6 text-left text-sm font-medium text-white">Points</th>
              </tr>
            </thead>
            <tbody>
              {leaderboard.map((entry, index) => (
                <tr
                  key={index}
                  className={`${
                    index % 2 === 0 ? 'bg-gray-100' : 'bg-gray-50'
                  } border-t border-gray-200`}
                >
                  <td className="py-3 px-6 text-sm text-gray-800 font-semibold">
                    {index + 1}
                  </td>
                  <td className="py-3 px-6 text-sm text-gray-800">{entry.hostel}</td>
                  <td className="py-3 px-6 text-sm text-gray-800">{entry.points}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
