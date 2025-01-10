import { collection, getDocs, setDoc, doc } from "firebase/firestore";
import { db } from "../../firebaseConfig";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    // Fetch all participants from Firestore
    const participantsSnapshot = await getDocs(collection(db, "Events"));
    const participants = participantsSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    // Shuffle participants for random assignment
    participants.sort(() => Math.random() - 0.5);

    // Define venues and time slots
    const eventStartTime = new Date("2025-01-11T09:00:00Z");
    const slotDuration = 30; // in minutes
    const venues = ["Auditorium", "Lab 1", "Lab 2"];
    const slotsPerVenue = 20;

    // Pre-allocate time slots for each venue
    const venueSlots = {};
    venues.forEach((venue) => {
      venueSlots[venue] = Array(slotsPerVenue)
        .fill()
        .map((_, i) => new Date(eventStartTime.getTime() + i * slotDuration * 60 * 1000));
    });

    const schedule = [];

    // Assign participants to random slots
    participants.forEach((participant) => {
      let assigned = false;

      for (const venue of venues) {
        if (venueSlots[venue].length > 0) {
          const timeSlot = venueSlots[venue].shift(); // Assign the earliest available slot
          schedule.push({
            participantId: participant.id,
            event: participant.event,
            venue,
            timeSlot: timeSlot.toISOString(),
          });
          assigned = true;
          break;
        }
      }

      if (!assigned) {
        console.warn(`Participant ${participant.id} could not be scheduled.`);
      }
    });

    // Save the schedule in Firestore
    const scheduleRef = doc(db, "Schedules", "random_schedule");
    await setDoc(scheduleRef, { schedule });

    res.status(200).json({ message: "Random schedule created successfully!", schedule });
  } catch (error) {
    console.error("Error creating schedule:", error);
    res.status(500).json({ error: "Failed to create schedule." });
  }
}
