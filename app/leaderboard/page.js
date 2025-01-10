'use client';
import Link from 'next/link';

export default function Leaderboard() {
  // Hardcoded leaderboard data
  const leaderboard = [
    { ranking: 1, hostel: 'Hostel A', points: 120 },
    { ranking: 2, hostel: 'Hostel B', points: 110 },
    { ranking: 3, hostel: 'Hostel C', points: 105 },
    { ranking: 4, hostel: 'Hostel D', points: 95 },
    { ranking: 5, hostel: 'Hostel E', points: 85 },
    { ranking: 6, hostel: 'Hostel F', points: 75 },
  ];

  return (
    <div className="flex flex-col h-screen">
      <header className="flex justify-between items-center bg-gray-900 text-white p-4">
        <h1 className="text-xl font-bold">GC Hub</h1>
        <nav>
          <ul className="flex space-x-6">
            <li className="cursor-pointer hover:underline">
              <Link href="../leaderboard">Leaderboard</Link>
            </li>
            <li className="cursor-pointer hover:underline"><Link href="../events">Event</Link></li>
            <li className="cursor-pointer hover:underline"><Link href="../participation">Participate</Link></li>
            <li className="cursor-pointer hover:underline"><Link href="../contact">Contact</Link></li>
          </ul>
        </nav>
        <button className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700">Logout</button>
      </header>
      <main className="flex-1 p-6 bg-gray-100">
        <div>
          <h2 className="text-2xl font-semibold mb-4 text-black">Leaderboard</h2>
          <p className="text-black mb-4">Here are the current rankings of the 6 hostels in the GC tournament:</p>

          {/* Table displaying the leaderboard */}
          <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
            <thead className="bg-gray-200">
              <tr>
                <th className="py-3 px-6 text-left text-sm font-medium text-gray-600">Ranking</th>
                <th className="py-3 px-6 text-left text-sm font-medium text-gray-600">Hostel Name</th>
                <th className="py-3 px-6 text-left text-sm font-medium text-gray-600">Points</th>
              </tr>
            </thead>
            <tbody>
              {leaderboard.map((entry) => (
                <tr key={entry.ranking} className="border-t border-gray-200">
                  <td className="py-3 px-6 text-sm text-gray-700">{entry.ranking}</td>
                  <td className="py-3 px-6 text-sm text-gray-700">{entry.hostel}</td>
                  <td className="py-3 px-6 text-sm text-gray-700">{entry.points}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
