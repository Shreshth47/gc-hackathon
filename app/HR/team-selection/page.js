"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation"; // For App Router
import { getFirestore, collection, query, where, getDocs } from "firebase/firestore"; 
import { app } from "../../firebaseConfig"; 

export default function TeamSelection() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const event = searchParams.get("event"); // Extract the event query parameter

  const db = getFirestore(app); // Initialize Firestore
  const repName = "Rep B"; // Replace with authenticated rep name
  const [selectedHall, setSelectedHall] = useState(null);
  const [teams, setTeams] = useState([]);
  const [selectedTeams, setSelectedTeams] = useState([]);

  useEffect(() => {
    // Fetch the hall name for the rep
    const hall = halls.find((hall) => hall.rep === repName)?.name;
    setSelectedHall(hall);

    if (hall && event) {
      // Fetch teams from Firestore
      const fetchTeams = async () => {
        const q = query(
          collection(db, "teams"),
          where("event", "==", event),
          where("hall", "==", hall)
        );
        const querySnapshot = await getDocs(q);
        const teamList = [];
        querySnapshot.forEach((doc) => {
          teamList.push(doc.id); // Assuming the team name is the document ID
        });
        setTeams(teamList);
      };

      fetchTeams().catch(console.error);
    }
  }, [db, event, repName]);

  const handleTeamToggle = (teamName) => {
    setSelectedTeams((prev) =>
      prev.includes(teamName)
        ? prev.filter((team) => team !== teamName)
        : [...prev, teamName]
    );
  };

  const handleSubmit = () => {
    if (selectedTeams.length < 2) {
      alert("Please select at least 2 teams.");
      return;
    }

    console.log("Registered Teams:", selectedTeams);
    alert("Teams Registered Successfully!");
    router.push("/HR"); // Redirect to the home page
  };

  return (
    <div className="min-h-screen p-8 bg-gradient-to-r from-gray-50 to-blue-100">
      <h1 className="text-3xl font-semibold text-blue-700 mb-6">
        Team Selection for {event}
      </h1>

      {teams.length > 0 ? (
        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Select Teams for {selectedHall}
          </h2>
          <ul className="mt-4">
            {teams.map((team) => (
              <li key={team} className="flex items-center space-x-4">
                <input
                  type="checkbox"
                  id={`${selectedHall}-${team}`}
                  checked={selectedTeams.includes(team)}
                  onChange={() => handleTeamToggle(team)}
                />
                <label
                  htmlFor={`${selectedHall}-${team}`}
                  className="text-gray-600 cursor-pointer"
                >
                  {team}
                </label>
              </li>
            ))}
          </ul>
          <button
            onClick={handleSubmit}
            disabled={selectedTeams.length < 2}
            className={`mt-6 px-6 py-2 rounded-lg shadow ${
              selectedTeams.length >= 2
                ? "bg-blue-500 text-white hover:bg-blue-600"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            Submit Registration
          </button>
        </div>
      ) : (
        <p className="text-gray-500">Loading teams...</p>
      )}
    </div>
  );
}
