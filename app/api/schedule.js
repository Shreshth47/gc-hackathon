import { db } from "../../../firebaseConfig";
import { collection, getDocs, doc, setDoc } from "firebase/firestore";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    console.error("Invalid HTTP method:", req.method);
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    console.log("Starting scheduling process...");
    const teamCollection = collection(db, "teams");
    const teamSnapshot = await getDocs(teamCollection);

    if (teamSnapshot.empty) {
      console.error("No teams found in Firestore.");
      return res.status(404).json({ error: "No teams found." });
    }

    const teams = teamSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    console.log("Fetched teams:", teams);

    const schedule = []; // Replace with your scheduling logic
    console.log("Generated schedule:", schedule);

    // Save schedule to Firestore
    const scheduleDoc = doc(db, "Schedules", "event_schedule");
    await setDoc(scheduleDoc, { schedule });

    res.status(200).json({ message: "Schedule created successfully!", schedule });
  } catch (error) {
    console.error("Error in the schedule API handler:", error);
    res.status(500).json({ error: "Failed to create schedule." });
  }
}
