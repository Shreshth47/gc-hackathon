'use client';
import { useState } from 'react';
import Link from 'next/link';

export default function Participation() {
  const [teamMembersCount, setTeamMembersCount] = useState(0);  // State to store number of team members
  const [teamMembers, setTeamMembers] = useState([]);  // State to store details of team members
  const [event, setEvent] = useState(''); // State to store selected event

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

  return (
    <div className="flex flex-col h-screen">
      <header className="flex justify-between items-center bg-gray-900 text-white p-4">
        <h1 className="text-xl font-bold">GC Hub</h1>
        <nav>
          <ul className="flex space-x-6">
            <li className="cursor-pointer hover:underline">
              <Link href="../leaderboard">Leaderboard</Link>
            </li>
            <li className="cursor-pointer hover:underline"><Link href="../events">Event</Link></li>
            <li className="cursor-pointer hover:underline"><Link href="../participation">Participate</Link></li>
            <li className="cursor-pointer hover:underline"><Link href="../contact">Contact</Link></li>
          </ul>
        </nav>
        <button className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700">Logout</button>
      </header>
      <main className="flex-1 p-6 bg-gray-100">
        <div>
          <h2 className="text-2xl font-semibold mb-4 text-black">Participation Form</h2>
          <p className="text-black mb-4">Fill in the details to participate in the event.</p>
          <form className="space-y-4">
            <div>
              <label className="block text-gray-700">Team Leader's Name</label>
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded text-black"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700">Entry Number</label>
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded text-black"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700">Mobile Number</label>
              <input
                type="tel"
                className="w-full p-2 border border-gray-300 rounded text-black"
                required
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
                  <option value="hackathon">Hackathon</option>
                  <option value="robotics">Robotics</option>
                  <option value="competitive_programming">Competitive Programming</option>
                </optgroup>
                <optgroup label="Cultural Leg">
                  <option value="dance">Dance</option>
                  <option value="singing">Singing</option>
                </optgroup>
                <optgroup label="Sports Leg">
                  <option value="cricket">Cricket</option>
                  <option value="football">Football</option>
                  <option value="chess">Chess</option>
                </optgroup>
              </select>
            </div>

            <div>
              <label className="block text-gray-700">Team Name</label>
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded text-black"
                required
              />
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
