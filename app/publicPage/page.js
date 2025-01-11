'use client';
import Link from 'next/link';

export default function Dashboard() {
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
        {/* Hero Section */}
        <section className="relative bg-white shadow-md rounded-lg p-8 text-center max-w-5xl mx-auto">
          <img
            src="/hero-image.JPG" // Replace with the actual image path
            alt="Championship"
            className="absolute top-0 left-0 w-full h-full object-cover opacity-20 rounded-lg"
          />
          <div className="relative">
            <h2 className="text-4xl font-extrabold mb-4 text-purple-700 drop-shadow-md">
              Welcome to
            </h2>
            <h1 className="text-6xl font-extrabold mb-6 text-black drop-shadow-md">
              General Championship
            </h1>
            <p className="text-gray-700 text-lg">
              A sports championship is a prestigious event that brings together teams or individuals
              to compete at the highest level within their respective sport. These tournaments are
              often the culmination of a season or series of qualifying rounds, where participants
              showcase their skills, determination, and teamwork to achieve victory.
            </p>
            <p className="text-gray-700 text-lg mt-4">
              Championships highlight the passion of athletes striving for excellence. Whether on the
              field, court, or arena, sports championships unite communities, inspire generations, and
              celebrate greatness.
            </p>
          </div>
        </section>

        {/* Highlights Section */}
        <section className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center text-center">
            <img
              src="/highlight-1.JPG" // Replace with your actual image path
              alt="Highlight 1"
              className="w-32 h-32 object-cover rounded-full mb-4"
            />
            <h3 className="text-xl font-bold text-black">Thrilling Matches</h3>
            <p className="text-gray-700 mt-2">
              Witness intense rivalries and exhilarating moments as athletes compete for glory.
            </p>
          </div>

          <div className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center text-center">
            <img
              src="/highlight-2.JPG" // Replace with your actual image path
              alt="Highlight 2"
              className="w-32 h-32 object-cover rounded-full mb-4"
            />
            <h3 className="text-xl font-bold text-black">Inspiring Athletes</h3>
            <p className="text-gray-700 mt-2">
              Celebrate the dedication and passion of competitors pushing their limits.
            </p>
          </div>

          <div className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center text-center">
            <img
              src="/highlight-3.AVIF" // Replace with your actual image path
              alt="Highlight 3"
              className="w-32 h-32 object-cover rounded-full mb-4"
            />
            <h3 className="text-xl font-bold text-black">Unforgettable Moments</h3>
            <p className="text-gray-700 mt-2">
              Experience the magic of sportsmanship and unity in every championship.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}
