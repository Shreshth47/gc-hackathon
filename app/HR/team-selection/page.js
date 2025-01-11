"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { getFirestore, collection, query, where, getDocs, updateDoc, doc } from "firebase/firestore"; // Firestore
import { app } from "../../firebaseConfig"; // Ensure this is your Firebase configuration file

export default function TeamSelection() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const event = searchParams.get("event"); // Extract the event query parameter

  const db = getFirestore(app); // Initialize Firestore
  const [teams, setTeams] = useState([]); // Store teams fetched from Firestore
  const [selectedTeams, setSelectedTeams] = useState([]);
  const [maxTeams, setMaxTeams] = useState(0); // Max number of teams input by the user
  const currentRepHall = "H4"; // Assume Hall 4 for the current representative

  useEffect(() => {
    if (event && currentRepHall) {
      const fetchTeams = async () => {
        try {
          const q = query(
            collection(db, "teams"),
            where("event", "==", event), // Ensure event matches the query parameter
            where("hall", "==", currentRepHall) // Fetch teams for the current representative's hall
          );

          const querySnapshot = await getDocs(q);
          const fetchedTeams = [];
          querySnapshot.forEach((doc) => {
            fetchedTeams.push({ id: doc.id, ...doc.data() }); // Store document ID and data
          });

          setTeams(fetchedTeams);
        } catch (error) {
          console.error("Error fetching teams:", error);
        }
      };

      fetchTeams();
    }
  }, [db, event, currentRepHall]);

  const handleTeamToggle = (teamId) => {
    setSelectedTeams((prev) =>
      prev.includes(teamId)
        ? prev.filter((id) => id !== teamId)
        : [...prev, teamId]
    );
  };

  const handleSubmit = async () => {
    if (selectedTeams.length > maxTeams) {
      alert(`Please select no more than ${maxTeams} teams.`);
      return;
    }
  
    try {
      // Reference to the Events document matching the current event
      const eventDocRef = doc(db, "Events", event);
  
      // Constructing the teams map
      const teamsMap = {};
      selectedTeams.forEach(teamId => {
        const team = teams.find(t => t.id === teamId); 
        if (team) {
          teamsMap[team.id] = currentRepHall; 
        }
      });
  
      await updateDoc(eventDocRef, { teams: teamsMap });
  
      console.log("Registered Teams and Hall Numbers:", teamsMap);
      alert("Teams Registered Successfully!");
      router.push("/HR"); // Redirect to the HR Dashboard
    } catch (error) {
      console.error("Error updating Teams in Firestore:", error);
    }
  };
  
  return (
    <div className="min-h-screen p-8 bg-gradient-to-r from-gray-50 to-blue-100">
      <h1 className="text-3xl font-semibold text-blue-700 mb-6">
        Team Selection for {event || "Loading..."} {/* Display the event name */}
      </h1>

      <div className="mb-6">
        <label htmlFor="maxTeams" className="block text-gray-700">
          Enter Maximum Number of Teams You Can Select:
        </label>
        <input
          type="number"
          id="maxTeams"
          value={maxTeams}
          onChange={(e) => setMaxTeams(Number(e.target.value))}
          className="mt-1 p-2 border border-gray-300 rounded-lg w-full"
        />
      </div>

      {teams.length > 0 ? (
        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Select Teams for {currentRepHall}
          </h2>
          <p className="text-gray-600 mb-4">
            You can select up to {maxTeams} teams.
          </p>
          <ul className="mt-4">
            {teams.map((team) => (
              <li key={team.id} className="flex items-center space-x-4">
                <input
                  type="checkbox"
                  id={team.id}
                  checked={selectedTeams.includes(team.id)}
                  onChange={() => handleTeamToggle(team.id)}
                  disabled={selectedTeams.length >= maxTeams && !selectedTeams.includes(team.id)}
                />
                <label htmlFor={team.id} className="text-gray-600 cursor-pointer">
                  {team.id} - {team.teamLeader || "No Details"} {/* Display team details */}
                </label>
              </li>
            ))}
          </ul>
          <button
            onClick={handleSubmit}
            disabled={selectedTeams.length > maxTeams}
            className={`mt-6 px-6 py-2 rounded-lg shadow ${
              selectedTeams.length >= 0 && selectedTeams.length <= maxTeams
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
