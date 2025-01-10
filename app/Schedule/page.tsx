"use client";
import { useState } from "react";

export default function AdminDashboard() {
  const [schedule, setSchedule] = useState(null);
  const [loading, setLoading] = useState(false);

  const createSchedule = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/schedule", { method: "POST" });
      const data = await response.json();
      setSchedule(data.schedule);
    } catch (error) {
      console.error("Error creating schedule:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <button
        onClick={createSchedule}
        className="px-4 py-2 bg-blue-600 text-white rounded-md"
        disabled={loading}
      >
        {loading ? "Creating Schedule..." : "Create Random Schedule"}
      </button>

      {schedule && (
        <div className="mt-6">
          <h2 className="text-xl font-bold mb-2">Generated Schedule</h2>
          <ul>
            {schedule.map((item, index) => (
              <li key={index}>
                Participant: {item.participantId}, Event: {item.event}, Venue: {item.venue}, Time:{" "}
                {new Date(item.timeSlot).toLocaleString()}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
