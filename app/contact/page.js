'use client';
import Link from 'next/link';

export default function Contact() {
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
          <h2 className="text-2xl font-semibold mb-4 text-black">Contact BoHA</h2>
          <form className="space-y-4">
            <div>
              <label htmlFor="message" className="block text-black font-medium mb-2">
                Your Message
              </label>
              <textarea
                id="message"
                name="message"
                rows="6"
                className="w-full p-3 border border-gray-300 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your message here..."
              ></textarea>
            </div>
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Send
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
