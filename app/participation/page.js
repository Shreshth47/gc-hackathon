'use client';
import { useState } from 'react';
import Link from 'next/link';
import { db, collection, doc, setDoc } from '../firebaseConfig'; // Adjust the path based on your Firebase initialization file
import { redirect } from 'next/navigation';

export default function Participation() {

  const [teamMembersCount, setTeamMembersCount] = useState(0);
  const [teamMembers, setTeamMembers] = useState([]);
  const [event, setEvent] = useState('');
  const [teamName, setTeamName] = useState('');
  const [teamLeader, setTeamLeader] = useState('');
  const [entryNumber, setEntryNumber] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [hall, setHall] = useState('');  // New state for hall selection

  const handleTeamMembersQuantityChange = (e) => {
    const count = parseInt(e.target.value, 10);
    setTeamMembersCount(count);

    // Reset team member details when quantity changes
    const newMembers = Array(count).fill({ name: '', entryNo: '', phoneNumber: '' });
    setTeamMembers(newMembers);
  };

  const handleTeamMemberChange = (index, field, value) => {
    const updatedMembers = [...teamMembers];
    updatedMembers[index][field] = value;
    setTeamMembers(updatedMembers);
  };

  const handleEventChange = (e) => {
    setEvent(e.target.value); // Update selected event
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Preparing the data to be sent to Firebase
    const teamData = {
      teamLeader,
      entryNumber,
      phoneNumber,
      event,
      teamName,
      teamMembers,
      hall,  // Add hall to the data
      timestamp: new Date().toISOString() // Adding a timestamp to the entry
    };

    try {
      // Use doc function to create a document with teamName as the ID
      const docRef = doc(collection(db, 'teams'), teamName);  // Set the document ID to the team name
      await setDoc(docRef, teamData);
      console.log('Document written with ID: ', docRef.id);
      alert('Team registered successfully!');
    } catch (error) {
      console.error('Error adding document: ', error);
      alert('Error registering team.');
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <header className="flex justify-between items-center bg-gray-900 text-white p-4">
        <h1 className="text-xl font-bold">GC Hub</h1>
        <nav>
          <ul className="flex space-x-6">
          <li className="cursor-pointer hover:underline">
              <Link href="../publicPage">Home</Link>
            </li>
          <li className="cursor-pointer hover:underline">
              <Link href="../leaderboard">Leaderboard</Link>
            </li>
            <li className="cursor-pointer hover:underline"><Link href="../events">Event</Link></li>
            <li className="cursor-pointer hover:underline"><Link href="../participation">Participate</Link></li>
            <li className="cursor-pointer hover:underline"><Link href="../faq">FAQ</Link></li>
            <li className="cursor-pointer hover:underline"><Link href="../hallRep">Hall Reps</Link></li>
          </ul>
        </nav>
        
      </header>
      <main className="flex-1 p-6 bg-gray-100">
        <div>
          <h2 className="text-2xl font-semibold mb-4 text-black">Participation Form</h2>
          <p className="text-black mb-4">Fill in the details to participate in the event.</p>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-gray-700">Team Leader's Name</label>
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded text-black"
                required
                value={teamLeader}
                onChange={(e) => setTeamLeader(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-gray-700">Entry Number</label>
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded text-black"
                required
                value={entryNumber}
                onChange={(e) => setEntryNumber(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-gray-700">Mobile Number</label>
              <input
                type="tel"
                className="w-full p-2 border border-gray-300 rounded text-black"
                required
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>

            {/* Event Dropdown with Categories */}
            <div>
              <label className="block text-gray-700">Event</label>
              <select
                className="w-full p-2 border border-gray-300 rounded text-black"
                value={event}
                onChange={handleEventChange}
                required
              >
                <option value="">Select Event</option>
                <optgroup label="Technical Leg">
                  <option value="Hackathon">Hackathon</option>
                  <option value="Robotics">Robotics</option>
                  <option value="Competitive Programming">Competitive Programming</option>
                </optgroup>
                <optgroup label="Cultural Leg">
                  <option value="Dance">Dance</option>
                  <option value="Singing">Singing</option>
                </optgroup>
                <optgroup label="Sports Leg">
                  <option value="Cricket">Cricket</option>
                  <option value="Football">Football</option>
                  <option value="Chess">Chess</option>
                </optgroup>
              </select>
            </div>

            <div>
              <label className="block text-gray-700">Team Name</label>
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded text-black"
                required
                value={teamName}
                onChange={(e) => setTeamName(e.target.value)}
              />
            </div>

            {/* Hall Dropdown */}
            <div>
              <label className="block text-gray-700">Hall</label>
              <select
                className="w-full p-2 border border-gray-300 rounded text-black"
                value={hall}
                onChange={(e) => setHall(e.target.value)}
                required
              >
                <option value="">Select Hall</option>
                <option value="H1">H1</option>
                <option value="H2">H2</option>
                <option value="H3">H3</option>
                <option value="H4">H4</option>
                <option value="H5">H5</option>
                <option value="H6">H6</option>
              </select>
            </div>

            <div>
              <label className="block text-gray-700">Team Members Quantity (Max 5)</label>
              <select
                className="w-full p-2 border border-gray-300 rounded text-black"
                value={teamMembersCount}
                onChange={handleTeamMembersQuantityChange}
                required
              >
                <option value="0">Select Team Members</option>
                {[1, 2, 3, 4, 5].map((count) => (
                  <option key={count} value={count}>
                    {count} {count === 1 ? 'Member' : 'Members'}
                  </option>
                ))}
              </select>
            </div>

            {/* Displaying team member input fields based on selected quantity */}
            {Array.from({ length: teamMembersCount }, (_, index) => (
              <div key={index} className="space-y-4">
                <h3 className="text-xl font-semibold text-gray-700">Team Member {index + 1}</h3>

                <div>
                  <label className="block text-gray-700">Name</label>
                  <input
                    type="text"
                    className="w-full p-2 border border-gray-300 rounded text-black"
                    onChange={(e) => handleTeamMemberChange(index, 'name', e.target.value)}
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-700">Entry Number</label>
                  <input
                    type="text"
                    className="w-full p-2 border border-gray-300 rounded text-black"
                    onChange={(e) => handleTeamMemberChange(index, 'entryNo', e.target.value)}
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-700">Phone Number</label>
                  <input
                    type="tel"
                    className="w-full p-2 border border-gray-300 rounded text-black"
                    onChange={(e) => handleTeamMemberChange(index, 'phoneNumber', e.target.value)}
                    required
                  />
                </div>
              </div>
            ))}

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
            >
              Submit
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
