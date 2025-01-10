"use client"; // Ensure compatibility with App Router

import { useState, useEffect } from "react";
import { useSearchParams, useRouter, redirect } from "next/navigation"; // Updated for App Router

export default function TeamSelection() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const event = searchParams.get("event"); // Extract the event query parameter


  const halls = [
    { name: "Hall 1", teams: ["Team A1", "Team A2", "Team A3", "Team A4"], rep: "Rep A" },
    { name: "Hall 2", teams: ["Team B1", "Team B2", "Team B3", "Team B4"], rep: "Rep B" },
    { name: "Hall 3", teams: ["Team C1", "Team C2", "Team C3", "Team C4"], rep: "Rep C" },
    { name: "Hall 4", teams: ["Team D1", "Team D2", "Team D3", "Team D4"], rep: "Rep D" },
    { name: "Hall 5", teams: ["Team E1", "Team E2", "Team E3", "Team E4"], rep: "Rep E" },
    { name: "Hall 6", teams: ["Team F1", "Team F2", "Team F3", "Team F4"], rep: "Rep F" },
  ];

  const [selectedHall, setSelectedHall] = useState(null);
  const [selectedTeams, setSelectedTeams] = useState(() => {
    const initialSelection = {};
    halls.forEach((hall) => {
      initialSelection[hall.name] = [];
    });
    return initialSelection;
  });

  const handleHallSelect = (hallName) => {
    setSelectedHall(hallName);
  };

  const handleTeamToggle = (teamName) => {
    setSelectedTeams(prev => ({
      ...prev,
      [selectedHall]: prev[selectedHall].includes(teamName)
        ? prev[selectedHall].filter(team => team !== teamName)
        : [...prev[selectedHall], teamName]
    }));
  };

  const handleSubmit = () => {
    const unfilledHalls = Object.keys(selectedTeams).filter(
      (hall) => selectedTeams[hall].length < 2
    );

    console.log("Registered Teams:", selectedTeams);
    alert("Teams Registered Successfully!");
    router.push("/HR"); // Redirect to the home page
  };


  return (
    <div className="min-h-screen p-8 bg-gradient-to-r from-gray-50 to-blue-100">
      <h1 className="text-3xl font-semibold text-blue-700 mb-6">
        Team Selection for {event}
      </h1>

      {!selectedHall ? (
        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Select Hall Representative</h2>
          <ul>
            {halls.map((hall) => (
              <li key={hall.name} className="mb-2">
                <button
                  onClick={() => handleHallSelect(hall.name)}
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  {hall.rep}
                </button>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Select Teams for {selectedHall}</h2>
          <ul className="mt-4">
            {halls.find(hall => hall.name === selectedHall)?.teams.map((team) => (
              <li key={team} className="flex items-center space-x-4">
                <input
                  type="checkbox"
                  id={`${selectedHall}-${team}`}
                  checked={selectedTeams[selectedHall]?.includes(team) || false}
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
            disabled={selectedTeams[selectedHall].length < 2}
            className={`mt-6 px-6 py-2 rounded-lg shadow ${
              selectedTeams[selectedHall].length === 2
                ? "bg-blue-500 text-white hover:bg-blue-600"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            Submit Registration
          </button>
        </div>
      )}
    </div>
  );
}
