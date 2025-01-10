'use client';
import Link from 'next/link';
import { useState } from 'react';

export default function Events() {
  const [selectedEvent, setSelectedEvent] = useState(null);

  const eventDetails = [
    {
      name: "Hackathon",
      leg: "Technical Leg",
      description: "A coding competition where teams build innovative solutions to given problems within a short time.",
      date: "March 15, 2025",
      time: "10:00 AM",
      venue: "Main Auditorium",
    },
    {
      name: "Robotics",
      leg: "Technical Leg",
      description: "Teams compete with their robots in various challenges to demonstrate their engineering skills.",
      date: "March 16, 2025",
      time: "11:00 AM",
      venue: "Tech Hall",
    },
    {
      name: "Competitive Programming",
      leg: "Technical Leg",
      description: "A timed event where participants solve algorithmic problems to score the most points.",
      date: "March 17, 2025",
      time: "1:00 PM",
      venue: "Online",
    },
    {
      name: "Dance",
      leg: "Cultural Leg",
      description: "A performance event where teams showcase their dancing skills in front of a live audience.",
      date: "March 18, 2025",
      time: "6:00 PM",
      venue: "Main Auditorium",
    },
    {
      name: "Singing",
      leg: "Cultural Leg",
      description: "A competition where participants sing their favorite songs to win the hearts of the judges and audience.",
      date: "March 19, 2025",
      time: "5:00 PM",
      venue: "Music Hall",
    },
    {
      name: "Cricket",
      leg: "Sports Leg",
      description: "A friendly cricket match between teams in a knockout format.",
      date: "March 20, 2025",
      time: "9:00 AM",
      venue: "Sports Ground",
    },
    {
      name: "Football",
      leg: "Sports Leg",
      description: "A football tournament where teams compete for the championship in a 7-a-side format.",
      date: "March 21, 2025",
      time: "2:00 PM",
      venue: "Football Field",
    },
    {
      name: "Chess",
      leg: "Sports Leg",
      description: "A chess competition where players test their strategic skills against each other.",
      date: "March 22, 2025",
      time: "11:00 AM",
      venue: "Chess Hall",
    },
  ];

  const toggleEventDetails = (index) => {
    if (selectedEvent === index) {
      setSelectedEvent(null); // Close the currently open event if clicked again
    } else {
      setSelectedEvent(index); // Open the clicked event
    }
  };

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
          <h2 className="text-2xl font-semibold mb-4 text-black">Event Details</h2>
          <div className="space-y-4">
            {eventDetails.map((event, index) => (
              <div key={index} className="bg-white border border-gray-300 rounded-md shadow-md">
                <button
                  onClick={() => toggleEventDetails(index)}
                  className="w-full text-left px-6 py-4 text-xl font-semibold bg-gray-200 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-blue-800"
                >
                  {event.name}
                </button>
                {selectedEvent === index && (
                  <div className="p-6 text-black bg-gray-50">
                    <p><strong>Description:</strong> {event.description}</p>
                    <p><strong>Leg:</strong> {event.leg}</p>
                    <p><strong>Date:</strong> {event.date}</p>
                    <p><strong>Time:</strong> {event.time}</p>
                    <p><strong>Venue:</strong> {event.venue}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
