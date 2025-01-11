'use client';
import { useState, useEffect } from 'react';
import { db } from '../firebaseConfig'; // Adjust the path if needed
import { collection, getDocs } from 'firebase/firestore';
import Link from 'next/link';

export default function Events() {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        // Fetch events data from Firestore
        const querySnapshot = await getDocs(collection(db, 'Events'));

        // Map the data to extract the necessary fields
        const fetchedEvents = querySnapshot.docs.map(doc => {
          const data = doc.data();
          return {
            name: doc.id, // Using the document ID as event name
            description: data.description,
            leg: data.leg,
            date: data.date,
            time: data.time,
            venue: data.venue,
          };
        });

        // Update state with the fetched events
        setEvents(fetchedEvents);
      } catch (error) {
        console.error('Error fetching events: ', error);
      }
    };

    fetchEvents();
  }, []);

  const toggleEventDetails = (index) => {
    setSelectedEvent(selectedEvent === index ? null : index);
  };

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
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-semibold text-blue-400 mb-6">Event Details</h2>
          <div className="space-y-4">
            {events.length === 0 ? (
              <p className="text-gray-400">No events available.</p>
            ) : (
              events.map((event, index) => (
                <div key={index} className="border border-gray-700 rounded-md shadow-md overflow-hidden">
                  <button
                    onClick={() => toggleEventDetails(index)}
                    className="w-full text-left px-6 py-4 text-lg font-medium bg-gray-800 hover:bg-gray-700 text-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {event.name}
                  </button>
                  {selectedEvent === index && (
                    <div className="p-6 bg-gray-800 text-gray-300 space-y-2">
                      <p><strong className="text-blue-400">Description:</strong> {event.description}</p>
                      <p><strong className="text-blue-400">Leg:</strong> {event.leg}</p>
                      <p><strong className="text-blue-400">Date:</strong> {event.date}</p>
                      <p><strong className="text-blue-400">Time:</strong> {event.time}</p>
                      <p><strong className="text-blue-400">Venue:</strong> {event.venue}</p>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
