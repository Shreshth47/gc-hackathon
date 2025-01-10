'use client';
import Link from 'next/link';

export default function Dashboard() {
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
          <h2 className="text-2xl font-semibold mb-4 text-black">Welcome to the Dashboard</h2>
          <p className='text-black'>Select a tab to view details.</p>
        </div>
      </main>
    </div>
  );
}
