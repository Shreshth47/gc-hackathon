"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { db } from "../firebaseConfig";
import { collection, query, where, getDocs } from "firebase/firestore";

export default function HRDashboard() {
  const router = useRouter();

  const [hrData, setHrData] = useState({
    name: "N/A",
    hall: "N/A",
    email: "N/A",
    
    photoUrl: "/alan.png", // Default profile photo
    rulebookLink: "GC Hackathon Rules & Instructions.pdf",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const events = [
    { name: "Hackathon", image: "/hackathon.png" },
    { name: "Robotics", image: "/robotics.png" },
    { name: "Competitive Programming", image: "/cp.png" },
    { name: "Dance", image: "/dance.png" },
    { name: "Singing", image: "/sing.png" },
    { name: "Cricket", image: "/cricket.png" },
    { name: "Chess", image: "/chess.png" },
    { name: "Football", image: "/football.png" },
  ];

  // Fetch HR Data
  useEffect(() => {
    const fetchHrData = async () => {
      setLoading(true);
      try {
        // Replace with the logged-in user's email
        const loggedInEmail = "yuh04coder@gmail.com"; // Use auth context or props in real use cases

        const hrQuery = query(
          collection(db, "HR"),
          where("email", "==", loggedInEmail)
        );
        const hrSnapshot = await getDocs(hrQuery);

        if (!hrSnapshot.empty) {
          const hr = hrSnapshot.docs[0].data(); // Assume only one HR per email
          setHrData((prevData) => ({
            ...prevData,
            name: hr.name || prevData.name,
            hall: hr.hostel || prevData.hall,
            email: hr.email || prevData.email,
          }));
        } else {
          console.warn("No HR data found for the given email.");
        }
      } catch (err) {
        console.error("Error fetching HR data:", err);
        setError("Failed to load HR data.");
      } finally {
        setLoading(false);
      }
    };

    fetchHrData();
  }, []);

  const handleRegister = (eventNam:string) => {
    // Pass the event name as a query parameter to the TeamSelection page
    router.push(`/HR/team-selection?event=${encodeURIComponent(eventNam)}`);  };

  if (loading) {
    return <p className="text-center mt-10">Loading HR data...</p>;
  }

  if (error) {
    return <p className="text-center mt-10 text-red-500">{error}</p>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-50 to-blue-100">
      {/* Navigation Header */}
      <nav className="relative bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-4 shadow-md flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <img
            src="/gc.png"
            alt="Logo"
            className="w-10 h-10 rounded-full transform transition-transform duration-300 hover:scale-110"
          />
        </div>
        <h1 className="text-3xl font-bold text-center animate-slide-in tracking-wide">
          Hall Representative Dashboard
        </h1>
        <ul className="flex space-x-8 items-center">
          {["Home", "Logout"].map((item, index) => (
            <li key={index}>
              <a
                href={`#${item.toLowerCase().replace(/\s/g, "-")}`}
                className="hover:underline hover:text-yellow-300 transition-colors duration-300 font-medium tracking-wide"
              >
                {item}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* Profile Section */}
      <section
        id="home"
        className="max-w-4xl mx-auto mt-10 p-8 bg-white rounded-lg shadow-xl transition-all duration-300 hover:shadow-2xl hover:scale-105"
      >
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-gray-800">
              Hello, {hrData.name}!
            </h2>
            <p className="text-gray-600">Hall: {hrData.hall}</p>
            <p className="text-gray-600">Email: {hrData.email}</p>
          </div>
          <img
            src={hrData.photoUrl}
            alt="HR Profile"
            className="w-24 h-24 rounded-full shadow-md border-2 border-gray-200 transform transition-transform duration-300 hover:scale-110"
          />
        </div>
        <div className="mt-6 text-center">
          <a
            href={hrData.rulebookLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 font-semibold hover:underline transition-colors"
          >
            View GC Rulebook
          </a>
        </div>
      </section>

      {/* Event Registration Section */}
      <section
        id="event-registration"
        className="max-w-4xl mx-auto mt-10 p-8 bg-white rounded-lg shadow-md"
      >
        <h2 className="text-2xl font-semibold text-blue-700 border-b-2 border-blue-600 pb-2">
          Event Registration
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {events.map((event, index) => (
            <div
              key={index}
              className="p-4 bg-gray-100 rounded-lg shadow transition-transform duration-300 hover:scale-105 hover:shadow-lg"
            >
              <img
                src={event.image}
                alt={event.name}
                className="w-full h-40 object-cover rounded-md"
              />
              <h3 className="mt-4 text-lg font-semibold text-gray-800">
                {event.name}
              </h3>
              <button
                onClick={() => handleRegister(event.name)}
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition-all"
              >
                Register
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
