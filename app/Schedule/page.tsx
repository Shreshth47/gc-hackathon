"use client";

import { useState } from "react";
import { collection, getDocs, doc, setDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";

type Team = {
  id: string;
  entryNumber: string;
  event: string;
  hall: string;
  phoneNumber: string;
  teamLeader: string;
  teamMembers: Array<{ entryNo: string; name: string; phoneNumber: string }>;
  teamName: string;
  timestamp: string;
};

type ScheduleItem = {
  teamName: string;
  event: string;
  venue: string;
  timeSlot: string;
  teamLeader: string;
};

export default function SchedulePage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [schedule, setSchedule] = useState<ScheduleItem[]>([]);

  const generateSchedule = async () => {
    setLoading(true);
    setError(null);

    try {
      // Fetch teams from Firestore
      const teamSnapshot = await getDocs(collection(db, "teams"));
      const teams: Team[] = teamSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Team[];

      if (teams.length === 0) {
        setError("No teams found in Firestore.");
        setLoading(false);
        return;
      }

      // Sort teams by timestamp
      teams.sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());

      // Define scheduling parameters
      const eventStartTime = new Date("2025-01-11T09:00:00Z");
      const slotDuration = 30; // in minutes
      const venues = ["Auditorium", "Hall A", "Hall B"];
      const slotsPerVenue = 10;

      const venueSlots: Record<string, Date[]> = {};
      venues.forEach((venue) => {
        venueSlots[venue] = Array(slotsPerVenue)
          .fill(null)
          .map((_, i) => new Date(eventStartTime.getTime() + i * slotDuration * 60 * 1000));
      });

      // Assign slots to teams
      const generatedSchedule: ScheduleItem[] = [];
      teams.forEach((team) => {
        let assigned = false;
        for (const venue of venues) {
          if (venueSlots[venue].length > 0) {
            const timeSlot = venueSlots[venue].shift()!;
            generatedSchedule.push({
              teamName: team.teamName,
              event: team.event,
              venue,
              timeSlot: timeSlot.toISOString(),
              teamLeader: team.teamLeader,
            });
            assigned = true;
            break;
          }
        }
        if (!assigned) {
          console.warn(`No available slots for team: ${team.teamName}`);
        }
      });

      setSchedule(generatedSchedule);

      // Optionally write the schedule back to Firestore
      await setDoc(doc(db, "Schedules", "event_schedule"), { schedule: generatedSchedule });

      console.log("Schedule saved to Firestore:", generatedSchedule);
    } catch (err: any) {
      console.error("Error generating schedule:", err);
      setError("An error occurred while generating the schedule.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-extrabold mb-6 text-indigo-700 text-center">
        Schedule Generator
      </h1>

      <button
        onClick={generateSchedule}
        disabled={loading}
        className={`px-4 py-2 w-full max-w-sm mx-auto block text-white rounded-md ${
          loading ? "bg-gray-500 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
        }`}
      >
        {loading ? "Generating Schedule..." : "Generate Schedule"}
      </button>

      {error && <p className="mt-4 text-center text-red-500">{error}</p>}

      {schedule.length > 0 && (
        <div className="mt-6">
          <h2 className="text-xl font-bold mb-4 text-indigo-700">Generated Schedule</h2>
          <ul className="space-y-4">
            {schedule.map((item, index) => (
              <li
                key={index}
                className="p-4 bg-gray-50 rounded-md shadow-sm border border-gray-300"
              >
                <p>
                  <span className="font-bold">Team Name:</span> {item.teamName}
                </p>
                <p>
                  <span className="font-bold">Event:</span> {item.event}
                </p>
                <p>
                  <span className="font-bold">Venue:</span> {item.venue}
                </p>
                <p>
                  <span className="font-bold">Time Slot:</span>{" "}
                  {new Date(item.timeSlot).toLocaleString()}
                </p>
                <p>
                  <span className="font-bold">Team Leader:</span> {item.teamLeader}
                </p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
